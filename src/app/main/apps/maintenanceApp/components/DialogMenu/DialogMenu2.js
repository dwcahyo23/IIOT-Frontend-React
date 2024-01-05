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

import { selectUser } from 'app/store/userSlice'
import _ from 'lodash'

import DialogMenu2Print from './DialogMenu2Print'

function DialogMenu2({ params }) {
    const methods = useFormContext()
    const dispatch = useDispatch()
    const componentRef = useRef()
    const user = useSelector(selectUser)
    const { control, formState, getValues, setValue, resetField } = methods
    const [disRep, setDisRep] = useState(true)

    const report = getValues('report_index')

    useEffect(() => {
        setDisRep(
            _.some(params.data?.request_index, ['audit_request', 'N']) ||
                _.isNull(params.data?.chk_date)
        )
    }, [params])

    function handleSaveReport() {
        console.log(getValues('report_index'))
        // console.log(getValues('report'))
        // dispatch(saveMnOne(getValues('report'))).then((action) => {
        //     if (!action.payload.errors) {
        //         dispatch(
        //             showMessage({
        //                 message: 'Data saved successfully',
        //                 variant: 'success',
        //             })
        //         )
        //     } else {
        //         const errors = action.payload.errors[0].message
        //         dispatch(
        //             showMessage({
        //                 message: errors,
        //                 variant: 'error',
        //             })
        //         )
        //     }
        // })
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Controller
                        name="report_index.sheet_no"
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
                        name="mch_index.mch_code"
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
                        name="mch_index.mch_com"
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
                    {_.isNull(report?.date_finish) == false ? (
                        <Controller
                            name="report_index.date_finish"
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
                <Grid item xs={2}>
                    <Typography>Feedback PD:</Typography>
                    <Rating
                        name="Rating"
                        readOnly
                        value={report?.feedback_score || 0}
                    />
                </Grid>
                {/* <Grid item xs={2}>
                    <Typography>{report?.feedback_note}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{report?.feedback_user}</Typography>
                </Grid> */}
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
                <Grid item xs={4}>
                    <ReactToPrint
                        trigger={() => (
                            <Button
                                className="px-16 min-w-100"
                                variant="contained"
                                color="secondary"
                            >
                                Print
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
