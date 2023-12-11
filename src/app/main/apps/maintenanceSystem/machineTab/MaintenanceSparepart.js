import React from 'react'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { useFormContext, useFieldArray } from 'react-hook-form'
import TableIndex from './TableIndex'
import StatusColor from './utils/StatusColor'
import ProgressBar from './utils/ProgressBar'

function MaintenanceSparepart() {
    const methods = useFormContext()
    const { control, watch } = methods
    const { fields, remove, append } = useFieldArray({
        name: 'sparepart',
        control,
    })

    // console.log(fields)

    const columns = [
        {
            field: 'bom',
            headerName: 'BOM',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
        },
        {
            field: 'item_change_date',
            headerName: 'Date',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
            valueFormatter: (params) =>
                dayjs(params.value[0]).format('DD/MM/YYYY HH:mm'),
        },
        {
            field: 'category',
            headerName: 'Category',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
        },
        {
            field: 'item_name',
            headerName: 'Sparepart',
            width: 200,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'progress_bar',
            headerName: 'Life Time Bar',
            width: 150,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueGetter: (params) => {
                return (
                    dayjs(params.row.item_change_date[0])
                        .add(params.row.item_life_time, 'hour')
                        .diff(dayjs(), 'h', true) / params.row.item_life_time
                )
            },
            renderCell: (params) => <ProgressBar value={params.value} />,
        },
        {
            field: 'item_life_time',
            headerName: 'Life Time Hours',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
            valueFormatter: (params) => `${params.value}H`,
        },
        {
            field: 'estimation',
            headerName: 'Life Time End',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
            valueGetter: (params) => {
                return dayjs(params.row.item_change_date[0])
                    .add(params.row.item_life_time, 'hour')
                    .format('DD/MM/YYYY HH:mm')
            },
        },
        {
            field: 'item_lead_time',
            headerName: 'Lead Time Hours',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
            valueFormatter: (params) => `${params.value}H`,
        },
        {
            field: 'warning',
            headerName: 'Warning Lead Time',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
            valueGetter: (params) => {
                return dayjs(params.row.item_change_date[0])
                    .add(params.row.item_life_time, 'hour')
                    .subtract(params.row.item_lead_time, 'hour')
                    .format('DD/MM/YYYY HH:mm')
            },
        },
    ]

    const tableIndex = (data) => {
        console.log(data)
    }

    return (
        <Box
            sx={{
                height: 600,
                width: '100%',
            }}
        >
            <TableIndex
                params={{ row: fields, columns: columns, id: fields.sheet_no }}
                tableIndex={tableIndex}
            />
        </Box>
    )
}

export default MaintenanceSparepart
