import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'
import { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Typography,
    Tab,
    TextField,
    Grid,
    Dialog,
    DialogContent,
    DialogActions,
    MenuItem,
    AppBar,
} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import {
    Controller,
    useForm,
    FormProvider,
    useFieldArray,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import VirtualizedData from 'src/app/main/apps/maintenanceSystem/machineTab/utils/VirtualizedData'

import { selectUser } from 'app/store/userSlice'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getMnOne, saveMnOne, saveMnOneRequest } from '../../store/mnOneSlice'
import { getApSlice } from '../../store/apSlice'
import { getMnRepSlice } from '../../store/mnRepSlice'
import { getMnReqSlice } from '../../store/mnReqSlice'
import { getMnMachineSlice } from '../../store/mnMachineSlice'

import {
    getMachineStock,
    selectStock,
} from 'src/app/main/apps/maintenanceSystem/store/machineChildren/machineStock'
import TableIndex from 'src/app/main/apps/maintenanceSystem/machineTab/TableIndex'
import StatusColor from 'src/app/main/apps/maintenanceSystem/machineTab/utils/StatusColor'
import axios from 'axios'

const schema = yup.object().shape({
    id_request: yup
        .string()
        .required('Require machine ap-sheet')
        .min(11)
        .max(11),
    item_name: yup.string().required('Require item name'),
    item_qty: yup.number().positive().required('Require item qty'),
    item_uom: yup.string().required('Require item uom').min(3).max(3),
    chronological: yup.string().required('Require machine chronological'),
    corrective: yup.string().required('Require machine corrective'),
    prevention: yup.string().required('Require machine prevention'),
})

const columnsRequest = [
    {
        field: 'sheet_no',
        headerName: 'AP-Sheet',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 120,
    },
    {
        field: 'mch_code',
        headerName: 'Machine',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 90,
    },
    {
        field: 'createdAt',
        headerName: 'Date',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 120,
        valueFormatter: (params) =>
            dayjs(params.value).format('DD/MM/YYYY HH:mm'),
    },
    {
        field: 'mre_request',
        headerName: 'MRE',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        minWidth: 130,
    },
    {
        field: 'audit_request',
        headerName: 'Audit',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 90,
        align: 'center',
        renderCell: (params) => <StatusColor id={params.value} />,
    },
    {
        field: 'item_ready',
        headerName: 'Ready',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 90,
        align: 'center',
        renderCell: (params) =>
            params.value === 'Y' ? <StatusColor id="Ready" /> : '',
    },
    {
        field: 'item_stock',
        headerName: 'Sparepart',
        minWidth: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'item_name',
        headerName: 'Remarks',
        minWidth: 150,
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'item_qty',
        headerName: 'Qty',
        width: 50,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'item_uom',
        headerName: 'Uom',
        width: 50,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'date_ready_request',
        headerName: 'Ready',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 120,
        valueFormatter: (params) =>
            params.value ? dayjs(params.value).format('DD/MM/YYYY HH:mm') : '',
    },
    {
        field: 'date_mre_request',
        headerName: 'MRE',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 120,
        valueFormatter: (params) =>
            params.value ? dayjs(params.value).format('DD/MM/YYYY HH:mm') : '',
    },
    {
        field: 'date_audit_request',
        headerName: 'Audit',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 120,
        valueFormatter: (params) =>
            params.value ? dayjs(params.value).format('DD/MM/YYYY HH:mm') : '',
    },
]

function OpenDialog({ data, header }) {
    const dispatch = useDispatch()
    const stock = useSelector(selectStock)
    const [dataNull, setDataNull] = useState(true)
    const user = useSelector(selectUser)
    const [tabValue, setTabValue] = useState('1')
    const [hidSparepart, setHidSparepart] = useState(false)
    const [tableRequest, setTableRequest] = useState([])
    const [disAuditReq, setDisAuditReq] = useState(true)
    const [disRep, setDisRep] = useState(true)
    const [disWa, setDisWa] = useState(true)
    const [open, setOpen] = useState(false)
    const [selectWa, setSelectWa] = useState(null)
    const [errTargetRequest, setErrTargetRequest] = useState('')

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })

    const {
        reset,
        watch,
        control,
        onChange,
        formState,
        setValue,
        getValues,
        getFieldState,
    } = methods

    const { errors, isValid } = formState

    useEffect(() => {
        const ap_sheet = data?.selectData

        if (!data) {
            return
        } else {
            const uuid = data.selectData.mch_index.uuid
            dispatch(getMnOne(uuid)).then((action) => {
                dispatch(getMachineStock())
                if (!action.payload) {
                    setDataNull(true)
                }
                if (action.payload) {
                    const report = _.find(action.payload.report, {
                        sheet_no: data?.selectData.sheet_no,
                    })
                    _.isUndefined(report) == false &&
                        _.map(_.keys(report), (val) => {
                            if (_.isNull(report[val]) == false) {
                                if (
                                    val == 'date_report' ||
                                    val == 'date_target' ||
                                    val == 'date_finish' ||
                                    val == 'createdAt' ||
                                    val == 'updatedAt'
                                ) {
                                    if (_.isNull(report[val])) {
                                        setValue(val, dayjs(), {
                                            shouldDirty: true,
                                        })
                                    } else {
                                        setValue(val, dayjs(report[val]), {
                                            shouldDirty: true,
                                        })
                                    }
                                } else {
                                    setValue(val, report[val], {
                                        shouldDirty: true,
                                    })
                                }
                            }
                        })
                    const request = _.filter(action.payload.request, {
                        sheet_no: data?.selectData.sheet_no,
                    })
                    setTableRequest(request)
                    setDataNull(false)
                }
            })
        }

        reset({ ...ap_sheet })
    }, [data, reset])

    const [
        item_stock,
        category_request,
        audit_request,
        item_ready,
        mre_request,
    ] = watch([
        'item_stock',
        'category_request',
        'audit_request',
        'item_ready',
        'mre_request',
    ])

    useEffect(() => {
        item_stock === '#0 ADD NEW ITEM' || _.isUndefined(item_stock)
            ? setHidSparepart(false)
            : setHidSparepart(true)

        audit_request === 'Y'
            ? setTimeout(() => {
                  setValue('user_req2', user.data.displayName)
                  setValue(
                      'date_audit_request',
                      dayjs().format('YYYY-MM-DD HH:mm:ss')
                  )
              }, 500)
            : setTimeout(() => {
                  setValue('user_req2', '')
              }, 500)

        item_ready === 'Y'
            ? setTimeout(() => {
                  setValue(
                      'date_ready_request',
                      dayjs().format('YYYY-MM-DD HH:mm:ss')
                  )
                  //   console.log(watch('date_ready_request'))
                  setDisAuditReq(false)
              }, 500)
            : setDisAuditReq(true)

        mre_request && mre_request.length > 3
            ? setTimeout(() => {
                  setValue(
                      'date_mre_request',
                      dayjs().format('YYYY-MM-DD HH:mm:ss')
                  )
              }, 500)
            : ''
    }, [
        item_stock,
        hidSparepart,
        category_request,
        audit_request,
        item_ready,
        mre_request,
    ])

    function handleTabChange(ev, val) {
        setTabValue(val)
        if (val == 1) {
            header('Info Mesin')
        } else if (val == 2) {
            header('Maintenance Work Order FO-03-04-01')
        } else if (val == 3) {
            header('Laporan Maintenance FO-03-03-07')
        } else if (val == 4) {
            header('Penanganan Spare Part Maintenance IK-03-03-11')
        } else if (val == 5) {
            header('Penanganan Spare Part Maintenance IK-03-03-11')
        }
    }

    useEffect(() => {
        if (tableRequest.length > 0) {
            const isAudit = _.every(tableRequest, ['audit_request', 'N'])

            setDisRep(isAudit)
            setDisWa(false)
        } else {
            setDisRep(false)
            setDisWa(true)
        }
    }, [tableRequest])

    function handleSaveReport() {
        dispatch(saveMnOne(getValues()))
            .then((action) => {
                if (action.payload) {
                    const uuid = data?.selectData.mch_index.uuid
                    dispatch(getMnOne(uuid)).then((action) => {
                        dispatch(getMachineStock())

                        if (action.payload) {
                            const report = _.find(action.payload.report, {
                                sheet_no: data?.selectData.sheet_no,
                            })
                            _.isUndefined(report) == false &&
                                _.map(_.keys(report), (val) => {
                                    if (_.isNull(report[val]) == false) {
                                        if (
                                            val == 'date_report' ||
                                            val == 'date_target' ||
                                            val == 'date_finish' ||
                                            val == 'createdAt' ||
                                            val == 'updatedAt'
                                        ) {
                                            if (_.isNull(report[val])) {
                                                setValue(val, dayjs(), {
                                                    shouldDirty: true,
                                                })
                                            } else {
                                                setValue(
                                                    val,
                                                    dayjs(report[val]),
                                                    {
                                                        shouldDirty: true,
                                                    }
                                                )
                                            }
                                        } else {
                                            setValue(val, report[val], {
                                                shouldDirty: true,
                                            })
                                        }
                                    }
                                })

                            const request = _.filter(action.payload.request, {
                                sheet_no: data?.selectData.sheet_no,
                            })
                            setTableRequest(request)
                        }
                    })
                    dispatch(getApSlice())
                    dispatch(getMnRepSlice())
                    dispatch(
                        showMessage({
                            message: 'Data has been saved successfully',
                            variant: 'success',
                        })
                    )
                }
            })
            .catch((e) => {
                dispatch(
                    showMessage({
                        message: `${e.message}`,
                        variant: 'error',
                    })
                )
            })
    }

    function handleSaveRequest(isWhatsappCode) {
        dispatch(saveMnOneRequest(getValues()))
            .then((action) => {
                if (action.payload) {
                    const uuid = data?.selectData.mch_index.uuid
                    dispatch(getMnOne(uuid)).then((action) => {
                        dispatch(getMachineStock())

                        if (action.payload) {
                            const report = _.find(action.payload.report, {
                                sheet_no: data?.selectData.sheet_no,
                            })
                            _.isUndefined(report) == false &&
                                _.map(_.keys(report), (val) => {
                                    if (_.isNull(report[val]) == false) {
                                        if (
                                            val == 'date_report' ||
                                            val == 'date_target' ||
                                            val == 'date_finish' ||
                                            val == 'createdAt' ||
                                            val == 'updatedAt'
                                        ) {
                                            if (_.isNull(report[val])) {
                                                setValue(val, dayjs(), {
                                                    shouldDirty: true,
                                                })
                                            } else {
                                                setValue(
                                                    val,
                                                    dayjs(report[val]),
                                                    {
                                                        shouldDirty: true,
                                                    }
                                                )
                                            }
                                        } else {
                                            setValue(val, report[val], {
                                                shouldDirty: true,
                                            })
                                        }
                                    }
                                })

                            const request = _.filter(action.payload.request, {
                                sheet_no: data?.selectData.sheet_no,
                            })
                            setTableRequest(request)
                        }
                    })
                    dispatch(getApSlice())
                    dispatch(getMnReqSlice())
                    dispatch(
                        showMessage({
                            message: 'Data has been saved successfully',
                            variant: 'success',
                        })
                    )
                    handleClose()
                }
            })
            .catch((e) => {
                dispatch(
                    showMessage({
                        message: `${e.message}`,
                        variant: 'error',
                    })
                )
            })
    }

    function handleOpenWa() {
        setOpen(true)
    }

    function handleSendWa() {
        console.log(selectWa)
        if (!_.isNull(selectWa) && selectWa.length > 0) {
            let msg = `*Permintaan Sparepart*`
            msg += `\n\n${selectWa[0].sheet_no} |  ${selectWa[0].category_request}`
            msg += `\n${selectWa[0].mch_code} | ${
                selectWa[0].user_req1
            } | ${dayjs(selectWa[0].createdAt).format('DD/MM/YYYY HH:mm:ss')} `
            msg += `\n\nList permintaan:`
            _.forEach(selectWa, (entry, idx) => {
                msg += `\n*${idx + 1}.)* *${
                    _.isNull(entry.item_stock) == false
                        ? entry.item_stock
                        : entry.name
                }* | ${entry.item_qty} ${entry.item_uom} | ${
                    entry.item_ready == 'Y' ? '✅' : '❌'
                } `

                if (entry.audit_request == 'N') {
                    if (
                        _.isNull(entry.mre_request) == false &&
                        entry.mre_request.length > 3
                    ) {
                        msg += `\n↑ Sudah terbit MRE, _*${entry.mre_request}*_`
                        msg += `\n${dayjs(entry.date_mre_request).format(
                            'DD/MM/YY HH:mm:ss\n'
                        )}`
                    }
                    if (entry.item_ready == 'Y') {
                        msg += `\n ↑ Sudah digudang, silahkan diambil`
                        msg += `\n${dayjs(entry.ready_request).format(
                            'DD/MM/YY HH:mm:ss\n'
                        )}`
                    }
                } else {
                    msg += `\n ↑ Sudah audit, by ${entry.user_req2}`
                    msg += `\n${dayjs(entry.date_audit_request).format(
                        'DD/MM/YY HH:mm:ss\n'
                    )}`
                }
            })

            if (
                selectWa[0].mch_com == 'GM1' ||
                selectWa[0].mch_com == 'GM3' ||
                selectWa[0].mch_com == 'GM5'
            ) {
                axios
                    .post('http://192.168.192.7:5010/send-message-group', {
                        name: 'PENANGANAN SPAREPART GM1 IK-03-03-01',
                        // number: '082124610363',
                        message: msg,
                    })
                    .then(() =>
                        dispatch(
                            showMessage({
                                message: 'Sended wa successfully',
                                variant: 'success',
                            })
                        )
                    )
                    .catch((e) => {
                        // console.log(e)
                        dispatch(
                            showMessage({
                                message: `${e.message}`,
                                variant: 'error',
                            })
                        )
                    })
            } else if (selectWa[0].mch_com == 'GM2') {
                axios
                    .post('http://192.168.192.7:5010/send-message-group', {
                        name: 'PENANGANAN SPAREPART GM2 IK-03-03-01',
                        // number: '082124610363',
                        message: msg,
                    })
                    .then(() =>
                        dispatch(
                            showMessage({
                                message: 'Sended wa successfully',
                                variant: 'success',
                            })
                        )
                    )
                    .catch((e) => {
                        // console.log(e)
                        dispatch(
                            showMessage({
                                message: `${e.message}`,
                                variant: 'error',
                            })
                        )
                    })
            }
        } else {
            dispatch(
                showMessage({
                    message: `Please select data to be sent to WA!`,
                    variant: 'warning',
                })
            )
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const tableIndex = (data) => {
        // console.log(data)
        if (_.has(data, 'multi')) {
            console.log(data.multi)
            setSelectWa(data.multi)
        } else {
            _.map(_.keys(data.row), (val) => {
                if (_.isNull(data.row[val]) == false) {
                    if (
                        val == 'date_data.row' ||
                        val == 'date_target' ||
                        val == 'date_finish' ||
                        val == 'createdAt' ||
                        val == 'updatedAt' ||
                        val == 'date_request' ||
                        val == 'date_audit_request' ||
                        val == 'date_ready_request' ||
                        val == 'date_mre_request'
                    ) {
                        setValue(val, dayjs(data.row[val]), {
                            shouldDirty: true,
                        })
                    } else {
                        setValue(val, data.row[val], {
                            shouldDirty: true,
                        })
                    }
                } else {
                    if (val == 'date_request') {
                        setErrTargetRequest('target not found in database!')
                    }
                }
            })
        }
    }

    if (dataNull) {
        return <FuseLoading />
    }

    return (
        <FormProvider {...methods}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleTabChange}
                        aria-label="lab API tabs example"
                    >
                        <Tab label="Machine" value="1" />
                        <Tab label="AP-Sheet" value="2" />
                        <Tab label="AP-Report" value="3" />
                        <Tab label="AP-Request" value="4" />
                        <Tab label="List AP-Request" value="5" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div style={{ width: 900, height: 450 }}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Controller
                                        name="mch_index.mch_code"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Machine code"
                                                id="mch_code"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="mch_index.mch_name"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors.mch_name}
                                                helperText={
                                                    errors?.mch_name?.message
                                                }
                                                label="Machine name"
                                                id="mch_name"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="mch_index.mch_com"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Machine com"
                                                id="mch_com"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Controller
                                        name="mch_index.mch_process"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Machine process code"
                                                id="mch_process"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="mch_index.mch_process_type"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Machine process"
                                                id="mch_process_type"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="mch_index.mch_hp"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Machine Power HP"
                                                id="mch_hp"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Controller
                                        name="mch_index.mch_prod"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Machine production"
                                                id="mch_prod"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </TabPanel>

                <TabPanel value="2">
                    <div style={{ width: 900, height: 450 }}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Controller
                                        name="sheet_no"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Sheet no"
                                                id="sheet_no"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="s_memo"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Problem"
                                                id="s_memo"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={6}
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="memo"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Remarks"
                                                id="memo"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                                multiline
                                                rows={6}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="s_ymd"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                value={dayjs(
                                                    field.value
                                                ).format('DD/MM/YYYY HH:mm')}
                                                label="Stoptime"
                                                id="s_ymd"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="ymd"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Date"
                                                id="ymd"
                                                value={dayjs(
                                                    field.value
                                                ).format('DD/MM/YYYY HH:mm')}
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="modi_user"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="User"
                                                id="modi_user"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="chk_mark"
                                        defaultValue="N"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Audit"
                                                select
                                                autoFocus
                                                id="chk_mark"
                                                fullWidth
                                                disabled
                                            >
                                                <MenuItem value="Y">
                                                    Audit
                                                </MenuItem>
                                                <MenuItem value="N">
                                                    n.audit
                                                </MenuItem>
                                                <MenuItem value="C">
                                                    Cancel
                                                </MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="pri_no"
                                        defaultValue="N"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Prino"
                                                select
                                                autoFocus
                                                id="pri_no"
                                                fullWidth
                                                disabled
                                            >
                                                <MenuItem value="01">
                                                    Breakdown
                                                </MenuItem>
                                                <MenuItem value="02">
                                                    Still Run
                                                </MenuItem>
                                                <MenuItem value="03">
                                                    Preventive
                                                </MenuItem>
                                                <MenuItem value="04">
                                                    Workshop Stil Run
                                                </MenuItem>
                                                <MenuItem value="05">
                                                    Workshop Breakdown
                                                </MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </TabPanel>

                <TabPanel value="3">
                    <div style={{ width: 900, height: 450 }}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Controller
                                        name="id_report"
                                        control={control}
                                        defaultValue={data?.selectData.sheet_no}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Ap-Sheet"
                                                id="id_report"
                                                variant="outlined"
                                                fullWidth
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="date_report"
                                        control={control}
                                        defaultValue={dayjs(
                                            data?.selectData.ymd
                                        )}
                                        // defaultValue={dayjs()}
                                        render={({ field }) => (
                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <DateTimePicker
                                                    {...field}
                                                    ampm={false}
                                                    className="mt-8 mb-16"
                                                    id="date_report"
                                                    label="Start"
                                                    sx={{
                                                        width: '100%',
                                                    }}
                                                    slotProps={{
                                                        popper: {
                                                            disablePortal: true,
                                                        },
                                                    }}
                                                    readOnly
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="date_target"
                                        control={control}
                                        defaultValue={dayjs()}
                                        render={({ field }) => (
                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <DateTimePicker
                                                    {...field}
                                                    ampm={false}
                                                    className="mt-8 mb-16"
                                                    id="date_target"
                                                    label="Target"
                                                    sx={{
                                                        width: '100%',
                                                    }}
                                                    slotProps={{
                                                        popper: {
                                                            disablePortal: true,
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Controller
                                        name="mch_code"
                                        defaultValue={
                                            data?.selectData.mch_index.mch_code
                                        }
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Machine code"
                                                id="mch_code"
                                                variant="outlined"
                                                fullWidth
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Controller
                                        name="mch_com"
                                        defaultValue={
                                            data?.selectData.mch_index.mch_com
                                        }
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Machine com"
                                                id="mch_com"
                                                variant="outlined"
                                                fullWidth
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Controller
                                        name="chronological"
                                        defaultValue={data?.selectData.memo}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors.chronological}
                                                helperText={
                                                    errors?.chronological
                                                        ?.message
                                                }
                                                label="Chronological"
                                                id="chronological"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={6}
                                            />
                                        )}
                                    />
                                </Grid>
                                {(data?.selectData.pri_no == '01' ||
                                    data?.selectData.pri_no == '02' ||
                                    data?.selectData.pri_no == '03') && (
                                    <Grid item xs={3}>
                                        <Controller
                                            name="analyzed"
                                            defaultValue=""
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    className="mt-8 mb-16"
                                                    error={!!errors.analyzed}
                                                    helperText={
                                                        errors?.analyzed
                                                            ?.message
                                                    }
                                                    label="Analyze"
                                                    id="analyzed"
                                                    variant="outlined"
                                                    fullWidth
                                                    multiline
                                                    rows={6}
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={3}>
                                    <Controller
                                        name="corrective"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors.corrective}
                                                helperText={
                                                    errors?.corrective?.message
                                                }
                                                label="Corrective"
                                                id="corrective"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={6}
                                            />
                                        )}
                                    />
                                </Grid>
                                {(data?.selectData.pri_no == '01' ||
                                    data?.selectData.pri_no == '02' ||
                                    data?.selectData.pri_no == '03') && (
                                    <Grid item xs={3}>
                                        <Controller
                                            name="prevention"
                                            defaultValue=""
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    className="mt-8 mb-16"
                                                    error={!!errors.prevention}
                                                    helperText={
                                                        errors?.prevention
                                                            ?.message
                                                    }
                                                    label="Prevention"
                                                    id="prevention"
                                                    variant="outlined"
                                                    fullWidth
                                                    multiline
                                                    rows={6}
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Controller
                                        name="user_rep1"
                                        defaultValue={user.data.displayName}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors.user_rep1}
                                                required
                                                helperText={
                                                    errors?.user_rep1?.message
                                                }
                                                label="Leader"
                                                autoFocus
                                                id="user_rep1"
                                                variant="outlined"
                                                fullWidth
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Controller
                                        name="user_rep2"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors.user_rep2}
                                                required
                                                helperText={
                                                    errors?.user_rep2?.message
                                                }
                                                label="Technician"
                                                autoFocus
                                                id="user_rep2"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Controller
                                        name="kind"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="kind"
                                                className="mt-8 mb-16"
                                                label="Kind"
                                                select
                                                autoFocus
                                                fullWidth
                                            >
                                                <MenuItem value="Electrical">
                                                    Electrical
                                                </MenuItem>
                                                <MenuItem value="Mechanical">
                                                    Mechanical
                                                </MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Controller
                                        name="audit_report"
                                        defaultValue="N"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Audit Report"
                                                select
                                                autoFocus
                                                id="audit_report"
                                                fullWidth
                                            >
                                                <MenuItem
                                                    value="Y"
                                                    disabled={
                                                        disRep == true ||
                                                        data?.selectData
                                                            .chk_mark == 'N'
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    Audit
                                                </MenuItem>
                                                <MenuItem value="N">
                                                    n.audit
                                                </MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    {data?.selectData.chk_mark == 'Y' ? (
                                        <Controller
                                            name="date_finish"
                                            control={control}
                                            // defaultValue={null}
                                            defaultValue={dayjs(
                                                data?.selectData.chk_date
                                            )}
                                            render={({ field }) => (
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                >
                                                    <DateTimePicker
                                                        {...field}
                                                        ampm={false}
                                                        className="mt-8 mb-16"
                                                        id="date_finish"
                                                        label="Finish"
                                                        sx={{
                                                            width: '100%',
                                                        }}
                                                        slotProps={{
                                                            popper: {
                                                                disablePortal: true,
                                                            },
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        />
                                    ) : (
                                        <Typography style={{ color: 'red' }}>
                                            unaudit ERP
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    className="whitespace-nowrap mb-16"
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleSaveReport}
                                >
                                    Save
                                </Button>
                                {disRep && (
                                    <Typography style={{ color: 'red' }}>
                                        Require Audit AP-Request!
                                    </Typography>
                                )}
                            </Grid>
                        </Box>
                    </div>
                </TabPanel>

                <TabPanel value="4">
                    <div style={{ width: 900, height: 450 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Controller
                                    name="id_request"
                                    control={control}
                                    defaultValue={data?.selectData.sheet_no}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            required
                                            label="Ap-Sheet"
                                            autoFocus
                                            id="id_request"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Controller
                                    name="category_request"
                                    defaultValue={
                                        data?.selectData.pri_no == '01'
                                            ? 'Breakdown'
                                            : data?.selectData.pri_no == '02'
                                            ? 'Still Run'
                                            : data?.selectData.pri_no == '03'
                                            ? 'Preventive'
                                            : data?.selectData.pri_no == '04'
                                            ? 'Workshop Still Run'
                                            : data?.selectData.pri_no == '05'
                                            ? 'Workshop Breakdown'
                                            : ''
                                    }
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            required
                                            label="Category"
                                            autoFocus
                                            id="category_request"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Controller
                                    name="date_request"
                                    control={control}
                                    defaultValue={dayjs()}
                                    render={({ field }) => (
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DateTimePicker
                                                {...field}
                                                ampm={false}
                                                className="mt-8 mb-16"
                                                id="date_request"
                                                label="Target"
                                                sx={{
                                                    width: '100%',
                                                }}
                                                slotProps={{
                                                    popper: {
                                                        disablePortal: true,
                                                    },
                                                    textField: {
                                                        helperText:
                                                            errTargetRequest,
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Controller
                                    name="mch_code"
                                    defaultValue={
                                        data?.selectData.mch_index.mch_code
                                    }
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            required
                                            label="Machine code"
                                            autoFocus
                                            id="mch_code"
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Controller
                                    name="mch_com"
                                    defaultValue={
                                        data?.selectData.mch_index.mch_com
                                    }
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            required
                                            label="Machine com"
                                            autoFocus
                                            id="mch_com"
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="item_stock"
                                    defaultValue="#0 ADD NEW ITEM"
                                    control={control}
                                    render={({ field }) => (
                                        <VirtualizedData
                                            field={field}
                                            data={stock}
                                        />
                                    )}
                                />
                            </Grid>
                            {!hidSparepart && (
                                <Grid item xs={12}>
                                    <Controller
                                        name="new_sparepart"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                required
                                                label="New Sparepart"
                                                autoFocus
                                                id="new_sparepart"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                            )}
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Controller
                                    name="item_name"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            error={!!errors.item_name}
                                            required
                                            helperText={
                                                errors?.item_name?.message
                                            }
                                            label="Remarks"
                                            autoFocus
                                            id="item_name"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={6}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Controller
                                    name="item_qty"
                                    defaultValue={1}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            error={!!errors.item_qty}
                                            required
                                            helperText={
                                                errors?.item_qty?.message
                                            }
                                            label="Qty"
                                            autoFocus
                                            id="item_qty"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Controller
                                    name="item_uom"
                                    defaultValue="PCS"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            error={!!errors.item_uom}
                                            required
                                            helperText={
                                                errors?.item_uom?.message
                                            }
                                            label="Uom"
                                            autoFocus
                                            id="item_uom"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Controller
                                    name="user_req1"
                                    defaultValue={user.data.displayName}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            error={!!errors.user_req1}
                                            required
                                            helperText={
                                                errors?.user_req1?.message
                                            }
                                            label="User"
                                            autoFocus
                                            id="user_req1"
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Controller
                                    name="audit_request"
                                    defaultValue="N"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="Audit"
                                            select
                                            autoFocus
                                            id="audit_request"
                                            fullWidth
                                            // disabled={disAuditReq}
                                            // InputProps={{
                                            //     readOnly: { disAuditReq },
                                            // }}
                                        >
                                            <MenuItem
                                                value="Y"
                                                disabled={disAuditReq}
                                            >
                                                Audit
                                            </MenuItem>

                                            <MenuItem value="C">
                                                Cancel
                                            </MenuItem>
                                            <MenuItem value="N">
                                                n.audit
                                            </MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Controller
                                    name="mre_request"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            error={!!errors.mre_request}
                                            required
                                            helperText={
                                                errors?.mre_request?.message
                                            }
                                            label="MRE"
                                            autoFocus
                                            id="mre_request"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Controller
                                    name="item_ready"
                                    defaultValue="N"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="Item Ready"
                                            select
                                            autoFocus
                                            id="item_ready"
                                            fullWidth
                                        >
                                            <MenuItem value="Y">Ready</MenuItem>
                                            <MenuItem value="N">
                                                Not Yet
                                            </MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <Controller
                                    name="user_req2"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            error={!!errors.mre_request}
                                            required
                                            helperText={
                                                errors?.mre_request?.message
                                            }
                                            label="Auditor"
                                            autoFocus
                                            id="user_req2"
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Button
                                    className="whitespace-nowrap mb-16"
                                    variant="contained"
                                    color="secondary"
                                    // disabled={valid()
                                    onClick={handleOpenWa}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </TabPanel>

                <TabPanel value="5">
                    <div style={{ width: 900, height: 450 }}>
                        <div style={{ width: '100%', height: '100%' }}>
                            <TableIndex
                                params={{
                                    row: tableRequest,
                                    columns: columnsRequest,
                                    // id: tableRequest?.uuid_request,
                                }}
                                tableIndex={tableIndex}
                            />
                        </div>
                        <div>
                            <Button
                                className="whitespace-nowrap mb-16"
                                variant="contained"
                                color="secondary"
                                disabled={disWa}
                                onClick={handleSendWa}
                            >
                                Send WA Selection
                            </Button>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Typography>Apakah data sudah benar?</Typography>
                    <DialogActions>
                        <Button onClick={() => handleSaveRequest('01')}>
                            Yes
                        </Button>
                        <Button onClick={handleClose}>No</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </FormProvider>
    )
}

export default OpenDialog
