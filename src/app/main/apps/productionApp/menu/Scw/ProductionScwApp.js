import FusePageSimple from '@fuse/core/FusePageSimple'
import FuseLoading from '@fuse/core/FuseLoading'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Tab, Box, OutlinedInput } from '@mui/material'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { LoadingButton } from '@mui/lab'
import { Refresh } from '@mui/icons-material'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'
import { useThemeMediaQuery } from '@fuse/hooks'

import {
    getScwSlices,
    setScwYear,
    setScwStatus,
    setScwCom,
    scwCom,
    scwYear,
    status,
    selectScwCom,
    selectScwYear,
    filteredScw,
    scwPending,
    setScwDept,
    scwDept,
    scwMonth,
    selectScwMonth,
    setScwMonth,
} from '../../store/scwStore/scwProductionSlices'
import ProductionAppScwMain from './ProductionAppScwMain'
import { getMnMachineSlice } from 'src/app/main/dashboard/maintenanceSystem/store/mnMachineSlice'
import { getMachineMnSlices } from '../../../maintenanceApp/store/machineStore/machineMnSlices'
import ProductionAppScwHistori from './ProductionAppScwHistori'

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

function ProductionScwApp() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [option, setOption] = useState('list')
    const dispatch = useDispatch()
    const [selectYear, selectMonth, selectCom] = [
        useSelector(selectScwYear),
        useSelector(selectScwMonth),
        useSelector(selectScwCom),
    ]
    const [useCom, useYear, useMonth, useStatus, isPending, useDept] = [
        useSelector(scwCom),
        useSelector(scwYear),
        useSelector(scwMonth),
        useSelector(status),
        useSelector(scwPending),
        useSelector(scwDept),
    ]
    const data = useSelector(filteredScw)

    function handleCom(event, value) {
        dispatch(setScwCom(value.props.value))
    }

    function handleDept(event, value) {
        dispatch(setScwDept(value.props.value))
    }

    function handleYear(event, value) {
        dispatch(setScwYear(value.props.value))
    }

    function handleMonth(event, value) {
        dispatch(setScwMonth(value.props.value))
    }

    function handleStatus(event, value) {
        dispatch(setScwStatus(value.props.value))
    }

    function reload(event, value) {
        dispatch(getScwSlices())
        dispatch(getMachineMnSlices())
    }

    function handleOption(event, value) {
        setOption(value)
    }

    function SelectOption() {
        if (option == 'list') {
            return <ProductionAppScwMain />
        } else {
            return <ProductionAppScwHistori />
        }
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
                                    SCW (Stop Call Wait Abnormality System)
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className="font-medium"
                                >
                                    Production App | PT Garuda Metalindo.Tbk
                                </Typography>
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex flex-1 justify-start my-16 lg:my-0">
                        <Tabs
                            value={option}
                            onChange={handleOption}
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
                            <Tab
                                className="text-14 font-semibold min-h-20 min-w-64 mx-2 px-8"
                                disableRipple
                                key={1}
                                label="List"
                                value="list"
                            />
                            <Tab
                                className="text-14 font-semibold min-h-20 min-w-64 mx-2 px-8"
                                disableRipple
                                key={2}
                                label="History"
                                value="histori"
                            />
                        </Tabs>
                    </div>

                    <div className="flex flex-1 justify-start my-16 lg:my-0 mt-8 mb-16">
                        <FormControl
                            className="flex w-full sm:w-auto mx-8"
                            variant="outlined"
                        >
                            <InputLabel>Year</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Year"
                                value={useYear}
                                onChange={handleYear}
                            >
                                {selectYear.map((val, index) => (
                                    <MenuItem value={val} key={index}>
                                        {val}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            className="flex w-full sm:w-auto mx-8"
                            variant="outlined"
                        >
                            <InputLabel>Month</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Month"
                                value={useMonth}
                                onChange={handleMonth}
                            >
                                {selectMonth.map((val, index) => (
                                    <MenuItem value={val} key={index}>
                                        {val}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            className="flex w-full sm:w-auto mx-8"
                            variant="outlined"
                        >
                            <InputLabel>Com</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Category"
                                value={useCom}
                                onChange={handleCom}
                            >
                                {selectCom.map((val, index) => (
                                    <MenuItem value={val} key={index}>
                                        {val}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            className="flex w-full sm:w-auto mx-8"
                            variant="outlined"
                        >
                            <InputLabel>Dept</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Category"
                                value={useDept}
                                onChange={handleDept}
                            >
                                <MenuItem value="ALL">All</MenuItem>
                                <MenuItem value="PE">PE</MenuItem>
                                <MenuItem value="TE">TE</MenuItem>
                                <MenuItem value="MN">MN</MenuItem>
                                <MenuItem value="TD">TD</MenuItem>
                                <MenuItem value="PPIC">PPIC</MenuItem>
                                <MenuItem value="QC">QC</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl
                            className="flex w-full sm:w-auto mx-8"
                            variant="outlined"
                        >
                            <InputLabel>Status</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Category"
                                value={useStatus}
                                onChange={handleStatus}
                            >
                                <MenuItem value="ALL">All</MenuItem>
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="Close">Close</MenuItem>
                            </Select>
                        </FormControl>

                        <LoadingButton
                            variant="outline"
                            color="secondary"
                            loading={isPending}
                            loadingPosition="start"
                            startIcon={<Refresh />}
                            onClick={reload}
                        >
                            <span>Reload</span>
                        </LoadingButton>
                    </div>

                    {isPending ? (
                        <div className="flex items-center justify-center h-full">
                            <FuseLoading />
                        </div>
                    ) : (
                        <div>
                            {data.length > 0 ? (
                                <div>
                                    <SelectOption />
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
                                        There are no data!, click the Reload
                                        button.
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

export default ProductionScwApp
