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
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'
import { useThemeMediaQuery } from '@fuse/hooks'
import Board, { moveCard } from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'

import {
    machinesCom,
    machinesSection,
    machinesResponbility,
    setMachinesCom,
    setMachinesProcess,
    setMachinesSection,
    setMachinesResponbility,
    selectMachinesCom,
    selectMnMachines,
    selectMachinesResponbility,
} from '../../store/machineStore/machineMnSlices'

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

function MaintenanceAppInventory() {
    const dispatch = useDispatch()
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

    const [selectCom, useCom] = [
        useSelector(selectMachinesCom),
        useSelector(machinesCom),
    ]

    function handleComTab(event, value) {
        dispatch(setMachinesCom(value))
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
                                    Inventories Maintenance
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

                    <div className="flex flex-1 justify-start my-16 lg:my-0"></div>
                </div>
            }
            scroll={isMobile ? 'normal' : 'page'}
        ></Root>
    )
}

export default MaintenanceAppInventory
