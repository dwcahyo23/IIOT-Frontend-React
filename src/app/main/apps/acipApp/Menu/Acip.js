import FusePageSimple from '@fuse/core/FusePageSimple'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { useEffect, useMemo, useState, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ViewList, ViewModule, Map } from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
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
import _ from 'lodash'

import { selectGenbasAcip } from '../store/genba/genbaAcipSlices'
import AcipList from './AcipList'
import AcipDialog from './AcipDialog'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function Acip() {
    const genba = useSelector(selectGenbasAcip)
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [comTab, setComTab] = useState('GM1')
    const [sectionTab, setSectionTab] = useState('ALL')
    const [searchText, setSearchText] = useState('')
    const [statusTab, setStatusTab] = useState('Open')
    const [withCom, setWithCom] = useState([])
    const [withDept, setWithDept] = useState([])
    const [filteredData, setFilteredData] = useState(null)
    const [dialogData, setDialogData] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        function getFilteredArray() {
            if (searchText.length === 0 && sectionTab === 'ALL' && !comTab) {
                return genba
            }
            return _.filter(genba, (val) => {
                if (sectionTab !== 'ALL' && val.dept !== sectionTab) {
                    return false
                }
                if (val.com !== comTab) {
                    return false
                }
                if (val.status !== statusTab) {
                    return false
                }
                return val?.sheet
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            })
        }

        function getCom() {
            const isCom = _.keys(_.groupBy(genba, 'com'))
            return isCom.sort()
        }

        function getDept() {
            const isDep = _.keys(
                _.groupBy(_.filter(genba, { com: comTab }), 'dept')
            )
            isDep.unshift('ALL')
            return isDep.sort()
        }

        if (genba) {
            setFilteredData(getFilteredArray())
            setWithCom(getCom())
            setWithDept(getDept())
        }
    }, [
        genba,
        searchText,
        sectionTab,
        comTab,
        statusTab,
        setWithCom,
        setWithDept,
    ])

    function handleComTab(event, value) {
        setComTab(value.props.value)
    }

    function handleSectionTab(event, value) {
        setSectionTab(value.props.value)
    }

    function handleSearchText(event, value) {
        setSearchText(event.target.value)
    }

    function handleStatusTab(event, value) {
        setStatusTab(event.target.value)
    }

    function paramsId(data) {
        setOpen(true)
        setDialogData(data.row)
    }

    function handleClose(event, reason) {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false)
        }
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
                                        Genba Acip 5R
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        className="font-medium"
                                    >
                                        Acip System | PT Garuda Metalindo.Tbk
                                    </Typography>
                                </motion.div>
                            </div>
                            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-start space-y-16 sm:space-y-0 sm:space-x-16">
                                <TextField
                                    label="Search"
                                    placeholder="Search.."
                                    className="flex w-full sm:w-150 mx-8"
                                    value={searchText}
                                    onChange={handleSearchText}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <FormControl
                                    className="flex w-full sm:w-150 mx-8"
                                    variant="outlined"
                                >
                                    <InputLabel>Plant</InputLabel>

                                    {withCom.length > 0 && (
                                        <Select
                                            labelId="category-select-label"
                                            id="category-select"
                                            label="Category"
                                            value={comTab}
                                            onChange={handleComTab}
                                        >
                                            {withCom.map((val, index) => (
                                                <MenuItem
                                                    value={val}
                                                    key={index}
                                                >
                                                    {val}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                </FormControl>

                                <FormControl
                                    className="flex w-full sm:w-150 mx-8"
                                    variant="outlined"
                                >
                                    <InputLabel>Dept</InputLabel>
                                    {withDept.length > 0 && (
                                        <Select
                                            labelId="category-select-label"
                                            id="category-select"
                                            label="Category"
                                            value={sectionTab}
                                            onChange={handleSectionTab}
                                        >
                                            {withDept.map((val, index) => (
                                                <MenuItem
                                                    value={val}
                                                    key={index}
                                                >
                                                    {val}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                </FormControl>
                                <FormControl
                                    className="flex w-full sm:w-150 mx-8"
                                    variant="outlined"
                                >
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        label="Category"
                                        value={statusTab}
                                        onChange={handleStatusTab}
                                    >
                                        <MenuItem value="Open" key={1}>
                                            Open
                                        </MenuItem>
                                        <MenuItem value="Close" key={2}>
                                            Close
                                        </MenuItem>
                                    </Select>
                                </FormControl>
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
                                    <AcipList
                                        params={filteredData}
                                        paramsId={paramsId}
                                    />
                                ) : (
                                    <div className="flex flex-1 items-center justify-center">
                                        <Typography
                                            color="text.secondary"
                                            className="text-24 mt-32 my-32"
                                        >
                                            N/A
                                        </Typography>
                                    </div>
                                ))
                            )
                        }, [filteredData])}
                    </div>
                }
                scroll={isMobile ? 'normal' : 'page'}
            />
            <Dialog
                open={open}
                maxWidth={'xl'}
                style={{ zIndex: 1000 }}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            Update Genba {dialogData?.sheet}
                        </Typography>

                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{ width: 900, height: 600, zIndex: 1000 }}>
                    <AcipDialog params={dialogData} />
                </div>
            </Dialog>
        </div>
    )
}

export default Acip
