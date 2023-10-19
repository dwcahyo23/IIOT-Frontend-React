import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import StatusColor from '../machineTab/utils/StatusColor'
import _ from 'lodash'
import dayjs from 'dayjs'
import { LinearProgress, Box } from '@mui/material'

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2">{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    )
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
}

function Progres1({ params }) {
    const [progress, setProgress] = useState(10)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 10 : prevProgress + 10
            )
        }, 800)
        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={params} />
        </Box>
    )
}

function calc(props) {
    const data = []
    _.forEach(props, (val) => {
        const x =
            dayjs(val.item_change_date[0])
                .add(val.item_life_time, 'hour')
                .diff(dayjs(), 'hour') / val.item_life_time
        data.push(x)
    })
    return _.min(data) * 100
}

function MachineInfo({ params, className }) {
    if (!params) {
        return null
    }

    return (
        <div className={clsx('w-full', className)}>
            <Typography className="text-13 font-medium w-11/12">
                Process : {params.mch_process_type}
            </Typography>
            <Typography className="text-13 font-medium w-11/12">
                Power : {params.mch_hp} HP
            </Typography>
            <Typography className="text-13 font-medium w-11/12">
                Dept no : {params.dep_no}
            </Typography>
            <Typography className="text-13 font-medium w-11/12">
                Sparepart :
            </Typography>

            <div className="flex">
                {params.sp.length > 0 ? (
                    <Progres1 params={calc(params.sp)} />
                ) : (
                    <Progres1 params={100} />
                )}
            </div>
        </div>
    )
}

export default MachineInfo
