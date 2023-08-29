import FusePageSimple from '@fuse/core/FusePageSimple/FusePageSimple'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { Box, Typography, Paper, Button, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '@mui/material'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'
import * as xlsx from 'xlsx'
import { Controller, useForm, FormProvider } from 'react-hook-form'

import { showMessage } from 'app/store/fuse/messageSlice'
import {
    selectMnControllStock,
    updateStockControl,
    getMnControllStock,
} from '../store/mnControllStockSlice'
import TableIndex from 'src/app/main/apps/maintenanceSystem/machineTab/TableIndex'
import StatusColor from 'src/app/main/apps/maintenanceSystem/machineTab/utils/StatusColor'
import SummaryWo from '../tabs/widget/SummaryWo'

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}))

const tableIndex = (data) => {}

const columns = [
    {
        field: 'sparepart_name',
        headerName: 'Sparepart',
        width: 500,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },

    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        valueGetter: (params) => {
            return params.row.stock_qty <= params.row.op_qty
                ? 'Open PO'
                : 'Stock Ready'
        },
        renderCell: (params) => <StatusColor id={params.value} />,
    },

    {
        field: 'op_qty',
        headerName: 'OP',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'uom_op',
        headerName: 'Uom',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'oq_qty',
        headerName: 'OQ',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'uom_oq',
        headerName: 'Uom',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'stock_qty',
        headerName: 'Stock',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'uom_stock',
        headerName: 'Uom',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'lead_time',
        headerName: 'Lead Time',
        width: 120,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'no_pr',
        headerName: 'NO PR',
        width: 120,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
    },
]

function InventorySafetyStock() {
    const dispatch = useDispatch()
    const data = useSelector(selectMnControllStock)
    const [fileToJson, setFileToJson] = useState(null)

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
    })

    const { control, onChange, formState, setValue, getValues } = methods

    const readUploadFile = (e) => {
        e.preventDefault()
        const files = e.target.files
        if (files && files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = e.target.result
                const workbook = xlsx.read(data, { type: 'array' })
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const json = xlsx.utils.sheet_to_json(worksheet)
                // console.log(json)
                setValue('file', json)
                setFileToJson(json)
            }
            reader.readAsArrayBuffer(e.target.files[0])
        }
    }

    const handlSave = () => {
        // console.log(getValues('file'))
        dispatch(updateStockControl(getValues('file'))).then((action) => {
            if (action.payload) {
                dispatch(
                    showMessage({
                        message: 'Data has been saved successfully',
                        variant: 'success',
                    })
                )
                dispatch(getMnControllStock())
            }
        })
    }

    const container = {
        show: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <Root
            content={
                <div className="w-full ">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-16 w-full min-w-0 p-24"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={item}>
                            {/* <SummaryWo
                            data={{
                                count: {
                                    ...filterWorOrder['Benyamin'][
                                        dayjs().format('MMMM')
                                    ]?.breakdown,
                                },
                                title: 'Work Order',
                                name: `Breakdown`,
                                colorHg: colors.red[400],
                                colorLw: colors.red[300],
                                extra: {
                                    name: 'Total Audit',
                                    count: {
                                        ...filterWorOrder['Benyamin'][
                                            dayjs().format('MMMM')
                                        ]?.breakdown_audit,
                                    },
                                },
                            }}
                        /> */}
                        </motion.div>
                    </motion.div>
                    <Paper className="p-8">
                        <Box
                            sx={{
                                width: '100%',
                                height: 400,
                            }}
                        >
                            <TableIndex
                                params={{
                                    row: data,
                                    columns: columns,
                                }}
                                tableIndex={tableIndex}
                            />
                        </Box>
                        <FormProvider {...methods}>
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Controller
                                            name="file"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <input
                                                    type="file"
                                                    name="upload"
                                                    id="upload"
                                                    onChange={readUploadFile}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            className="whitespace-nowrap mb-16"
                                            variant="contained"
                                            color="secondary"
                                            onClick={handlSave}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </FormProvider>
                    </Paper>
                </div>
            }
        ></Root>
    )
}

export default InventorySafetyStock
