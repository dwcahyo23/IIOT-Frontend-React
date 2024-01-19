import FusePageSimple from '@fuse/core/FusePageSimple'
import { motion } from 'framer-motion'
import { Button, Typography } from '@mui/material'
import { Refresh, Download } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { useThemeMediaQuery } from '@fuse/hooks'

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

function E3viewAppMachineInfo() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

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
                                    Dashboard Setup
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className="font-medium"
                                >
                                    Three View App | PT Garuda Metalindo.Tbk
                                </Typography>
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex flex-1 justify-start my-16 lg:my-0">
                        <div className="flex items-center max-w-full">
                            <a href="https://pixeldrain.com/api/file/9tm3LS6r?download">
                                <Button startIcon={<Download />}>
                                    Download Setup
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            }
            scroll={isMobile ? 'normal' : 'page'}
        ></Root>
    )
}

export default E3viewAppMachineInfo
