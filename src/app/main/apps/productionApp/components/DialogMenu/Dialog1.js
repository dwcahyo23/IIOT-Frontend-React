import { useState, useEffect, useRef } from 'react'
import { Box, Grid, TextField, MenuItem } from '@mui/material'
import { Save } from '@mui/icons-material'
import { Print } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Controller, useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useDispatch, useSelector } from 'react-redux'
import ReactToPrint from 'react-to-print'
import { showMessage } from 'app/store/fuse/messageSlice'
import _ from 'lodash'

import { selectUser } from 'app/store/userSlice'
import {
    scwActionPending,
    saveScw,
    updateScw,
} from '../../store/scwStore/scwProductionSlice'

function Dialog1({ params }) {
    const methods = useFormContext()
    const dispatch = useDispatch()
    const isPending = useSelector(scwActionPending)
    const user = useSelector(selectUser)

    const { control, formState, getValues, setValue, resetField } = methods

    const { errors, isValid, dirtyFields } = formState

    function handleSubmit() {
        // console.log(getValues())
        dispatch(updateScw(getValues())).then((action) => {
            if (action.meta.requestStatus === 'rejected') {
                dispatch(
                    showMessage({
                        message: action.payload.message,
                        variant: 'error',
                    })
                )
            }
            dispatch(
                showMessage({
                    message: 'Data saved successfully',
                    variant: 'success',
                })
            )
        })
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Controller
                        name="com"
                        control={control}
                        defaultValue={params.com || 'GM1'}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Company"
                                select
                                autoFocus
                                variant="outlined"
                                fullWidth
                                disabled
                            >
                                <MenuItem value="GM1">GM1</MenuItem>
                                <MenuItem value="GM2">GM2</MenuItem>
                                <MenuItem value="GM3">GM3</MenuItem>
                                <MenuItem value="GM5">GM5</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="area"
                        control={control}
                        defaultValue={params.area || ''}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Area"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                error={!!errors.area}
                                required
                                helperText={errors?.area?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="mch_code"
                        control={control}
                        defaultValue={params.mch_code || ''}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Machine Code"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                error={!!errors.mch_code}
                                required
                                helperText={errors?.mch_code?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="req_to"
                        control={control}
                        defaultValue={params.req_to || 'ENGINERING'}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Req TO"
                                select
                                autoFocus
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem value="ENGINERING">
                                    ENGINERING
                                </MenuItem>
                                <MenuItem value="MAINTENANCE">
                                    MAINTENANCE
                                </MenuItem>
                                <MenuItem value="TOOL&DIES">
                                    TOOL & DIES
                                </MenuItem>
                                <MenuItem value="PPIC">PPIC</MenuItem>
                                <MenuItem value="QC">QC</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>

                <Grid item xs={3}>
                    <Controller
                        name="start_time"
                        control={control}
                        defaultValue={params.start_time || dayjs()}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    {...field}
                                    ampm={false}
                                    value={dayjs(field.value)}
                                    className="mt-8 mb-16"
                                    id="date_report"
                                    label="Start"
                                    sx={{
                                        width: '100%',
                                    }}
                                    disabled
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="problem"
                        control={control}
                        defaultValue={params.problem || ''}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Remarks"
                                placeholder="Tuliskan masalah secara lengkap"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                error={!!errors.problem}
                                required
                                helperText={errors?.problem?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Controller
                        name="status"
                        control={control}
                        defaultValue={params.status || 'Open'}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Status"
                                select
                                autoFocus
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="Close">Close</MenuItem>
                                <MenuItem value="Cancel">Cancel</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="end_time"
                        control={control}
                        defaultValue={params.start_time || dayjs()}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    {...field}
                                    ampm={false}
                                    value={
                                        _.isUndefined(field.value)
                                            ? dayjs()
                                            : dayjs(field.value)
                                    }
                                    className="mt-8 mb-16"
                                    id="date_report"
                                    label="Finish"
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="input_by"
                        defaultValue={params.input_by || ''}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Input By"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="finished_by"
                        defaultValue={user.data.displayName}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Finished By"
                                autoFocus
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <LoadingButton
                        variant="contained"
                        color="secondary"
                        loading={isPending}
                        loadingPosition="start"
                        startIcon={<Save />}
                        onClick={handleSubmit}
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                    >
                        <span>SAVE</span>
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Dialog1
