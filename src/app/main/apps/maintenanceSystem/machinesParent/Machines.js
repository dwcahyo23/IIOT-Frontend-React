import _ from '@lodash'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/system'
import FusePageSimple from '@fuse/core/FusePageSimple'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import {
    getMachines,
    selectMachines,
} from '../store/machineParent/machinesSlice'
import { selectCom } from '../store/machineParent/machinesComSlice'
import { selectProcess } from '../store/machineParent/machinesProcessSlice'
import MachineCard from './MachineCard'
import ReactToPrint from 'react-to-print'
import MachinePrint from './print/MachinePrint'

function Machines() {
    const componentRef = useRef()
    const dispatch = useDispatch()
    const machines = useSelector(selectMachines)
    const com = useSelector(selectCom)
    const process_type = useSelector(selectProcess)

    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [filteredData, setFilteredData] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [selectedProcessType, setSelectedProcessType] = useState('FORMING')
    const [searchComTab, setSearchComTab] = useState('GM1')

    useEffect(() => {
        dispatch(getMachines())
    }, [dispatch])

    useEffect(() => {
        function getFilteredArray() {
            if (
                searchText.length === 0 &&
                //selectedProcessType === 'all' &&
                !selectedProcessType &&
                !searchComTab
            ) {
                return machines
            }

            return _.filter(machines, (data) => {
                if (
                    // selectedProcessType !== 'all' &&
                    data.mch_process !== selectedProcessType
                ) {
                    return false
                }

                if (data.mch_com !== searchComTab) {
                    return false
                }

                return data.mch_code
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            })
        }
        if (machines) {
            setFilteredData(getFilteredArray())
            // console.log(getFilteredArray())
        }
    }, [machines, searchText, searchComTab, selectedProcessType])

    function handleSelectedProcessType(event) {
        setSelectedProcessType(event.target.value)
    }

    function handleSearchText(event) {
        setSearchText(event.target.value)
    }

    function handleSearchComTab(event, value) {
        setSearchComTab(value)
    }

    return (
        <FusePageSimple
            content={
                <div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
                    <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                        <div className="flex items-center max-w-full">
                            <motion.div
                                className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                                initial={{ x: -20 }}
                                animate={{ x: 0, transition: { delay: 0.3 } }}
                            >
                                <Typography className="text-16 sm:text-20 truncate font-semibold">
                                    Daftar Mesin
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className="font-medium"
                                >
                                    FO-03-03-01
                                </Typography>
                            </motion.div>
                        </div>
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-start space-y-16 sm:space-y-0 sm:space-x-16">
                            <ReactToPrint
                                trigger={() => (
                                    <Button
                                        className="px-16 min-w-100"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Print
                                    </Button>
                                )}
                                content={() => componentRef.current}
                                pageStyle="@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }"

                                // "@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }"
                            />
                            <MachinePrint
                                ref={componentRef}
                                params={filteredData && filteredData}
                            />

                            <FormControl
                                className="flex w-full sm:w-256"
                                variant="outlined"
                            >
                                <InputLabel id="category-select-label">
                                    Process
                                </InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    label="Category"
                                    value={selectedProcessType}
                                    onChange={handleSelectedProcessType}
                                >
                                    {/* <MenuItem value="all">
                                        <em> All </em>
                                    </MenuItem> */}

                                    {process_type &&
                                        process_type.map(
                                            (data) =>
                                                data.mch_com ==
                                                    searchComTab && (
                                                    <MenuItem
                                                        value={data.mch_process}
                                                        key={data.uuid}
                                                    >
                                                        {data.mch_process}
                                                    </MenuItem>
                                                )
                                        )}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Search"
                                placeholder="Enter a keyword..."
                                className="flex w-full sm:w-256 mx-8"
                                value={searchText}
                                inputProps={{
                                    'aria-label': 'Search',
                                }}
                                onChange={handleSearchText}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
                            <Tabs
                                value={searchComTab}
                                onChange={handleSearchComTab}
                                indicatorColor="secondary"
                                textColor="secondary"
                                variant="scrollable"
                                scrollButtons="auto"
                                classes={{ root: 'w-full h-16 border-b-1' }}
                            >
                                {com &&
                                    com.map((data) => (
                                        <Tab
                                            value={data.mch_com}
                                            key={data.uuid}
                                            label={data.mch_com}
                                        />
                                    ))}
                            </Tabs>
                        </div>
                    </div>
                    {useMemo(() => {
                        const container = {
                            show: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }

                        const item = {
                            hidden: {
                                opacity: 0,
                                y: 20,
                            },
                            show: {
                                opacity: 1,
                                y: 0,
                            },
                        }

                        return (
                            filteredData &&
                            (filteredData.length > 0 ? (
                                <motion.div
                                    className="flex grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-16 mt-16 sm:mt-16"
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                >
                                    {filteredData.map((data) => {
                                        return (
                                            <motion.div
                                                variants={item}
                                                key={data.uuid}
                                            >
                                                <MachineCard
                                                    params={{
                                                        ...data,
                                                    }}
                                                />
                                            </motion.div>
                                        )
                                    })}
                                </motion.div>
                            ) : (
                                <div className="flex flex-1 items-center justify-center">
                                    <Typography
                                        color="text.secondary"
                                        className="text-24 mt-32 my-32"
                                    >
                                        No machine found!
                                    </Typography>
                                </div>
                            ))
                        )
                    }, [filteredData])}
                </div>
            }
            scroll={isMobile ? 'normal' : 'page'}
        />
    )
}

export default Machines
