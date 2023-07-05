import React from 'react'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { useFormContext, useFieldArray } from 'react-hook-form'
import TableIndex from './TableIndex'
import StatusColor from './utils/StatusColor'

function MaintenanceApsheet() {
    const methods = useFormContext()
    const { control, watch } = methods
    const { fields, remove, append } = useFieldArray({
        name: 'mow',
        control,
    })

    // console.log(fields)

    const columns = [
        {
            field: 'sheet_no',
            headerName: 'AP-Sheet',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
        },
        {
            field: 'mch_no',
            headerName: 'Machine',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
        },
        {
            field: 'pri_no',
            headerName: 'Status',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            align: 'center',
            renderCell: (params) => <StatusColor id={params.value} />,
        },
        {
            field: 'chk_mark',
            headerName: 'Audit',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 90,
            align: 'center',
            renderCell: (params) => <StatusColor id={params.value} />,
        },
        {
            field: 's_ymd',
            headerName: 'Stop',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
            valueFormatter: (params) =>
                dayjs(params.value).format('DD/MM/YYYY HH:mm'),
        },
        {
            field: 'memo',
            headerName: 'Problem',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 's_memo',
            headerName: 'Remarks',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
    ]

    const tableIndex = (data) => {
        console.log(data.row)
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

export default MaintenanceApsheet
