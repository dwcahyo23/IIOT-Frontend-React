import _ from '@lodash'
import { useDeepCompareEffect, useThemeMediaQuery } from '@fuse/hooks'
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenbaAcip, selectGenbaAcip } from '../store/genba/genbaAcipSlice'
import TableIndex from '../../maintenanceSystem/machineTab/TableIndex'
import dayjs from 'dayjs'

import AcipHeader from './AcipHeader'

function Acip() {
    const genba = useSelector(selectGenbaAcip)
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [open, setOpen] = useState(false)

    console.log(genba)

    const columns = [
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
            field: 'images2',
            headerName: 'After',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
            renderCell: (params) => <img src={params.value} />,
        },
        {
            field: 'case',
            headerName: 'Case',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'improvement',
            headerName: 'Improvement',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
    ]

    const tableIndex = (data) => {
        console.log(data.row)
        setOpen(true)
    }

    useEffect(() => {
        // if (tableIndex) {
        //     setOpen(true)
        // }
    }, [tableIndex])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    if (genba) {
        return (
            <FusePageCarded
                header={<AcipHeader />}
                content={
                    <>
                        <Box
                            sx={{
                                width: '100%',
                                height: 600,
                            }}
                        >
                            <div className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
                                <TableIndex
                                    params={{
                                        row: genba,
                                        columns: columns,
                                        id: genba.id,
                                    }}
                                    tableIndex={tableIndex}
                                />
                            </div>
                            <div className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Update</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Email Address"
                                            type="email"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleClose}>
                                            Subscribe
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Box>
                    </>
                }
                scroll={isMobile ? 'normal' : 'content'}
            />
        )
    }
}

export default Acip
