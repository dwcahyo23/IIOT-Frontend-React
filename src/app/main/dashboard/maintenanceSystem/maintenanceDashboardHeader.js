import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from '@lodash'
import Button from '@mui/material/Button'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { selectUser } from 'app/store/userSlice'

function maintenanceDashboardHeader(props) {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    return (
        <div className="flex flex-col w-full px-24 sm:px-32">
            <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
                <div className="flex flex-auto items-center min-w-0">
                    <Avatar
                        className="flex-0 w-64 h-64"
                        alt="user photo"
                        src={user?.data?.photoURL}
                    >
                        {user?.data?.displayName[0]}
                    </Avatar>
                    <div className="flex flex-col min-w-0 mx-16">
                        <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
                            {`Welcome back, ${user.data.displayName}!`}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default maintenanceDashboardHeader
