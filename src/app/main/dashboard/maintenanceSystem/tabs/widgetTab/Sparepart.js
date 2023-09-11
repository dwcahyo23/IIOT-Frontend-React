import React from 'react'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { useFormContext, useFieldArray } from 'react-hook-form'

import TableIndex from 'src/app/main/apps/maintenanceSystem/machineTab/TableIndex'
import StatusColor from 'src/app/main/apps/maintenanceSystem/machineTab/utils/StatusColor'
import ProgressBar from 'src/app/main/apps/maintenanceSystem/machineTab/utils/ProgressBar'

function Sparepart() {
    const methods = useFormContext()
    const { control } = methods

    const { fields: sparepartList } = useFieldArray({
        name: 'sparepartList',
        control,
    })

    const columns = [
        {
            field: 'bom',
            headerName: 'BOM',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
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
            field: 'category',
            headerName: 'Category',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
        },
        {
            field: 'item_name',
            headerName: 'Sparepart',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'item_change_date',
            headerName: 'Last Change',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
            valueFormatter: (params) =>
                dayjs(params.value[0]).format('DD/MM/YYYY HH:mm'),
        },
        {
            field: 'item_life_time',
            headerName: 'Life Time',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
            valueFormatter: (params) => `${params.value}H`,
        },
        {
            field: 'item_lead_time',
            headerName: 'Lead Time',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
            valueFormatter: (params) => `${params.value}H`,
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
                params={{ row: sparepartList, columns: columns }}
                tableIndex={tableIndex}
            />
        </Box>
    )
}

export default Sparepart
