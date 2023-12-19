import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import _ from 'lodash'

import StatusColor from '../../maintenanceSystem/machineTab/utils/StatusColor'
import Table from './Table'

function AcipList({ params, paramsId }) {
    const tableIndex = (data) => {
        paramsId(data)
    }

    const columns = [
        // {
        //     field: 'id_genba',
        //     headerName: 'ID',
        //     headerClassName: 'super-app-theme--header',
        //     headerAlign: 'center',
        // align:'center',
        //     width: 100,
        // },
        {
            field: 'sheet',
            headerName: 'Sheet',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 100,
        },
        {
            field: 'status',
            headerName: 'Status',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 150,
            renderCell: (params) => <StatusColor id={params.value} />,
        },
        {
            field: 'dept',
            headerName: 'Dept',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 100,
        },
        {
            field: 'com',
            headerName: 'Plant',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 100,
        },
        {
            field: 'area',
            headerName: 'Area',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 100,
        },
        {
            field: 'cat',
            headerName: 'Category',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 100,
        },
        {
            field: 'createdAt',
            headerName: 'Date',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 120,
            valueFormatter: (params) =>
                dayjs(params.value).format('DD/MM/YY HH:mm'),
        },
        {
            field: 'images1',
            headerName: 'Before',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 150,
            valueGetter: (params) => params.row.images1,
            renderCell: (params) => {
                if (_.isObject(params.value)) {
                    return (
                        <img
                            src={`data:${params.value?.mimetype};base64,${params.value?.data}`}
                        />
                    )
                } else {
                    return (
                        <img src="assets/images/apps/ecommerce/product-image-placeholder.png" />
                    )
                }
            },
        },
        {
            field: 'case',
            headerName: 'Case',
            minWidth: 180,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'b_r1',
            headerName: 'R1',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'b_r2',
            headerName: 'R2',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'b_r3',
            headerName: 'R3',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'b_r4',
            headerName: 'R4',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'b_r5',
            headerName: 'R5',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        // {
        //     field: 'images2',
        //     headerName: 'After',
        //     headerClassName: 'super-app-theme--header',
        //     headerAlign: 'center',
        // align:'center',
        //     width: 150,
        //     valueGetter: (params) => params.row.images2,
        //     renderCell: (params) => {
        //         // console.log(params.value)
        //         if (_.isArray(params.value)) {
        //             // console.log('array')
        //             return (
        //                 <img src="assets/images/apps/ecommerce/product-image-placeholder.png" />
        //             )
        //         } else {
        //             return (
        //                 <img
        //                     src={`data:${params.value?.mimetype};base64,${params.value?.data}`}
        //                 />
        //             )
        //         }
        //     },
        // },
        {
            field: 'improvement',
            headerName: 'Idea Improvement',
            minWidth: 180,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'close_date',
            headerName: 'Close',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 120,
            valueFormatter: (params) =>
                dayjs(params.value).format('DD/MM/YY HH:mm'),
        },
        {
            field: 'a_r1',
            headerName: 'R1',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'a_r2',
            headerName: 'R2',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'a_r3',
            headerName: 'R3',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'a_r4',
            headerName: 'R4',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'a_r5',
            headerName: 'R5',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
    ]

    return (
        <Card
            className="flex flex-col shadow mt-16"
            sx={{
                height: 700,
            }}
        >
            <CardContent className="flex flex-col flex-auto p-16">
                <Box
                    className="flex flex-col flex-auto p-16"
                    sx={{
                        width: '100%',
                        height: 700,
                    }}
                >
                    <Table
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

export default AcipList
