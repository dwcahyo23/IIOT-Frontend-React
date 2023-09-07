import { useState, useEffect } from 'react'
import {
    Box,
    Grid,
    TextField,
    MenuItem,
    Typography,
    Button,
} from '@mui/material'
import {
    Controller,
    useFormContext,
    useFieldArray,
    useFormState,
} from 'react-hook-form'
import dayjs from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useDispatch, useSelector } from 'react-redux'

import { showMessage } from 'app/store/fuse/messageSlice'
import { getMachineStock } from 'src/app/main/apps/maintenanceSystem/store/machineChildren/machineStock'
import { getMnReqSlice } from '../../store/mnReqSlice'
import { selectUser } from 'app/store/userSlice'
import { saveMnOne } from '../../store/mnOneSlice'
import _ from 'lodash'

function ApReport() {
    const methods = useFormContext()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const { control, formState, getValues, setValue, resetField } = methods
    const [disRep, setDisRep] = useState(true)

    const { fields: request } = useFieldArray({
        name: 'request',
        control,
    })
    const sheet = getValues('sheet')
    const report = getValues('report')

    useEffect(() => {
        setDisRep(
            _.some(request, ['audit_request', 'N']) || _.isNull(sheet.chk_date)
        )
    }, [request, sheet])

    function handleSaveReport() {
        // console.log(getValues('report'))
        dispatch(saveMnOne(getValues('report'))).then((action) => {
            if (!action.payload.errors) {
                dispatch(
                    showMessage({
                        message: 'Data saved successfully',
                        variant: 'success',
                    })
                )
            } else {
                const errors = action.payload.errors[0].message
                dispatch(
                    showMessage({
                        message: errors,
                        variant: 'error',
                    })
                )
            }
        })
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Controller
                        name="report.sheet_no"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Ap-Sheet"
                                id="id_report"
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
                        name="report.date_report"
                        control={control}
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
                                    readOnly
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="report.date_target"
                        control={control}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    {...field}
                                    ampm={false}
                                    className="mt-8 mb-16"
                                    id="date_target"
                                    label="Target"
                                    value={dayjs(field.value)}
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
                <Grid item xs={2}>
                    <Controller
                        name="report?.mch_code"
                        control={control}
                        defaultValue={getValues('machine.mch_code')}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Machine Code"
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
                <Grid item xs={2}>
                    <Controller
                        name="report?.mch_com"
                        defaultValue={getValues('machine.mch_com')}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Machine com"
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
                <Grid item xs={3}>
                    <Controller
                        name="report.chronological"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Chronological"
                                id="chronological"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={6}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="report.analyzed"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Analyze"
                                id="analyzed"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={6}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="report.corrective"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Corrective"
                                id="corrective"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={6}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="report.prevention"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Prevention"
                                id="prevention"
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
                <Grid item xs={2}>
                    <Controller
                        name="report.user_rep1"
                        defaultValue={user.data.displayName}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                required
                                label="Leader"
                                autoFocus
                                id="user_rep1"
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
                        name="report.user_rep2"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                required
                                label="Technician"
                                autoFocus
                                id="user_rep2"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="report.kind"
                        defaultValue="Mechanical"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="kind"
                                className="mt-8 mb-16"
                                label="Kind"
                                select
                                autoFocus
                                fullWidth
                            >
                                <MenuItem value="Electrical">
                                    Electrical
                                </MenuItem>
                                <MenuItem value="Mechanical">
                                    Mechanical
                                </MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="report.audit_report"
                        defaultValue="N"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Audit Report"
                                select
                                autoFocus
                                helperText={
                                    disRep ? 'Need audit ERP/Ap-Request' : ''
                                }
                                id="audit_report"
                                fullWidth
                            >
                                <MenuItem value="Y" disabled={disRep}>
                                    Audit
                                </MenuItem>
                                <MenuItem value="N">n.audit</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                `{' '}
                <Grid item xs={3}>
                    {_.isNull(report.date_finish) == false ? (
                        <Controller
                            name="report.date_finish"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateTimePicker
                                        {...field}
                                        ampm={false}
                                        className="mt-8 mb-16"
                                        id="date_finish"
                                        value={dayjs(field.value)}
                                        label="Finish"
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
                    ) : (
                        ''
                    )}
                </Grid>
                `
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Button
                        className="whitespace-nowrap mb-16"
                        variant="contained"
                        color="secondary"
                        onClick={handleSaveReport}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ApReport
