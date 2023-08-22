import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { Typography, colors } from '@mui/material'

import { selectAp } from '../store/apSlice'
import { selectApRep, selectApRepById } from '../store/mnRepSlice'
import { selectApReq } from '../store/mnReqSlice'
import { selectMnMachine } from '../store/mnMachineSlice'

import ChartWo from '../tabs/widget/ChartWo'
import LastApUser from '../tabs/widget/LastApUser'
import SummaryWo from '../tabs/widget/SummaryWo'

function MnGM1SubHeaderMachinery() {
    const data = useSelector(selectAp)
    // const sparepart = useSelector(selectApReq)
    const machine = useSelector(selectMnMachine)
    const [workOrder, setWorkOrder] = useState([])
    const [filterWorOrder, setFilterWorkOrder] = useState(null)

    useEffect(() => {
        if (data) {
            const res = _(data)
                .filter((val) => {
                    if (
                        val.com_no == '01' &&
                        val.chk_mark != 'C' &&
                        (val.pri_no == '01' ||
                            val.pri_no == '02' ||
                            val.pri_no == '03') &&
                        dayjs(val.ymd).year() == dayjs().year()
                    ) {
                        return val
                    }
                })
                .value()
            setWorkOrder(res)
        }
    }, [data])

    useEffect(() => {
        if (machine) {
            const machines = _(machine).filter({ mch_com: 'GM1' }).value()

            const join = _.map(workOrder, (val) => {
                const match = _.find(machines, {
                    mch_code: val.mch_no,
                })
                return {
                    ...val,
                    responsible: _.isUndefined(match) ? [] : match,
                }
            })

            const x = _(join)
                .groupBy((val) => val.responsible?.responsible)
                .omit(['null', 'undefined'])
                .value()

            if (_.isObject(x) && _.isEmpty(x) == false) {
                x['Benyamin'] = _.concat(
                    x['Ahri Sohari'],
                    x['Eko Hadi S'],
                    x['Didi']
                )
            }

            const y = _(x)
                .mapValues((items) => {
                    return _(items)
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
                                breakdown_naudit: _.countBy(items, (val) =>
                                    val.pri_no == '01' && val.chk_mark == 'N'
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
                })
                .value()

            setFilterWorkOrder(y)
        }
    }, [workOrder, machine])

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
        <div>
            {_.isNull(filterWorOrder) == false && _.size(filterWorOrder) > 0 ? (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-16 w-full min-w-0 p-24"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={item} className="md:col-span-2">
                        <SummaryWo
                            data={{
                                count: {
                                    ...filterWorOrder['Benyamin'][
                                        dayjs().format('MMMM')
                                    ]?.work_order,
                                },
                                title: `Total Workorder ${dayjs().format(
                                    'MMMM'
                                )}`,
                                name: 'AP Sheet',
                                colorHg: colors.blue[400],
                                colorLw: colors.blue[300],
                                extra: {
                                    name: 'Total Audit',
                                    count: {
                                        ...filterWorOrder['Benyamin'][
                                            dayjs().format('MMMM')
                                        ]?.audit,
                                    },
                                },
                            }}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <SummaryWo
                            data={{
                                count: {
                                    ...filterWorOrder['Benyamin'][
                                        dayjs().format('MMMM')
                                    ]?.breakdown,
                                },
                                title: 'Work Order',
                                name: `Breakdown`,
                                colorHg: colors.red[400],
                                colorLw: colors.red[300],
                                extra: {
                                    name: 'Total Audit',
                                    count: {
                                        ...filterWorOrder['Benyamin'][
                                            dayjs().format('MMMM')
                                        ]?.breakdown_audit,
                                    },
                                },
                            }}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <SummaryWo
                            data={{
                                count: {
                                    ...filterWorOrder['Benyamin'][
                                        dayjs().format('MMMM')
                                    ]?.still_run,
                                },
                                title: 'Work Order',
                                name: `Still Run`,
                                colorHg: colors.orange[400],
                                colorLw: colors.orange[300],
                                extra: {
                                    name: 'Total Audit',
                                    count: {
                                        ...filterWorOrder['Benyamin'][
                                            dayjs().format('MMMM')
                                        ]?.still_run,
                                    },
                                },
                            }}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <SummaryWo
                            data={{
                                count: {
                                    ...filterWorOrder['Benyamin'][
                                        dayjs().format('MMMM')
                                    ]?.preventive,
                                },
                                title: 'Work Order',
                                name: `Preventive`,
                                colorHg: colors.green[400],
                                colorLw: colors.green[300],
                                extra: {
                                    name: 'Total Audit',
                                    count: {
                                        ...filterWorOrder['Benyamin'][
                                            dayjs().format('MMMM')
                                        ]?.preventive_audit,
                                    },
                                },
                            }}
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="sm:col-span-2 md:col-span-6"
                    >
                        <Typography className="text-md" color="text.secondary">
                            PDHD1 PDHD2 PDHD3 PDHD4 PDRL1 PDRL2 PDMC1 PDMC3
                            PDMR1 PDNC1 PDNT1 PDHB1 PDTR1 PDPU1
                        </Typography>
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="sm:col-span-2 md:col-span-2"
                    >
                        <LastApUser
                            data={{
                                listItemMonth: {
                                    ...filterWorOrder['Benyamin'],
                                },
                                user: 5,
                                leader: 'Kasie MN GM1',
                            }}
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="sm:col-span-2 md:col-span-4"
                    >
                        <ChartWo
                            data={{ filterData: filterWorOrder['Benyamin'] }}
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="sm:col-span-2 md:col-span-2"
                    >
                        <LastApUser
                            data={{
                                listItemMonth: {
                                    ...filterWorOrder['Eko Hadi S'],
                                },
                                user: 4,
                                leader: 'Forming - Rolling',
                            }}
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="sm:col-span-2 md:col-span-2"
                    >
                        <LastApUser
                            data={{
                                listItemMonth: filterWorOrder['Ahri Sohari'],
                                user: 7,
                                leader: 'HT - Turret',
                            }}
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="sm:col-span-2 md:col-span-2"
                    >
                        <LastApUser
                            data={{
                                listItemMonth: filterWorOrder['Didi'],
                                user: 6,
                                leader: 'MC - CNC - HB',
                            }}
                        />
                    </motion.div>
                </motion.div>
            ) : (
                <FuseLoading />
            )}
        </div>
    )
}

export default MnGM1SubHeaderMachinery
