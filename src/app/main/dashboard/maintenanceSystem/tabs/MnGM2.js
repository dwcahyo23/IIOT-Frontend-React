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

function MnGM2() {
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
    const filterData =
        data &&
        _.chain(data)
            .filter((val) => _.includes(selectDep_no, val.dep_no))
            .groupBy(monthName)
            .mapValues((items) => {
                return {
                    breakdown: _.countBy(items, (val) =>
                        val.com_no == '02' && val.pri_no == '01'
                            ? 'pass'
                            : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.com_no == '02' && val.pri_no == '02'
                            ? 'pass'
                            : 'fail'
                    ),
                    preventive: _.countBy(items, (val) =>
                        val.com_no == '02' && val.pri_no == '03'
                            ? 'pass'
                            : 'fail'
                    ),
                    workshop: _.countBy(items, (val) =>
                        val.com_no == '02' && val.pri_no == '04'
                            ? 'pass'
                            : 'fail'
                    ),
                    work_order: _.countBy(items, (val) =>
                        val.com_no == '02' ? 'pass' : 'fail'
                    ),
                    audit: _.countBy(items, (val) =>
                        val.com_no == '02' && val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    breakdown_audit: _.countBy(items, (val) =>
                        val.com_no == '02' &&
                        val.pri_no == '01' &&
                        val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    still_run_audit: _.countBy(items, (val) =>
                        val.com_no == '02' &&
                        val.pri_no == '02' &&
                        val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    preventive_audit: _.countBy(items, (val) =>
                        val.com_no == '02' &&
                        val.pri_no == '03' &&
                        val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    workshop_audit: _.countBy(items, (val) =>
                        val.com_no == '02' &&
                        val.pri_no == '04' &&
                        val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                }
            })
            .value()

    console.log(filterData)

    const filterDataMonth = filterData[dayjs().format('MMM')] || {}
    const filterDataLastMonth =
        filterData[dayjs().subtract(1, 'month').format('MMM')] || {}

    const listItemMonth =
        data &&
        _.chain(data)
            .filter((val) => _.includes(selectDep_no, val.dep_no))
            .filter(['com_no', '02'])
            .groupBy(monthName)
            .value()

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
            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: filterDataMonth.work_order || {},
                        title: 'Workorder',
                        name: 'AP Sheet',
                        colorHg: colors.blue[400],
                        colorLw: colors.blue[300],
                        extra: {
                            name: 'Total AP Last month',
                            count: filterDataLastMonth.work_order || {},
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: filterDataMonth.breakdown || {},
                        title: 'Breakdown Time',
                        name: 'AP Sheet',
                        colorHg: colors.red[400],
                        colorLw: colors.red[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterDataMonth.breakdown_audit || {},
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: filterDataMonth.still_run || {},
                        title: 'Still Run',
                        name: 'AP Sheet',
                        colorHg: colors.orange[400],
                        colorLw: colors.orange[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterDataMonth.still_run_audit || {},
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: filterDataMonth.preventive || {},
                        title: 'Preventive',
                        name: 'AP Sheet',
                        colorHg: colors.green[400],
                        colorLw: colors.green[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterDataMonth.preventive_audit || {},
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: filterDataMonth.workshop || {},
                        title: 'Workshop',
                        name: 'AP Sheet',
                        colorHg: colors.brown[400],
                        colorLw: colors.brown[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterDataMonth.workshop_audit || {},
                        },
                    }}
                />
            </motion.div>

            <motion.div
                variants={item}
                className="sm:col-span-2 md:col-span-4 lg:col-span-3"
            >
                <ChartWo data={{ filterData }} />
            </motion.div>

            <motion.div
                variants={item}
                className="sm:col-span-2 md:col-span-4 lg:col-span-2"
            >
                <LastAp data={{ listItemMonth, raw }} />
            </motion.div>
        </motion.div>
    )
}

export default MnGM2
