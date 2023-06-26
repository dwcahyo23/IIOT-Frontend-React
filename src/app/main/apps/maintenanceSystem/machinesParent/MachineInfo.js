import Typography from '@mui/material/Typography'
import clsx from 'clsx'

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
                Process Code : {params.mch_process}
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
                Company : {params.mch_com}
            </Typography>
            <Typography
                className="text-13 mt-2 line-clamp-2"
                color="text.secondary"
            >
                Maker : {params.mch_maker}
            </Typography>
            <Typography
                className="text-13 mt-2 line-clamp-2"
                color="text.secondary"
            >
                Production : {params.mch_prod}
            </Typography>
        </div>
    )
}

export default MachineInfo
