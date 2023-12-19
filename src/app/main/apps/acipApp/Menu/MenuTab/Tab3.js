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

function Tab3() {
    const dispatch = useDispatch()
    const methods = useFormContext()
    const { control, formState, getValues, setValue, resetField } = methods
    const { errors, isValid } = formState
    const { images2 } = getValues()

    function withImage() {
        return _.isPlainObject(images2)
            ? `data:${images2.mimetype};base64,${images2.data}`
            : `assets/images/apps/ecommerce/product-image-placeholder.png`
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

                    {/* <img
                            className="w-full block rounded"
                            src="assets/images/apps/ecommerce/product-image-placeholder.png"
                            alt={n.item_name}
                        /> */}
                </div>

                <div className="flex flex-col sm:flex-row ml-16 items-end justify-between">
                    <div className="w-full">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Controller
                                    name="a_r1"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R1"
                                            id="R1"
                                            value={field.value || 0}
                                            error={!!errors.a_r1}
                                            helperText={errors?.a_r1?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="a_r2"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R2"
                                            id="R2"
                                            value={field.value || 0}
                                            error={!!errors.a_r2}
                                            helperText={errors?.a_r2?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="a_r3"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R3"
                                            id="R3"
                                            value={field.value || 0}
                                            error={!!errors.a_r3}
                                            helperText={errors?.a_r3?.message}
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
                                    name="a_r4"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R4"
                                            id="R4"
                                            value={field.value || 0}
                                            error={!!errors.a_r4}
                                            helperText={errors?.a_r4?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="a_r5"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R5"
                                            id="R5"
                                            value={field.value || 0}
                                            error={!!errors.a_r5}
                                            helperText={errors?.a_r5?.message}
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
                                    name="close_date"
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
                                                id="close_date"
                                                label="Close Findings"
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
                                    name="improvement"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            value={field.value || ''}
                                            className="mt-8 mb-16"
                                            label="Idea Improvement"
                                            id="improvement"
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

export default Tab3
