import FusePageSimple from '@fuse/core/FusePageSimple/FusePageSimple'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { Box, Typography, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAp } from '../store/apSlice'
import { selectApReq } from '../store/mnReqSlice'
import { colors } from '@mui/material'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'

import { selectMnControllStock } from '../store/mnControllStockSlice'
import TableIndex from 'src/app/main/apps/maintenanceSystem/machineTab/TableIndex'

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
        field: 'op_qty',
        headerName: 'OP',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'op_oum',
        headerName: 'Uom',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'oq_qty',
        headerName: 'OP',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'oq_oum',
        headerName: 'Uom',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'stock_qty',
        headerName: 'Stock',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'stock_oum',
        headerName: 'Uom',
        flex: 1,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'lead_time',
        headerName: 'Lead Time',
        width: 120,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'no_pr',
        headerName: 'NO PR',
        width: 120,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
]

function InventorySafetyStock() {
    const data = useSelector(selectMnControllStock)

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
                        </Paper>
                    </motion.div>
                </div>
            }
        ></Root>
    )
}

export default InventorySafetyStock
