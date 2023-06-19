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
import reducer from '../store'
import AddressHeader from './AddressHeader'
import {
    getAddress,
    newAddress,
    selectAddress,
    resetAddress,
} from '../store/addressSlice'

import AddressModbusTab from './tabs/AddressModbusTab'
import AddressMachineTab from './tabs/AddressMachineTab'
import AddressModbusResult from './tabs/AddressModbusResult'
import { height } from '@mui/system'

const schema = yup.object().shape({
    mch_code: yup.string().required('Require machine code').min(8).max(8),
    mch_name: yup.string().required('Require machine name').min(6).max(25),
    mch_com: yup.string().required('Require machine com'),
    ip_address: yup.string().required('Require ip address').min(10),
    port_address: yup.number().required('Require port address'),
    setId_address: yup.number().required('Require setId address'),
    setTimeout_address: yup.number().required('Require setTimeout address'),
    address_register: yup
        .number()
        .required('Require holding register count address'),
    quantity_register: yup
        .number()
        .required('Require holding register run address'),
    data_register: yup
        .object()
        .required('Required data_register in object data type'),
})

function Address(props) {
    const dispatch = useDispatch()
    const address = useSelector(selectAddress)
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const routeParams = useParams()
    const [tabValue, setTabValue] = useState('1')
    const [noAddress, setNoAddress] = useState(false)
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })
    const { reset, watch, control, onChange, formState } = methods
    const form = watch()

    useDeepCompareEffect(() => {
        function updateAddressState() {
            const { addressId } = routeParams

            if (addressId === 'new') {
                dispatch(newAddress())
            } else {
                dispatch(getAddress(addressId)).then((action) => {
                    if (!action.payload) {
                        setNoAddress(true)
                    }
                })
            }
        }
        updateAddressState()
    }, [dispatch, routeParams])

    useEffect(() => {
        const data = { ...address }
        if (!address) {
            return
        }
        reset(data)
    }, [address, reset])

    useEffect(() => {
        return () => {
            dispatch(resetAddress())
            setNoAddress(false)
        }
    }, [dispatch])

    function handleTabChange(event, value) {
        setTabValue(value)
    }

    if (noAddress) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" varian="h5">
                    There is no such address!
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
        (address &&
            routeParams.addressId !== address.mch_code &&
            routeParams.addressId !== 'new')
    ) {
        return <FuseLoading />
    }

    return (
        <FormProvider {...methods}>
            <FusePageCarded
                header={<AddressHeader />}
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
                                    <Tab label="Modbus" value="2" />
                                    <Tab label="Data" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <div style={{ height: 350, width: '80%' }}>
                                    <AddressMachineTab />
                                </div>
                            </TabPanel>
                            <TabPanel value="2">
                                <div style={{ height: 350, width: '80%' }}>
                                    <AddressModbusTab />
                                </div>
                            </TabPanel>
                            <TabPanel value="3">
                                <div style={{ height: 350, width: '100%' }}>
                                    <AddressModbusResult />
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

export default withReducer('modbusApp', reducer)(Address)
