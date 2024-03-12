import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Typography } from '@mui/material'
import DataChart from '../../components/DataChart'
import { filteredScwChartOpenClose } from '../../store/scwStore/scwProductionSlices'
import ListScw from '../../components/ListScw'
import { filterScwChartDept } from '../../store/scwStore/scwProductionSlices'
import DataPieChart from '../../components/DataPieChart'
import Table from '../../../maintenanceApp/components/Table'
import { getCountDeptChart } from '../../store/scwStore/scwUtils'
import dayjs from 'dayjs'

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

function ProductionAppScwHistori() {
    const [table, setTable] = useState([])
    const [dept, setDept] = useState('')
    const data = useSelector(filterScwChartDept)

    const chartData = getCountDeptChart(data)

    function selectPie(props) {
        setTable(_.filter(data, { req_to: props.name }))
        setDept(props.name)
    }

    const tableIndex = (data) => {}

    const Columns = [
        {
            field: 'input_by',
            headerName: 'By',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
        },
        {
            field: 'start_time',
            headerName: 'Start',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 120,
            valueFormatter: (params) =>
                dayjs(params.value).format('DD/MM/YYYY HH:mm'),
        },
        {
            field: 'end_time',
            headerName: 'End',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 120,
            valueFormatter: (params) =>
                _.isNull(params.value)
                    ? '-'
                    : dayjs(params.value).format('DD/MM/YYYY HH:mm'),
        },
        {
            field: 'duration',
            headerName: 'Duration',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 120,
            valueGetter: (params) =>
                _.isNull(params.row.end_time)
                    ? dayjs()
                          .diff(dayjs(params.row.start_time), 'hour', true)
                          .toFixed(1)
                    : dayjs(params.row.start_time)
                          .diff(dayjs(params.row.end_time), 'hour', true)
                          .toFixed(1),
        },
        {
            field: 'mch_code',
            headerName: 'Machine',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 120,
        },
        {
            field: 'req_to',
            headerName: 'Dept',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
            width: 100,
        },
        {
            field: 'problem',
            headerName: 'Problem',
            flex: 1,
            minWidth: 180,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'remarks',
            headerName: 'Remarks',
            flex: 1,
            minWidth: 180,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
    ]

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-6 gap-16 w-full min-w-0 pt-24"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="sm:col-span-6 ">
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-8 w-full">
                    {_.map(chartData, (val, i) => (
                        <div key={i} className="sm-col-span-1">
                            <DataPieChart params={val} selectPie={selectPie} />
                        </div>
                    ))}
                </div>
            </motion.div>

            {table.length > 0 && (
                <motion.div variants={item} className="sm:col-span-6 ">
                    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-center px-8 pt-12">
                            <Typography
                                className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                                color="text.secondary"
                            >
                                {dept}
                            </Typography>
                        </div>
                        <div style={{ width: '100%', height: 400 }}>
                            <Table
                                params={{ row: table, columns: Columns }}
                                tableIndex={tableIndex}
                            />
                        </div>
                    </Paper>
                </motion.div>
            )}
        </motion.div>
    )
}

export default ProductionAppScwHistori
