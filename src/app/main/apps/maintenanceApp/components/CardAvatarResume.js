import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import _ from 'lodash'

function CardAvatarResume({ params }) {
    return (
        <div className="flex flex-col flex-auto rounded-2xl outline outline-offset-2 outline-gray-300 outline-1 p-8">
            <div className="flex items-center justify-center px-8">
                <Typography
                    className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                    color="text.secondary"
                >
                    {params.title}
                </Typography>
            </div>
            <div className="flex items-center justify-center">
                <Typography
                    className="px-16 text-base font-medium tracking-tight leading-6 truncate"
                    color="text.secondary"
                >
                    {params.subtitle}
                </Typography>
            </div>
            <div className="text-center mt-8">
                <Typography
                    className="text-7xl sm:text-8xl font-bold tracking-tight leading-none"
                    color={params.colorHg}
                >
                    {params.count || 0}
                </Typography>
                <Typography
                    className="text-lg font-medium"
                    color={params.colorLw}
                >
                    {params.name}
                </Typography>
            </div>
        </div>
    )
}

export default CardAvatarResume
