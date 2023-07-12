import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import StatusColor from '../machineTab/utils/StatusColor'
import _ from 'lodash'
import dayjs from 'dayjs'
import { LinearProgress, Box } from '@mui/material'

function LinearProgressVal({ value }) {
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

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={calc(value)} />
            </Box>
            <Box sx={{ minWidth: 10 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${calc(value).toFixed(1)}%`}
                </Typography>
            </Box>
        </Box>
    )
}

function MachineInfo({ params, className }) {
    if (!params) {
        return null
    }

    return (
        <div className={clsx('w-full', className)}>
            <Typography className="text-14 font-medium">
                {params.mch_code}
            </Typography>
            <Typography className="text-14 font-medium">
                {params.mch_name}
            </Typography>
            <Typography
                className="text-13 mt-2 line-clamp-2"
                color="text.secondary"
            >
                Process : {params.mch_process_type}
            </Typography>
            <Typography
                className="text-13 mt-2 line-clamp-2"
                color="text.secondary"
            >
                Power : {params.mch_hp} HP
            </Typography>
            <Typography
                className="text-13 mt-2 line-clamp-2"
                color="text.secondary"
            >
                Dept no : {params.dep_no}
            </Typography>

            <Typography
                className="text-13 mt-2 line-clamp-2"
                color="text.secondary"
            >
                AP-Sheet : {params.sheet && params.sheet.sheet_no}
            </Typography>

            <div className="flex">
                <Typography className="text-13 mt-2 line-clamp-2">
                    Status :
                </Typography>
                {params.sheet && <StatusColor id={params.sheet.pri_no} />}
            </div>

            <div className="flex">
                <Typography className="text-13 mt-2 line-clamp-2">
                    Audit :
                </Typography>
                {params.sheet && (
                    <StatusColor className="ml-2" id={params.sheet.chk_mark} />
                )}
            </div>

            <div className="flex">
                <Typography className="text-13 mt-2 line-clamp-2">
                    Sparepart :
                </Typography>
                {params.sp.length > 0 && (
                    <LinearProgressVal value={params.sp} />
                )}
            </div>
        </div>
    )
}

export default MachineInfo
