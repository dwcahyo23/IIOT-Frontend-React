import _ from '@lodash'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/system'
import FusePageSimple from '@fuse/core/FusePageSimple'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { getCategories, selectCategories } from '../store/categoriesSlice'
import { getMachines, selectMachines } from '../store/machinesSlice'
import MachineCard from './MachineCard'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

function Machines(props) {
    const dispatch = useDispatch()
    const courses = useSelector(selectMachines)
    const categories = useSelector(selectCategories)
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

    // const theme = useTheme();
    const [filteredData, setFilteredData] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchProcessTab, setSearchProcessTab] = useState('METAL FORMING')
    const [searchComTab, setSearchComTab] = useState('GM1')

    useEffect(() => {
        dispatch(getMachines())
    }, [dispatch])

    useEffect(() => {
        function getFilteredArray() {
            if (
                searchText.length === 0 &&
                selectedCategory === 'all' &&
                !searchProcessTab &&
                !searchComTab
            ) {
                return courses
            }

            return _.filter(courses, (item) => {
                if (
                    selectedCategory !== 'all' &&
                    item.category !== selectedCategory
                ) {
                    return false
                }

                if (item.machine_index.mch_process !== searchProcessTab) {
                    return false
                }

                if (item.machine_index.mch_com !== searchComTab) {
                    return false
                }

                return (
                    item.machine_index.mch_name
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    item.machine_index.mch_code
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    item.machine_index.mch_com
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                )
            })
        }

        if (courses) {
            setFilteredData(getFilteredArray())
        }
    }, [courses, searchText, searchComTab, searchProcessTab, selectedCategory])

    useEffect(() => {}, [searchProcessTab])

    function handleSelectedCategory(event) {
        setSelectedCategory(event.target.value)
    }

    function handleSearchText(event) {
        setSearchText(event.target.value)
    }

    function handleSearchProcessTab(event, value) {
        setSearchProcessTab(value)
    }

    function handleSearchComTab(event, value) {
        setSearchComTab(value)
    }

    return (
        <FusePageSimple
            header={
                <Box
                    className="relative overflow-hidden flex shrink-0 items-center justify-center px-16 py-32 md:p-64"
                    sx={{
                        backgroundColor: 'primary.main',
                        color: (theme) =>
                            theme.palette.getContrastText(
                                theme.palette.primary.main
                            ),
                    }}
                >
                    <div className="flex flex-col items-center justify-center  mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0 } }}
                        >
                            <Typography
                                color="inherit"
                                className="text-18 font-semibold"
                            >
                                MAINTENANCE SYSTEM
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.3 } }}
                        >
                            <Typography
                                color="inherit"
                                className="text-16 sm:text-20 mt-16 sm:mt-24 opacity-75 tracking-tight max-w-md text-center"
                            >
                                These systems are designed to make sure each
                                preventive maintenance task occurs exactly as
                                expected by managers, based on set intervals.
                            </Typography>
                        </motion.div>
                    </div>

                    <svg
                        className="absolute inset-0 pointer-events-none"
                        viewBox="0 0 960 540"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMax slice"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g
                            className="text-gray-700 opacity-25"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="100"
                        >
                            <circle r="200" cx="196" cy="233" />
                            <circle r="234" cx="790" cy="491" />
                        </g>
                    </svg>
                </Box>
            }
            content={
                <div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
                    <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
                            <FormControl
                                className="flex w-full sm:w-136"
                                variant="outlined"
                            >
                                <InputLabel id="category-select-label">
                                    Category
                                </InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    label="Category"
                                    value={selectedCategory}
                                    onChange={handleSelectedCategory}
                                >
                                    <MenuItem value="all">
                                        <em> All </em>
                                    </MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem
                                            value={category.slug}
                                            key={category.uuid}
                                        >
                                            {category.title}
                                        </MenuItem>
                                    ))}
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
                                <Tab value="GM1" label="GM1" />
                                <Tab value="GM2" label="GM2" />
                                <Tab value="GM3" label="GM3" />
                                <Tab value="GMX" label="GMX" />
                            </Tabs>
                        </div>
                    </div>
                    <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
                            <Tabs
                                value={searchProcessTab}
                                onChange={handleSearchProcessTab}
                                indicatorColor="secondary"
                                textColor="secondary"
                                variant="scrollable"
                                scrollButtons="auto"
                                classes={{ root: 'w-full h-16 border-b-1' }}
                            >
                                <Tab value="METAL FORMING" label="FORMING" />
                                <Tab value="ROLLING" label="ROLLING" />
                                <Tab value="MACHINING" label="MACHINING" />
                                <Tab
                                    value="HEAT TREATMENT"
                                    label="HEAT TREATMENT"
                                />
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
                                    className="flex grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-16 mt-16 sm:mt-16"
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                >
                                    {filteredData.map((course) => {
                                        return (
                                            <motion.div
                                                variants={item}
                                                key={course.uuid}
                                            >
                                                <MachineCard course={course} />
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
