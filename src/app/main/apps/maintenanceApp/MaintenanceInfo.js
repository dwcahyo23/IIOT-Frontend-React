import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import clsx from 'clsx'
import MaintenanceCategory from './MaintenanceCategory'

function MaintenanceInfo({ course, className }) {
    if (!course) {
        return null
    }

    return (
        <div className={clsx('w-full', className)}>
            <div className="flex items-center justify-between mb-16">
                <MaintenanceCategory slug={course.category} />
            </div>

            <Typography className="text-16 font-medium">
                {course.machine_index.mch_code}
            </Typography>

            <Typography
                className="text-13 mt-2 line-clamp-2"
                color="text.secondary"
            >
                {course.machine_index.mch_name}
            </Typography>

            <Typography
                className="text-13 mt-2 line-clamp-2"
                color="text.secondary"
            >
                {course.machine_index.mch_com} {course.machine_index.mch_loc}
            </Typography>

            <Typography
                className="text-13 mt-2 line-clamp-2"
                color="text.secondary"
            >
                {course.machine_index.mch_process}
            </Typography>
        </div>
    )
}

export default MaintenanceInfo
