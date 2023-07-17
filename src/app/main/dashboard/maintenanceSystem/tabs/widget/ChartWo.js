import Paper from '@mui/material/Paper'
import { lighten, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import _ from 'lodash'

function ChartWo({ data }) {
    const theme = useTheme()
    const [awaitRender, setAwaitRender] = useState(true)
    const [tabValue, setTabValue] = useState(0)
    const labels = Object.keys(data.filterData)

    useEffect(() => {
        setAwaitRender(false)
    }, [])

    const series = [
        {
            name: 'Breakdown',
            type: 'line',
            data: [],
        },
        {
            name: 'Audit',
            type: 'column',
            data: [],
        },
    ]

    _.forEach(data.filterData, (val, i) => {
        series[0].data.push(val.breakdown.pass || 0)
        series[1].data.push(val.breakdown_audit.pass || 0)
    })

    const chartOptions = {
        chart: {
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'line',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        colors: [theme.palette.primary.main, theme.palette.secondary.main],
        labels,
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0],
            background: {
                borderWidth: 0,
            },
        },
        grid: {
            borderColor: theme.palette.divider,
        },
        legend: {
            show: false,
        },
        plotOptions: {
            bar: {
                columnWidth: '50%',
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.75,
                },
            },
        },
        stroke: {
            width: [3, 0],
        },
        tooltip: {
            followCursor: true,
            theme: theme.palette.mode,
        },
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                color: theme.palette.divider,
            },
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                },
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            labels: {
                offsetX: -16,
                style: {
                    colors: theme.palette.text.secondary,
                },
            },
        },
    }

    if (awaitRender) {
        return null
    }

    return (
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start justify-between">
                <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
                    Breakdown Summary
                </Typography>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 grid-flow-row gap-24 w-full mt-32 mb-16 sm:mt-16">
                <div className="flex flex-col flex-auto">
                    <Typography
                        className="font-medium mt-2 mb-8"
                        color="text.secondary"
                    >
                        Breakdown vs Audit
                    </Typography>
                    <Typography
                        className="text-xs mt-2 mb-8"
                        color="text.secondary"
                    >
                        PDHD1 PDHD2 PDHD3 PDHD4 PDRL1 PDRL2 PDMC1 PDMC3 PDMR1
                        PDNC1 PDNT1 PDHB1 PDTR1 PDPU1
                    </Typography>
                    <div className="flex flex-col flex-auto mt-2 mb-8">
                        <Chart
                            className="flex-auto w-full"
                            options={chartOptions}
                            series={series}
                            height={320}
                        />
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default memo(ChartWo)
