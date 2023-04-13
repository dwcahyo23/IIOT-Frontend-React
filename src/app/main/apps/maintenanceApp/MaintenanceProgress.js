import LinearProgress from '@mui/material/LinearProgress'
import clsx from 'clsx'

function MaintenanceProgress({ course, className }) {
    function colorProgress() {
        if (course < 20) {
            return 'error'
        } else {
            return 'secondary'
        }
    }

    return (
        <LinearProgress
            className={clsx('w-full h-2', className)}
            variant="determinate"
            value={course}
            color={colorProgress()}
        />
    )
}

export default MaintenanceProgress
