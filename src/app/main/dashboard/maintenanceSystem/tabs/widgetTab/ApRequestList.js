import { useState, useEffect } from 'react'
import {
    Box,
    Grid,
    Button,
    Typography,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { Controller, useFormContext, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import axios from 'axios'
import _ from 'lodash'

import { selectUser } from 'app/store/userSlice'
import TableGrid from './utils/TableGrid'
import { showMessage } from 'app/store/fuse/messageSlice'
import StatusColor from 'src/app/main/apps/maintenanceSystem/machineTab/utils/StatusColor'

function ApRequestList() {
    const methods = useFormContext()
    const user = useSelector(selectUser)
    const [selectWa, setSelectWa] = useState(null)
    const [open, setOpen] = useState(false)

    const { control, formState, watch, setValue } = methods

    const { fields: requestList } = useFieldArray({
        name: 'requestList',
        control,
    })

    const columnsRequest = [
        {
            field: 'sheet_no',
            headerName: 'AP-Sheet',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
        },
        {
            field: 'mch_code',
            headerName: 'Machine',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
        },
        {
            field: 'item_stock',
            headerName: 'Sparepart',
            minWidth: 200,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'item_name',
            headerName: 'Remarks',
            minWidth: 150,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'mre_request',
            headerName: 'MRE NO',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            minWidth: 130,
        },
        {
            field: 'audit_request',
            headerName: 'Audit',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
            align: 'center',
            renderCell: (params) => <StatusColor id={params.value} />,
        },
        {
            field: 'item_ready',
            headerName: 'Ready',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
            align: 'center',
            renderCell: (params) =>
                params.value === 'Y' ? <StatusColor id="Ready" /> : '',
        },

        {
            field: 'item_qty',
            headerName: 'Qty',
            width: 50,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'item_uom',
            headerName: 'Uom',
            width: 50,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'createdAt',
            headerName: 'Date',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueFormatter: (params) =>
                dayjs(params.value).format('DD/MM/YYYY HH:mm'),
        },
        {
            field: 'date_ready_request',
            headerName: 'Ready Date',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueFormatter: (params) =>
                params.value
                    ? dayjs(params.value).format('DD/MM/YYYY HH:mm')
                    : '',
        },
        {
            field: 'date_mre_request',
            headerName: 'MRE Date',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueFormatter: (params) =>
                params.value
                    ? dayjs(params.value).format('DD/MM/YYYY HH:mm')
                    : '',
        },
        {
            field: 'date_audit_request',
            headerName: 'Audit Date',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueFormatter: (params) =>
                params.value
                    ? dayjs(params.value).format('DD/MM/YYYY HH:mm')
                    : '',
        },
        {
            field: 'user_req1',
            headerName: 'Request By',
            width: 100,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'user_req2',
            headerName: 'Audit/Cancel By',
            width: 100,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
    ]

    const handleClose = () => {
        setOpen(false)
    }

    const tableIndex = (data) => {}

    return (
        <Box style={{ width: '100%', height: 500 }}>
            <div style={{ width: '100%', height: 450 }}>
                <TableGrid
                    params={{
                        row: requestList,
                        columns: columnsRequest,
                        user: _.pick(user.data, [
                            'datumUuid',
                            'displayName',
                            'userRole',
                        ]),
                    }}
                    tableIndex={tableIndex}
                />
            </div>
        </Box>
    )
}

export default ApRequestList
