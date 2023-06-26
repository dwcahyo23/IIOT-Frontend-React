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
    saveMaintenanceSystem,
} from '../store/machineChildren/machineChildrenSlice'

function MaintenanceApReport() {
    const dispatch = useDispatch()
    const methods = useFormContext()
    const { control, formState, watch, getValues, getFieldState, trigger } =
        methods
    const { errors, isValid } = formState

    const { fields, remove, append } = useFieldArray({
        name: 'report',
        control,
    })

    function valid() {
        if (
            getFieldState('id_report').isDirty &&
            !getFieldState('id_report').invalid &&
            getFieldState('date_report').isDirty &&
            !getFieldState('date_report').invalid &&
            getFieldState('chronological').isDirty &&
            !getFieldState('chronological').invalid &&
            getFieldState('corrective').isDirty &&
            !getFieldState('corrective').invalid &&
            getFieldState('prevention').isDirty &&
            !getFieldState('prevention').invalid
        ) {
            return false
        }

        return true
    }

    function handleSave() {
        dispatch(saveMaintenanceSystem(getValues())).then((action) => {
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
            field: 'date_report',
            headerName: 'Date',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueFormatter: (params) =>
                format(new Date(params.value), 'dd/MM/yy HH:mm'),
        },
        {
            field: 'chronological',
            headerName: 'Chronological',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'corrective',
            headerName: 'Corrective',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'prevention',
            headerName: 'Prevention',
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
                            name="id_report"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.id_report}
                                    required
                                    helperText={errors?.id_report?.message}
                                    label="Ap-Sheet"
                                    autoFocus
                                    id="id_report"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controller
                            name="date_report"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateTimePicker
                                        {...field}
                                        className="mt-8 mb-16"
                                        id="date_report"
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
                            name="chronological"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.chronological}
                                    required
                                    helperText={errors?.chronological?.message}
                                    label="Chronological"
                                    autoFocus
                                    id="chronological"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Controller
                            name="corrective"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.corrective}
                                    required
                                    helperText={errors?.corrective?.message}
                                    label="Corrective"
                                    autoFocus
                                    id="corrective"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Controller
                            name="prevention"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.prevention}
                                    required
                                    helperText={errors?.prevention?.message}
                                    label="Prevention"
                                    autoFocus
                                    id="prevention"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
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
                        row: fields,
                        columns: columns,
                        id: fields.sheet_no,
                    }}
                />
            </Box>
        </div>
    )
}

export default MaintenanceApReport
