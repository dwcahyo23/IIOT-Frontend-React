import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { showMessage } from 'app/store/fuse/messageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { upZbSlice, zbUpsert } from '../../../store/machinesSlice'

function OpenDialog({ params }) {
    const dispatch = useDispatch()
    const [hasDisable, setHasDisable] = useState(false)

    const { control, getValues } = useForm({
        defaultValues: {
            stop_reason: '2',
            shift_production: 1,
            id_zb_sens: params.id,
            start_zb_sens: params.zbConn?.init_zb_sens || '',
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

    return (
        <Box className="flex flex-col flex-auto p-32">
            <Grid container spacing={2}>
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
            </Grid>
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
                                <MenuItem value="1">Reason 1</MenuItem>
                                <MenuItem value="2">Reason 2</MenuItem>
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
            {hasDisable && <Typography>Machine unconnected</Typography>}
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Button
                        className="whitespace-nowrap mb-16"
                        variant="contained"
                        color="secondary"
                        onClick={handleSave}
                        disabled={hasDisable}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OpenDialog
