import { useEffect, useMemo, useState } from 'react'
import { Avatar, Paper, Typography } from '@mui/material'
import _ from 'lodash'
import CardAvatarResume from './CardAvatarResume'
import { indigo, red, green } from '@mui/material/colors'

function CardAvatar({ user, params, section }) {
    function Calculation(data, filter) {
        if (filter === 'inventories') {
            const total = _.countBy(data, (val) => (val ? 'pass' : 'fail'))
            const audit = _.countBy(data, (val) =>
                _.some(val.request_index, { audit_request: 'N' })
                    ? 'audit'
                    : 'naudit'
            )
            return {
                total: total.pass,
                audit: audit.audit,
                naudit: audit.naudit,
            }
        }
        if (filter === 'work orders') {
            const total = _.countBy(data, (val) => (val ? 'pass' : 'fail'))
            const audit = _.countBy(data, (val) =>
                val.chk_mark == 'Y' ? 'audit' : 'naudit'
            )
            return {
                total: total.pass,
                audit: audit.audit,
                naudit: audit.naudit,
            }
        }
    }

    const data = useMemo(() => Calculation(params, section))

    return (
        <Paper className="grid grid-cols-1 sm:grid-cols-7 gap-24 w-full min-w-0 p-16 shadow rounded-2xl overflow-hidden">
            <div className="sm:col-span-1  min-w-0">
                <div className="w-full grid justify-items-center">
                    <Avatar
                        className="flex-0 w-96 h-96"
                        alt="user photo"
                        src={user?.photoURL}
                    >
                        {user?.displayName[0]}
                    </Avatar>
                    <Typography className="text-14 font-medium">
                        {user?.displayName}
                    </Typography>
                </div>
            </div>
            <div className="sm:col-span-2 md:col-span-2 min-w-0">
                <CardAvatarResume
                    params={{
                        title: 'AP-Sheet',
                        count: data.total,
                        name: 'Total',
                        colorHg: indigo[400],
                        colorLw: indigo[300],
                    }}
                />
            </div>
            <div className="sm:col-span-2 md:col-span-2 min-w-0">
                <CardAvatarResume
                    params={{
                        title: 'AP-Sheet',
                        count: data.naudit,
                        name: 'Audit',
                        colorHg: green[400],
                        colorLw: green[300],
                    }}
                />
            </div>
            <div className="sm:col-span-2 md:col-span-2 min-w-0">
                <CardAvatarResume
                    params={{
                        title: 'AP-Sheet',
                        count: data.audit,
                        name: 'Naudit',
                        colorHg: red[400],
                        colorLw: red[300],
                    }}
                />
            </div>
        </Paper>
    )
}

export default CardAvatar
