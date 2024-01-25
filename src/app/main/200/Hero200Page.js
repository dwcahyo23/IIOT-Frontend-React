import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import hero from './hero.jpg'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getErpMnSlices } from '../apps/maintenanceApp/store/erpStore/erpMnSlices'
import { getMachineMnSlices } from '../apps/maintenanceApp/store/machineStore/machineMnSlices'
import { getReportSlices } from '../apps/maintenanceApp/store/reportStore/reportMnSlices'
import { getRequestSlices } from '../apps/maintenanceApp/store/requestStore/requestMnSlices'
import { getSparepartSlices } from '../apps/maintenanceApp/store/sparepartStore/sparepartMnSlices'
import { getStokSlices } from '../apps/maintenanceApp/store/stokStore/stokMnSlices'
import { getUsersMn } from '../apps/maintenanceApp/store/userStore/userMnSlices'
import FuseLoading from '@fuse/core/FuseLoading'
import { getErpStockMnSlices } from '../apps/maintenanceApp/store/erpStockStore/erpStockMnSlices'

function Hero200Page() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getErpMnSlices())
        dispatch(getMachineMnSlices())
        dispatch(getReportSlices())
        dispatch(getRequestSlices())
        dispatch(getSparepartSlices())
        dispatch(getStokSlices())
        dispatch(getUsersMn())
        dispatch(getErpStockMnSlices())
    }, [dispatch])
    return (
        <div className="flex flex-col flex-1 items-center justify-center p-16">
            <div className="w-full max-w-3xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 0.1 },
                    }}
                >
                    <img src={hero} alt="Hero" style={{ width: '200%' }} />
                </motion.div>
            </div>
        </div>
    )
}

export default Hero200Page
