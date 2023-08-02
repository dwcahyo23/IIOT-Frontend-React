import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAp } from '../store/apSlice'
import { selectApRep, selectApRepById } from '../store/mnRepSlice'
import dayjs from 'dayjs'
import { Typography, colors } from '@mui/material'

import ChartWo from '../tabs/widget/ChartWo'
import LastApUser from '../tabs/widget/LastApUser'
import SummaryWo from '../tabs/widget/SummaryWo'

function MnGM1SubHeaderMachinery() {
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
        'PCGD1',
        'MNAD1',
    ]

    const eko = [
        'PDHD1',
        'PDHD2',
        'PDHD3',
        'PDHD4',
        'PDRL1',
        'PDRL2',
        'MNAD1',
        'PCGD1',
    ]

    const didi = ['PDMC1', 'PDMC3', 'PDMR1', 'PDNC1', 'PDNT1', 'PDHB1', 'MNAD1']

    const ahri = ['PDTR1', 'PDPU1', 'PCGD1', 'MNAD1']

    const filterData =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(selectDep_no, val.dep_no) &&
                    val.com_no == '01' &&
                    val.chk_mark != 'C'
                ) {
                    if (
                        _.includes(val.mch_no, 'GS') ||
                        _.includes(val.mch_no, 'HS') ||
                        _.includes(val.mch_no, 'CR') ||
                        _.includes(val.mch_no, 'AD') ||
                        _.includes(val.mch_no, 'KM') ||
                        _.includes(val.mch_no, 'LS') ||
                        val.mch_no == '-' ||
                        _.isNull(val.mch_no)
                    ) {
                    } else {
                        return val
                    }
                }
            })
            .sortBy(['ymd'])
            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
            .mapValues((items) => {
                return {
                    breakdown: _.countBy(items, (val) =>
                        val.pri_no == '01' ? 'pass' : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.pri_no == '02' ? 'pass' : 'fail'
                    ),
                    preventive: _.countBy(items, (val) =>
                        val.pri_no == '03' ? 'pass' : 'fail'
                    ),
                    workshop: _.countBy(items, (val) =>
                        val.pri_no == '04' ? 'pass' : 'fail'
                    ),
                    work_order: _.countBy(items, (val) =>
                        val ? 'pass' : 'fail'
                    ),
                    audit: _.countBy(items, (val) =>
                        val.chk_mark == 'Y' ? 'pass' : 'fail'
                    ),
                    breakdown_audit: _.countBy(items, (val) =>
                        val.pri_no == '01' && val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    still_run_audit: _.countBy(items, (val) =>
                        val.pri_no == '02' && val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    preventive_audit: _.countBy(items, (val) =>
                        val.pri_no == '03' && val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    workshop_audit: _.countBy(items, (val) =>
                        val.pri_no == '04' && val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                }
            })
            .value()

    const listItemBenyamin =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(selectDep_no, val.dep_no) &&
                    val.com_no == '01' &&
                    val.chk_mark != 'C' &&
                    val.pri_no != '04'
                ) {
                    if (
                        _.includes(val.mch_no, 'GS') ||
                        _.includes(val.mch_no, 'HS') ||
                        _.includes(val.mch_no, 'CR') ||
                        _.includes(val.mch_no, 'AD') ||
                        _.includes(val.mch_no, 'KM') ||
                        _.includes(val.mch_no, 'LS') ||
                        val.mch_no == '-' ||
                        _.isNull(val.mch_no)
                    ) {
                    } else {
                        return val
                    }
                }
            })
            .orderBy(['ymd'], ['desc'])
            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
            .mapValues((items) => {
                return {
                    data: items,
                    breakdown: _.countBy(items, (val) =>
                        val.pri_no == '01' ? 'pass' : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.pri_no == '02' ? 'pass' : 'fail'
                    ),
                    preventive: _.countBy(items, (val) =>
                        val.pri_no == '03' ? 'pass' : 'fail'
                    ),
                    naudit: _.countBy(items, (val) =>
                        val.chk_mark == 'N' ? 'pass' : 'fail'
                    ),
                }
            })
            .value()

    const listItemDidi =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(didi, val.dep_no) &&
                    val.com_no == '01' &&
                    val.chk_mark != 'C' &&
                    val.pri_no != '04'
                ) {
                    if (
                        _.includes(val.mch_no, 'AS') ||
                        _.includes(val.mch_no, 'BG') ||
                        _.includes(val.mch_no, 'BR') ||
                        _.includes(val.mch_no, 'CM') ||
                        _.includes(val.mch_no, 'CN') ||
                        _.includes(val.mch_no, 'DR') ||
                        _.includes(val.mch_no, 'FR') ||
                        _.includes(val.mch_no, 'FT') ||
                        _.includes(val.mch_no, 'MC') ||
                        _.includes(val.mch_no, 'NT') ||
                        _.includes(val.mch_no, 'PC') ||
                        _.includes(val.mch_no, 'PS') ||
                        _.includes(val.mch_no, 'RL') ||
                        _.includes(val.mch_no, 'SH') ||
                        _.includes(val.mch_no, 'SL') ||
                        _.includes(val.mch_no, 'TU') ||
                        _.includes(val.mch_no, 'VT')
                    ) {
                        return val
                    }
                }
            })
            .orderBy(['ymd'], ['desc'])
            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
            .mapValues((items) => {
                return {
                    data: items,
                    breakdown: _.countBy(items, (val) =>
                        val.pri_no == '01' ? 'pass' : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.pri_no == '02' ? 'pass' : 'fail'
                    ),
                    preventive: _.countBy(items, (val) =>
                        val.pri_no == '03' ? 'pass' : 'fail'
                    ),
                    naudit: _.countBy(items, (val) =>
                        val.chk_mark == 'N' ? 'pass' : 'fail'
                    ),
                }
            })
            .value()

    const listItemAhri =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(ahri, val.dep_no) &&
                    val.com_no == '01' &&
                    val.chk_mark != 'C' &&
                    val.pri_no != '04'
                ) {
                    if (
                        _.includes(val.mch_no, 'AS') ||
                        _.includes(val.mch_no, 'BR') ||
                        _.includes(val.mch_no, 'CM') ||
                        _.includes(val.mch_no, 'CN') ||
                        _.includes(val.mch_no, 'CT') ||
                        _.includes(val.mch_no, 'DR') ||
                        _.includes(val.mch_no, 'FT') ||
                        _.includes(val.mch_no, 'GG') ||
                        _.includes(val.mch_no, 'OD') ||
                        _.includes(val.mch_no, 'PS') ||
                        _.includes(val.mch_no, 'QU') ||
                        _.includes(val.mch_no, 'SB') ||
                        _.includes(val.mch_no, 'SH') ||
                        _.includes(val.mch_no, 'TE') ||
                        _.includes(val.mch_no, 'TU')
                    ) {
                        return val
                    }
                }
            })
            .orderBy(['ymd'], ['desc'])
            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
            .mapValues((items) => {
                return {
                    data: items,
                    breakdown: _.countBy(items, (val) =>
                        val.pri_no == '01' ? 'pass' : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.pri_no == '02' ? 'pass' : 'fail'
                    ),
                    preventive: _.countBy(items, (val) =>
                        val.pri_no == '03' ? 'pass' : 'fail'
                    ),
                    naudit: _.countBy(items, (val) =>
                        val.chk_mark == 'N' ? 'pass' : 'fail'
                    ),
                }
            })
            .value()

    const listItemEko =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(eko, val.dep_no) &&
                    val.com_no == '01' &&
                    val.chk_mark != 'C' &&
                    val.pri_no != '04'
                ) {
                    if (
                        _.includes(val.mch_no, 'BF') ||
                        _.includes(val.mch_no, 'CM') ||
                        _.includes(val.mch_no, 'PF') ||
                        _.includes(val.mch_no, 'HR') ||
                        _.includes(val.mch_no, 'LH') ||
                        _.includes(val.mch_no, 'OD') ||
                        _.includes(val.mch_no, 'PR') ||
                        _.includes(val.mch_no, 'RR') ||
                        _.includes(val.mch_no, 'CH')
                    ) {
                        return val
                    }
                }
            })
            .orderBy(['ymd'], ['desc'])
            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
            .mapValues((items) => {
                return {
                    data: items,
                    breakdown: _.countBy(items, (val) =>
                        val.pri_no == '01' ? 'pass' : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.pri_no == '02' ? 'pass' : 'fail'
                    ),
                    preventive: _.countBy(items, (val) =>
                        val.pri_no == '03' ? 'pass' : 'fail'
                    ),
                    naudit: _.countBy(items, (val) =>
                        val.chk_mark == 'N' ? 'pass' : 'fail'
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
            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <SummaryWo
                    data={{
                        count: filterData[dayjs().format('MMMM')]?.breakdown,
                        title: `Machinery ${dayjs().format('MMMM')}`,
                        name: `AP Sheet Breakdown Time`,
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

            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <SummaryWo
                    data={{
                        count: filterData[dayjs().format('MMMM')]?.still_run,
                        title: `Machinery ${dayjs().format('MMMM')}`,
                        name: `AP Sheet Still Run`,
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

            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <SummaryWo
                    data={{
                        count: filterData[dayjs().format('MMMM')]?.preventive,
                        title: `Machinery ${dayjs().format('MMMM')}`,
                        name: `AP Sheet Preventive`,
                        colorHg: colors.green[400],
                        colorLw: colors.green[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterData[dayjs().format('MMMM')]
                                ?.preventive_audit,
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-6">
                <Typography className="text-md" color="text.secondary">
                    PDHD1 PDHD2 PDHD3 PDHD4 PDRL1 PDRL2 PDMC1 PDMC3 PDMR1 PDNC1
                    PDNT1 PDHB1 PDTR1 PDPU1
                </Typography>
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItemBenyamin,
                        user: 5,
                        leader: 'Kasie MN GM1',
                    }}
                />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-4">
                <ChartWo data={{ filterData }} />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItemEko,
                        user: 4,
                        leader: 'Forming - Rolling',
                    }}
                />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItemAhri,
                        user: 7,
                        leader: 'HT - Turret',
                    }}
                />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItemDidi,
                        user: 6,
                        leader: 'MC - CNC - HB',
                    }}
                />
            </motion.div>
        </motion.div>
    )
}

export default MnGM1SubHeaderMachinery
