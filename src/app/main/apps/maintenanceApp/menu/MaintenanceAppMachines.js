import FuseLoading from '@fuse/core/FuseLoading'
import FusePageSimple from '@fuse/core/FusePageSimple'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { useEffect, useState, forwardRef } from 'react'
import { motion } from 'framer-motion'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import InputLabel from '@mui/material/InputLabel'
import { useSelector, useDispatch } from 'react-redux'
import {
    setMachinesCom,
    setMachinesProcess,
    selectMachinesCom,
    selectMachinesProcess,
    machinesCom,
    machinesProcess,
} from '../store/machineStore/machineMnSlices'

function MaintenanceAppMachines() {
    const dispatch = useDispatch()

    const [useCom, useProcess] = [
        useSelector(machinesCom),
        useSelector(machinesProcess),
    ]

    const [selectCom, selectProcess] = [
        useSelector(selectMachinesCom),
        useSelector(selectMachinesProcess),
    ]

    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

    function handleComTab(event, value) {
        dispatch(setMachinesCom(value.props.value))
        dispatch(setMachinesProcess('ALL'))
    }

    function handleProcessTab(event, value) {
        dispatch(setMachinesProcess(value.props.value))
    }

    return (
        <div>
            <FusePageSimple
                content={
                    <div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
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
                                        Daftar Mesin | FO-03-03-01
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        className="font-medium"
                                    >
                                        Maintenance App | PT Garuda
                                        Metalindo.Tbk
                                    </Typography>
                                </motion.div>
                            </div>
                            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-start space-y-16 sm:space-y-0 sm:space-x-16">
                                <TextField
                                    label="Search"
                                    placeholder="Search.."
                                    className="flex w-full sm:w-256 mx-8"
                                    // value={search}
                                    // onChange={handleSearchText}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <FormControl
                                    className="flex w-full sm:w-256 mx-8"
                                    variant="outlined"
                                >
                                    <InputLabel>Plant</InputLabel>

                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        label="Category"
                                        value={useCom}
                                        onChange={handleComTab}
                                    >
                                        {selectCom.map((val, index) => (
                                            <MenuItem value={val} key={index}>
                                                {val}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl
                                    className="flex w-full sm:w-256 mx-8"
                                    variant="outlined"
                                >
                                    <InputLabel>Process</InputLabel>

                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        label="Category"
                                        value={useProcess}
                                        onChange={handleProcessTab}
                                    >
                                        {selectProcess.map((val, index) => (
                                            <MenuItem value={val} key={index}>
                                                {val}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        {/* {selectFilter.length > 0 ? (
                            <AcipList
                                params={selectFilter}
                                paramsId={paramsId}
                            />
                        ) : ( */}
                        <div className="flex flex-1 items-center justify-center">
                            <Typography
                                color="text.secondary"
                                className="text-24 mt-32 my-32"
                            >
                                N/A
                            </Typography>
                        </div>
                        {/* )} */}
                    </div>
                }
                scroll={isMobile ? 'normal' : 'page'}
            />
        </div>
    )
}

export default MaintenanceAppMachines
