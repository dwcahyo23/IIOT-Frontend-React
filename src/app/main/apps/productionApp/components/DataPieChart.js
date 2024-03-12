import {
    Card,
    CardActionArea,
    CardContent,
    Paper,
    Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import {
    PieChart,
    Pie,
    Sector,
    Cell,
    ResponsiveContainer,
    Label,
    Legend,
} from 'recharts'

import { indigo, red, green, blue, orange } from '@mui/material/colors'

const COLORS = [red[500], green[500], orange[500]]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

function DataPieChart({ params, selectPie }) {
    const data = params.data

    return (
        <Card className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
            <CardActionArea onClick={() => selectPie(params)}>
                <CardContent>
                    <div className="flex items-center justify-center">
                        <Typography
                            className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                            color="text.secondary"
                        >
                            {params.name}
                        </Typography>
                    </div>
                    <div className="flex items-center justify-center">
                        <PieChart width={200} height={200}>
                            <Legend />
                            <Pie
                                data={params.data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {params.data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default DataPieChart
