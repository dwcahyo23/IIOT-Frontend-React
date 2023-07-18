import { motion } from 'framer-motion'
import _, { result } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAp } from '../store/apSlice'
import { selectApReq } from '../store/mnReqSlice'
import { colors } from '@mui/material'
import dayjs from 'dayjs'

import SummaryWo from './widget/SummaryWo'
import ChartWo from './widget/ChartWo'
import LastAp from './widget/LastAp'
import LastReq from './widget/LastReq'
import LastApUser from './widget/LastApUser'

function Inventory() {
    const dispatch = useDispatch()
    const data = useSelector(selectAp)
    const sparepart = useSelector(selectApReq)

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

    // const listReqestMonth =
    //     data &&
    //     _.chain(data)
    //         .filter((val) => {
    //             if (val.request && val.request.length > 0) return true
    //         })
    //         .filter(['com_no', '01'])
    //         .groupBy(monthName)
    //         .value()

    const filterSparepart =
        sparepart &&
        _.chain(sparepart)
            .filter((val) => {
                if (val.mch_com == 'GM1') {
                    return val
                }
            })
            .groupBy((val) => dayjs(val.date_request).format('MMM'))
            .mapValues((items) => {
                return {
                    request: _.countBy(items, (val) => (val ? 'pass' : 'fail')),
                    request_audit_Y: _.countBy(items, (val) =>
                        val.audit_request == 'Y' ? 'pass' : 'fail'
                    ),
                    request_audit_N: _.countBy(items, (val) =>
                        val.audit_request == 'N' ? 'pass' : 'fail'
                    ),
                    request_mre: _.countBy(items, (val) =>
                        val.mre_request.length > 0 &&
                        val.item_ready == 'N' &&
                        val.audit_request == 'N'
                            ? 'pass'
                            : 'fail'
                    ),
                    request_ready: _.countBy(items, (val) =>
                        val.mre_request.length > 0 &&
                        val.item_ready == 'Y' &&
                        val.audit_request == 'N'
                            ? 'pass'
                            : 'fail'
                    ),
                    data: _.filter(items, (val) => val),
                }
            })
            .value()
    console.log(filterSparepart)

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
            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <SummaryWo
                    data={{
                        count: filterSparepart[dayjs().format('MMM')]?.request,
                        title: 'Inventory',
                        name: 'AP Request',
                        colorHg: colors.blue[400],
                        colorLw: colors.blue[300],
                        extra: {
                            name: 'Total AP Last month',
                            count: filterSparepart[
                                dayjs().subtract(1, 'month').format('MMM')
                            ]?.request,
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: filterSparepart[dayjs().format('MMM')]
                            ?.request_audit_N,
                        title: 'N.Audit',
                        name: 'AP Request',
                        colorHg: colors.red[400],
                        colorLw: colors.red[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterSparepart[dayjs().format('MMM')]
                                ?.request_audit_Y,
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: filterSparepart[dayjs().format('MMM')]
                            ?.request_mre,
                        title: 'Publish MRE',
                        name: 'MRE',
                        colorHg: colors.green[400],
                        colorLw: colors.green[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterSparepart[dayjs().format('MMM')]
                                ?.request_audit_Y,
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item}>
                <SummaryWo
                    data={{
                        count: filterSparepart[dayjs().format('MMM')]
                            ?.request_mre,
                        title: 'Ready Sparepart',
                        name: 'MRE',
                        colorHg: colors.orange[400],
                        colorLw: colors.orange[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterSparepart[dayjs().format('MMM')]
                                ?.request_audit_Y,
                        },
                    }}
                />
            </motion.div>

            {/* <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth:
                            filterSparepart[dayjs().format('MMM')]?.data,
                        user: 20,
                        leader: 'Inventory',
                    }}
                />
            </motion.div> */}
        </motion.div>
    )
}

export default Inventory
