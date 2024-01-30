import FusePageSimple from '@fuse/core/FusePageSimple'
import FuseLoading from '@fuse/core/FuseLoading'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Tab, Box, OutlinedInput } from '@mui/material'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { Refresh } from '@mui/icons-material'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'
import { useThemeMediaQuery } from '@fuse/hooks'

import {
    machinesCom,
    setMachinesCom,
    selectMachinesCom,
    getMachineMnSlices,
} from '../../../store/machineStore/machineMnSlices'

import { LoadingButton } from '@mui/lab'

import {
    isPendingErpIsue,
    searchText,
    setSearchText,
    getErpIsueMnSlices,
    filterdErpsIsue,
} from '../../../store/erpIsueStore/erpIsueMnSlices'

import MaintenanceAppErpsIsueMain from './MaintenanceAppErpsIsueMain'

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
        '& > .container': {
            maxWidth: '100%',
        },
    },
}))

function MaintenanceAppErpsIsue() {
    const dispatch = useDispatch()
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

    const [selectCom, useCom] = [
        useSelector(selectMachinesCom),
        useSelector(machinesCom),
    ]

    const [isPending1, search] = [
        useSelector(isPendingErpIsue),
        useSelector(searchText),
    ]

    const filterData = useSelector(filterdErpsIsue)

    function handleComTab(event, value) {
        dispatch(setMachinesCom(value))
    }

    function handleSearch(event, value) {
        dispatch(setSearchText(event.target.value))
    }

    function reload(event, value) {
        dispatch(getErpIsueMnSlices())
        dispatch(getMachineMnSlices())
    }

    return (
        <Root
            content={
                <div className="flex flex-col flex-1 w-full mx-auto px-16 pt-8 sm:p-40">
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
                                    Issue Maintenance
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className="font-medium"
                                >
                                    Maintenance App | PT Garuda Metalindo.Tbk
                                </Typography>
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex flex-1 justify-start my-16 lg:my-0">
                        <Tabs
                            value={useCom}
                            onChange={handleComTab}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="scrollable"
                            scrollButtons={false}
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
                            {selectCom.map((val, index) => (
                                <Tab
                                    className="text-14 font-semibold min-h-20 min-w-64 mx-2 px-8"
                                    disableRipple
                                    key={index}
                                    label={val}
                                    value={val}
                                />
                            ))}
                        </Tabs>
                    </div>

                    <div className="flex flex-1 justify-start my-16 lg:my-0">
                        <FormControl>
                            <TextField
                                label="Search"
                                placeholder="Search.."
                                className="flex w-full sm:w-150 mx-8"
                                value={search}
                                onChange={handleSearch}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>

                        <LoadingButton
                            variant="outline"
                            color="secondary"
                            // loading={isPending}
                            loadingPosition="start"
                            startIcon={<Refresh />}
                            onClick={reload}
                        >
                            <span>Reload</span>
                        </LoadingButton>
                    </div>

                    {isPending1 ? (
                        <div className="flex items-center justify-center h-full">
                            <FuseLoading />
                        </div>
                    ) : (
                        <div>
                            {filterData.length > 0 ? (
                                <div>
                                    <MaintenanceAppErpsIsueMain />
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { delay: 0.1 },
                                    }}
                                    className="flex flex-1 items-center justify-center h-full"
                                >
                                    <Typography
                                        color="text.secondary"
                                        variant="h5"
                                    >
                                        There are no data!
                                    </Typography>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            }
            scroll={isMobile ? 'normal' : 'page'}
        ></Root>
    )
}

export default MaintenanceAppErpsIsue
