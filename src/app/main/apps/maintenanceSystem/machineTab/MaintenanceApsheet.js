import React from 'react'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { useFormContext, useFieldArray } from 'react-hook-form'
import TableIndex from './TableIndex'
import StatusColor from './utils/StatusColor'
import _ from 'lodash'

function MaintenanceApsheet({ data }) {
    const methods = useFormContext()
    const { control, watch } = methods

    const { fields: sheet_no } = useFieldArray({
        name: 'mow',
        control,
    })

    const { fields: report } = useFieldArray({
        name: 'report',
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
            headerName: 'Audit AP-Sheet',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            align: 'center',
            renderCell: (params) => <StatusColor id={params.value} />,
        },
        {
            field: 'report',
            headerName: 'Audit AP-Report',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            align: 'center',
            renderCell: (params) => {
                const res = _.find(report && report, {
                    sheet_no: params.row.sheet_no,
                })
                return _.isUndefined(res) ? (
                    <StatusColor id="R" />
                ) : _.isUndefined(res) == false && res.audit_report == 'N' ? (
                    <StatusColor id="N" />
                ) : (
                    <StatusColor id="Y" />
                )
            },
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
            field: 'm_ymd',
            headerName: 'Target',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
            renderCell: (params) => {
                const res = _.find(report && report, {
                    sheet_no: params.row.sheet_no,
                })
                return _.isUndefined(res) ? (
                    <StatusColor id="T" />
                ) : (
                    dayjs(res.date_target).format('DD/MM/YYYY HH:mm')
                )
            },
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
                params={{
                    row: sheet_no,
                    columns: columns,
                    id: sheet_no.sheet_no,
                    filter: data?.filter,
                }}
                tableIndex={tableIndex}
            />
        </Box>
    )
}

export default MaintenanceApsheet
