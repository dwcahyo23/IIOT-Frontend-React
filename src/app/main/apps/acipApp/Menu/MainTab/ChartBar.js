import { useEffect, useState } from 'react'
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'
import { useSelector } from 'react-redux'
import {
    BarChart,
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
import { indigo, green, grey, red } from '@mui/material/colors'

import { selectChartFilteredGenbasCom } from '../../store/genba/genbaAcipSlices'

function ChartBar() {
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
                    GENBA FINDINGS STATUS
                </Typography>
            </div>
            <div className="flex items-center justify-center">
                <ComposedChart width={1300} height={400} data={data}>
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
                        fill={green[400]}
                    />
                    <Bar
                        yAxisId="left"
                        dataKey="data.Open.true"
                        name="Open"
                        fill={red[400]}
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

export default ChartBar
