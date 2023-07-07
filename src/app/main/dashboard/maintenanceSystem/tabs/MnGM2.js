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

    const monthName = (params) => dayjs(params.s_ymd).format('MMM')

    const filterData = _.chain(data)
        .filter((val) => _.includes(selectDep_no, val.dep_no))
        .groupBy(monthName)
        .mapValues((items) => {
            return {
                breakdown: _.countBy(items, (val) =>
                    val.com_no == '02' && val.pri_no == '01' ? 'pass' : 'fail'
                ),
                audit: _.countBy(items, (val) =>
                    val.com_no == '02' &&
                    val.pri_no == '01' &&
                    val.chk_mark == 'Y'
                        ? 'pass'
                        : 'fail'
                ),
            }
        })
        .value()

    const listItem = _.chain(data)
        .filter((val) => _.includes(selectDep_no, val.dep_no))
        .groupBy((val) => dayjs().isSame(val.s_ymd, 'month'))
        .value()

    const listItemFiltered = listItem.true || {}

    useEffect(() => {}, [data])

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
                        count: _.countBy(data, (val) =>
                            val.com_no == '02' &&
                            dayjs().isSame(val.s_ymd, 'month')
                                ? 'pass'
                                : 'fail'
                        ),
                        title: 'Workorder',
                        name: 'AP Sheet',
                        colorHg: colors.blue[400],
                        colorLw: colors.blue[300],
                        extra: {
                            name: 'Last month',
                            count: _.countBy(data, (val) =>
                                val.com_no == '02' &&
                                dayjs(val.s_ymd).isSame(
                                    dayjs().subtract(1, 'month'),
                                    'month'
                                )
                                    ? 'pass'
                                    : 'fail'
                            ),
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: _.countBy(data, (val) =>
                            val.com_no == '02' &&
                            val.pri_no == '01' &&
                            dayjs().isSame(val.s_ymd, 'month')
                                ? 'pass'
                                : 'fail'
                        ),
                        title: 'Breakdown',
                        name: 'AP Sheet',
                        colorHg: colors.red[400],
                        colorLw: colors.red[300],
                        extra: {
                            name: 'Total Audit',
                            count: _.countBy(data, (val) =>
                                val.com_no == '02' &&
                                val.pri_no == '01' &&
                                val.chk_mark == 'Y' &&
                                dayjs().isSame(val.s_ymd, 'month')
                                    ? 'pass'
                                    : 'fail'
                            ),
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: _.countBy(data, (val) =>
                            val.com_no == '02' &&
                            val.pri_no == '02' &&
                            dayjs().isSame(val.s_ymd, 'month')
                                ? 'pass'
                                : 'fail'
                        ),

                        title: 'Still Run',
                        name: 'AP Sheet',
                        colorHg: colors.orange[400],
                        colorLw: colors.orange[300],
                        extra: {
                            name: 'Total Audit',
                            count: _.countBy(data, (val) =>
                                val.com_no == '02' &&
                                val.pri_no == '02' &&
                                val.chk_mark == 'Y' &&
                                dayjs().isSame(val.s_ymd, 'month')
                                    ? 'pass'
                                    : 'fail'
                            ),
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: _.countBy(data, (val) =>
                            val.com_no == '02' &&
                            val.pri_no == '03' &&
                            dayjs().isSame(val.s_ymd, 'month')
                                ? 'pass'
                                : 'fail'
                        ),

                        title: 'Preventive',
                        name: 'AP Sheet',
                        colorHg: colors.green[400],
                        colorLw: colors.green[300],
                        extra: {
                            name: 'Total Audit',
                            count: _.countBy(data, (val) =>
                                val.com_no == '02' &&
                                val.pri_no == '03' &&
                                val.chk_mark == 'Y' &&
                                dayjs().isSame(val.s_ymd, 'month')
                                    ? 'pass'
                                    : 'fail'
                            ),
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: _.countBy(data, (val) =>
                            val.com_no == '02' &&
                            val.pri_no == '04' &&
                            dayjs().isSame(val.s_ymd, 'month')
                                ? 'pass'
                                : 'fail'
                        ),

                        title: 'Workshop',
                        name: 'AP Sheet',
                        colorHg: colors.brown[400],
                        colorLw: colors.brown[300],
                        extra: {
                            name: 'Total Audit',
                            count: _.countBy(data, (val) =>
                                val.com_no == '02' &&
                                val.pri_no == '04' &&
                                val.chk_mark == 'Y' &&
                                dayjs().isSame(val.s_ymd, 'month')
                                    ? 'pass'
                                    : 'fail'
                            ),
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
                <LastAp listItem={listItemFiltered} />
            </motion.div>
        </motion.div>
    )
}

export default MnGM2
