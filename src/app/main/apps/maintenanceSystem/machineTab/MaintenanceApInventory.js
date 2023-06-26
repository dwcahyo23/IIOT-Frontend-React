import React from 'react'
import { TextField, MenuItem, Autocomplete, Grid, Box } from '@mui/material'
import { Controller, useFormContext, useFieldArray } from 'react-hook-form'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TableIndex from './TableIndex'

function MaintenanceApReport() {
    const methods = useFormContext()
    const { control, formState, watch } = methods
    const { errors } = formState
    const { fields, remove, append } = useFieldArray({
        name: 'request',
        control,
    })

    const columns = [
        {
            field: 'sheet_no',
            headerName: 'AP-Sheet',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
        },
        {
            field: 'mch_no',
            headerName: 'Machine',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
        },
        {
            field: 's_ymd',
            headerName: 'Stop',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
            valueFormatter: (params) =>
                new Date(Date.parse(params.value)).toLocaleDateString(),
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

    return (
        <Box
            sx={{
                width: '100%',
            }}
        >
            <Box>
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
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DateTimePicker
                                        {...field}
                                        className="mt-8 mb-16"
                                        id="date_request"
                                        error={!!errors.date_request}
                                        required
                                        helperText={
                                            errors?.date_request?.message
                                        }
                                        inputFormat="dd/MM/yyyy HH:mm"
                                        label="On Change"
                                        renderInput={(params) => (
                                            <TextField {...params} fullWidth />
                                        )}
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
                            name="qty"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.qty}
                                    required
                                    helperText={errors?.qty?.message}
                                    label="Item qty"
                                    autoFocus
                                    id="qty"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controller
                            name="uom"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.uom}
                                    required
                                    helperText={errors?.uom?.message}
                                    label="Item uom"
                                    autoFocus
                                    id="uom"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ height: 400 }}>
                <TableIndex params={{ row: fields, columns: columns }} />
            </Box>
        </Box>
    )
}

export default MaintenanceApReport
