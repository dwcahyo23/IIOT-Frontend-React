import FusePageSimple from '@fuse/core/FusePageSimple'
import FuseLoading from '@fuse/core/FuseLoading'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Tab, Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { LoadingButton } from '@mui/lab'
import { Refresh } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

import {
    selectErpYear,
    selectErpPriNo,
    selectErpMonth,
    erpYear,
    erpPrio,
    erpMonth,
    setErpYear,
    setErpPrio,
    setErpMonth,
    filteredErps,
    filterChartErps,
    filteredRequestByMonth,
    erpPending,
} from '../../store/erpStore/erpMnSlices'

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

import { getErpMnSlices } from '../../store/erpStore/erpMnSlices'
import { getMachineMnSlices } from '../../store/machineStore/machineMnSlices'
import { getReportSlices } from '../../store/reportStore/reportMnSlices'
import { getRequestSlices } from '../../store/requestStore/requestMnSlices'
import { getSparepartSlices } from '../../store/sparepartStore/sparepartMnSlices'
import { getStokSlices } from '../../store/stokStore/stokMnSlices'
import { getUsersMn } from '../../store/userStore/userMnSlices'

import { useThemeMediaQuery } from '@fuse/hooks'
import MaintenanceAppErpMain from './MaintenanceAppErpMain'
import DonwloadExcelWorkOrder from '../../components/DonwloadExcelWorkOrder'

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

function MaintenanceAppErps() {
    const dispatch = useDispatch()
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [loading, setLoading] = useState(true)

    const [filterData, filterChart, filterExcel] = [
        useSelector(filteredErps),
        useSelector(filterChartErps),
        useSelector(filteredErpsByMonth),
    ]

    const [
        selectMonth,
        useMonth,
        selectYear,
        useYear,
        isPending,
        selectPrio,
        usePrio,
    ] = [
        useSelector(selectErpMonth),
        useSelector(erpMonth),
        useSelector(selectErpYear),
        useSelector(erpYear),
        useSelector(erpPending),
        useSelector(selectErpPriNo),
        useSelector(erpPrio),
    ]

    const [selectCom, useCom] = [
        useSelector(selectMachinesCom),
        useSelector(machinesCom),
    ]

    const [useSection] = [useSelector(machinesSection)]

    const [selectResponbility, useResponbility] = [
        useSelector(selectMachinesResponbility),
        useSelector(machinesResponbility),
    ]

    // useEffect(() => {
    //     if (isPending) {
    //         return
    //     }
    //     setLoading(false)
    // }, [isPending])

    function handleComTab(event, value) {
        dispatch(setMachinesCom(value))
        // dispatch(setMachinesSection('ALL'))
        dispatch(setMachinesResponbility('ALL'))
    }

    function handleSection(event, value) {
        dispatch(setMachinesSection(value.props.value))
        dispatch(setMachinesResponbility('ALL'))
    }

    function handleResponbility(event, value) {
        dispatch(setMachinesResponbility(value.props.value))
    }

    function handleYear(event, value) {
        dispatch(setErpYear(value.props.value))
        // dispatch(setMachinesSection('ALL'))
        // dispatch(setMachinesResponbility('ALL'))
    }

    function handlePrio(event, value) {
        dispatch(setErpPrio(value.props.value))
        // dispatch(setMachinesSection('ALL'))
        // dispatch(setMachinesResponbility('ALL'))
    }

    function reload(event, value) {
        dispatch(getErpMnSlices())
        dispatch(getMachineMnSlices())
        dispatch(getReportSlices())
        dispatch(getRequestSlices())
        dispatch(getSparepartSlices())
        dispatch(getStokSlices())
        dispatch(getUsersMn())
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
                                    Work Order Maintenance | FO-03-04-01
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
                        <FormControl
                            className="flex w-full sm:w-auto mx-8"
                            variant="outlined"
                        >
                            <InputLabel>Year</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Category"
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
                            <InputLabel>Section</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Category"
                                value={useSection}
                                onChange={handleSection}
                            >
                                <MenuItem value="ALL">ALL</MenuItem>
                                <MenuItem value="machinery">MACHINERY</MenuItem>
                                <MenuItem value="utility">UTILITY</MenuItem>
                                <MenuItem value="workshop">WORKSHOP</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl
                            className="flex w-full sm:w-auto mx-8"
                            variant="outlined"
                        >
                            <InputLabel>Priority</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Category"
                                value={usePrio}
                                onChange={handlePrio}
                            >
                                {selectPrio.map((val, index) => (
                                    <MenuItem value={val.val} key={index}>
                                        {val.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            className="flex w-full sm:w-auto mx-8"
                            variant="outlined"
                        >
                            <InputLabel>Leader</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Category"
                                value={useResponbility}
                                onChange={handleResponbility}
                            >
                                {selectResponbility.map((val, index) => {
                                    if (useCom === 'ALL' && val === 'ALL') {
                                        return (
                                            <MenuItem value={val} key={index}>
                                                SURYADI | DEPARTEMENT HEAD
                                            </MenuItem>
                                        )
                                    } else if (
                                        useCom === 'GM1' &&
                                        val === 'ALL'
                                    ) {
                                        if (useSection == 'workshop') {
                                            return (
                                                <MenuItem
                                                    value={val}
                                                    key={index}
                                                >
                                                    R HIDAYAT | SECTION HEAD
                                                </MenuItem>
                                            )
                                        } else {
                                            return (
                                                <MenuItem
                                                    value={val}
                                                    key={index}
                                                >
                                                    BENYAMIN | SECTION HEAD
                                                </MenuItem>
                                            )
                                        }
                                    } else if (
                                        useCom === 'GM2' &&
                                        val === 'ALL'
                                    ) {
                                        return (
                                            <MenuItem value={val} key={index}>
                                                SADRI | SECTION HEAD
                                            </MenuItem>
                                        )
                                    } else if (
                                        (useCom === 'GM3' ||
                                            useCom === 'GM5') &&
                                        val === 'ALL'
                                    ) {
                                        if (useSection == 'workshop') {
                                            return (
                                                <MenuItem
                                                    value={val}
                                                    key={index}
                                                >
                                                    R HIDAYAT | SECTION HEAD
                                                </MenuItem>
                                            )
                                        } else {
                                            return (
                                                <MenuItem
                                                    value={val}
                                                    key={index}
                                                >
                                                    Vacancy
                                                </MenuItem>
                                            )
                                        }
                                    } else {
                                        return (
                                            <MenuItem value={val} key={index}>
                                                {val}
                                            </MenuItem>
                                        )
                                    }
                                })}
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

                        <DonwloadExcelWorkOrder params={filterExcel} />
                    </div>

                    {isPending ? (
                        <div className="flex items-center justify-center h-full">
                            <FuseLoading />
                        </div>
                    ) : (
                        <div>
                            {filterData.length > 0 ? (
                                <div>
                                    <MaintenanceAppErpMain />
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

export default MaintenanceAppErps
