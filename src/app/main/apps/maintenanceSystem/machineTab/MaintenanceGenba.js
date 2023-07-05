import { useEffect, useState } from 'react'
import { TextField, Button, Grid, Box, MenuItem, Select } from '@mui/material'
import { Controller, useFormContext, useFieldArray } from 'react-hook-form'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TableIndex from './TableIndex'
import { showMessage } from 'app/store/fuse/messageSlice'
import {
    getMaintenanceSystem,
    saveMaintenanceSystem,
} from '../store/machineChildren/machineChildrenSlice'
import { selectUser } from 'app/store/userSlice'
import StatusColor from './utils/StatusColor'

function MaintenanceGenba() {
    const dispatch = useDispatch()

    const user = useSelector(selectUser)
    const methods = useFormContext()
    const { control, formState, watch, getValues, setValue, getFieldState } =
        methods
    const { errors, isValid } = formState

    const { fields, remove, append } = useFieldArray({
        name: 'genba',
        control,
    })

    const options = {
        string: true,
        headers: {
            'User-Agent': 'my-app',
        },
    }

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
    }

    return (
        <div>
            <Box
                sx={{
                    width: '100%',
                    height: 600,
                }}
            >
                <TableIndex
                    params={{
                        row: fields,
                        columns: columns,
                        id: fields.sheet_no,
                    }}
                    tableIndex={tableIndex}
                />
            </Box>
        </div>
    )
}

export default MaintenanceGenba
