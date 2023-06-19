import { TextField, MenuItem, Autocomplete, Grid, Box } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

function AddressMachineTab() {
    const methods = useFormContext()
    const { control, formState, watch } = methods
    const { errors } = formState

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
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
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Controller
                        name="mch_name"
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
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Controller
                        name="mch_com"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                required
                                label="Machine com"
                                select
                                autoFocus
                                id="mch_com"
                                fullWidth
                            >
                                <MenuItem value="GM1">GM1</MenuItem>
                                <MenuItem value="GM2">GM2</MenuItem>
                                <MenuItem value="GM3">GM3</MenuItem>
                                <MenuItem value="GM5">GM5</MenuItem>
                                <MenuItem value="GMU">GMU</MenuItem>
                                <MenuItem value="GMX">GMX</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddressMachineTab
