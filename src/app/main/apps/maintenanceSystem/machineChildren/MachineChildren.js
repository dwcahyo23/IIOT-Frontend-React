import FuseLoading from '@fuse/core/FuseLoading'
import FusePageCarded from '@fuse/core/FusePageCarded'
import { useDeepCompareEffect, useThemeMediaQuery } from '@fuse/hooks'
import { Box, Button, Typography, Badge } from '@mui/material'
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

import {
    getMachineStock,
    selectStock,
} from '../store/machineChildren/machineStock'

import { getUserSlice } from 'src/app/main/dashboard/maintenanceSystem/store/userSlice'

import MachineChildrenHeader from './machineChildrenHeader'
import MaintenanceMachine from '../machineTab/MaintenanceMachine'
import MaintenanceApsheet from '../machineTab/MaintenanceApsheet'
import MaintenanceApReport from '../machineTab/MaintenanceApReport'
import MaintenanceApInventory from '../machineTab/MaintenanceApInventory'
import MaintenanceGenba from '../machineTab/MaintenanceGenba'
import MaintenanceSparepart from '../machineTab/MaintenanceSparepart'
import MainteannceApHistory from '../machineTab/MaintenanceApHistory'

const schema = yup.object().shape({
    id_request: yup
        .string()
        .required('Require machine ap-sheet')
        .min(11)
        .max(11),
    item_name: yup.string().required('Require item name'),
    item_qty: yup.number().positive().required('Require item qty'),
    item_uom: yup.string().required('Require item uom').min(3).max(3),
    mre_request: yup.string(),

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
    // const machineStock = useSelector(selectStock)
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const routeParams = useParams()
    const [tabValue, setTabValue] = useState('1')
    const [filter, setFilter] = useState('')
    const [noMachineChildren, setNoMachineChildren] = useState(false)
    const [foHeader, setFoHeader] = useState('')
    const [foSubHeader, setFoSubHeader] = useState('')

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })

    const { reset, watch, control, onChange, formState, getFieldState } =
        methods
    const { errors, isValid } = formState

    const form = watch()

    useDeepCompareEffect(() => {
        function updateMachineChildrenState() {
            const { uuid } = routeParams
            dispatch(getMaintenanceSystem(uuid)).then((action) => {
                dispatch(getMachineStock())
                if (routeParams?.sheet_no) {
                    setTabValue('3')
                    setFilter(routeParams.sheet_no)
                }
                if (!action.payload) {
                    setNoMachineChildren(true)
                }
            })
        }
        updateMachineChildrenState()
    }, [dispatch, routeParams])

    useEffect(() => {
        const data = { ...machineChildren }
        if (!machineChildren) {
            return
        }
        // console.log(data)
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
        if (val == 3) {
            setFoHeader('Maintenance Work Order')
            setFoSubHeader('FO-03-04-01')
        } else if (val == 1) {
            setFoHeader('Info Mesin')
            setFoSubHeader('')
        } else if (val == 2) {
            setFoHeader('Monitoring Live Time Spare Part')
            setFoSubHeader('')
        } else if (val == 4) {
            setFoHeader('Laporan Maintenance')
            setFoSubHeader('FO-03-03-07')
        } else if (val == 5) {
            setFoHeader('Penanganan Spare Part Maintenance')
            setFoSubHeader('IK-03-03-11')
        } else if (val == 6) {
            setFoHeader('Riwayat Mesin')
            setFoSubHeader('FO-03-04-03')
        } else {
            setFoHeader('')
            setFoSubHeader('')
        }
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
                header={
                    <MachineChildrenHeader
                        data={{ header: foHeader, subHeader: foSubHeader }}
                    />
                }
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
                                    <Tab label="AP-History" value="6" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <div style={{ height: 350, width: '80%' }}>
                                    <MaintenanceMachine />
                                </div>
                            </TabPanel>
                            <TabPanel value="2">
                                <div style={{ width: '100%', height: 500 }}>
                                    <MaintenanceSparepart />
                                </div>
                            </TabPanel>
                            <TabPanel value="3">
                                <div style={{ width: '100%', height: 500 }}>
                                    <MaintenanceApsheet
                                        data={{
                                            filter: filter,
                                        }}
                                    />
                                </div>
                            </TabPanel>

                            <TabPanel value="6">
                                <div style={{ width: '100%', height: 500 }}>
                                    <MainteannceApHistory
                                        data={{
                                            filter: filter,
                                        }}
                                    />
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
