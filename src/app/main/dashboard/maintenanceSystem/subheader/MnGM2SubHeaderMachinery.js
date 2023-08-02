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

function MnGM2SubHeaderMachinery() {
    const data = useSelector(selectAp)

    const selectDep_no = [
        'PDHD1',
        'PDHD2',
        'PDHD3',
        'PDHD4,',
        'PDMR1',
        'PDNT1',
        'PDRL1',
        'PDRL2',
        'PDTM1',
        'PDUB1',
        'PCGD1',
        'PCGD4',
        'PCTD2',
        'PDMC1',
        'PDNC1',
        'PDPU1',
        'PDTR1',
        'QAQC1',
        'TDAD4',
        'MNAD1',
        'MNAD3',
        'MNAD4',
    ]

    const muslih = ['PDHD1', 'PDHD2', 'PDHD3', 'PDHD4,', 'PDMR1', 'MNAD1']

    const teguh = ['PDNT1', 'PDRL1', 'PDRL2', 'PDTM1', 'PDUB1', 'MNAD1']

    const aris = [
        'PCGD1',
        'PCGD4',
        'PCTD2',
        'PDMC1',
        'PDNC1',
        'PDPU1',
        'PDTR1',
        'QAQC1',
        'TDAD4',
        'MNAD1',
        'MNAD3',
        'MNAD4',
    ]

    const filterData =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(selectDep_no, val.dep_no) &&
                    val.com_no == '02' &&
                    val.chk_mark != 'C'
                ) {
                    if (_.isNull(val.mch_no)) {
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

    const listItem1 =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(selectDep_no, val.dep_no) &&
                    val.com_no == '02' &&
                    val.chk_mark != 'C'
                ) {
                    if (_.isNull(val.mch_no)) {
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

    const listItem2 =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(muslih, val.dep_no) &&
                    val.com_no == '02' &&
                    val.chk_mark != 'C' &&
                    val.pri_no != '04' &&
                    val.pri_no != '05'
                ) {
                    if (
                        _.includes(val.mch_no, 'PF') ||
                        _.includes(val.mch_no, 'BM') ||
                        _.includes(val.mch_no, 'BF') ||
                        _.includes(val.mch_no, 'HD') ||
                        _.includes(val.mch_no, 'LH') ||
                        _.includes(val.mch_no, 'TH') ||
                        _.includes(val.mch_no, 'TF') ||
                        _.includes(val.mch_no, 'NF')
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

    const listItem3 =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(teguh, val.dep_no) &&
                    val.com_no == '02' &&
                    val.chk_mark != 'C' &&
                    val.pri_no != '04' &&
                    val.pri_no != '05'
                ) {
                    if (
                        _.includes(val.mch_no, 'PR') ||
                        _.includes(val.mch_no, 'OD') ||
                        _.includes(val.mch_no, 'RR') ||
                        _.includes(val.mch_no, 'TM') ||
                        _.includes(val.mch_no, 'ST') ||
                        _.includes(val.mch_no, 'SL') ||
                        _.includes(val.mch_no, 'SH') ||
                        _.includes(val.mch_no, 'CM') ||
                        _.includes(val.mch_no, 'PC') ||
                        _.includes(val.mch_no, 'RL') ||
                        _.includes(val.mch_no, 'NT') ||
                        _.includes(val.mch_no, 'BL')
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

    const listItem4 =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(aris, val.dep_no) &&
                    val.com_no == '02' &&
                    val.chk_mark != 'C' &&
                    val.pri_no != '04' &&
                    val.pri_no != '05'
                ) {
                    if (
                        _.includes(val.mch_no, 'CN') ||
                        _.includes(val.mch_no, 'PL') ||
                        _.includes(val.mch_no, 'GG') ||
                        _.includes(val.mch_no, 'QU') ||
                        _.includes(val.mch_no, 'TE') ||
                        _.includes(val.mch_no, 'AN') ||
                        _.includes(val.mch_no, 'CM') ||
                        _.includes(val.mch_no, 'OD') ||
                        _.includes(val.mch_no, 'BG') ||
                        _.includes(val.mch_no, 'SB') ||
                        _.includes(val.mch_no, 'PW') ||
                        _.includes(val.mch_no, 'PC') ||
                        _.includes(val.mch_no, 'DR') ||
                        _.includes(val.mch_no, 'RL') ||
                        _.includes(val.mch_no, 'GR') ||
                        _.includes(val.mch_no, 'GP') ||
                        _.includes(val.mch_no, 'SK') ||
                        _.includes(val.mch_no, 'FR') ||
                        _.includes(val.mch_no, 'VC') ||
                        _.includes(val.mch_no, 'PS') ||
                        _.includes(val.mch_no, 'GD') ||
                        _.includes(val.mch_no, 'BR') ||
                        _.includes(val.mch_no, 'BU') ||
                        _.includes(val.mch_no, 'CT') ||
                        _.includes(val.mch_no, 'LS') ||
                        _.includes(val.mch_no, 'GT') ||
                        _.includes(val.mch_no, 'CP')
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
                {/* <Typography className="text-md" color="text.secondary">
                    PDHD1 PDHD2 PDHD3 PDHD4 PDRL1 PDRL2 PDMC1 PDMC3 PDMR1 PDNC1
                    PDNT1 PDHB1 PDTR1 PDPU1
                </Typography> */}
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItem1,
                        user: 8,
                        leader: 'Kasie MN GM2',
                    }}
                />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-4">
                <ChartWo data={{ filterData }} />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItem2,
                        user: 29,
                        leader: 'Forming - Nut Former',
                    }}
                />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItem3,
                        user: 32,
                        leader: 'Rolling - Nut Tapping, Oil Dryer',
                    }}
                />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItem4,
                        user: 30,
                        leader: 'CNC - Turret - HT - Packing - QC - Tooling - Workshop - Nut Welding',
                    }}
                />
            </motion.div>
        </motion.div>
    )
}

export default MnGM2SubHeaderMachinery
