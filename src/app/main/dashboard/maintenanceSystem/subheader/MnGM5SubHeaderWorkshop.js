import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAp } from '../store/apSlice'
import dayjs from 'dayjs'
import { Typography, colors } from '@mui/material'

import ChartWo from '../tabs/widget/ChartWo'
import LastApUser from '../tabs/widget/LastApUser'
import SummaryWo from '../tabs/widget/SummaryWo'

function MnGM5SubHeaderWorkshop() {
    const data = useSelector(selectAp)

    const filterData =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    val.com_no == '06' &&
                    (val.pri_no == '04' ||
                        val.pri_no == '05' ||
                        val.pri_no == '07') &&
                    val.chk_mark != 'C'
                ) {
                    return val
                }
            })
            .orderBy(['ymd'], ['desc'])
            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
            .mapValues((items) => {
                return {
                    data: _.filter(items, (val) => {
                        if (val.chk_mark == 'N' || val.chk_mark == 'Y') {
                            return val
                        }
                    }),
                    breakdown: _.countBy(items, (val) =>
                        val.pri_no == '05' ? 'pass' : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.pri_no == '04' ? 'pass' : 'fail'
                    ),
                    work_order: _.countBy(items, (val) =>
                        val ? 'pass' : 'fail'
                    ),
                    audit: _.countBy(items, (val) =>
                        val.chk_mark == 'Y' ? 'pass' : 'fail'
                    ),
                    breakdown_audit: _.countBy(items, (val) =>
                        val.pri_no == '05' && val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    breakdown_naudit: _.countBy(items, (val) =>
                        val.pri_no == '05' && val.chk_mark == 'N'
                            ? 'pass'
                            : 'fail'
                    ),
                    still_run_audit: _.countBy(items, (val) =>
                        val.pri_no == '04' && val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                }
            })
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
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-16 w-full min-w-0 p-24"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="md:col-span-2">
                <SummaryWo
                    data={{
                        count: filterData[dayjs().format('MMMM')]?.work_order,
                        title: `Total Workorder ${dayjs().format('MMMM')}`,
                        name: 'AP Sheet',
                        colorHg: colors.blue[400],
                        colorLw: colors.blue[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterData[dayjs().format('MMMM')]?.audit,
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: filterData[dayjs().format('MMMM')]?.breakdown,
                        title: `Work Order`,
                        name: `Breakdown`,
                        colorHg: colors.red[400],
                        colorLw: colors.red[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterData[dayjs().format('MMMM')]
                                ?.breakdown_audit,
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: filterData[dayjs().format('MMMM')]?.still_run,
                        title: `Work Order`,
                        name: `Still Run`,
                        colorHg: colors.orange[400],
                        colorLw: colors.orange[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterData[dayjs().format('MMMM')]
                                ?.still_run,
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-6">
                <Typography className="text-md" color="text.secondary">
                    WORKSHOP MN
                </Typography>
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: filterData,
                        user: 17,
                        leader: 'Kasie Workshop',
                    }}
                />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-4">
                <ChartWo data={{ filterData }} />
            </motion.div>
        </motion.div>
    )
}

export default MnGM5SubHeaderWorkshop
