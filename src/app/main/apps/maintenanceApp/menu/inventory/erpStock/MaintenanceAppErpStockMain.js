import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { filteredErpsStock } from '../../../store/erpStockStore/erpStockMnSlices'
import ListErpStock from '../../../components/ListErpStock'
import StatusChip from '../../../components/StatusChip'

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

const columns = [
    {
        field: 'mat_no',
        headerName: 'Material No',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'left',
        width: 200,
    },
    {
        field: 'mat_name',
        headerName: 'Material Name',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'left',
        width: 300,
    },
    {
        field: 'catergory',
        headerName: 'Category',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'left',
        width: 250,
        valueGetter: (params) =>
            params.row.stock_control?.sparepart_category || '-',
    },
    {
        field: 'stk_qty',
        headerName: 'Stok',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        width: 100,
        // valueFormatter: (params) => params.value.replace(/\.00/g, ''),
    },
    {
        field: 'op',
        headerName: 'OP',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        width: 100,
        valueGetter: (params) => params.row.stock_control?.op_qty,
    },
    {
        field: 'oq',
        headerName: 'OQ',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        width: 100,
        valueGetter: (params) => params.row.stock_control?.oq_qty,
    },
    // {
    //     field: 'uom',
    //     headerName: 'UOM',
    //     headerClassName: 'super-app-theme--header',
    //     headerAlign: 'center',
    //     align: 'center',
    //     width: 100,
    //     valueGetter: (params) => params.row.stock_control?.uom_stock,
    // },
    {
        field: 'status',
        headerName: 'Status OP',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        width: 100,
        renderCell: (params) => {
            const x = parseInt(params.row.stk_qty)
            const y = params.row.stock_control?.op_qty

            if (_.isUndefined(y) == false) {
                if (x <= y) return <StatusChip id="Open" />
            }
        },
    },
]

function MaintenanceAppErpStockMain() {
    const filterData = useSelector(filteredErpsStock)

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 gap-16 w-full min-w-0 pt-24"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
                <ListErpStock params={filterData} columns={columns} />
            </motion.div>
        </motion.div>
    )
}

export default MaintenanceAppErpStockMain
