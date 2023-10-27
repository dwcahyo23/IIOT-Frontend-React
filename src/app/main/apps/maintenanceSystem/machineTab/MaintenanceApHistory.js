import { useRef } from 'react'
import { Box, Button, Grid } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import TableIndex from './TableIndex'
import StatusColor from './utils/StatusColor'
import _ from 'lodash'
import ReactToPrint from 'react-to-print'
import PrintApHistory from './print/PrintApHistory'

function MainteannceApHistory({ data }) {
    const methods = useFormContext()
    const { control, watch } = methods
    const { print, setPrint } = useState(null)

    const componentRef = useRef()

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
        // _.isArray(data.multi) &&
        //     data.multi.length > 0 &&
        //     console.log(data.multi)
        console.log(data)
    }

    return (
        <Box
            sx={{
                height: 600,
                width: '100%',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ReactToPrint
                        trigger={() => (
                            <Button
                                className="px-16 min-w-100"
                                variant="contained"
                                color="secondary"
                            >
                                Print
                            </Button>
                        )}
                        content={() => componentRef.current}
                        pageStyle="@media print { @page { size: landscape; margin: 0mm; } }"
                        // "@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }"
                    />
                    <PrintApHistory ref={componentRef} params={joinData} />
                </Grid>
            </Grid>

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
