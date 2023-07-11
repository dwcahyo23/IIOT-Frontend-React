import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import StatusColor from '../machineTab/utils/StatusColor'
import _ from 'lodash'

function MachineInfo({ params, className }) {
    if (!params) {
        return null
    }

    return (
        <div className={clsx('w-full', className)}>
            <div className="flex items-center justify-between mb-16">
                <Typography className="text-14 font-medium">
                    {params.mch_code}
                </Typography>
                <Typography className="text-14 font-medium">
                    {params.mch_name}
                </Typography>
            </div>
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
                Power HP : {params.mch_hp}
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
                Line : {params.mch_loc}
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
                {params.sheet && <StatusColor id={params.sheet.chk_mark} />}
            </div>
        </div>
    )
}

export default MachineInfo
