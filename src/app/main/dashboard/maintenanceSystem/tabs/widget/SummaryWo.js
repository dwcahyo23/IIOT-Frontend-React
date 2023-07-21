import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import _ from 'lodash'

function SummaryWo({ data }) {
    return (
        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
            <div className="flex items-center justify-center px-8 pt-12">
                <Typography
                    className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                    color="text.secondary"
                >
                    {data.title}
                </Typography>
            </div>
            <div className="flex items-center justify-center">
                <Typography
                    className="px-16 text-base font-medium tracking-tight leading-6 truncate"
                    color="text.secondary"
                >
                    {data.subtitle}
                </Typography>
            </div>
            <div className="text-center mt-8">
                <Typography
                    className="text-7xl sm:text-8xl font-bold tracking-tight leading-none"
                    color={data.colorHg}
                >
                    {data.count?.pass || 0}
                </Typography>
                <Typography
                    className="text-lg font-medium"
                    color={data.colorLw}
                >
                    {data.name}
                </Typography>

                {data.extra ? (
                    <Typography
                        className="flex items-baseline justify-center w-full mt-8 mb-12"
                        color="text.secondary"
                    >
                        <span className="truncate">{data.extra.name}</span>:
                        <b className="px-8">{data.extra.count?.pass || 0}</b>
                    </Typography>
                ) : (
                    <Typography className="flex items-baseline justify-center w-full mt-8 mb-12"></Typography>
                )}
            </div>
        </Paper>
    )
}

export default memo(SummaryWo)
