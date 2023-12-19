import { useEffect, useState } from 'react'
import { Box, Button, TextField, Grid, CardMedia } from '@mui/material'
import dayjs from 'dayjs'
import { Controller, useFormContext } from 'react-hook-form'
import _ from 'lodash'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { useDispatch } from 'react-redux'
import { saveGenbaAcip } from '../../store/genba/genbaAcipSlice'
import { showMessage } from 'app/store/fuse/messageSlice'

function Tab2() {
    const dispatch = useDispatch()
    const methods = useFormContext()
    const { control, formState, getValues, setValue, resetField } = methods
    const { errors, isValid } = formState
    const { images1 } = getValues()

    function withImage() {
        return `data:${images1.mimetype};base64,${images1.data}`
    }

    function handleSave(params) {
        dispatch(saveGenbaAcip(getValues())).then((action) => {
            if (action.payload) {
                dispatch(
                    showMessage({
                        message: 'Data has been saved successfully',
                        variant: 'success',
                    })
                )
            }
        })
    }

    return (
        <Box>
            <div className="flex flex-auto items-center min-w-0">
                <div className="flex flex-col sm:flex-row items-start justify-between">
                    <CardMedia
                        component="img"
                        sx={{ width: 300, height: 300 }}
                        image={withImage()}
                        alt="Images"
                    />
                </div>

                <div className="flex flex-col sm:flex-row ml-16 items-end justify-between">
                    <div className="w-full">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Controller
                                    name="b_r1"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R1"
                                            id="R1"
                                            value={field.value || 0}
                                            error={!!errors.b_r1}
                                            helperText={errors?.b_r1?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="b_r2"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R2"
                                            id="R2"
                                            value={field.value || 0}
                                            error={!!errors.b_r2}
                                            helperText={errors?.b_r2?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="b_r3"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R3"
                                            id="R3"
                                            value={field.value || 0}
                                            error={!!errors.b_r3}
                                            helperText={errors?.b_r3?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Controller
                                    name="b_r4"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R4"
                                            id="R4"
                                            value={field.value || 0}
                                            error={!!errors.b_r4}
                                            helperText={errors?.b_r4?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="b_r5"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R5"
                                            id="R5"
                                            value={field.value || 0}
                                            error={!!errors.b_r5}
                                            helperText={errors?.b_r5?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <Controller
                                    name="open_date"
                                    control={control}
                                    render={({ field }) => (
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DateTimePicker
                                                {...field}
                                                ampm={false}
                                                value={dayjs(field.value)}
                                                className="mt-8 mb-16"
                                                id="open_date"
                                                label="Open Findings"
                                                sx={{
                                                    width: '100%',
                                                }}
                                                slotProps={{
                                                    popper: {
                                                        disablePortal: true,
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Controller
                                    name="due_date"
                                    control={control}
                                    render={({ field }) => (
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DateTimePicker
                                                {...field}
                                                ampm={false}
                                                value={dayjs(field.value)}
                                                className="mt-8 mb-16"
                                                id="due_date"
                                                label="Due Date"
                                                sx={{
                                                    width: '100%',
                                                }}
                                                slotProps={{
                                                    popper: {
                                                        disablePortal: true,
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="case"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            value={field.value || ''}
                                            label="Case"
                                            id="case"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={6}
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
                                    // disabled={valid()}
                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default Tab2
