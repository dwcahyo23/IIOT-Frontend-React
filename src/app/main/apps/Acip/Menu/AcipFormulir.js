import { useEffect, useState, forwardRef } from 'react'
import {
    Box,
    Dialog,
    Typography,
    Button,
    AppBar,
    Toolbar,
    Slide,
    Grid,
    IconButton,
    TextField,
    MenuItem,
} from '@mui/material'
import { SaveAs } from '@mui/icons-material'
import { Cancel } from '@mui/icons-material'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import dayjs from 'dayjs'

import TableIndex from '../../maintenanceSystem/machineTab/TableIndex'
import StatusColor from '../../maintenanceSystem/machineTab/utils/StatusColor'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getGenbaAcip, saveGenbaAcip } from '../store/genba/genbaAcipSlice'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 100,
    },
    {
        field: 'dept',
        headerName: 'Dept',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 100,
    },
    {
        field: 'area',
        headerName: 'Area',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 100,
    },
    {
        field: 'cat',
        headerName: 'Category',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 100,
    },
    {
        field: 'createdAt',
        headerName: 'Date',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 120,
        align: 'center',
        valueFormatter: (params) =>
            dayjs(params.value).format('DD/MM/YY HH:mm'),
    },
    {
        field: 'images1',
        headerName: 'Before',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 150,
        renderCell: (params) => <img src={params.value} />,
    },

    {
        field: 'case',
        headerName: 'Case',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 120,
    },
    {
        field: 'b_r1',
        headerName: 'R1',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'b_r2',
        headerName: 'R2',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'b_r3',
        headerName: 'R3',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'b_r4',
        headerName: 'R4',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'b_r5',
        headerName: 'R5',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'images2',
        headerName: 'After',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 150,
        renderCell: (params) => <img src={params.value} />,
    },
    {
        field: 'close_date',
        headerName: 'Close',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 120,
        align: 'center',
        valueFormatter: (params) =>
            dayjs(params.value).format('DD/MM/YY HH:mm'),
    },
    {
        field: 'status',
        headerName: 'Status',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 150,
        renderCell: (params) => <StatusColor id={params.value} />,
    },
    {
        field: 'a_r1',
        headerName: 'R1',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'a_r2',
        headerName: 'R2',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'a_r3',
        headerName: 'R3',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'a_r4',
        headerName: 'R4',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'a_r5',
        headerName: 'R5',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
]

function AcipFormulir() {
    const dispatch = useDispatch()
    const methods = useFormContext()
    const { control, formState, watch, getValues, setValue, getFieldState } =
        methods
    const { errors, isValid } = formState

    const [open, setOpen] = useState(false)

    const { fields, remove, append } = useFieldArray({
        name: 'data',
        control,
    })

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false)
        }
    }

    const tableIndex = (data) => {
        // setSelectData(data.row)
        setOpen(true)

        setValue('id', data.row.id, { shouldDirty: true })
        setValue('case', data.row.case, {
            shouldDirty: true,
        })
        setValue('open_date', dayjs().format('DD/MM/YYYY HH:mm'), {
            shouldDirty: true,
        })
        setValue('close_date', dayjs().format('DD/MM/YYYY HH:mm'), {
            shouldDirty: true,
        })
        setValue('due_date', dayjs().format('DD/MM/YYYY HH:mm'), {
            shouldDirty: true,
        })

        // _.map(_.keys(data.row), (val) => {
        //     if (_.isNull(data.row[val])) {
        //         setValue(val, '', { shouldDirty: true })
        //     } else if (val == 'createdAt' || val == 'close_date') {
        //         setValue(val, dayjs(data.row[val]).format('DD/MM/YYYY HH:mm'), {
        //             shouldDirty: true,
        //         })
        //     } else if (val == 'images1' || val == 'images2') {
        //     } else {
        //         setValue(val, data.row[val], { shouldDirty: true })
        //     }
        // })
    }

    const handleSave = (event) => {
        console.log(getValues())
        dispatch(saveGenbaAcip(getValues())).then((action) => {
            if (action.payload) {
                dispatch(
                    showMessage({ message: 'Data has been saved successfully' })
                )
                setOpen(false)
                setSelectData(null)
            }
        })
    }

    return (
        <div>
            <Box
                sx={{
                    width: '100%',
                    height: 600,
                }}
            >
                <div className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
                    <TableIndex
                        params={{
                            row: fields,
                            columns: columns,
                            id: fields.id,
                        }}
                        tableIndex={tableIndex}
                    />
                </div>
            </Box>
            <Dialog
                open={open}
                maxWidth={'xl'}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleSave}
                            aria-label="close"
                        >
                            <SaveAs />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            Update
                        </Typography>

                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>

                <Box
                    sx={{
                        width: '100%',
                        padding: 6,
                    }}
                >
                    <div className="flex flex-col">
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Controller
                                    name="id"
                                    //defaultValue=""
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="id"
                                            id="id"
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
                            <Grid item xs={2}>
                                <Controller
                                    name="dept"
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                        <Typography className="text-lg font-small tracking-tight leading-6 truncate">
                            Before
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Controller
                                    name="createdAt"
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                                    //defaultValue=""
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
                    </div>
                </Box>
            </Dialog>
        </div>
    )
}

export default AcipFormulir
