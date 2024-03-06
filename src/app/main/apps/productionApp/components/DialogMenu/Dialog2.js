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

import { selectMnMachines } from '../../../maintenanceApp/store/machineStore/machineMnSlices'
import { selectUser } from 'app/store/userSlice'
import {
    scwActionPending,
    saveScw,
    updateScw,
} from '../../store/scwStore/scwProductionSlice'
import VirtualizedData from '../../../maintenanceSystem/machineTab/utils/VirtualizedData'

function Dialog2({ params, hasForm }) {
    const methods = useFormContext()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const isPending = useSelector(scwActionPending)
    const machines = useSelector(selectMnMachines)
    const { control, formState, getValues, setValue, resetField } = methods
    const { errors, isValid, dirtyFields } = formState
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        hasForm == 'INPUT' && setDisabled(false)
        console.log(hasForm)
    }, [])

    function handleSubmit() {
        // console.log(getValues())
        dispatch(saveScw(getValues())).then((action) => {
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
                        defaultValue="GM1"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="com"
                                key="com"
                                className="mt-8 mb-16"
                                label="Company"
                                select
                                autoFocus={true}
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem value="GM1">GM1</MenuItem>
                                <MenuItem value="GM2">GM2</MenuItem>
                                <MenuItem value="GM3">GM3</MenuItem>
                                <MenuItem value="GM5">GM5</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                {/* <Grid item xs={2}>
                    <Controller
                        name="area"
                        control={control}
                        defaultValue={params.area || ''}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Area"
                                 autoFocus={true}
                                variant="outlined"
                                fullWidth
                                error={!!errors.area}
                                required
                                helperText={errors?.area?.message}
                            />
                        )}
                    />
                </Grid> */}
                <Grid item xs={3}>
                    <Controller
                        name="mch_code"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            // <TextField
                            //     {...field}
                            //     className="mt-8 mb-16"
                            //     label="Machine Code"
                            //      autoFocus={true}
                            //     variant="outlined"
                            //     fullWidth
                            //     error={!!errors.mch_code}
                            //     required
                            //     helperText={errors?.mch_code?.message}
                            // />
                            <VirtualizedData
                                field={field}
                                data={machines}
                                label="Machine"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="req_to"
                        control={control}
                        defaultValue="PE"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="req_to"
                                key="req_to"
                                className="mt-8 mb-16"
                                label="Req To"
                                select
                                autoFocus={true}
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem value="PE">PE</MenuItem>
                                <MenuItem value="TE">TE</MenuItem>
                                <MenuItem value="MN">MN</MenuItem>
                                <MenuItem value="TD">TD</MenuItem>
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
                <Grid item xs={6}>
                    <Controller
                        name="no_drawing"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="no_drawing"
                                key="no_drawing"
                                className="mt-8 mb-16"
                                label="Draw No."
                                autoFocus={true}
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="name_prd"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="name_prd"
                                key="name_prd"
                                className="mt-8 mb-16"
                                label="Prd. Name"
                                autoFocus={true}
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
                        name="problem"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Problem"
                                placeholder="Tuliskan masalah secara lengkap"
                                autoFocus={true}
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
                        name="input_by"
                        defaultValue={user.data.displayName}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Input By"
                                autoFocus={true}
                                variant="outlined"
                                fullWidth
                                disabled
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
export default Dialog2
