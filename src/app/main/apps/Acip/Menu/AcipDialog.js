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

import { selectUser } from 'app/store/userSlice'
import { showMessage } from 'app/store/fuse/messageSlice'

const schema = yup.object().shape({
    id_request: yup
        .string()
        .required('Require machine ap-sheet')
        .min(11)
        .max(11),
    item_name: yup.string().required('Require item name'),
    item_qty: yup.number().positive().required('Require item qty'),
    item_uom: yup.string().required('Require item uom').min(3).max(3),
    chronological: yup.string().required('Require machine chronological'),
    corrective: yup.string().required('Require machine corrective'),
    prevention: yup.string().required('Require machine prevention'),
})

function AcipDialog({ data, header }) {
    // console.log(data)
    const dispatch = useDispatch()
    const [tabValue, setTabValue] = useState('1')
    const [beforeImage, setBeforeImage] = useState(null)

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
                } else if (val == 'images1' || val == 'images2') {
                    setBeforeImage(genba['images1'])
                } else {
                    if (_.isNull(genba[val])) {
                        setValue(val, '', {
                            shouldDirty: true,
                        })
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
                                        name="id"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                label="ID"
                                                id="id"
                                                variant="outlined"
                                                fullWidth
                                                disabled
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
                                                disabled
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
                                        alt="Paella dish"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row ml-16 items-end justify-between">
                                    <div className="w-full">
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="b_r1"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R1"
                                                            id="R1"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="b_r2"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R2"
                                                            id="R2"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="b_r3"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R3"
                                                            id="R3"
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
                                                    name="b_r4"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R4"
                                                            id="R4"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="b_r5"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R5"
                                                            id="R5"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={5}>
                                                <Controller
                                                    name="createdAt"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="Open Finding"
                                                            id="createdAt"
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
                                            <Grid item xs={12}>
                                                <Controller
                                                    name="remarks"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="Remarks"
                                                            id="remarks"
                                                            variant="outlined"
                                                            fullWidth
                                                            multiline
                                                            rows={6}
                                                        />
                                                    )}
                                                />
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
                                        image={beforeImage}
                                        alt="Paella dish"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row ml-16 items-end justify-between">
                                    <div className="w-full">
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="a_r1"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R1"
                                                            id="R1"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="a_r2"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R2"
                                                            id="R2"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="a_r3"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R3"
                                                            id="R3"
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
                                                    name="a_r4"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R4"
                                                            id="R4"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="a_r5"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="R5"
                                                            id="R5"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={5}>
                                                <Controller
                                                    name="createdAt"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="Open Finding"
                                                            id="createdAt"
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
                                            <Grid item xs={12}>
                                                <Controller
                                                    name="remarks"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            className="mt-8 mb-16"
                                                            label="Remarks"
                                                            id="remarks"
                                                            variant="outlined"
                                                            fullWidth
                                                            multiline
                                                            rows={6}
                                                        />
                                                    )}
                                                />
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
