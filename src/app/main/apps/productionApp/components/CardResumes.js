import { useEffect, useMemo, useState } from 'react'
import { Avatar, Paper, Typography } from '@mui/material'
import _ from 'lodash'
import { indigo, red, green, orange } from '@mui/material/colors'
import CardResume from './CardResume'

function CardResumes({ params }) {
    console.log(params)

    function Calculation(data) {
        const total = _.countBy(data, (val) => (val ? 'pass' : 'fail'))
        const audit = _.countBy(data, (val) =>
            val.status == 'Open'
                ? 'open'
                : val.status == 'On Progress'
                ? 'onprogress'
                : 'close'
        )
        return {
            total: total.pass,
            open: audit.open,
            onprogress: audit.onprogress,
            close: audit.close,
        }
    }

    const data = useMemo(() => Calculation(params))

    return (
        <Paper className="grid grid-cols-1 sm:grid-cols-8 gap-24 w-full min-w-0 p-16 shadow rounded-2xl overflow-hidden">
            <div className="sm:col-span-2 min-w-0">
                <CardResume
                    params={{
                        title: 'AP-Sheet',
                        count: data.total,
                        name: 'Total',
                        colorHg: indigo[400],
                        colorLw: indigo[300],
                    }}
                />
            </div>
            <div className="sm:col-span-2 min-w-0">
                <CardResume
                    params={{
                        title: 'AP-Sheet',
                        count: data.close,
                        name: 'Open',
                        colorHg: green[400],
                        colorLw: green[300],
                    }}
                />
            </div>
            <div className="sm:col-span-2 min-w-0">
                <CardResume
                    params={{
                        title: 'AP-Sheet',
                        count: data.open,
                        name: 'Close',
                        colorHg: red[400],
                        colorLw: red[300],
                    }}
                />
            </div>
            <div className="sm:col-span-2 min-w-0">
                <CardResume
                    params={{
                        title: 'AP-Sheet',
                        count: data.onprogress,
                        name: 'On Progress',
                        colorHg: orange[400],
                        colorLw: orange[300],
                    }}
                />
            </div>
        </Paper>
    )
}

export default CardResumes
