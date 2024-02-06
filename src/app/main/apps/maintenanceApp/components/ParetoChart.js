import { useEffect, useState } from 'react'
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'
import { useSelector } from 'react-redux'
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
import {
    indigo,
    red,
    green,
    blue,
    orange,
    yellow,
    teal,
    deepOrange,
} from '@mui/material/colors'
import _ from 'lodash'

function ParetoChart({ params }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!params) {
            return
        }
        // console.log(params)
        setLoading(false)
    }, [params, loading])

    if (loading) {
        return <FuseLoading />
    }

    function CustomizedAxisTick(props) {
        const { x, y, stroke, payload } = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                    fontSize={11}
                    transform="rotate(-35)"
                >
                    {payload.value}
                </text>
            </g>
        )
    }

    return (
        <div>
            {/* <div className="flex items-center justify-center px-8 pt-12">
                <Typography
                    className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                    color="text.secondary"
                >
                    {params.paretoChart.title}
                </Typography>
            </div> */}
            <div className="flex items-center justify-center px-8 pt-12">
                <ComposedChart
                    width={900}
                    height={460}
                    data={params.paretoChart.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        height={60}
                        tick={<CustomizedAxisTick />}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar
                        maxBarSize={25}
                        yAxisId="left"
                        dataKey="count"
                        name="Frequency"
                        fill={green[600]}
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        name="%"
                        dataKey="persen"
                        stroke={indigo[500]}
                    />
                </ComposedChart>
            </div>
        </div>
    )
}

export default ParetoChart
