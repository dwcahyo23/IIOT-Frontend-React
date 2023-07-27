import { useEffect, useState } from 'react'
import _ from 'lodash'
import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    MenuItem,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import dayjs from 'dayjs'

const schema = yup.object().shape({
    id: yup.string().required('Require id').min(11).max(11),
})

function AcipFrom(params) {
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })
    const { reset, control, onChange, setValue, getValues } = methods

    useEffect(() => {
        const data = { ...params }
        _.map(_.keys(data.params), (val) => {
            console.log(`val: ${val} and value: ${data.params[val]}`)
            if (_.isNull(data.params[val])) {
                setValue(val, '', { shouldDirty: true })
            } else if (val == 'createdAt' || val == 'close_date') {
                setValue(
                    val,
                    dayjs(data.params[val]).format('DD/MM/YYYY HH:mm'),
                    { shouldDirty: true }
                )
            } else if (val == 'image1' || val == 'images2') {
            } else {
                setValue(val, data.params[val], { shouldDirty: true })
            }
        })
    }, [params])

    return (
        <Box sx={{ width: '100', borderBottom: 1, borderColor: 'divider' }}>
            {/* <div className="flex flex-col sm:flex-row items-start justify-between mb-12">
                <Typography className="text-lg font-small tracking-tight leading-6 truncate">
                    5R Form
                </Typography>
            </div> */}
            <div className="flex flex-col">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Controller
                            name="dept"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    label="Departement"
                                    id="dept"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
                        <Controller
                            name="com"
                            control={control}
                            defaultValue=""
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                                    <MenuItem value="Open">Open</MenuItem>
                                    <MenuItem value="Close">Close</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>
                </Grid>
                <Typography className="text-lg font-small tracking-tight leading-6 truncate">
                    Before
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={4}>
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
                                    rows={4}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Controller
                            name="improvement"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    label="Improvement Idea"
                                    id="improvement"
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
                            name="remarks"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    label="Remarks"
                                    id="Remarks"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Typography className="text-lg font-small tracking-tight leading-6 truncate">
                    After
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Controller
                            name="close_date"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    label="Close Finding"
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={4}>
                        <Button
                            className="whitespace-nowrap mb-16"
                            variant="contained"
                            color="secondary"
                            // disabled={valid()}
                            // onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Box>
    )
}

export default AcipFrom
