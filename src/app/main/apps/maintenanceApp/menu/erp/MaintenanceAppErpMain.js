import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'

import DataChart from '../../components/DataChart'

import { filterChartErps } from '../../store/erpStore/erpMnSlices'

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

function MaintenanceAppErpMain({ params }) {
    const filterChart = useSelector(filterChartErps)
    console.log(filterChart)
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-16 w-full min-w-0 pt-24"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="sm:col-span-2 md:col-span-4">
                <DataChart params={{ data: filterChart }} />
            </motion.div>
        </motion.div>
    )
}

export default MaintenanceAppErpMain
