import { useEffect, useState } from 'react'
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import {
    Box,
    Button,
    Typography,
    Tab,
    TextField,
    Grid,
    MenuItem,
    ImageList,
    CardMedia,
} from '@mui/material'
import { useDeepCompareEffect } from '@fuse/hooks'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import {
    Controller,
    useForm,
    FormProvider,
    useFieldArray,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { getGenbaAcip, saveGenbaAcip } from '../store/genba/genbaAcipSlice'
import { selectUser } from 'app/store/userSlice'
import { showMessage } from 'app/store/fuse/messageSlice'

const schema = yup.object().shape({
    id: yup.string().required('Require id').min(11),
    b_r1: yup.number().min(0).max(30).default(0),
    b_r2: yup.number().min(0).max(30).default(0),
    b_r3: yup.number().min(0).max(30).default(0),
    b_r4: yup.number().min(0).max(30).default(0),
    b_r5: yup.number().min(0).max(30).default(0),
    a_r1: yup.number().min(0).max(30).default(0),
    a_r2: yup.number().min(0).max(30).default(0),
    a_r3: yup.number().min(0).max(30).default(0),
    a_r4: yup.number().min(0).max(30).default(0),
    a_r5: yup.number().min(0).max(30).default(0),
})

function AcipDialog({ data, header }) {
    // console.log(data)
    const dispatch = useDispatch()
    const [tabValue, setTabValue] = useState('1')
    const [beforeImage, setBeforeImage] = useState(null)
    const [AfterImage, setAfterImage] = useState(null)

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })

    const {
        reset,
        watch,
        control,
        onChange,
        formState,
        setValue,
        getValues,
        getFieldState,
    } = methods

    const { errors, isValid } = formState

    // useEffect(() => {
    //     console.log(beforeImage)
    // }, [beforeImage])

    useEffect(() => {
        // console.log(data)
        if (data) {
            const genba = data.selectData
            _.map(_.keys(genba), (val) => {
                if (
                    val == 'due_date' ||
                    val == 'close_date' ||
                    val == 'open_date' ||
                    val == 'createdAt' ||
                    val == 'updatedAt'
                ) {
                    if (_.isNull(genba[val])) {
                        setValue(val, dayjs(), {
                            shouldDirty: true,
                        })
                    } else {
                        setValue(val, dayjs(genba[val]), {
                            shouldDirty: true,
                        })
                    }
                } else if (val == 'images1' || val == 'images2') {
                    const images1 = genba['images1']
                    setBeforeImage(
                        `data:${images1.mimetype};base64,${images1.data}`
                    )

                    if (_.isNull(genba['images2'])) {
                    } else {
                        const images2 = genba['images2']
                        setAfterImage(
                            `data:${images2.mimetype};base64,${images2.data}`
                        )
                    }
                } else {
                    if (_.isNull(genba[val])) {
                        // setValue(val, '', {
                        //     shouldDirty: true,
                        // })
                    } else {
                        setValue(val, genba[val], {
                            shouldDirty: true,
                        })
                    }
                    // console.log(_.isNull(genba[val]))
                }
            })
        }
    }, [data])

    function handleTabChange(ev, val) {
        setTabValue(val)
        if (val == 1) {
            header('Genba 5R')
        } else if (val == 2) {
            header('Before Genba 5R')
        } else if (val == 3) {
            header('After Improvement')
        }
    }

    function handleSave() {
        console.log(getValues())
        dispatch(saveGenbaAcip(getValues())).then((action) => {
            if (action.payload) {
                dispatch(getGenbaAcip())
                dispatch(
                    showMessage({
                        message: 'Data has been saved successfully',
                    })
                )
            }
        })
    }

    return (
        <FormProvider {...methods}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleTabChange}
                        aria-label="lab API tabs example"
                    >
                        <Tab label="Genba 5R" value="1" />
                        <Tab label="Before" value="2" />
                        <Tab label="Afer" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div style={{ width: 900, height: 450 }}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Controller
                                        name="id_genba"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="ID"
                                                id="id_genba"
                                                variant="outlined"
                                                fullWidth
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="from"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="From"
                                                id="from"
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
                                        name="mch_code"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Machine Code"
                                                id="mch_code"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="dept"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Dept_no"
                                                id="dept"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="area"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Area"
                                                id="area"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="com"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Plant"
                                                id="com"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Controller
                                        name="cat"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Category"
                                                id="cat"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="status"
                                        defaultValue="Open"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="Status"
                                                select
                                                autoFocus
                                                id="status"
                                                fullWidth
                                            >
                                                <MenuItem value="Open">
                                                    Open
                                                </MenuItem>
                                                <MenuItem value="Close">
                                                    Close
                                                </MenuItem>
                                            </TextField>
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
                                        // disabled={valid()}
                                        onClick={handleSave}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </TabPanel>

                <TabPanel value="2">
                    <div style={{ width: 900, height: 450 }}>
                        <Box>
                            <div className="flex flex-auto items-center min-w-0">
                                <div className="flex flex-col sm:flex-row items-start justify-between">
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 300, height: 300 }}
                                        image={beforeImage}
                                        alt="Images"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row ml-16 items-end justify-between">
                                    <div className="w-full">
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="b_r1"
                                                    control={control}
                                                    defaultValue={0}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R1"
                                                            id="R1"
                                                            error={
                                                                !!errors.b_r1
                                                            }
                                                            helperText={
                                                                errors?.b_r1
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            type="number"
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="b_r2"
                                                    control={control}
                                                    defaultValue={0}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R2"
                                                            id="R2"
                                                            error={
                                                                !!errors.b_r2
                                                            }
                                                            helperText={
                                                                errors?.b_r2
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            type="number"
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="b_r3"
                                                    control={control}
                                                    defaultValue={0}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R3"
                                                            id="R3"
                                                            error={
                                                                !!errors.b_r3
                                                            }
                                                            helperText={
                                                                errors?.b_r3
                                                                    ?.message
                                                            }
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
                                                    name="b_r4"
                                                    control={control}
                                                    defaultValue={0}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R4"
                                                            id="R4"
                                                            error={
                                                                !!errors.b_r4
                                                            }
                                                            helperText={
                                                                errors?.b_r4
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            type="number"
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="b_r5"
                                                    control={control}
                                                    defaultValue={0}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R5"
                                                            id="R5"
                                                            error={
                                                                !!errors.b_r5
                                                            }
                                                            helperText={
                                                                errors?.b_r5
                                                                    ?.message
                                                            }
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
                                                    name="open_date"
                                                    control={control}
                                                    defaultValue={dayjs()}
                                                    render={({ field }) => (
                                                        <LocalizationProvider
                                                            dateAdapter={
                                                                AdapterDayjs
                                                            }
                                                        >
                                                            <DateTimePicker
                                                                {...field}
                                                                ampm={false}
                                                                className="mt-8 mb-16"
                                                                id="open_date"
                                                                label="Open Findings"
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
                                            <Grid item xs={5}>
                                                <Controller
                                                    name="due_date"
                                                    control={control}
                                                    defaultValue={dayjs()}
                                                    render={({ field }) => (
                                                        <LocalizationProvider
                                                            dateAdapter={
                                                                AdapterDayjs
                                                            }
                                                        >
                                                            <DateTimePicker
                                                                {...field}
                                                                ampm={false}
                                                                className="mt-8 mb-16"
                                                                id="due_date"
                                                                label="Due Date"
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
                                                    name="case"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="Case"
                                                            id="case"
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
                                                    // disabled={valid()}
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
                    </div>
                </TabPanel>

                <TabPanel value="3">
                    <div style={{ width: 900, height: 450 }}>
                        <Box>
                            <div className="flex flex-auto items-center min-w-0">
                                <div className="flex flex-col sm:flex-row items-start justify-between">
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 300, height: 300 }}
                                        image={
                                            AfterImage ||
                                            'assets/images/apps/ecommerce/product-image-placeholder.png'
                                        }
                                        alt="Images"
                                    />

                                    {/* <img
                                                    className="w-full block rounded"
                                                    src="assets/images/apps/ecommerce/product-image-placeholder.png"
                                                    alt={n.item_name}
                                                /> */}
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
                                                            error={
                                                                !!errors.a_r1
                                                            }
                                                            helperText={
                                                                errors?.a_r1
                                                                    ?.message
                                                            }
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
                                                            error={
                                                                !!errors.a_r2
                                                            }
                                                            helperText={
                                                                errors?.a_r2
                                                                    ?.message
                                                            }
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
                                                            error={
                                                                !!errors.a_r3
                                                            }
                                                            helperText={
                                                                errors?.a_r3
                                                                    ?.message
                                                            }
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
                                                            error={
                                                                !!errors.a_r4
                                                            }
                                                            helperText={
                                                                errors?.a_r4
                                                                    ?.message
                                                            }
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
                                                            error={
                                                                !!errors.a_r5
                                                            }
                                                            helperText={
                                                                errors?.a_r5
                                                                    ?.message
                                                            }
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
                                                    defaultValue={dayjs()}
                                                    render={({ field }) => (
                                                        <LocalizationProvider
                                                            dateAdapter={
                                                                AdapterDayjs
                                                            }
                                                        >
                                                            <DateTimePicker
                                                                {...field}
                                                                ampm={false}
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
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
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
                                                    // disabled={valid()}
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
                    </div>
                </TabPanel>
            </TabContext>
        </FormProvider>
    )
}

export default AcipDialog
