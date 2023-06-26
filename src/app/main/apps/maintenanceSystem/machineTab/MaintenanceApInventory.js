import React from 'react'
import { TextField, Button, Grid, Box } from '@mui/material'
import { Controller, useFormContext, useFieldArray } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { format } from 'date-fns'
import TableIndex from './TableIndex'
import { showMessage } from 'app/store/fuse/messageSlice'
import {
    getMaintenanceSystem,
    saveMaintenanceSystemRequest,
} from '../store/machineChildren/machineChildrenSlice'

function MaintenanceApReport() {
    const dispatch = useDispatch()
    const methods = useFormContext()
    const { control, formState, watch, getValues, getFieldState } = methods
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
            headerName: 'Date',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueFormatter: (params) =>
                format(new Date(params.value), 'dd/MM/yy HH:mm'),
        },
        {
            field: 'item_name',
            headerName: 'Item sparepart',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'item_qty',
            headerName: 'Qty',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'item_uom',
            headerName: 'Uom',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
    ]

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
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateTimePicker
                                        {...field}
                                        className="mt-8 mb-16"
                                        id="date_request"
                                        required
                                        label="On Change"
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
                    <Grid item xs={4}>
                        <Controller
                            name="item_name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.item_name}
                                    required
                                    helperText={errors?.item_name?.message}
                                    label="Item name"
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
                    <Grid item xs={3}>
                        <Controller
                            name="item_qty"
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
                    <Grid item xs={3}>
                        <Controller
                            name="item_uom"
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
                <TableIndex params={{ row: fields, columns: columns }} />
            </Box>
        </div>
    )
}

export default MaintenanceApReport
