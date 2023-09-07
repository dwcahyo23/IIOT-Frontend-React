import React from 'react'
import { Box, Grid, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

function Machine() {
    const methods = useFormContext()
    const { control, formState, watch } = methods
    const { errors } = formState

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Controller
                        name="machine.mch_code"
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
                        name="machine.mch_name"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
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
                        name="machine.mch_com"
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
                        name="machine.mch_process"
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
                        name="machine.mch_process_type"
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
                        name="machine.mch_hp"
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
                        name="machine.mch_prod"
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
    )
}

export default Machine
