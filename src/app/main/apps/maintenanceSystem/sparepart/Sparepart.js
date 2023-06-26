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
    getSparepart,
    newSparepart,
    selectSparepart,
    resetSparepart,
} from '../store/sparepartSlice'

function Sparepart(props) {
    const dispatch = useDispatch()
    const sparepart = useSelector(selectSparepart)
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const routeParams = useParams()
    const [tabValue, setTabValue] = useState('1')
    const [noSparepart, setNoSparepart] = useState(false)
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })
    const { reset, watch, control, onChange, formState } = methods
    const form = watch()

    useDeepCompareEffect(() => {
        function updateSparepartState() {
            const { sparepartId } = routeParams
            if (sparepartId === 'new') {
                dispatch(newSparepart())
            } else {
                dispatch(getSparepart(sparepartId)).then((action) => {
                    if (!action.payload) {
                        setNoSparepart(true)
                    }
                })
            }
        }
        updateSparepartState()
    }, [dispatch, routeParams])

    useEffect(() => {
        const data = { ...sparepart }
        if (!sparepart) {
            return
        }
        reset(data)
    }, [sparepart, reset])

    useEffect(() => {
        return () => {
            dispatch(resetSparepart())
            setNoSparepart(false)
        }
    }, [dispatch])

    function handleTabChange(ev, val) {
        setTabValue(val)
    }

    if (noSparepart) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" varian="h5">
                    There is no such sparepart!
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
        (sparepart &&
            routeParams.sparepartId !== sparepart.uuid &&
            routeParams.sparepartId !== 'new')
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
                                    {/* <Tab label="Sparepart" value="2" /> */}
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <div style={{ height: 350, width: '80%' }}>
                                    <SparepartMachineTab />
                                </div>
                            </TabPanel>
                            {/* <TabPanel value="2">
                                <div style={{ height: 350, width: '80%' }}>
                                    <SparepartLifeTime />
                                </div>
                            </TabPanel> */}
                        </TabContext>
                    </>
                }
                scroll={isMobile ? 'normal' : 'content'}
            />
        </FormProvider>
    )
}

export default Sparepart
