import { useEffect, useState } from 'react'
import {
    Box,
    Button,
    TextField,
    Grid,
    CardMedia,
    Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { Controller, useFormContext } from 'react-hook-form'
import _ from 'lodash'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import FuseSvgIcon from '@fuse/core/FuseSvgIcon'

import { useDispatch } from 'react-redux'
import { saveGenbaAcip } from '../../store/genba/genbaAcipSlice'
import { showMessage } from 'app/store/fuse/messageSlice'
import { selectUser } from 'app/store/userSlice'
import { useSelector } from 'react-redux'

function Tab3() {
    const dispatch = useDispatch()
    const methods = useFormContext()
    const { control, formState, getValues, setValue, resetField } = methods
    const { errors, isValid } = formState
    const { images2 } = getValues()
    const user = useSelector(selectUser)
    const [isDiable, setDisabled] = useState(true)

    useEffect(() => {
        if (user.data.userNIK !== 'user5r') setDisabled(false)
    }, [])

    function withImage() {
        return _.isPlainObject(images2)
            ? `data:${images2.mimetype};base64,${images2.data}`
            : `assets/images/apps/ecommerce/product-image-placeholder.png`
    }

    function handleSave(params) {
        // console.log(getValues('new_img1'))
        const data = getValues()
        const omitData = _.omit(data, ['images1', 'images2'])

        // console.log(omitData)
        dispatch(saveGenbaAcip(omitData)).then((action) => {
            if (action.payload) {
                dispatch(
                    showMessage({
                        message: 'Data has been saved successfully',
                        variant: 'success',
                    })
                )
            }
        })
    }

    return (
        <Box>
            <div className="flex flex-auto items-center min-w-0">
                <div className="flex flex-col sm:flex-row items-start justify-between">
                    <div className="w-full">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CardMedia
                                    component="img"
                                    className="mt-8 mb-16"
                                    sx={{ width: 300, height: 300 }}
                                    image={withImage()}
                                    alt="Images"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Controller
                                    name="new_img2"
                                    control={control}
                                    render={({ field }) => (
                                        <Box
                                            component="label"
                                            htmlFor="button-file"
                                            className="flex items-center justify-center relative w-256 h-56 rounded-16 mx-12 mt-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                                        >
                                            <input
                                                accept="image/*"
                                                className="hidden"
                                                id="button-file"
                                                type="file"
                                                onChange={async (e) => {
                                                    function readFileAsync() {
                                                        return new Promise(
                                                            (
                                                                resolve,
                                                                reject
                                                            ) => {
                                                                const file =
                                                                    e.target
                                                                        .files[0]
                                                                if (!file) {
                                                                    return
                                                                }
                                                                const reader =
                                                                    new FileReader()

                                                                reader.onload =
                                                                    () => {
                                                                        resolve(
                                                                            {
                                                                                mimetype:
                                                                                    file.type,
                                                                                data: `${btoa(
                                                                                    reader.result
                                                                                )}`,
                                                                                filesize:
                                                                                    file.size *
                                                                                    1,
                                                                            }
                                                                        )
                                                                    }

                                                                reader.onerror =
                                                                    reject

                                                                reader.readAsBinaryString(
                                                                    file
                                                                )
                                                            }
                                                        )
                                                    }

                                                    const newImage =
                                                        await readFileAsync()

                                                    field.onChange(newImage)
                                                }}
                                            />
                                            <FuseSvgIcon
                                                size={20}
                                                color="action"
                                            >
                                                heroicons-outline:upload
                                            </FuseSvgIcon>

                                            <Typography>upload</Typography>
                                        </Box>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row ml-16 items-end justify-between">
                    <div className="w-full">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Controller
                                    name="a_r1"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R1"
                                            id="R1"
                                            value={field.value || 0}
                                            error={!!errors.a_r1}
                                            helperText={errors?.a_r1?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="a_r2"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R2"
                                            id="R2"
                                            value={field.value || 0}
                                            error={!!errors.a_r2}
                                            helperText={errors?.a_r2?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="a_r3"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R3"
                                            id="R3"
                                            value={field.value || 0}
                                            error={!!errors.a_r3}
                                            helperText={errors?.a_r3?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Controller
                                    name="a_r4"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R4"
                                            id="R4"
                                            value={field.value || 0}
                                            error={!!errors.a_r4}
                                            helperText={errors?.a_r4?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="a_r5"
                                    control={control}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="R5"
                                            id="R5"
                                            value={field.value || 0}
                                            error={!!errors.a_r5}
                                            helperText={errors?.a_r5?.message}
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <Controller
                                    name="close_date"
                                    control={control}
                                    render={({ field }) => (
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DateTimePicker
                                                {...field}
                                                ampm={false}
                                                value={dayjs(field.value)}
                                                className="mt-8 mb-16"
                                                id="close_date"
                                                label="Close Findings"
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
                            <Grid item xs={12}>
                                <Controller
                                    name="improvement"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            value={field.value || ''}
                                            className="mt-8 mb-16"
                                            label="Idea Improvement"
                                            id="improvement"
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
                            <Grid item xs={4}>
                                <Button
                                    className="whitespace-nowrap mb-16"
                                    variant="contained"
                                    color="secondary"
                                    disabled={isDiable}
                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default Tab3
