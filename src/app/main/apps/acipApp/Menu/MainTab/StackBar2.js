import { useEffect, useState } from 'react'
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'
import { useSelector } from 'react-redux'
import {
    BarChart,
    AreaChart,
    Area,
    Bar,
    ComposedChart,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Line,
} from 'recharts'
import { Paper, Typography } from '@mui/material'
import { indigo, green, orange, lightBlue, teal } from '@mui/material/colors'

import { selectChartFilteredGenbasCom } from '../../store/genba/genbaAcipSlices'

function StackBar2() {
    const data = useSelector(selectChartFilteredGenbasCom)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!data) {
            return
        }
        setLoading(false)
    }, [data, loading])

    if (loading) {
        return <FuseLoading />
    }

    return (
        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-8">
            <div className="flex items-center justify-center p-8">
                <Typography
                    className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                    color="text.secondary"
                >
                    GENBA 5R BEFORE
                </Typography>
            </div>
            <div className="flex items-center justify-center">
                <AreaChart width={600} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Area
                        type="monotone"
                        dataKey="data.BR1"
                        stackId="1"
                        stroke={indigo[400]}
                        fill={indigo[400]}
                        name="R1"
                    />
                    <Area
                        type="monotone"
                        dataKey="data.BR2"
                        stackId="1"
                        stroke={green[400]}
                        fill={green[400]}
                        name="R2"
                    />
                    <Area
                        type="monotone"
                        dataKey="data.BR3"
                        stackId="1"
                        stroke={lightBlue[400]}
                        fill={lightBlue[400]}
                        name="R3"
                    />
                    <Area
                        type="monotone"
                        dataKey="data.BR4"
                        stackId="1"
                        stroke={orange[600]}
                        fill={orange[600]}
                        name="R4"
                    />
                    <Area
                        type="monotone"
                        dataKey="data.BR5"
                        stackId="1"
                        stroke={teal[400]}
                        fill={teal[400]}
                        name="R5"
                    />
                </AreaChart>
            </div>
        </Paper>
    )
}

export default StackBar2
