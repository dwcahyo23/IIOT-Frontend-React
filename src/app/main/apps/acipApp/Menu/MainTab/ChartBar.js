import { useEffect, useState } from 'react'
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'
import { useSelector } from 'react-redux'
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'
import { Paper, Typography } from '@mui/material'

import { selectChartFilteredGenbasCom } from '../../store/genba/genbaAcipSlices'

function ChartBar() {
    const data = useSelector(selectChartFilteredGenbasCom)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!data) {
            return
        }
        setLoading(false)
        console.log(data)
    }, [data, loading])

    if (loading) {
        return <FuseLoading />
    }

    const dataX = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ]

    return (
        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
            <div className="flex items-center justify-center px-8 pt-12">
                <Typography
                    className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                    color="text.secondary"
                >
                    Genba Findings Resume
                </Typography>
            </div>
            <div className="flex items-center justify-center px-8 pt-12">
                <BarChart
                    width={1000}
                    height={400}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="data.Close.true"
                        name="Close"
                        fill="#5cb85c"
                    />
                    <Bar dataKey="data.Open.true" name="Open" fill="#d9534f" />
                </BarChart>
            </div>
        </Paper>
    )
}

export default ChartBar
