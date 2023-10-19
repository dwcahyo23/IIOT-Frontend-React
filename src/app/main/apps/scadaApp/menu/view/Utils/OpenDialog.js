import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { showMessage } from 'app/store/fuse/messageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { upZbSlice, zbUpsert } from '../../../store/machinesSlice'
import { isArray } from 'lodash'
import dayjs from 'dayjs'
import _ from 'lodash'
import { selectScada } from '../../../store/machinesSlice'
import { getQuest } from '../../../store/questSlice'

function OpenDialog({ params }) {
    const dispatch = useDispatch()
    const data = useSelector(selectScada)
    const [hasDisable, setHasDisable] = useState(false)
    const [totalHours, setTotalHours] = useState(null)

    useEffect(() => {
        // console.log(params)
    }, [])

    useEffect(() => {
        const getId = _.find(data, { id: params.id })
        // console.log(getId)

        const total = {
            none: 0,
            setting: 0,
            tooling: 0,
            maintenance: 0,
        }

        const zbLog = getId.zbLog
        if (zbLog.length > 0) {
            _.forEach(zbLog, (val) => {
                if (val.lock === 0) {
                    total[val.stop_reason] +=
                        dayjs(new Date()).diff(dayjs(val.start), 'hour', true) *
                        1
                } else {
                    total[val.stop_reason] +=
                        dayjs(val.stop).diff(dayjs(val.start), 'hour', true) * 1
                }
            })
        }

        console.log(typeof total.none)
        setTotalHours(total)

        // console.log(total)
    }, [data])

    const { control, getValues } = useForm({
        defaultValues: {
            stop_reason: 'none',
            shift_production: 1,
            id_zb_sens: params.id,
            start_zb_sens:
                params.zbConn?.start_zb_sens == 0
                    ? params.zbConn?.init_zb_sens
                    : params.zbConn?.start_zb_sens,
            target_zb_sens: params.zbConn?.target_zb_sens || '',
            lock: params.zbConn?.lock || 0,
            id_production: params.zbConn?.id_production || '',
        },
    })

    useEffect(() => {
        if (params.zbConn === null) {
            setHasDisable(true)
        } else {
            setHasDisable(false)
        }
    }, [])

    function handleSave() {
        const data = [getValues()]
        dispatch(upZbSlice(data)).then((action) => {
            if (!action.payload.errors) {
                console.log(action.payload)
                dispatch(
                    zbUpsert({
                        id: getValues('id_zb_sens'),
                        zbConn: getValues(),
                    })
                )
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

    function handleQuest() {
        const data = getValues()
        const query = `"SELECT min(count), max(count), max(count)-min(count) as total from zbSens where id = '${
            data.id_zb_sens
        }' and ts BETWEEN '${dayjs(data.start).format()}' AND '${dayjs(
            data.stop
        ).format()}'"`

        dispatch(getQuest({ query: query })).then((action) => {
            console.log(action.payload)
        })
    }

    return (
        <Box className="flex flex-col flex-auto p-32">
            {/* <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Controller
                        name="id_production"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="ID Production"
                                id="id_production"
                                variant="outlined"
                                fullWidth
                                disabled={hasDisable}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="shift_production"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="shift_production"
                                className="mt-8 mb-16"
                                label="Shift Production"
                                select
                                autoFocus
                                fullWidth
                                disabled={hasDisable}
                            >
                                <MenuItem value={1}>Shift 1</MenuItem>
                                <MenuItem value={2}>Shift 2</MenuItem>
                                <MenuItem value={3}>Shift 3</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="target_zb_sens"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Target Production"
                                id="target_zb_sens"
                                variant="outlined"
                                fullWidth
                                disabled={hasDisable}
                                type="number"
                            />
                        )}
                    />
                </Grid>
            </Grid> */}
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Controller
                        name="id_zb_sens"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="ID"
                                id="id_zb_sens"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="stop_reason"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="stop_reason"
                                className="mt-8 mb-16"
                                label="Stop Reason"
                                select
                                autoFocus
                                fullWidth
                                disabled={hasDisable}
                            >
                                <MenuItem value="none">None</MenuItem>
                                <MenuItem value="setting">Setting</MenuItem>
                                <MenuItem value="tooling">Tooling</MenuItem>
                                <MenuItem value="maintenance">
                                    Maintenance
                                </MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="lock"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="lock"
                                className="mt-8 mb-16"
                                label="Lock"
                                select
                                autoFocus
                                fullWidth
                                disabled={hasDisable}
                            >
                                <MenuItem value={0}>Unlock</MenuItem>
                                <MenuItem value={1}>Lock</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Controller
                        name="start"
                        control={control}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    {...field}
                                    ampm={false}
                                    className="mt-8 mb-16"
                                    id="start"
                                    value={dayjs(field.value)}
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
                <Grid item xs={4}>
                    <Controller
                        name="end"
                        control={control}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    {...field}
                                    ampm={false}
                                    className="mt-8 mb-16"
                                    id="date_finish"
                                    value={dayjs(field.value)}
                                    label="End"
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

            {/* {totalHours && (
                <div className="grid grid-cols-12 gap-x-3 my-8 p-24 border rounded-lg ">
                    <Typography className="col-span-3 w-11/12 text-xl font-normal">
                        Running : {_.toNumber(totalHours.none).toFixed(1)} h
                    </Typography>
                    <Typography className="col-span-3 w-11/12 text-xl font-normal">
                        Setting : {_.toNumber(totalHours.setting).toFixed(1)} h
                    </Typography>
                    <Typography className="col-span-3 w-11/12 text-xl font-normal">
                        Tooling : {_.toNumber(totalHours.tooling).toFixed(1)} h
                    </Typography>
                    <Typography className="col-span-3 w-11/12 text-xl font-normal">
                        Maintenance :{' '}
                        {_.toNumber(totalHours.maintenance).toFixed(1)} h
                    </Typography>
                </div>
            )} */}

            {hasDisable && <Typography>Machine unconnected</Typography>}
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Button
                        className="whitespace-nowrap mb-16"
                        variant="contained"
                        color="secondary"
                        // onClick={handleSave}
                        onClick={handleQuest}
                        disabled={hasDisable}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OpenDialog
