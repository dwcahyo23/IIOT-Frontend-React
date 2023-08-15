import React from 'react'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { useFormContext, useFieldArray } from 'react-hook-form'
import TableIndex from './TableIndex'
import StatusColor from './utils/StatusColor'
import _ from 'lodash'

function MainteannceApHistory({ data }) {
    const methods = useFormContext()
    const { control, watch } = methods
    const { fields: mow } = useFieldArray({
        name: 'mow',
        control,
    })

    const { fields: report } = useFieldArray({
        name: 'report',
        control,
    })

    const { fields: request } = useFieldArray({
        name: 'request',
        control,
    })

    const joinData = _.chain(report)
        .filter({ audit_report: 'Y' })
        .map((val) => {
            return {
                ...val,
                sheet: _.find(mow, { sheet_no: val.sheet_no }),
                request: _.filter(request, { sheet_no: val.sheet_no }),
            }
        })
        .value()

    console.log(joinData)

    const columns = [
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
            field: 'sheet.ymd',
            headerName: 'Date',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueGetter: (params) => params.row.sheet?.ymd,
            valueFormatter: (params) =>
                dayjs(params.value).format('DD/MM/YY HH:mm'),
        },
        {
            field: 'sheet.memo',
            headerName: 'Problem',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueGetter: (params) => params.row.sheet?.memo,
        },
        {
            field: 'sheet.s_memo',
            headerName: 'Remarks',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueGetter: (params) => params.row.sheet?.s_memo,
        },
        {
            field: 'chronological',
            headerName: 'Chronological',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'corrective',
            headerName: 'Corrective',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'prevention',
            headerName: 'Prevention',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'request',
            headerName: 'Sparepart',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueGetter: (params) =>
                _.map(
                    params.row.request,
                    (val) => val.item_name || val.item_stock
                ),
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
                params={{
                    row: joinData,
                    columns: columns,
                    id: joinData.sheet_no,
                    filter: data?.filter,
                }}
                tableIndex={tableIndex}
            />
        </Box>
    )
}

export default MainteannceApHistory
