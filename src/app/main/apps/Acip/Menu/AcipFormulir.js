import { useEffect, useState, forwardRef } from 'react'
import {
    Box,
    Dialog,
    Typography,
    Button,
    AppBar,
    Toolbar,
    Slide,
    Paper,
} from '@mui/material'

import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import dayjs from 'dayjs'

import TableIndex from '../../maintenanceSystem/machineTab/TableIndex'
import StatusColor from '../../maintenanceSystem/machineTab/utils/StatusColor'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getGenbaAcip, saveGenbaAcip } from '../store/genba/genbaAcipSlice'
import AcipDialog from './AcipDialog'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const columns = [
    // {
    //     field: 'id_genba',
    //     headerName: 'ID',
    //     headerClassName: 'super-app-theme--header',
    //     headerAlign: 'center',
    //     width: 100,
    // },
    {
        field: 'dept',
        headerName: 'Dept',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 100,
    },
    {
        field: 'com',
        headerName: 'Plant',
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
        renderCell: (params) => (
            <img
                src={`data:${params.value?.mimetype};base64,${params.value?.data}`}
            />
        ),
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
        renderCell: (params) =>
            params.value ? (
                <img
                    src={`data:${params.value?.mimetype};base64,${params.value?.data}`}
                />
            ) : (
                <img src="assets/images/apps/ecommerce/product-image-placeholder.png" />
            ),
        // images1: `data:${attachmentData.mimetype};base64,${attachmentData.data}`,
    },
    {
        field: 'improvement',
        headerName: 'Idea Improvement',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 120,
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
    const [selectData, setSelectData] = useState(null)
    const [open, setOpen] = useState(false)
    const [toolBarHeader, setToolBarHeader] = useState('Update')

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
        console.log(data)
        setSelectData(data.row)
        setOpen(true)
    }

    const header = (data) => {
        setToolBarHeader(data)
    }

    // const handleSave = (event) => {
    //     console.log(getValues())
    //     dispatch(saveGenbaAcip(getValues())).then((action) => {
    //         if (action.payload) {
    //             dispatch(
    //                 showMessage({ message: 'Data has been saved successfully' })
    //             )
    //             setOpen(false)
    //             setSelectData(null)
    //         }
    //     })
    // }

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
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            {toolBarHeader}
                        </Typography>

                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <AcipDialog data={{ selectData }} header={header} />
            </Dialog>
        </div>
    )
}

export default AcipFormulir
