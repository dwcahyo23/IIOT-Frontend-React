import FusePageSimple from '@fuse/core/FusePageSimple'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Tab, Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'

import {
    selectFilteredGenbas,
    setGenbasCom,
    setGenbasDept,
    setGenbasArea,
    setSearchText,
    setGenbasStatus,
    selectGenbasUseArea,
    selectGenbasUseCom,
    selectGenbasUseDept,
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
    const [selectCom, selectDept, selectArea, selectFilter] = [
        useSelector(selectGenbasUseCom),
        useSelector(selectGenbasUseDept),
        useSelector(selectGenbasUseArea),
        useSelector(selectFilteredGenbas),
    ]

    const [loading, setLoading] = useState(true)
    const [tabValue, setTabValue] = useState('ALL')
    const [deptVal, setDeptVal] = useState('ALL')
    const [areaVal, setAreaVal] = useState('ALL')

    useEffect(() => {
        if (!selectFilter) {
            return
        }
        setLoading(false)
    }, [selectFilter])

    function handleChangeTab(event, value) {
        setTabValue(value)
        dispatch(setGenbasCom(value))
    }

    function handleDeptTab(event, value) {
        setDeptVal(value.props.value)
        dispatch(setGenbasDept(value.props.value))
    }

    function handleAreaTab(event, value) {
        setAreaVal(value.props.value)
        dispatch(setGenbasArea(value.props.value))
    }

    const container = {
        show: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    if (loading) {
        return
    }

    return (
        <Root
            content={
                <div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
                    <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                        <div className="flex items-center max-w-full">
                            <motion.div
                                className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                                initial={{ x: -20 }}
                                animate={{
                                    x: 0,
                                    transition: { delay: 0.3 },
                                }}
                            >
                                <Typography className="text-16 sm:text-20 truncate font-semibold">
                                    Dashboard
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className="font-medium"
                                >
                                    Acip System | PT Garuda Metalindo.Tbk
                                </Typography>
                            </motion.div>
                        </div>
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-start space-y-16 sm:space-y-0 sm:space-x-16">
                            <div className="w-full ">
                                <Tabs
                                    value={tabValue}
                                    onChange={handleChangeTab}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant="scrollable"
                                    scrollButtons={false}
                                    className="w-full px-24 mx-4 min-w-0 p-24"
                                    classes={{
                                        indicator:
                                            'flex justify-center bg-transparent w-full h-full',
                                    }}
                                    TabIndicatorProps={{
                                        children: (
                                            <Box
                                                sx={{
                                                    bgcolor: 'text.disabled',
                                                }}
                                                className="w-full h-full rounded-full opacity-20"
                                            />
                                        ),
                                    }}
                                >
                                    {selectCom &&
                                        selectCom.map((val, index) => (
                                            <Tab
                                                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                                disableRipple
                                                key={index}
                                                label={val}
                                                value={val}
                                            />
                                        ))}
                                </Tabs>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-start space-y-16 sm:space-y-0 sm:space-x-16">
                            <FormControl
                                className="flex w-full sm:w-150 mx-8"
                                variant="outlined"
                            >
                                <InputLabel>Dept</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    label="Category"
                                    value={deptVal}
                                    onChange={handleDeptTab}
                                >
                                    {selectDept.map((val, index) => (
                                        <MenuItem value={val} key={index}>
                                            {val}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl
                                className="flex w-full sm:w-150 mx-8"
                                variant="outlined"
                            >
                                <InputLabel>Area</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    label="Category"
                                    value={areaVal}
                                    onChange={handleAreaTab}
                                >
                                    {selectArea.map((val, index) => (
                                        <MenuItem value={val} key={index}>
                                            {val}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {tabValue && (
                        <AcipDashboardMain params={{ com: tabValue }} />
                    )}
                </div>
            }
        ></Root>
    )
}

export default AcipDashboard
