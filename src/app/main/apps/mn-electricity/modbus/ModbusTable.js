import React, { useEffect, useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Button, InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
    getModbus,
    selectModbuses,
    selectItemsSearchText,
} from '../store/modbusSlice'
import withRouter from '@fuse/core/withRouter'
import FuseLoading from '@fuse/core/FuseLoading'
import FuseScrollbars from '@fuse/core/FuseScrollbars'
import _ from 'lodash'

import { Typography } from '@mui/material'
import { motion } from 'framer-motion'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

function ModbusTable(props) {
    const dispatch = useDispatch()
    const modbus = useSelector(selectModbuses)
    const searchText = useSelector(selectItemsSearchText)
    const [rowData, setRowData] = useState(modbus)
    const [loading, setLoading] = useState(true)
    const [agData, setAgData] = useState([
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 },
    ])
    const [refreshInterval, setRefreshInterval] = useState(0)

    const fetchMetrics = () => {
        // retrieve and then setData()
        dispatch(getModbus()).then(() => setRowData(modbus))
    }

    useEffect(() => {
        dispatch(getModbus()).then(() => setLoading(false))
    }, [dispatch])

    useEffect(() => {
        if (searchText.length !== 0) {
            setRowData(
                _.filter(modbus, (modbus) =>
                    modbus.name.toLowerCase().includes(searchText.toLowerCase())
                )
            )
        } else {
            setRowData(modbus)
        }
    }, [modbus, searchText])

    useEffect(() => {
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(fetchMetrics, refreshInterval)
            return () => clearInterval(interval)
        }
    }, [refreshInterval])

    const handleChange = (event) => {
        setRefreshInterval(event.target.value)
    }

    const formatNumber = (number) => {
        // this puts commas into the number eg 1000 goes to 1,000,
        // i pulled this from stack overflow, i have no idea how it works
        return Math.floor(number)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const getV1 = (params) => {
        return params.data.data[0].v1 / 10
    }
    const getV2 = (params) => {
        return params.data.data[0].v2 / 10
    }
    const getV3 = (params) => {
        return params.data.data[0].v3 / 10
    }

    const getKwh = (params) => {
        return formatNumber(params.data.data[0].kwh)
    }

    const getUpdate = (params) => {
        return params.data.data[0].date.toLocaleString()
    }

    const [columnDefs, setColumnDefs] = useState([
        { field: 'name' },
        {
            headerName: 'V1',
            valueGetter: getV1,
            cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
            headerName: 'V2',
            valueGetter: getV2,
            cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
            headerName: 'V3',
            valueGetter: getV3,
            cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
            headerName: 'KWH',
            valueGetter: getKwh,
            cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
            headerName: 'UpdatedAt',
            valueGetter: getUpdate,
            cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
    ])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <FuseLoading />
            </div>
        )
    }

    if (rowData.length === 0) {
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
            <div className="p-4 md:p-16">
                <Button
                    variant="contained"
                    color="secondary"
                    // onClick={updateVal}
                >
                    Update Some D &amp; E Values
                </Button>
            </div>
            <div className="p-4 md:p-16">
                <InputLabel id="demo-simple-select-label">interval</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={refreshInterval}
                    label="Interval"
                    onChange={handleChange}
                >
                    <MenuItem value={1000}>1s</MenuItem>
                    <MenuItem value={3000}>3s</MenuItem>
                    <MenuItem value={5000}>5s</MenuItem>
                </Select>
            </div>

            <div style={{ height: 400 }} className="ag-theme-alpine">
                <AgGridReact
                    defaultColDef={{
                        flex: 1,
                        minWidth: 50,
                        resizable: true,
                    }}
                    className="p-4 md:p-16"
                    rowData={rowData}
                    columnDefs={columnDefs}
                ></AgGridReact>
            </div>
        </div>
    )
}
export default withRouter(ModbusTable)
