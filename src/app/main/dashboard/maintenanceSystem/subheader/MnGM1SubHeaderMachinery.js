import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { Typography, colors } from '@mui/material'

import { selectAp, getApSlice } from '../store/apSlice'
import { selectMnMachine } from '../store/mnMachineSlice'
import ChartWo from '../tabs/widget/ChartWo'
import LastApUser from '../tabs/widget/LastApUser'
import SummaryWo from '../tabs/widget/SummaryWo'

function MnGM1SubHeaderMachinery() {
    const dispatch = useDispatch()
    const data = useSelector(selectAp)
    const [filterWorOrder, setFilterWorkOrder] = useState(null)
    const apOptions = { com: '01', section: 'machinery' }

    useEffect(() => {
        dispatch(getApSlice(apOptions)).then((action) => {
            if (action.payload) {
                setFilterWorkOrder(action.payload)
            }
        })
    }, [])

    // console.log(filterWorOrder)

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
            {_.isNull(filterWorOrder) == false ? (
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
                                    ...filterWorOrder['Bos'][
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
                                        ...filterWorOrder['Bos'][
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
                                    ...filterWorOrder['Bos'][
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
                                        ...filterWorOrder['Bos'][
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
                                    ...filterWorOrder['Bos'][
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
                                        ...filterWorOrder['Bos'][
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
                                    ...filterWorOrder['Bos'][
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
                                        ...filterWorOrder['Bos'][
                                            dayjs().format('MMMM')
                                        ]?.preventive_audit,
                                    },
                                },
                            }}
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="sm:col-span-2 md:col-span-2"
                    >
                        <LastApUser
                            data={{
                                listItemMonth: {
                                    ...filterWorOrder['Bos'],
                                },
                                user: 5,
                                apOptions: apOptions,
                                leader: 'Kasie MN GM1',
                            }}
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="sm:col-span-2 md:col-span-4"
                    >
                        <ChartWo
                            data={{
                                filterData: filterWorOrder['Bos'],
                                kpi: 100,
                            }}
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
                                apOptions: apOptions,
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
                                apOptions: apOptions,
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
                                apOptions: apOptions,
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
