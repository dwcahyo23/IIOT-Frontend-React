import FusePageSimple from '@fuse/core/FusePageSimple'
import FuseLoading from '@fuse/core/FuseLoading'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Tab, Box, OutlinedInput } from '@mui/material'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { LoadingButton } from '@mui/lab'
import { Refresh } from '@mui/icons-material'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'
import { useThemeMediaQuery } from '@fuse/hooks'

import {
    getScwSlices,
    setScwYear,
    setScwStatus,
    setScwCom,
    scwCom,
    scwYear,
    status,
    selectScwCom,
    selectScwYear,
    filteredScw,
    scwPending,
} from '../../store/scwStore/scwProductionSlices'
import ProductionAppScwMain from './ProductionAppScwMain'

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

function ProductionScwApp() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const dispatch = useDispatch()

    const [selectYear, selectCom] = [
        useSelector(selectScwYear),
        useSelector(selectScwCom),
    ]
    const [useCom, useYear, useStatus, isPending] = [
        useSelector(scwCom),
        useSelector(scwYear),
        useSelector(status),
        useSelector(scwPending),
    ]
    const data = useSelector(filteredScw)

    function handleCom(event, value) {
        dispatch(setScwCom(value.props.value))
    }

    function handleYear(event, value) {
        dispatch(setScwYear(value.props.value))
    }

    function handleStatus(event, value) {
        dispatch(setScwStatus(value.props.value))
    }

    function reload(event, value) {
        dispatch(getScwSlices())
    }

    return (
        <Root
            content={
                <div className="flex flex-col flex-1 w-full mx-auto px-16 pt-8 sm:p-40">
                    <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0 mt-8 mb-16">
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
                                    SCW
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className="font-medium"
                                >
                                    Production App | PT Garuda Metalindo.Tbk
                                </Typography>
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex flex-1 justify-start my-16 lg:my-0 mt-8 mb-16">
                        <FormControl
                            className="flex w-full sm:w-auto mx-8"
                            variant="outlined"
                        >
                            <InputLabel>Year</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Category"
                                value={useYear}
                                onChange={handleYear}
                            >
                                {selectYear.map((val, index) => (
                                    <MenuItem value={val} key={index}>
                                        {val}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            className="flex w-full sm:w-auto mx-8"
                            variant="outlined"
                        >
                            <InputLabel>Com</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Category"
                                value={useCom}
                                onChange={handleCom}
                            >
                                {selectCom.map((val, index) => (
                                    <MenuItem value={val} key={index}>
                                        {val}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            className="flex w-full sm:w-auto mx-8"
                            variant="outlined"
                        >
                            <InputLabel>Status</InputLabel>

                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                label="Category"
                                value={useStatus}
                                onChange={handleStatus}
                            >
                                <MenuItem value="ALL">All</MenuItem>
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="Close">Close</MenuItem>
                            </Select>
                        </FormControl>

                        <LoadingButton
                            variant="outline"
                            color="secondary"
                            loading={isPending}
                            loadingPosition="start"
                            startIcon={<Refresh />}
                            onClick={reload}
                        >
                            <span>Reload</span>
                        </LoadingButton>
                    </div>

                    {data && <ProductionAppScwMain />}
                </div>
            }
            scroll={isMobile ? 'normal' : 'page'}
        ></Root>
    )
}

export default ProductionScwApp
