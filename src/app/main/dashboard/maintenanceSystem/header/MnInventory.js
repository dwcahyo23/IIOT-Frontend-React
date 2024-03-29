import FusePageSimple from '@fuse/core/FusePageSimple'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAp } from '../store/apSlice'
import { Box, colors, Tabs, Tab } from '@mui/material'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'

import InventoryGM1RequestSparepart from '../subheader/InventoryGM1RequestSparepart'
import InventoryGM2RequestSparepart from '../subheader/InventoryGM2RequestSparepart'
import InventoryGM3RequestSparepart from '../subheader/InventoryGM3RequestSparepart'
import InventoryGM5RequestSparepart from '../subheader/InventoryGM5RequestSparepart'
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
                            label="Inventory GM1"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="Inventory GM2"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="Inventory GM3"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="Inventory GM5"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="Safety Stock"
                        />
                    </Tabs>
                    {tabValue === 0 && <InventoryGM1RequestSparepart />}
                    {tabValue === 1 && <InventoryGM2RequestSparepart />}
                    {tabValue === 2 && <InventoryGM3RequestSparepart />}
                    {tabValue === 3 && <InventoryGM5RequestSparepart />}
                    {tabValue === 4 && <InventorySafetyStock />}
                </div>
            }
        ></Root>
    )
}

export default MnInventory
