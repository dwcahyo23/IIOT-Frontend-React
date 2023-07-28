import FusePageSimple from '@fuse/core/FusePageSimple'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import withReducer from 'app/store/withReducer'
import _ from '@lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import MaintenanceDashboardHeader from './maintenanceDashboardHeader'
import reducer from './store'
import { getApSlice, selectAp } from './store/apSlice'
import { getUserSlice } from './store/userSlice'
import { getMnReqSlice } from './store/mnReqSlice'
import { getMnRepSlice } from './store/mnRepSlice'

import MnGM1 from './tabs/MnGM1'
import MnGM2 from './tabs/MnGM2'
import MnGM3 from './tabs/MnGM3'
import MnGM5 from './tabs/MnGM5'
import Inventory from './tabs/Inventory'
import MnGM1Header from './header/MnGM1Header'

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}))

function maintenanceDashboard(props) {
    const dispatch = useDispatch()

    const [tabValue, setTabValue] = useState(0)

    useEffect(() => {
        dispatch(getApSlice())
        dispatch(getUserSlice())
        dispatch(getMnReqSlice())
        dispatch(getMnRepSlice())
    }, [dispatch])

    function handleChangeTab(event, value) {
        setTabValue(value)
    }

    return (
        <Root
            // header={<MaintenanceDashboardHeader />}
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
                    {/* {tabValue === 0 && <MnGM1 />} */}
                    {tabValue === 0 && <MnGM1Header />}
                    {tabValue === 1 && <MnGM2 />}
                    {tabValue === 2 && <MnGM3 />}
                    {tabValue === 3 && <MnGM5 />}
                    {tabValue === 4 && <Inventory />}
                </div>
            }
        />
    )
}

export default withReducer('dashboard', reducer)(maintenanceDashboard)
