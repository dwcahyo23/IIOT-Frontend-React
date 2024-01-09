import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'

import DataChart from '../../components/DataChart'
import ListInventory from '../../components/ListInventory'
import {
    filteredRequestChart,
    filteredRequestByMonth,
} from '../../store/erpStore/erpMnSlices'
import { machinesCom } from '../../store/machineStore/machineMnSlices'
import { selectMnUsers } from '../../store/userStore/userMnSlices'
import CardAvatar from '../../components/CardAvatar'
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

function MaintenanceAppInventoryMain() {
    const [useCom, useUser, filteredData] = [
        useSelector(machinesCom),
        useSelector(selectMnUsers),
        useSelector(filteredRequestByMonth),
    ]
    const [withUser, setWithUser] = useState(null)
    const [withParams, setWithParams] = useState(null)

    useEffect(() => {
        if (useCom == 'GM2') {
            setWithUser(_.find(useUser, { id: 21 }))
        } else {
            setWithUser(_.find(useUser, { id: 20 }))
        }
        if (filteredData) {
            setWithParams(filteredData)
        }
    }, [useCom, useUser, filteredData])

    const filterChart = useSelector(filteredRequestChart)
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
                        section="inventories"
                    />
                )}
            </motion.div>
            <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
                <ListInventory />
            </motion.div>

            {/* <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
                <MaintenanceAppErpKanban />
            </motion.div> */}
        </motion.div>
    )
}

export default MaintenanceAppInventoryMain
