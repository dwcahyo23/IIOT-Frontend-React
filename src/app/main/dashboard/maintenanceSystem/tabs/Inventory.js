import { motion } from 'framer-motion'
import _, { result } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAp } from '../store/apSlice'
import { colors } from '@mui/material'
import dayjs from 'dayjs'

import SummaryWo from './widget/SummaryWo'
import ChartWo from './widget/ChartWo'
import LastAp from './widget/LastAp'
import LastReq from './widget/LastReq'

function Inventory() {
    const dispatch = useDispatch()
    const data = useSelector(selectAp)

    const selectDep_no = [
        'PDHD1',
        'PDHD2',
        'PDHD3',
        'PDHD4',
        'PDRL1',
        'PDRL2',
        'PDMC1',
        'PDMC3',
        'PDMR1',
        'PDNC1',
        'PDNT1',
        'PDHB1',
        'PDTR1',
        'PDPU1',
    ]

    const raw =
        data &&
        _.chain(data)
            .filter((val) => _.includes(selectDep_no, val.dep_no))
            .value()

    const monthName = (params) => dayjs(params.ymd).format('MMM')

    const listReqestMonth =
        data &&
        _.chain(data)
            .filter((val) => {
                if (val.request && val.request.length > 0) return true
            })
            .filter(['com_no', '01'])
            .groupBy(monthName)
            .value()
    console.log(listReqestMonth)

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
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-16 w-full min-w-0 p-24"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div
                variants={item}
                className="sm:col-span-2 md:col-span-4 lg:col-span-5"
            >
                <LastReq data={{ listReqestMonth }} />
            </motion.div>
        </motion.div>
    )
}

export default Inventory
