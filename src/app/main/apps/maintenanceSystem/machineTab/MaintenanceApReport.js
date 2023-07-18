import { useEffect, useState } from 'react'
import { TextField, Button, Grid, Box, MenuItem, Select } from '@mui/material'
import { Controller, useFormContext, useFieldArray } from 'react-hook-form'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TableIndex from './TableIndex'
import { showMessage } from 'app/store/fuse/messageSlice'
import {
    getMaintenanceSystem,
    saveMaintenanceSystem,
} from '../store/machineChildren/machineChildrenSlice'
import { selectUser } from 'app/store/userSlice'
import StatusColor from './utils/StatusColor'
import axios from 'axios'

function MaintenanceApReport({ data }) {
    const dispatch = useDispatch()

    const user = useSelector(selectUser)
    const methods = useFormContext()
    const { control, formState, watch, getValues, setValue, getFieldState } =
        methods
    const { errors, isValid } = formState

    const { fields, remove, append } = useFieldArray({
        name: 'report',
        control,
    })

    function valid() {
        if (
            getFieldState('id_report').isDirty &&
            !getFieldState('id_report').invalid &&
            getFieldState('date_report').isDirty &&
            !getFieldState('date_report').invalid &&
            getFieldState('date_target').isDirty &&
            !getFieldState('date_target').invalid &&
            getFieldState('chronological').isDirty &&
            !getFieldState('chronological').invalid &&
            getFieldState('corrective').isDirty &&
            !getFieldState('corrective').invalid &&
            getFieldState('prevention').isDirty &&
            !getFieldState('prevention').invalid &&
            getFieldState('kind').isDirty &&
            !getFieldState('kind').invalid
        ) {
            return false
        }

        return true
    }

    const sendMsg = async (params) => {
        await axios({
            method: 'post',
            url: 'http://192.168.192.7:5010/send-message',
            data: {
                number: params.number,
                message: params.msg,
            },
        })
    }

    function handleSave() {
        dispatch(saveMaintenanceSystem(getValues())).then((action) => {
            if (action.payload) {
                dispatch(getMaintenanceSystem(action.payload.uuid))
                dispatch(
                    showMessage({
                        message: 'Data has been saved successfully',
                    })
                )
            }
        })
    }

    const columns = [
        {
            field: 'sheet_no',
            headerName: 'AP-Sheet',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
        },
        {
            field: 'kind',
            headerName: 'Kind',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 100,
        },
        {
            field: 'date_report',
            headerName: 'Start',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            align: 'center',
            valueFormatter: (params) =>
                dayjs(params.value).format('DD/MM/YY HH:mm'),
        },
        {
            field: 'date_finish',
            headerName: 'Finish',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            align: 'center',
            valueFormatter: (params) =>
                params.value != null
                    ? dayjs(params.value).format('DD/MM/YY HH:mm')
                    : 'not yet',
        },
        {
            field: 'audit_report',
            headerName: 'Audit',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            align: 'center',
            renderCell: (params) => <StatusColor id={params.value} />,
        },
        {
            field: 'user_rep1',
            headerName: 'Leader',
            width: 90,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'user_rep2',
            headerName: 'Technician',
            width: 90,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'chronological',
            headerName: 'Chronological',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'corrective',
            headerName: 'Corrective',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'prevention',
            headerName: 'Prevention',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
    ]

    const tableIndex = (data) => {
        setValue('id_report', data.row.sheet_no, { shouldDirty: true })
        setValue('date_report', dayjs(data.row.date_report), {
            shouldDirty: true,
        })
        setValue('date_target', dayjs(data.row.date_target), {
            shouldDirty: true,
        })
        setValue('date_finish', dayjs(data.row.date_finish), {
            shouldDirty: true,
        })
        setValue('kind', data.row.kind, { shouldDirty: true })
        setValue('audit_report', data.row.audit_report, { shouldDirty: true })
        setValue('chronological', data.row.chronological, { shouldDirty: true })
        setValue('corrective', data.row.corrective, { shouldDirty: true })
        setValue('prevention', data.row.prevention, { shouldDirty: true })
        setValue('user_rep2', data.row.user_rep2, { shouldDirty: true })
    }

    return (
        <div>
            <Box
                sx={{
                    width: '100%',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Controller
                            name="id_report"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.id_report}
                                    helperText={errors?.id_report?.message}
                                    label="Ap-Sheet"
                                    id="id_report"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controller
                            name="date_report"
                            control={control}
                            defaultValue={dayjs()}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateTimePicker
                                        {...field}
                                        ampm={false}
                                        className="mt-8 mb-16"
                                        id="date_report"
                                        label="Start"
                                        maxDate={dayjs()}
                                        sx={{ width: '100%' }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controller
                            name="date_target"
                            control={control}
                            defaultValue={dayjs()}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateTimePicker
                                        {...field}
                                        ampm={false}
                                        className="mt-8 mb-16"
                                        id="date_target"
                                        label="Target"
                                        sx={{ width: '100%' }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Controller
                            name="mch_code"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.mch_code}
                                    helperText={errors?.mch_code?.message}
                                    label="Machine code"
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
                            name="mch_com"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.mch_com}
                                    helperText={errors?.mch_com?.message}
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
                    <Grid item xs={4}>
                        <Controller
                            name="chronological"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.chronological}
                                    helperText={errors?.chronological?.message}
                                    label="Chronological"
                                    id="chronological"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Controller
                            name="corrective"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.corrective}
                                    helperText={errors?.corrective?.message}
                                    label="Corrective"
                                    id="corrective"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Controller
                            name="prevention"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.prevention}
                                    helperText={errors?.prevention?.message}
                                    label="Prevention"
                                    id="prevention"
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
                    <Grid item xs={2}>
                        <Controller
                            name="user_rep1"
                            defaultValue={user.data.displayName}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.user_rep1}
                                    required
                                    helperText={errors?.user_rep1?.message}
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
                            name="user_rep2"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.user_rep2}
                                    required
                                    helperText={errors?.user_rep2?.message}
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
                            name="kind"
                            defaultValue=""
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
                            name="audit_report"
                            defaultValue="N"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    label="Audit"
                                    select
                                    autoFocus
                                    id="audit_report"
                                    fullWidth
                                >
                                    <MenuItem value="Y">Audit</MenuItem>
                                    <MenuItem value="N">n.audit</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Controller
                            name="date_finish"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateTimePicker
                                        {...field}
                                        ampm={false}
                                        className="mt-8 mb-16"
                                        id="date_finish"
                                        label="Finish"
                                        sx={{ width: '100%' }}
                                    />
                                </LocalizationProvider>
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
                            disabled={valid()}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    height: 400,
                }}
            >
                <TableIndex
                    params={{
                        row: fields,
                        columns: columns,
                        id: fields.sheet_no,
                        filter: data?.filter,
                    }}
                    tableIndex={tableIndex}
                />
            </Box>
        </div>
    )
}

export default MaintenanceApReport
