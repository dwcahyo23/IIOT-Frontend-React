import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import DataChart from '../../components/DataChart'
import {
    filteredScwChartOpenClose,
    filteredScwChartDateOfMonth,
    filteredScw,
} from '../../store/scwStore/scwProductionSlices'
import ListScw from '../../components/ListScw'
import CardResumes from '../../components/CardResumes'

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

function ProductionAppScwMain() {
    const filterChart = useSelector(filteredScwChartOpenClose)
    const filterChartDate = useSelector(filteredScwChartDateOfMonth)
    const data = useSelector(filteredScw)

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 gap-16 w-full min-w-0 pt-24"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
                <CardResumes params={data} />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <ListScw />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-4 md:col-span-6">
                <div className="mb-16">
                    <DataChart params={{ data: filterChart }} />
                </div>
                <div className="mt-8 mb-16">
                    <DataChart params={{ data: filterChartDate }} />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ProductionAppScwMain
