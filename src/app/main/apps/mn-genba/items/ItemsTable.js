import _ from 'lodash'
import { DataGrid, GridToolbarExport } from '@mui/x-data-grid'
import { motion } from 'framer-motion'
import { Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { format, differenceInHours, addHours } from 'date-fns'

import { useDispatch, useSelector } from 'react-redux'
import withRouter from '@fuse/core/withRouter'
import FuseLoading from '@fuse/core/FuseLoading'
import {
    getItems,
    selectItemsSearchText,
    selectItems,
} from '../store/itemsSlice'
import FuseScrollbars from '@fuse/core/FuseScrollbars'

function ItemsTable(props) {
    const dispatch = useDispatch()
    const items = useSelector(selectItems)
    const searchText = useSelector(selectItemsSearchText)
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState([])
    const [data, setData] = useState(items)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [order, setOrder] = useState({
        direction: 'asc',
        uuid: null,
    })

    const columns = [
        {
            field: 'uuid',
            headerName: 'UUID',
            cellClassName: 'h-72 cursor-pointer',
        },
        {
            field: 'mch_code',
            headerName: 'Machine Code',
            cellClassName: 'h-72 cursor-pointer',
        },
        {
            field: 'mch_com',
            headerName: 'Plant',
            cellClassName: 'h-72 cursor-pointer',
        },
        {
            field: 'mch_fin',
            headerName: 'Findings',
            cellClassName: 'h-72 cursor-pointer',
        },
        {
            field: 'mch_sprt',
            headerName: 'Sparepart',
            cellClassName: 'h-72 cursor-pointer',
        },
    ]

    useEffect(() => {
        dispatch(getItems()).then(() => setLoading(false))
    }, [dispatch])

    useEffect(() => {
        if (searchText.length !== 0) {
            setData(
                _.filter(items, (item) =>
                    item.mch_fin
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                )
            )
            setPage(0)
        } else {
            setData(items)
        }
    }, [items, searchText])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <FuseLoading />
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    There are no items!
                </Typography>
            </motion.div>
        )
    }

    return (
        <div className="w-full flex flex-col min-h-full">
            <FuseScrollbars className="grow overflow-x-auto">
                <Box
                    className="min-w-xl"
                    sx={{ height: 520, width: '100%', p: 3 }}
                >
                    <DataGrid
                        getRowId={(row) => row.uuid}
                        rows={data}
                        columns={columns}
                        components={{
                            Toolbar: GridToolbarExport,
                        }}
                    />
                </Box>
            </FuseScrollbars>
        </div>
    )
}

export default withRouter(ItemsTable)
