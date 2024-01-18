import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
    TextField,
    Select,
    Button,
    Box,
    Typography,
    Paper,
    Grid,
    MenuItem,
} from '@mui/material'
import FusePageSimple from '@fuse/core/FusePageSimple'
import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import FusePageCarded from '@fuse/core/FusePageCarded'

function ProductionAppMachines() {
    const dispatch = useDispatch()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            firstName: '',
            select: {},
        },
    })
    const onSubmit = (data) => console.log(data)

    return (
        <FusePageCarded
            header={
                <div className="flex flex-col flex-1 w-full mx-auto px-16 pt-8 sm:p-40">
                    <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                        <div className="flex items-center max-w-full">
                            <motion.div
                                className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                                initial={{ x: -20 }}
                                animate={{
                                    x: 0,
                                    transition: { delay: 0.3 },
                                }}
                            >
                                <Typography className="text-16 sm:text-20 truncate font-semibold">
                                    Work Order Maintenance | FO-03-04-01
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className="font-medium"
                                >
                                    Maintenance App | PT Garuda Metalindo.Tbk
                                </Typography>
                            </motion.div>
                        </div>
                    </div>
                </div>
            }
            content={
                <>
                    <div className="flex flex-col flex-1 w-full mx-auto px-16 pt-8 sm:p-40">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Controller
                                        name="com"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Company"
                                                select
                                                autoFocus
                                                fullWidth
                                            >
                                                <MenuItem value="GM1">
                                                    GM1
                                                </MenuItem>
                                                <MenuItem value="GM2">
                                                    GM2
                                                </MenuItem>
                                                <MenuItem value="GM3">
                                                    GM3
                                                </MenuItem>
                                                <MenuItem value="GM5">
                                                    GM5
                                                </MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Controller
                                        name="area"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                // id="kind"
                                                className="mt-8 mb-16"
                                                label="Area"
                                                autoFocus
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="mch_code"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Machine Code"
                                                autoFocus
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Controller
                                        name="req_to"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Request To"
                                                autoFocus
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Controller
                                        name="req_from"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Request From"
                                                autoFocus
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
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Controller
                                        name="start_time"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Start Time"
                                                autoFocus
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="end_time"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="End Time"
                                                autoFocus
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="input_by"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Input By"
                                                autoFocus
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="finished_by"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Finished By"
                                                autoFocus
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="mt-8 mb-16"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </>
            }
        />
    )
}

export default ProductionAppMachines
