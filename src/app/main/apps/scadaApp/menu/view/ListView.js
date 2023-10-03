import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'

import TableIndex from '../../../maintenanceSystem/machineTab/TableIndex'

function ListView({ params }) {
    const tableIndex = (data) => {}
    const columns = [
        {
            field: 'machine.mch_code',
            headerName: 'Mch No',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueGetter: (params) => params.row.machine.mch_code,
        },
        {
            field: 'machine.mch_name',
            headerName: 'Mch Name',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueGetter: (params) => params.row.machine.mch_name,
        },
        {
            field: 'zbConn.din_zb_sens',
            headerName: 'Mch Status',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueGetter: (params) => params.row.zbConn?.din_zb_sens,
            valueFormatter: (params) => {
                if (params.value == 3) {
                    return 'Run'
                } else {
                    return 'Off'
                }
            },
        },
        {
            field: 'zbConn.zb_sens_count',
            headerName: 'Count Pcs',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueGetter: (params) => params.row.zbConn?.count_zb_sens || 0,
        },
        {
            field: 'zbConn.zb_sens_target',
            headerName: 'Target',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueGetter: (params) => params.row.zbConn?.zb_sens_target || 0,
        },
        {
            field: 'zbConn.id_production',
            headerName: 'Id Production',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueGetter: (params) => params.row.zbConn?.id_production || '',
        },
        {
            field: 'zbConn.stop_reason',
            headerName: 'Stop Reason',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueGetter: (params) => params.row.zbConn?.stop_reason || '',
        },
        // {
        //     field: 'zbConn.lock',
        //     headerName: 'Lock',
        //     headerClassName: 'super-app-theme--header',
        //     headerAlign: 'center',
        //     width: 120,
        //     valueGetter: (params) => params.row.zbConn?.lock,
        //     valueFormatter: (params) => {
        //         console.log(params)
        //         if (params.value == 1) {
        //             return 'Y'
        //         } else if (params.value == 0) {
        //             return 'N'
        //         } else {
        //             return ''
        //         }
        //     },
        // },
    ]
    return (
        <Card
            className="flex flex-col shadow mt-16"
            sx={{
                height: 500,
            }}
        >
            <CardContent className="flex flex-col flex-auto p-16">
                <Box
                    className="flex flex-col flex-auto p-16"
                    sx={{
                        width: '100%',
                        height: 500,
                    }}
                >
                    <TableIndex
                        params={{
                            row: params,
                            columns: columns,
                        }}
                        tableIndex={tableIndex}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default ListView
