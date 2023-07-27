import React from 'react'
import { TextField, Button, Grid, Box, MenuItem } from '@mui/material'
import {
    Controller,
    useFormContext,
    useFieldArray,
    useWatch,
} from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import TableIndex from './TableIndex'
import { showMessage } from 'app/store/fuse/messageSlice'
import {
    getMaintenanceSystem,
    saveMaintenanceSystemRequest,
} from '../store/machineChildren/machineChildrenSlice'
import { selectUser } from 'app/store/userSlice'
import {
    getMachineStock,
    selectStock,
} from '../store/machineChildren/machineStock'
import VirtualizedData from './utils/VirtualizedData'
import StatusColor from './utils/StatusColor'
import axios from 'axios'
import _ from 'lodash'
import categoriesSlice from '../../modbusApp/store/categoriesSlice'

const sendMsg = async (params) => {
    await axios({
        method: 'post',
        url: 'http://192.168.192.7:5010/send-message',
        data: {
            number: params.number,
            message: params.msg,
        },
    })
}

const columns = [
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
        field: 'date_request',
        headerName: 'Target',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 120,
        valueFormatter: (params) =>
            dayjs(params.value).format('DD/MM/YY HH:mm'),
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
        field: 'item_stock',
        headerName: 'Sparepart',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'item_name',
        headerName: 'Remarks',
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
]

function MaintenanceApReport({ data }) {
    const dispatch = useDispatch()
    const methods = useFormContext()
    const user = useSelector(selectUser)
    const stock = useSelector(selectStock)
    const [hidSparepart, setHidSparepart] = useState(false)
    const { control, formState, setValue, watch, getValues, getFieldState } =
        methods
    const { errors } = formState
    const { fields: request } = useFieldArray({
        name: 'request',
        control,
    })

    console.log(typeof request)
    console.log(request)

    const { fields: userMn } = useFieldArray({
        name: 'user',
        control,
    })

    function handleSave() {
        dispatch(saveMaintenanceSystemRequest(getValues())).then((action) => {
            if (action.payload) {
                dispatch(getMaintenanceSystem(action.payload.uuid))
                dispatch(getMachineStock())
                dispatch(
                    showMessage({ message: 'Data has been saved successfully' })
                )
            }
        })
    }

    const tableIndex = (data) => {
        // console.log(data)
        setValue('id_request', data.row.sheet_no, { shouldDirty: true })
        setValue('date_request', dayjs(data.row.date_request), {
            shouldDirty: true,
        })
        setValue('uuid_request', data.row.uuid_request)
        setValue('item_name', data.row.item_name, { shouldDirty: true })
        setValue('item_qty', data.row.item_qty, { shouldDirty: true })
        setValue('item_uom', data.row.item_uom, { shouldDirty: true })
        setValue('audit_request', data.row.audit_request, { shouldDirty: true })
        setValue('item_stock', data.row.item_stock, { shouldDirty: true })
        setValue('mre_request', data.row.mre_request, { shouldDirty: true })
        setValue('user_req1', data.row.user_req1, { shouldDirty: true })
        setValue('item_ready', data.row.item_ready, { shouldDirty: true })
        setValue('category_request', data.row.category_request, {
            shouldDirty: true,
        })
    }

    function valid() {
        if (
            getFieldState('id_request').isDirty &&
            !getFieldState('id_request').invalid &&
            getFieldState('item_qty').isDirty &&
            !getFieldState('item_qty').invalid &&
            getFieldState('item_uom').isDirty &&
            !getFieldState('item_uom').invalid
        ) {
            return false
        }
        return true
    }

    const [audit_request, item_stock, category_request] = useWatch({
        name: ['audit_request', 'item_stock', 'category_request'],
        defaultValue: { audit_request: 'N', item_stock: '#0 ADD NEW ITEM' },
    })
    useEffect(() => {
        audit_request === 'Y'
            ? setTimeout(() => {
                  setValue('user_req2', user.data.displayName)
              }, 500)
            : setTimeout(() => {
                  setValue('user_req2', '')
              }, 500)

        item_stock === '#0 ADD NEW ITEM' || _.isUndefined(item_stock)
            ? setHidSparepart(false)
            : setHidSparepart(true)

        if (category_request === 'Emergency') {
            setTimeout(() => {
                setValue('date_request', dayjs().add(10, 'h'))
            }, 500)
        } else if (category_request === 'Flash') {
            setTimeout(() => {
                setValue('date_request', dayjs().add(3, 'd'))
            }, 500)
        } else if (category_request === 'Express') {
            setTimeout(() => {
                setValue('date_request', dayjs().add(7, 'd'))
            }, 500)
        } else if (category_request === 'Reguler') {
            setTimeout(() => {
                setValue('date_request', dayjs().add(14, 'd'))
            }, 500)
        } else if (category_request === 'Indent') {
            setTimeout(() => {
                setValue('date_request', dayjs().add(1, 'M'))
            }, 500)
        }
    }, [audit_request, item_stock, hidSparepart, category_request])

    return (
        <div>
            <Box
                sx={{
                    width: '100%',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Controller
                            name="id_request"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.id_request}
                                    required
                                    helperText={errors?.id_request?.message}
                                    label="Ap-Sheet"
                                    autoFocus
                                    id="id_request"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controller
                            name="category_request"
                            defaultValue="Reguler"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    required
                                    label="Target"
                                    select
                                    autoFocus
                                    id="category_request"
                                    fullWidth
                                >
                                    <MenuItem value="Emergency">
                                        Emergency(1 Day)
                                    </MenuItem>
                                    <MenuItem value="Flash">
                                        Flash(3 Day)
                                    </MenuItem>
                                    <MenuItem value="Express">
                                        Express(7 Day)
                                    </MenuItem>
                                    <MenuItem value="Reguler">
                                        Reguler(14 Day)
                                    </MenuItem>
                                    <MenuItem value="Indent">
                                        Indent(30 Day)
                                    </MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Controller
                            name="mch_code"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.mch_code}
                                    required
                                    helperText={errors?.mch_code?.message}
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
                    <Grid item xs={3}>
                        <Controller
                            name="mch_com"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.mch_com}
                                    required
                                    helperText={errors?.mch_com?.message}
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
                                <VirtualizedData field={field} data={stock} />
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
                                        error={!!errors.id_request}
                                        required
                                        helperText={errors?.id_request?.message}
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
                                    helperText={errors?.item_name?.message}
                                    label="Remarks"
                                    autoFocus
                                    id="item_name"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Controller
                            name="item_qty"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.item_qty}
                                    required
                                    helperText={errors?.item_qty?.message}
                                    label="Item qty"
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
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.item_uom}
                                    required
                                    helperText={errors?.item_uom?.message}
                                    label="Item uom"
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
                                    helperText={errors?.user_req1?.message}
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
                                >
                                    <MenuItem value="Y">Audit</MenuItem>
                                    <MenuItem value="C">Cancel</MenuItem>
                                    <MenuItem value="N">n.audit</MenuItem>
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
                                    helperText={errors?.mre_request?.message}
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
                                    <MenuItem value="N">Not Yet</MenuItem>
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
                                    helperText={errors?.mre_request?.message}
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
                            disabled={valid()}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    height: 400,
                }}
            >
                <TableIndex
                    params={{
                        row: request,
                        columns: columns,
                        filter: data?.filter,
                    }}
                    tableIndex={tableIndex}
                />
            </Box>
        </div>
    )
}

export default MaintenanceApReport
