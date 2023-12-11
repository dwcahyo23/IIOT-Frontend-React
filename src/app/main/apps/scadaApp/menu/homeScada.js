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

import { selectScada, zbUpdateMq } from '../store/machinesSlice'
import CardView from './view/CardView'
import ListView from './view/ListView'
import OpenDialog from './view/Utils/OpenDialog'
import MqttCon from './view/Utils/MqttCon'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

import Gm1 from './view/MapView/Gm1'
import C from './view/MapView/C'
import D from './view/MapView/D'
import F from './view/MapView/F'
import G from './view/MapView/G'
import H from './view/MapView/H'

function selectMap(params) {
    return (
        <div>
            {params.section == 'all' && <Gm1 params={params.data} />}
            {params.section == 'C' && <C params={params.data} />}
            {params.section == 'D' && <D params={params.data} />}
            {params.section == 'F' && <F params={params.data} />}
            {params.section == 'G' && <G params={params.data} />}
            {/* {params.section == 'H' && <H params={params.data} />} */}
        </div>
    )
}

function homeScada() {
    const dispatch = useDispatch()
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [comTab, setComTab] = useState('GM1')
    const [sectionTab, setSectionTab] = useState('C')
    const [searchText, setSearchText] = useState('')
    const [view, setView] = useState('module')
    const [open, setOpen] = useState(false)
    const [dialogData, setDialogData] = useState(null)
    const [filteredData, setFilteredData] = useState(null)
    const [intervalStart, setIntervalStart] = useState(0)
    const [mqZbData, setMqZbData] = useState(null)
    const Zb = useSelector(selectScada)

    useEffect(() => {
        function getFilteredArray() {
            if (searchText.length === 0 && sectionTab === 'all' && !comTab) {
                return Zb
            }
            return _.filter(Zb, (val) => {
                if (
                    sectionTab !== 'all' &&
                    val.machine.mch_loc !== sectionTab
                ) {
                    return false
                }

                if (val.machine.mch_com !== comTab) {
                    return false
                }

                return (
                    val.machine.mch_code
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    val.machine.mch_name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                )
            })
        }

        if (Zb) {
            setFilteredData(getFilteredArray())
        }
    }, [Zb, searchText, sectionTab, comTab])

    useEffect(() => {
        if (intervalStart == 'auto') {
            dispatch(zbUpdateMq(mqZbData))
            // console.log(mqZbData)
        }
    }, [dispatch, mqZbData, intervalStart])

    function handleComTab(event, value) {
        setComTab(value)
    }

    function handleSectionTab(event, value) {
        setSectionTab(value)
    }

    function handleSearchText(event, value) {
        setSearchText(event.target.value)
    }

    function handleView(event, value) {
        setView(value)
    }

    function handleInterval(event) {
        setIntervalStart(event.target.value)
    }

    function handleDialog(params) {
        setOpen(params.set)
        setDialogData(params.data)
    }

    function handleMqtt(params) {
        // const upsert = params.message.map((val) => {
        //     return {
        //         id: val.id_zb_sens,
        //         changes: { zbConn: val },
        //     }
        // })

        setMqZbData(params.message)
    }

    const handleClose = (event, reason) => {
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
                                        Andon System
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        className="font-medium"
                                    >
                                        Andon System Garuda Metalindo
                                    </Typography>
                                </motion.div>
                            </div>
                            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-start space-y-16 sm:space-y-0 sm:space-x-16">
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
                                <MqttCon paloadTopic={handleMqtt} />
                                <FormControl
                                    className="flex w-full sm:w-136"
                                    variant="outlined"
                                >
                                    <InputLabel id="category-select-label">
                                        Refresh
                                    </InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        label="Category"
                                        value={intervalStart}
                                        onChange={handleInterval}
                                    >
                                        <MenuItem value={0}>
                                            <em> None </em>
                                        </MenuItem>
                                        <MenuItem value="auto">Auto</MenuItem>
                                    </Select>
                                </FormControl>
                                <ToggleButtonGroup
                                    value={view}
                                    exclusive
                                    onChange={handleView}
                                >
                                    <ToggleButton
                                        value="module"
                                        aria-label="module"
                                    >
                                        <ViewModule />
                                    </ToggleButton>
                                    <ToggleButton value="map" aria-label="map">
                                        <Map />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="list"
                                        aria-label="list"
                                    >
                                        <ViewList />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                        <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
                                <Tabs
                                    value={comTab}
                                    onChange={handleComTab}
                                    indicatorColor="secondary"
                                    textColor="secondary"
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    classes={{ root: 'w-full h-16 border-b-1' }}
                                >
                                    <Tab value="GM1" label="GM1" />
                                    <Tab value="GM2" label="GM2" />
                                </Tabs>
                            </div>
                        </div>
                        <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
                                <Tabs
                                    value={sectionTab}
                                    onChange={handleSectionTab}
                                    indicatorColor="secondary"
                                    textColor="secondary"
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    classes={{ root: 'w-full h-16 border-b-1' }}
                                >
                                    <Tab value="all" label="All" />
                                    <Tab value="C" label="Block C" />
                                    <Tab value="D" label="Block D" />
                                    <Tab value="F" label="Block F" />
                                    <Tab value="G" label="Block G" />
                                    <Tab value="H" label="Block H" />
                                    <Tab value="I" label="Block I" />
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

                            return view == 'map'
                                ? selectMap({
                                      section: sectionTab,
                                      data: filteredData && filteredData,
                                  })
                                : filteredData &&
                                      (filteredData.length > 0 ? (
                                          <div>
                                              {view == 'module' && (
                                                  <motion.div
                                                      className="flex grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-16 mt-16 sm:mt-16"
                                                      variants={container}
                                                      initial="hidden"
                                                      animate="show"
                                                  >
                                                      {filteredData.map(
                                                          (data) => {
                                                              return (
                                                                  <motion.div
                                                                      variants={
                                                                          item
                                                                      }
                                                                      key={
                                                                          data.id
                                                                      }
                                                                  >
                                                                      <CardView
                                                                          params={{
                                                                              ...data,
                                                                          }}
                                                                          dialog={
                                                                              handleDialog
                                                                          }
                                                                      />
                                                                  </motion.div>
                                                              )
                                                          }
                                                      )}
                                                  </motion.div>
                                              )}
                                              {view == 'list' && (
                                                  <ListView
                                                      params={filteredData}
                                                  />
                                              )}
                                          </div>
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
                        }, [filteredData, view])}
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
                            {dialogData?.machine.mch_code}{' '}
                            {dialogData?.machine.mch_name}
                        </Typography>

                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{ width: 900, height: 400, zIndex: 1000 }}>
                    <OpenDialog params={dialogData} />
                </div>
            </Dialog>
        </div>
    )
}

export default homeScada
