import { useState, useEffect, useRef } from 'react'
import {
    Box,
    Grid,
    TextField,
    MenuItem,
    Typography,
    Button,
    Rating,
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { Print } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
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
import ReactToPrint from 'react-to-print'
import { showMessage } from 'app/store/fuse/messageSlice'
import {
    saveReport,
    saveReportPending,
} from '../../store/reportStore/reportMnSlice'
import { selectUser } from 'app/store/userSlice'
import _ from 'lodash'

import DialogMenu2Print from './DialogMenu2Print'

function DialogMenu2({ params }) {
    const methods = useFormContext()
    const dispatch = useDispatch()
    const componentRef = useRef()
    const user = useSelector(selectUser)
    const isPending = useSelector(saveReportPending)
    const { control, formState, getValues, setValue, resetField } = methods
    const [disRep, setDisRep] = useState(true)

    useEffect(() => {
        setDisRep(
            _.some(params?.request_index, ['audit_request', 'N']) ||
                _.isNull(params.chk_mark)
        )
    }, [params])

    function handleSaveReport() {
        dispatch(saveReport(getValues('report_index'))).then((action) => {
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
                        name="report_index.sheet_no"
                        defaultValue={params.sheet_no}
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
                        name="report_index.date_report"
                        control={control}
                        defaultValue={params.ymd}
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
                        name="report_index.date_target"
                        defaultValue={dayjs()}
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
                        name="report_index.mch_code"
                        defaultValue={params?.mch_index.mch_code}
                        control={control}
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
                        name="report_index.mch_com"
                        defaultValue={params?.mch_index.mch_com}
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
                        name="report_index.chronological"
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
                        name="report_index.analyzed"
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
                        name="report_index.corrective"
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
                        name="report_index.prevention"
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
                        name="report_index.user_rep1"
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
                        name="report_index.user_rep2"
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
                        name="report_index.kind"
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
                        name="report_index.audit_report"
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
                <Grid item xs={3}>
                    {params.chk_mark == 'Y' && (
                        <Controller
                            name="report_index.date_finish"
                            defaultValue={dayjs()}
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
                    )}
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Typography>Feedback PD:</Typography>
                    <Rating
                        name="Rating"
                        readOnly
                        value={params?.report_index?.feedback_score || 0}
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
                        onClick={handleSaveReport}
                    >
                        <span>SAVE</span>
                    </LoadingButton>
                </Grid>
                <Grid item xs={4}>
                    <ReactToPrint
                        trigger={() => (
                            <Button
                                className="px-16 min-w-100"
                                variant="contained"
                                color="secondary"
                                startIcon={<Print />}
                            >
                                PRINT
                            </Button>
                        )}
                        content={() => componentRef.current}
                        pageStyle="@media print { @page { size: landscape; margin: 0mm; } }"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DialogMenu2Print ref={componentRef} params={params} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default DialogMenu2
