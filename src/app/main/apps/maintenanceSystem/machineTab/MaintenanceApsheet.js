import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, forwardRef } from 'react'
import TableIndex from './TableIndex'
import {
    Typography,
    Button,
    AppBar,
    Toolbar,
    Slide,
    Dialog,
} from '@mui/material'
import _ from 'lodash'
import StatusColor from './utils/StatusColor'
import {
    getMachines,
    selectMachines,
} from '../store/machineParent/machinesSlice'
import { getMnOne } from 'src/app/main/dashboard/maintenanceSystem/store/mnOneSlice'
import OpenDialog from 'src/app/main/dashboard/maintenanceSystem/tabs/widget/OpenDialog'
import { showMessage } from 'app/store/fuse/messageSlice'
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function MaintenanceApsheet({ data }) {
    const methods = useFormContext()
    const dispatch = useDispatch()
    const machines = useSelector(selectMachines)
    const { control, watch } = methods
    const [open, setOpen] = useState(false)
    const [toolBarHeader, setToolBarHeader] = useState('Update')
    const [selectData, setSelectData] = useState(null)

    const { fields: sheet_no } = useFieldArray({
        name: 'mow',
        control,
    })

    const { fields: report } = useFieldArray({
        name: 'report',
        control,
    })

    useEffect(() => {
        dispatch(getMachines())
    }, [])

    const columns = [
        {
            field: 'sheet_no',
            headerName: 'AP-Sheet',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
        },
        {
            field: 'com_no',
            headerName: 'Com',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
        },
        {
            field: 'pri_no',
            headerName: 'Status',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            align: 'center',
            renderCell: (params) => <StatusColor id={params.value} />,
        },
        {
            field: 'chk_mark',
            headerName: 'Audit AP-Sheet',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            align: 'center',
            renderCell: (params) => <StatusColor id={params.value} />,
        },
        {
            field: 'report',
            headerName: 'Audit AP-Report',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            align: 'center',
            renderCell: (params) => {
                const res = _.find(report && report, {
                    sheet_no: params.row.sheet_no,
                })
                return _.isUndefined(res) ? (
                    <StatusColor id="R" />
                ) : _.isUndefined(res) == false && res.audit_report == 'N' ? (
                    <StatusColor id="N" />
                ) : (
                    <StatusColor id="Y" />
                )
            },
        },
        {
            field: 's_ymd',
            headerName: 'Stop',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
            valueFormatter: (params) =>
                dayjs(params.value).format('DD/MM/YYYY HH:mm'),
        },
        {
            field: 'm_ymd',
            headerName: 'Target',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
            renderCell: (params) => {
                const res = _.find(report && report, {
                    sheet_no: params.row.sheet_no,
                })
                return _.isUndefined(res) ? (
                    <StatusColor id="T" />
                ) : (
                    dayjs(res.date_target).format('DD/MM/YYYY HH:mm')
                )
            },
        },
        {
            field: 'memo',
            headerName: 'Problem',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 's_memo',
            headerName: 'Remarks',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
    ]

    const tableIndex = (data) => {
        if (_.has(data, 'multi')) {
            console.log('multi')
        } else {
            if (machines) {
                console.log(data.row)
                const mch_index = _.find(machines, {
                    mch_code: data.row.mch_no,
                    mch_com:
                        data.row.com_no == '01'
                            ? 'GM1'
                            : data.row.com_no == '02'
                            ? 'GM2'
                            : data.row.com_no == '03'
                            ? 'GM3'
                            : data.row.com_no == '05'
                            ? 'GM5'
                            : 'GM5',
                })
                if (mch_index) {
                    setOpen(true)
                    setSelectData({ ...data.row, mch_index: mch_index })
                } else {
                    dispatch(
                        showMessage({
                            message:
                                'Please check mch_no,mch_com with master data',
                            variant: 'warning',
                        })
                    )
                }

                console.log({ ...data.row, mch_index: mch_index })
            }
        }
    }

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false)
        }
    }

    const header = (data) => {
        setToolBarHeader(data)
    }

    return (
        <Box
            sx={{
                height: 600,
                width: '100%',
            }}
        >
            <TableIndex
                params={{
                    row: sheet_no,
                    columns: columns,
                    // id: sheet_no.sheet_no,
                    // filter: data?.filter,
                }}
                tableIndex={tableIndex}
            />
            <Dialog
                open={open}
                maxWidth={'xl'}
                style={{ zIndex: 1000 }}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            {toolBarHeader}
                        </Typography>

                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <OpenDialog data={{ selectData }} header={header} />
            </Dialog>
        </Box>
    )
}

export default MaintenanceApsheet
