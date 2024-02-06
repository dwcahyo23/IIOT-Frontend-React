import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DataChart from '../../components/DataChart'
import ListWorkOrder from '../../components/ListWorkOrder'
import CardAvatar from '../../components/CardAvatar'
import { selectMnUsers } from '../../store/userStore/userMnSlices'
import {
    filterChartErps,
    filteredErpsByMonth,
    filterParetoCharErps,
} from '../../store/erpStore/erpMnSlices'
import {
    machinesCom,
    machinesResponbility,
    machinesSection,
} from '../../store/machineStore/machineMnSlices'
import ParetoChart from '../../components/ParetoChart'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography,
} from '@mui/material'

const container = {
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

function MaintenanceAppErpMain() {
    const [useCom, useResponsible, useSection, useUser, filteredData] = [
        useSelector(machinesCom),
        useSelector(machinesResponbility),
        useSelector(machinesSection),
        useSelector(selectMnUsers),
        useSelector(filteredErpsByMonth),
    ]
    const [withUser, setWithUser] = useState(null)
    const [withParams, setWithParams] = useState(null)

    const [chart, setChart] = useState('YEARLY')

    useEffect(() => {
        const user = _.find(useUser, (val) => {
            if (_.toLower(val.displayName) == _.toLower(useResponsible))
                return val
        })

        if (_.isUndefined(user)) {
            if (useCom === 'ALL') {
                setWithUser(_.find(useUser, { id: 10 }))
            } else {
                if (useCom === 'GM2') {
                    if (useSection === 'workshop') {
                        setWithUser(_.find(useUser, { id: 33 }))
                    } else {
                        setWithUser(_.find(useUser, { id: 8 }))
                    }
                } else if (useCom === 'GM1') {
                    if (useSection === 'workshop') {
                        setWithUser(_.find(useUser, { id: 17 }))
                    } else {
                        setWithUser(_.find(useUser, { id: 5 }))
                    }
                } else if (useCom !== 'GM1' && useCom !== 'GM2') {
                    if (useSection === 'workshop') {
                        setWithUser(_.find(useUser, { id: 17 }))
                    } else {
                        setWithUser(_.find(useUser, { id: 39 }))
                    }
                }
            }
        } else {
            setWithUser(user)
        }

        setWithParams(filteredData)
    }, [useCom, useSection, useResponsible, useUser, filteredData])

    const filterChart = useSelector(filterChartErps)

    const paretoChart = useSelector(filterParetoCharErps)

    function handleChart(event, value) {
        setChart(value.props.value)
    }

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 gap-16 w-full min-w-0 pt-24"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
                {!_.isNull(withUser) && (
                    <CardAvatar
                        user={withUser}
                        params={withParams}
                        section="work orders"
                    />
                )}
            </motion.div>
            <motion.div variants={item} className="sm:col-span-2 md:col-span-3">
                <ListWorkOrder />
            </motion.div>
            <Paper className="sm:col-span-4 md:col-span-5 shadow rounded-2xl overflow-hidden">
                <div className="flex items-center justify-center px-8 pt-12">
                    <Typography
                        className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                        color="text.secondary"
                    >
                        Work Order Chart
                    </Typography>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 gap-16 w-full min-w-0 px-8 pt-12 pb-16">
                    <FormControl
                        className="sm:col-span-2 mx-8"
                        variant="outlined"
                    >
                        <InputLabel>Chart</InputLabel>

                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            label="Chart"
                            value={chart}
                            onChange={handleChart}
                        >
                            <MenuItem value="YEARLY">YEARLY</MenuItem>
                            <MenuItem value="PARETO">PARETO</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {chart == 'YEARLY' ? (
                    <motion.div variants={item}>
                        <DataChart params={{ data: filterChart }} />
                    </motion.div>
                ) : (
                    <motion.div variants={item}>
                        <ParetoChart params={{ paretoChart }} />
                    </motion.div>
                )}
            </Paper>
        </motion.div>
    )
}

export default MaintenanceAppErpMain
