import { useEffect, useState } from 'react'
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'

import {
    BarChart,
    ComposedChart,
    Bar,
    Line,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine,
    Tooltip,
    Legend,
} from 'recharts'
import { Paper, Typography } from '@mui/material'
import { indigo, red, green, blue, orange } from '@mui/material/colors'
import _ from 'lodash'

function DataChart({ params }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!params) {
            return
        }
        setLoading(false)
    }, [params, loading])

    if (loading) {
        return <FuseLoading />
    }

    return (
        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
            <div className="flex items-center justify-center px-8 pt-12">
                <Typography
                    className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                    color="text.secondary"
                >
                    {params.data[0].title}
                </Typography>
            </div>
            <div className="flex items-center justify-center px-8 pt-12">
                <ComposedChart
                    width={900}
                    height={460}
                    data={params.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar
                        yAxisId="left"
                        dataKey="data.Close.true"
                        name="Close"
                        fill={green[600]}
                    />
                    <Bar
                        yAxisId="left"
                        dataKey="data.Open.true"
                        stackId="openStack"
                        name="Open"
                        fill={red[500]}
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        name="Total"
                        dataKey="data.Sum.true"
                        stroke={indigo[500]}
                    />
                </ComposedChart>
            </div>
        </Paper>
    )
}

export default DataChart
