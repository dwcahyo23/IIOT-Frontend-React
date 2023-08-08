import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { Typography, colors } from '@mui/material'

import { selectGenbaAcip } from '../../store/genba/genbaAcipSlice'
import SummaryWo from 'src/app/main/dashboard/maintenanceSystem/tabs/widget/SummaryWo'

function AcipGM1() {
    const data = useSelector(selectGenbaAcip)
    const [filterData, setFilterData] = useState(null)

    useEffect(() => {
        if (data) {
            const filter = _.chain(data?.data)
                .filter({ com: 'GM1' })
                .sortBy(['createdAt'])
                .groupBy((val) => val.com)
                .mapValues((com) => {
                    return {
                        a_r1: _.sumBy(com, 'a_r1'),
                        a_r2: _.sumBy(com, 'a_r2'),
                        a_r3: _.sumBy(com, 'a_r3'),
                        a_r4: _.sumBy(com, 'a_r4'),
                        a_r5: _.sumBy(com, 'a_r5'),
                        b_r1: _.sumBy(com, 'b_r1'),
                        b_r2: _.sumBy(com, 'b_r2'),
                        b_r3: _.sumBy(com, 'b_r3'),
                        b_r4: _.sumBy(com, 'b_r4'),
                        b_r5: _.sumBy(com, 'b_r5'),
                        data: _(com)
                            .groupBy((val) => val.area)
                            .mapValues((area) => {
                                return {
                                    a_r1: _.sumBy(area, 'a_r1'),
                                    a_r2: _.sumBy(area, 'a_r2'),
                                    a_r3: _.sumBy(area, 'a_r3'),
                                    a_r4: _.sumBy(area, 'a_r4'),
                                    a_r5: _.sumBy(area, 'a_r5'),
                                    b_r1: _.sumBy(area, 'b_r1'),
                                    b_r2: _.sumBy(area, 'b_r2'),
                                    b_r3: _.sumBy(area, 'b_r3'),
                                    b_r4: _.sumBy(area, 'b_r4'),
                                    b_r5: _.sumBy(area, 'b_r5'),
                                    data: _(area)
                                        .groupBy((val) =>
                                            dayjs(val.createdAt).format('MMMM')
                                        )
                                        .mapValues((month) => {
                                            return {
                                                data: month,
                                                a_r1: _.sumBy(month, 'a_r1'),
                                                a_r2: _.sumBy(month, 'a_r2'),
                                                a_r3: _.sumBy(month, 'a_r3'),
                                                a_r4: _.sumBy(month, 'a_r4'),
                                                a_r5: _.sumBy(month, 'a_r5'),
                                                b_r1: _.sumBy(month, 'b_r1'),
                                                b_r2: _.sumBy(month, 'b_r2'),
                                                b_r3: _.sumBy(month, 'b_r3'),
                                                b_r4: _.sumBy(month, 'b_r4'),
                                                b_r5: _.sumBy(month, 'b_r5'),
                                            }
                                        })
                                        .value(),
                                }
                            })
                            .value(),
                    }
                })
                .value()

            setFilterData(filter)
        }
    }, [data])

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
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-16 w-full min-w-0 p-24"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {/* <motion.div
                    variants={item}
                    className="sm:col-span-2 md:col-span-2"
                >
                    <SummaryWo
                        data={{
                            count: filterData?.GM1?.a_r1,
                            title: `Genba R1`,
                            name: `Resik`,
                            colorHg: colors.red[400],
                            colorLw: colors.red[300],
                            
                        }}
                    />
                </motion.div> */}
            </motion.div>
        </div>
    )
}

export default AcipGM1
