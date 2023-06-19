import { TextField, MenuItem, Autocomplete, Grid, Box } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

function AddressModbusTab() {
    const methods = useFormContext()
    const { control, formState, watch } = methods
    const { errors } = formState

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Controller
                        name="ip_address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.ip_address}
                                required
                                helperText={errors?.ip_address?.message}
                                label="Ip address"
                                autoFocus
                                id="ip_address"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="port_address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.port_address}
                                required
                                helperText={errors?.port_address?.message}
                                label="Port address"
                                autoFocus
                                id="port_address"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="setTimeout_address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.setTimeout_address}
                                required
                                helperText={errors?.setTimeout_address?.message}
                                label="Set Timeout (ms)"
                                autoFocus
                                id="setTimeout_address"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Controller
                        name="setId_address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.setId_address}
                                required
                                helperText={errors?.setId_address?.message}
                                label="Set Client Modbus ID"
                                autoFocus
                                id="setId_address"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="address_register"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.address_register}
                                required
                                helperText={errors?.address_register?.message}
                                label="Address register"
                                autoFocus
                                id="address_register"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="quantity_register"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.quantity_register}
                                required
                                helperText={errors?.quantity_register?.message}
                                label="Quantity register"
                                autoFocus
                                id="quantity_register"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="data_register"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.data_register}
                                required
                                helperText={errors?.data_register?.message}
                                label="Data register"
                                autoFocus
                                // value={JSON.stringify(field.value) || null}
                                id="data_register"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={6}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddressModbusTab
