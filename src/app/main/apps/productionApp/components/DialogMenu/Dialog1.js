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

function Dialog1({ params, hasForm }) {
    const methods = useFormContext()
    const dispatch = useDispatch()
    const isPending = useSelector(scwActionPending)
    const user = useSelector(selectUser)
    const { control, formState, getValues, setValue, resetField } = methods
    const { errors, isValid, dirtyFields } = formState
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        hasForm == 'UPDATE' && setDisabled(false)
    }, [])

    function handleSubmit() {
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
                        defaultValue={params.com || ''}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Company"
                                autoFocus
                                id="com"
                                variant="outlined"
                                fullWidth
                                disabled
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
                                id="mch_code"
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="req_to"
                        control={control}
                        defaultValue={params.req_to || 'PE'}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Req To"
                                autoFocus
                                id="req_to"
                                variant="outlined"
                                fullWidth
                                disabled
                            />
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
                                    id="start_time"
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
                <Grid item xs={6}>
                    <Controller
                        name="no_drawing"
                        defaultValue={params.no_drawing || ''}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Draw No."
                                autoFocus
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="name_prd"
                        defaultValue={params.name_prd || ''}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Prd. Name"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                disabled
                            />
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
                                label="Problem"
                                placeholder="Tuliskan masalah secara lengkap"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                multiline
                                id="problem"
                                rows={4}
                                disabled
                                error={!!errors.problem}
                                required
                                helperText={errors?.problem?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="remarks"
                        control={control}
                        defaultValue={params.remarks || ''}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Remarks"
                                placeholder="Tuliskan remark untuk proses statusnya"
                                autoFocus
                                id="remarks"
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
                        defaultValue={params.end_time || dayjs()}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    {...field}
                                    ampm={false}
                                    value={
                                        _.isNull(field.value)
                                            ? dayjs()
                                            : dayjs(field.value)
                                    }
                                    className="mt-8 mb-16"
                                    id="end_time"
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
                                id="input_by"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        )}
                    />
                </Grid>
                {/* <Grid item xs={3}>
                    <Controller
                        name="finished_by"
                        defaultValue={user.data.displayName}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Finish By"
                                value={user.data.displayName}
                                autoFocus
                                variant="outlined"
                                fullWidth
                                inputProps="readonly"
                            />
                        )}
                    />
                </Grid> */}
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
                        // disabled={_.isEmpty(dirtyFields) || !isValid}
                        disabled={disabled}
                    >
                        <span>SAVE</span>
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Dialog1
