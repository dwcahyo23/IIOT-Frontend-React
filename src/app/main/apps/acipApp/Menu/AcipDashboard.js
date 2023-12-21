import FusePageSimple from '@fuse/core/FusePageSimple'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, colors, Tabs, Tab, Typography, Input } from '@mui/material'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'

import {
    setGenbasCom,
    selectFilteredGenbasCom,
    selectGenbasUseCom,
    selectChartFilteredGenbasCom,
} from '../store/genba/genbaAcipSlices'

import AcipDashboardMain from './AcipDashboardMain'

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}))

function AcipDashboard() {
    const dispatch = useDispatch()
    // const genbasCom = useSelector(selectFilteredGenbasCom)
    const useCom = useSelector(selectGenbasUseCom)
    // const useChart = useSelector(selectChartFilteredGenbasCom)
    const [tabValue, setTabValue] = useState('ALL')

    function handleChangeTab(event, value) {
        setTabValue(value)
        dispatch(setGenbasCom(value))
    }

    const container = {
        show: {
            transition: {
                staggerChildren: 0.1,
            },
        },
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
                            {useCom &&
                                useCom.map((val, index) => (
                                    <Tab
                                        className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                        disableRipple
                                        key={index}
                                        label={val}
                                        value={val}
                                    />
                                ))}
                        </Tabs>

                        {tabValue && (
                            <AcipDashboardMain params={{ com: tabValue }} />
                        )}
                    </div>
                </div>
            }
        ></Root>
    )
}

export default AcipDashboard
