import React from 'react'
import { TextField, Button, Grid, Box, MenuItem } from '@mui/material'
import { Controller, useFormContext, useFieldArray } from 'react-hook-form'
import { useEffect } from 'react'
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
import { selectStock } from '../store/machineChildren/machineStock'
import VirtualizedData from './utils/VirtualizedData'
import StatusColor from './utils/StatusColor'

function MaintenanceApReport() {
    const dispatch = useDispatch()
    const methods = useFormContext()
    const user = useSelector(selectUser)
    const stock = useSelector(selectStock)
    const { control, formState, setValue, watch, getValues, getFieldState } =
        methods
    const { errors } = formState
    const { fields, remove, append } = useFieldArray({
        name: 'request',
        control,
    })

    function valid() {
        if (
            getFieldState('id_request').isDirty &&
            !getFieldState('id_request').invalid &&
            getFieldState('item_name').isDirty &&
            !getFieldState('item_name').invalid &&
            getFieldState('date_request').isDirty &&
            !getFieldState('date_request').invalid &&
            getFieldState('item_qty').isDirty &&
            !getFieldState('item_qty').invalid &&
            getFieldState('item_uom').isDirty &&
            !getFieldState('item_uom').invalid
        ) {
            return false
        }

        return true
    }

    function handleSave() {
        dispatch(saveMaintenanceSystemRequest(getValues())).then((action) => {
            if (action.payload) {
                dispatch(getMaintenanceSystem(action.payload.uuid))
                dispatch(
                    showMessage({ message: 'Data has been saved successfully' })
                )
            }
        })
    }

    const isAdmin = user.role == 'admin' ? true : false

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

    const tableIndex = (data) => {
        // console.log(data)
        setValue('id_request', data.row.sheet_no, { shouldDirty: true })
        setValue('date_request', dayjs(data.row.date_request), {
            shouldDirty: true,
        })
        setValue('item_name', data.row.item_name, { shouldDirty: true })
        setValue('item_qty', data.row.item_qty, { shouldDirty: true })
        setValue('item_uom', data.row.item_uom, { shouldDirty: true })
    }

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
                            name="date_request"
                            control={control}
                            defaultValue={dayjs()}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateTimePicker
                                        {...field}
                                        className="mt-8 mb-16"
                                        id="date_request"
                                        required
                                        label="Target"
                                        sx={{ width: '100%' }}
                                        minDate={dayjs()}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controller
                            name="mch_code"
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
                            defaultValue="Other"
                            control={control}
                            render={({ field }) => (
                                <VirtualizedData field={field} data={stock} />
                            )}
                        />
                    </Grid>
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
                {isAdmin && (
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
                                        <MenuItem value="N">n.audit</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>
                    </Grid>
                )}

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
                    params={{ row: fields, columns: columns }}
                    tableIndex={tableIndex}
                />
            </Box>
        </div>
    )
}

export default MaintenanceApReport
