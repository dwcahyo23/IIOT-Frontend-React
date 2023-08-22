import FusePageSimple from '@fuse/core/FusePageSimple'
import _ from 'lodash'
import { useState } from 'react'
import { Box, colors, Tabs, Tab } from '@mui/material'
import { styled } from '@mui/material/styles'

import MnGM5SubHeaderMachinery from '../subheader/MnGM5SubHeaderMachinery'
import MnGM5SubHeaderUtility from '../subheader/MnGM5SubHeaderUtility'
import MnGM5SubHeaderWorkshop from '../subheader/MnGM5SubHeaderWorkshop'

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}))

function MnGM5Header() {
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
                            label="Machinery"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="Utility"
                        />
                        <Tab
                            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                            disableRipple
                            label="Workshop"
                        />
                    </Tabs>
                    {tabValue === 0 && <MnGM5SubHeaderMachinery />}
                    {tabValue === 1 && <MnGM5SubHeaderUtility />}
                    {tabValue === 2 && <MnGM5SubHeaderWorkshop />}
                </div>
            }
        ></Root>
    )
}

export default MnGM5Header
