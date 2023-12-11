import FusePageSimple from '@fuse/core/FusePageSimple'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import withReducer from 'app/store/withReducer'
import _ from '@lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import reducer from './store'

import { getApSlice } from './store/apSlice'
import { getUserSlice, selectApEntity } from './store/userSlice'
import { getMnReqSlice } from './store/mnReqSlice'
import { getMnRepSlice } from './store/mnRepSlice'
import { getMnControllStock } from './store/mnControllStockSlice'
import { getMnMachineSlice } from './store/mnMachineSlice'

import MnGM1Header from './header/MnGM1Header'
import MnGM2Header from './header/MnGM2Header'
import MnGM3Header from './header/MnGM3Header'
import MnGM5Header from './header/MnGM5Header'
import MnInventory from './header/MnInventory'

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}))

function maintenanceDashboard(props) {
    const dispatch = useDispatch()
    const [tabValue, setTabValue] = useState(0)
    // const data = useSelector(selectAp)

    useEffect(() => {
        // dispatch(getApSlice())
        // dispatch(getMachineSlice())
        dispatch(getUserSlice())
        dispatch(getMnReqSlice())
        dispatch(getMnRepSlice())
        dispatch(getMnControllStock())
        dispatch(getMnMachineSlice())
    }, [])

    function handleChangeTab(event, value) {
        setTabValue(value)
    }

    return (
        <Root
            content={
                <div className="w-full p-10 pt-8 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
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
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="GM1"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="GM2"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="GM3"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="GM5"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="Inventory MN"
                        />
                    </Tabs>
                    {tabValue === 0 && <MnGM1Header />}
                    {tabValue === 1 && <MnGM2Header />}
                    {tabValue === 2 && <MnGM3Header />}
                    {tabValue === 3 && <MnGM5Header />}
                    {tabValue === 4 && <MnInventory />}
                </div>
            }
        />
    )
}

export default withReducer('dashboard', reducer)(maintenanceDashboard)
