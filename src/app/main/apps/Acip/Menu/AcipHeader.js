import { Button, useTheme, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import _ from '@lodash'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'

function AcipHeader({ data }) {
    const theme = useTheme()

    return (
        <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
            <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <motion.div
                        className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.3 } }}
                    >
                        <Typography className="text-16 sm:text-20 truncate font-semibold">
                            Genba 5R
                        </Typography>
                        <Typography variant="caption" className="font-medium">
                            Acip Departement
                        </Typography>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default AcipHeader
