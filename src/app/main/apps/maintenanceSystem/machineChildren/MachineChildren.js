import FuseLoading from '@fuse/core/FuseLoading'
import FusePageCarded from '@fuse/core/FusePageCarded'
import { useDeepCompareEffect, useThemeMediaQuery } from '@fuse/hooks'
import { Box, Button, Typography } from '@mui/material'
//
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import withReducer from 'app/store/withReducer'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import _ from 'lodash'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
    getMaintenanceSystem,
    newMachineChildren,
    selectMachineChildren,
    resetMachineChildren,
} from '../store/machineChildren/machineChildrenSlice'

import MachineChildrenHeader from './machineChildrenHeader'
import MaintenanceMachine from '../machineTab/MaintenanceMachine'
import MaintenanceApsheet from '../machineTab/MaintenanceApsheet'
import MaintenanceApReport from '../machineTab/MaintenanceApReport'
import MaintenanceApInventory from '../machineTab/MaintenanceApInventory'

const schema = yup.object().shape({
    // mch_code: yup.string().required('Require machine code').min(8).max(8),
    // mch_name: yup.string().required('Require machine name').min(6).max(25),
    // mch_com: yup.string().required('Require machine com'),
    id_request: yup
        .string()
        .required('Require machine ap-sheet')
        .min(11)
        .max(11),
    item_name: yup.string().required('Require item name'),
    item_qty: yup.number().positive().required('Require item qty'),
    item_uom: yup.string().required('Require item uom').min(3).max(3),

    id_report: yup
        .string()
        .required('Require machine ap-sheet')
        .min(11)
        .max(11),
    chronological: yup.string().required('Require machine chronological'),
    corrective: yup.string().required('Require machine corrective'),
    prevention: yup.string().required('Require machine prevention'),
})

function MachineChildren(props) {
    const dispatch = useDispatch()
    const machineChildren = useSelector(selectMachineChildren)
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const routeParams = useParams()
    const [tabValue, setTabValue] = useState('1')
    const [noMachineChildren, setNoMachineChildren] = useState(false)
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })

    const { reset, watch, control, onChange, formState, getFieldState } =
        methods

    const form = watch()

    useDeepCompareEffect(() => {
        function updateMachineChildrenState() {
            const { uuid } = routeParams
            if (uuid === 'new') {
                dispatch(newMachineChildren())
            } else {
                dispatch(getMaintenanceSystem(uuid)).then((action) => {
                    if (!action.payload) {
                        setNoMachineChildren(true)
                    }
                })
            }
        }
        updateMachineChildrenState()
    }, [dispatch, routeParams])

    useEffect(() => {
        const data = { ...machineChildren }
        if (!machineChildren) {
            return
        }
        reset(data)
    }, [machineChildren, reset])

    useEffect(() => {
        return () => {
            dispatch(resetMachineChildren())
            setNoMachineChildren(false)
        }
    }, [dispatch])

    function handleTabChange(ev, val) {
        setTabValue(val)
    }

    if (noMachineChildren) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" varian="h5">
                    There is no such data!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/madbusApp/address"
                    color="inherit"
                >
                    Go to Address Page
                </Button>
            </motion.div>
        )
    }
    if (
        _.isEmpty(form) ||
        (machineChildren &&
            routeParams.uuid !== machineChildren.uuid &&
            routeParams.uuid !== 'new')
    ) {
        return <FuseLoading />
    }
    return (
        <FormProvider {...methods}>
            <FusePageCarded
                header={<MachineChildrenHeader />}
                content={
                    <>
                        <TabContext value={tabValue}>
                            <Box
                                sx={{ borderBottom: 1, borderColor: 'divider' }}
                            >
                                <TabList
                                    onChange={handleTabChange}
                                    aria-label="lab API tabs example"
                                >
                                    <Tab label="Machine" value="1" />
                                    <Tab label="Sparepart" value="2" />
                                    <Tab label="AP-Sheet" value="3" />
                                    <Tab label="AP-Report" value="4" />
                                    <Tab label="AP-Inventory" value="5" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <div style={{ height: 350, width: '80%' }}>
                                    <MaintenanceMachine />
                                </div>
                            </TabPanel>
                            <TabPanel value="2">
                                <div
                                    style={{ width: '100%', height: 500 }}
                                ></div>
                            </TabPanel>
                            <TabPanel value="3">
                                <div style={{ width: '100%', height: 500 }}>
                                    <MaintenanceApsheet />
                                </div>
                            </TabPanel>
                            <TabPanel value="4">
                                <div style={{ width: '100%', height: 500 }}>
                                    <MaintenanceApReport />
                                </div>
                            </TabPanel>
                            <TabPanel value="5">
                                <div style={{ width: '100%', height: 500 }}>
                                    <MaintenanceApInventory />
                                </div>
                            </TabPanel>
                        </TabContext>
                    </>
                }
                scroll={isMobile ? 'normal' : 'content'}
            />
        </FormProvider>
    )
}

export default MachineChildren
