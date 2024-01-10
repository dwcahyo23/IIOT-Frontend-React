import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'

import ChartBar from './MainTab/ChartBar'
import StackBar1 from './MainTab/StackBar1'
import StackBar2 from './MainTab/StackBar2'

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

function AcipDashboardMain({ params }) {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 gap-16 w-full min-w-0 pt-24"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
                <ChartBar />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-3 md:col-span-4">
                <StackBar2 />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-3 md:col-span-4">
                <StackBar1 />
            </motion.div>
        </motion.div>
    )
}

export default AcipDashboardMain
