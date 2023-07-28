import FusePageSimple from '@fuse/core/FusePageSimple'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAp } from '../store/apSlice'
import { Box, colors, Tabs, Tab } from '@mui/material'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'

import SummaryWo from '../tabs/widget/SummaryWo'

import MnGM2SubHeaderMachinery from '../subheader/MnGM2SubHeaderMachinery'
import MnGM2SubHeaderUtility from '../subheader/MnGM2SubHeaderUtility'
import MnGM2SubHeaderWorkshop from '../subheader/MnGM2SubHeaderWorkshop'

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}))

function MnGM2Header() {
    const data = useSelector(selectAp)

    const [tabValue, setTabValue] = useState(0)
    function handleChangeTab(event, value) {
        setTabValue(value)
    }

    const filterData =
        data &&
        _.chain(data)
            .filter((val) => {
                if (val.chk_mark != 'C' && val.com_no == '02') {
                    return val
                }
            })
            .sortBy(['s_ymd'])
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
        <Root
            content={
                <div className="w-full ">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-16 w-full min-w-0 p-24"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div
                            variants={item}
                            className="sm:col-span-2 md:col-span-2"
                        >
                            <SummaryWo
                                data={{
                                    count: filterData[dayjs().format('MMMM')]
                                        ?.work_order,
                                    title: 'Total Workorder',
                                    name: 'AP Sheet',
                                    colorHg: colors.blue[400],
                                    colorLw: colors.blue[300],
                                    // extra: {
                                    //     name: 'Total AP Last month',
                                    //     count: filterData[
                                    //         dayjs()
                                    //             .subtract(1, 'month')
                                    //             .format('MMMM')
                                    //     ]?.work_order,
                                    // },
                                }}
                            />
                        </motion.div>

                        <motion.div variants={item}>
                            <SummaryWo
                                data={{
                                    count: filterData[dayjs().format('MMMM')]
                                        ?.breakdown,
                                    title: 'Breakdown',
                                    name: 'AP Sheet',
                                    colorHg: colors.red[400],
                                    colorLw: colors.red[300],
                                    // extra: {
                                    //     name: 'Total Audit',
                                    //     count: filterData[
                                    //         dayjs().format('MMMM')
                                    //     ]?.breakdown_audit,
                                    // },
                                }}
                            />
                        </motion.div>

                        <motion.div variants={item}>
                            <SummaryWo
                                data={{
                                    count: filterData[dayjs().format('MMMM')]
                                        ?.still_run,
                                    title: 'Still Run',
                                    name: 'AP Sheet',
                                    colorHg: colors.orange[400],
                                    colorLw: colors.orange[300],
                                    // extra: {
                                    //     name: 'Total Audit',
                                    //     count: filterData[
                                    //         dayjs().format('MMMM')
                                    //     ]?.still_run,
                                    // },
                                }}
                            />
                        </motion.div>

                        <motion.div variants={item}>
                            <SummaryWo
                                data={{
                                    count: filterData[dayjs().format('MMMM')]
                                        ?.preventive,
                                    title: 'Preventive',
                                    name: 'AP Sheet',
                                    colorHg: colors.green[400],
                                    colorLw: colors.green[300],
                                    // extra: {
                                    //     name: 'Total Audit',
                                    //     count: filterData[
                                    //         dayjs().format('MMMM')
                                    //     ]?.preventive_audit,
                                    // },
                                }}
                            />
                        </motion.div>

                        <motion.div variants={item}>
                            <SummaryWo
                                data={{
                                    count: filterData[dayjs().format('MMMM')]
                                        ?.workshop,
                                    title: 'Workshop',
                                    name: 'AP Sheet',
                                    colorHg: colors.brown[400],
                                    colorLw: colors.brown[300],
                                    // extra: {
                                    //     name: 'Total Audit',
                                    //     count: filterData[
                                    //         dayjs().format('MMMM')
                                    //     ]?.workshop_audit,
                                    // },
                                }}
                            />
                        </motion.div>
                    </motion.div>
                    <div className="w-full">
                        <Tabs
                            value={tabValue}
                            onChange={handleChangeTab}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="scrollable"
                            scrollButtons={false}
                            className="w-full px-24 -mx-4 min-h-40"
                            classes={{
                                indicator:
                                    'flex justify-center bg-transparent w-full h-full',
                            }}
                            TabIndicatorProps={{
                                children: (
                                    <Box
                                        sx={{ bgcolor: 'text.disabled' }}
                                        className="w-full h-full rounded-full opacity-20"
                                    />
                                ),
                            }}
                        >
                            <Tab
                                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                disableRipple
                                label="Machinery"
                            />
                            <Tab
                                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                disableRipple
                                label="Utility"
                            />
                            <Tab
                                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                disableRipple
                                label="Workshop"
                            />
                        </Tabs>
                        {tabValue === 0 && <MnGM2SubHeaderMachinery />}
                        {tabValue === 1 && <MnGM2SubHeaderUtility />}
                        {tabValue === 2 && <MnGM2SubHeaderWorkshop />}
                    </div>
                </div>
            }
        ></Root>
    )
}

export default MnGM2Header
