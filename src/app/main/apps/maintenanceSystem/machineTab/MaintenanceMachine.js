import { TextField, MenuItem, Autocomplete, Grid, Box } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

function MaintenanceMachine() {
    const methods = useFormContext()
    const { control, formState, watch } = methods
    const { errors } = formState

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                    <Controller
                        name="mch_name"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.mch_name}
                                required
                                helperText={errors?.mch_name?.message}
                                label="Machine name"
                                autoFocus
                                id="mch_name"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={2}>
                    <Controller
                        name="mch_process"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.mch_process}
                                required
                                helperText={errors?.mch_process?.message}
                                label="Machine process code"
                                autoFocus
                                id="mch_process"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="mch_process_type"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.mch_process_type}
                                required
                                helperText={errors?.mch_process_type?.message}
                                label="Machine process"
                                autoFocus
                                id="mch_process_type"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="mch_maker"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.mch_maker}
                                required
                                helperText={errors?.mch_maker?.message}
                                label="Machine maker"
                                autoFocus
                                id="mch_maker"
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
                        name="mch_prod"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                error={!!errors.mch_prod}
                                required
                                helperText={errors?.mch_prod?.message}
                                label="Machine production"
                                autoFocus
                                id="mch_prod"
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
        </Box>
    )
}

export default MaintenanceMachine
