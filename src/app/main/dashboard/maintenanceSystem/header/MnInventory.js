import FusePageSimple from '@fuse/core/FusePageSimple'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAp } from '../store/apSlice'
import { Box, colors, Tabs, Tab } from '@mui/material'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'

import InventoryRequestSparepart from '../subheader/InventoryRequestSparepart'
import InventoryGM2RequestSparepart from '../subheader/InventoryGM2RequestSparepart'
import InventorySafetyStock from '../subheader/InventorySafetyStock'

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}))

function MnInventory() {
    const data = useSelector(selectAp)

    const [tabValue, setTabValue] = useState(0)
    function handleChangeTab(event, value) {
        setTabValue(value)
    }

    return (
        <Root
            content={
                <div className="w-full">
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="scrollable"
                        scrollButtons={false}
                        className="w-full px-24 -mx-4 min-h-40 mt-16"
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
                            label="Request Sparepart GM1"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="Request Sparepart GM2"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="Safety Stock"
                        />
                    </Tabs>
                    {tabValue === 0 && <InventoryRequestSparepart />}
                    {tabValue === 1 && <InventoryGM2RequestSparepart />}
                    {tabValue === 2 && <InventorySafetyStock />}
                </div>
            }
        ></Root>
    )
}

export default MnInventory
