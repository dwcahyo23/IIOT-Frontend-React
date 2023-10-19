import { useEffect, useState, forwardRef } from 'react'
import { useDeepCompareEffect } from '@fuse/hooks'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'

import dayjs from 'dayjs'

const ApSheetPrint = forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <p>{props.text}</p>
        </div>
    )
})

export default ApSheetPrint
