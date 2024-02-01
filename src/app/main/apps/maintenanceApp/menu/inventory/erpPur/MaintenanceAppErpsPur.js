import FusePageSimple from '@fuse/core/FusePageSimple'
import FuseLoading from '@fuse/core/FuseLoading'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import { Refresh } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { useThemeMediaQuery } from '@fuse/hooks'

import { LoadingButton } from '@mui/lab'

import {
    isPendingErpPur,
    searchText,
    setSearchText,
    getErpPurMnSlices,
    filterdErpsPur,
} from '../../../store/erpPurStore/erpPurMnSlices'

import MaintenanceAppErpsPurMain from './MaintenanceAppErpsPurMain'

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

function MaintenanceAppErpsPur() {
    const dispatch = useDispatch()
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

    const [isPending1, search] = [
        useSelector(isPendingErpPur),
        useSelector(searchText),
    ]

    const filterData = useSelector(filterdErpsPur)

    function handleSearch(event, value) {
        dispatch(setSearchText(event.target.value))
    }

    function reload(event, value) {
        dispatch(getErpPurMnSlices())
    }

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
                                    Purchase Maintenance
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className="font-medium"
                                >
                                    Maintenance App | PT Garuda Metalindo.Tbk
                                </Typography>
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex flex-1 justify-start my-16 lg:my-0">
                        <FormControl>
                            <TextField
                                label="Search"
                                placeholder="Search.."
                                className="flex w-full sm:w-150 mx-8"
                                value={search}
                                onChange={handleSearch}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>

                        <LoadingButton
                            variant="outline"
                            color="secondary"
                            loadingIndicator={
                                <Typography sx={{ color: 'white' }}>
                                    Loading...
                                </Typography>
                            }
                            loading={isPending1}
                            loadingPosition="start"
                            startIcon={<Refresh />}
                            onClick={reload}
                        >
                            <span>Reload</span>
                        </LoadingButton>
                    </div>

                    {isPending1 ? (
                        <div className="flex items-center justify-center h-full">
                            <FuseLoading />
                        </div>
                    ) : (
                        <div>
                            {filterData.length > 0 ? (
                                <div>
                                    <MaintenanceAppErpsPurMain />
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { delay: 0.1 },
                                    }}
                                    className="flex flex-1 items-center justify-center h-full"
                                >
                                    <Typography
                                        color="text.secondary"
                                        variant="h5"
                                    >
                                        There are no data!, click the Reload
                                        button.
                                    </Typography>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            }
            scroll={isMobile ? 'normal' : 'page'}
        ></Root>
    )
}

export default MaintenanceAppErpsPur
