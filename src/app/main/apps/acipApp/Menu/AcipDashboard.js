import FusePageSimple from '@fuse/core/FusePageSimple'
import { motion } from 'framer-motion'
import _, { forEach } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, colors, Tabs, Tab, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}))

function AcipDashboard() {
    // const data = useSelector(selectGenbaAcip)
    const [tabValue, setTabValue] = useState(0)
    const [filterData, setFilterData] = useState(null)

    function handleChangeTab(event, value) {
        setTabValue(value)
    }

    // useEffect(() => {
    //     if (data) {
    //         const filter = _.chain(data?.data)
    //             .sortBy(['createdAt'])
    //             .groupBy((val) => val.com)
    //            .mapValues()
    //             .mapValues((items) => {
    //                 return _(items)
    //                     .groupBy((val) => val.area)
    //                     .mapValues((area) => {
    //                         return (
    //                             _(area)
    //                                 .groupBy((val) =>
    //                                     dayjs(val.createdAt).format('MMMM')
    //                                 )
    //                                 // .mapValues((month) => {
    //                                 //     return {
    //                                 //         data: month,
    //                                 //         a_r1: _.sumBy(month, 'a_r1'),
    //                                 //         a_r2: _.sumBy(month, 'a_r2'),
    //                                 //         a_r3: _.sumBy(month, 'a_r3'),
    //                                 //         a_r4: _.sumBy(month, 'a_r4'),
    //                                 //         a_r5: _.sumBy(month, 'a_r5'),
    //                                 //         b_r1: _.sumBy(month, 'b_r1'),
    //                                 //         b_r2: _.sumBy(month, 'b_r2'),
    //                                 //         b_r3: _.sumBy(month, 'b_r3'),
    //                                 //         b_r4: _.sumBy(month, 'b_r4'),
    //                                 //         b_r5: _.sumBy(month, 'b_r5'),
    //                                 //     }
    //                                 // })
    //                                 .value()
    //                         )
    //                     })
    //                     .value()
    //             })
    //             .value()

    //         setFilterData(filter)

    //         // console.log(filter)
    //     }
    // }, [data])

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
                    ></motion.div>
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
                                label="GM1"
                            />
                            <Tab
                                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                disableRipple
                                label="GM2"
                            />
                            <Tab
                                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                disableRipple
                                label="GM3"
                            />
                            <Tab
                                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                disableRipple
                                label="GM5"
                            />
                        </Tabs>
                        {/* {tabValue === 0 && <AcipGM1 />} */}
                        {/* {tabValue === 1 && <MnGM1SubHeaderUtility />}
                        {tabValue === 2 && <MnGM1SubHeaderWorkshop />} */}
                    </div>
                </div>
            }
        ></Root>
    )
}

export default AcipDashboard
