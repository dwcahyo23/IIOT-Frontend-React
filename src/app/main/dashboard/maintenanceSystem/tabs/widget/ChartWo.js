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
    const labels = Object.keys(data.filterData).reverse()

    const [label, setLabel] = useState([])
    const [breakdown, setBreakdown] = useState([])
    const [audit, setAudit] = useState([])

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

    // // let ordered = {}
    // Object.keys(data?.filterData)
    //     .sort(
    //         (a, b) =>
    //             new Date(`${a} 1, 2023 12:00:00`).getMonth() -
    //             new Date(`${b} 1, 2023 12:00:00`).getMonth()
    //     )
    //     .forEach((key) => {
    //         // ordered[key] = data.filterData[key]
    //         console.log(data.filterData[key])
    //         series[0].data.push(data.filterData[key].breakdown?.pass || 0)
    //         series[1].data.push(data.filterData[key].breakdown_audit?.pass || 0)
    //     })

    // console.log(series)
    useEffect(() => {
        setAwaitRender(false)
    }, [])

    _.forEach(data?.filterData, (val, i) => {
        series[0].data.push(val.breakdown?.pass || 0)
        series[1].data.push(val.breakdown_audit?.pass || 0)
    })

    series[0].data.reverse()
    series[1].data.reverse()

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
        annotations: {
            yaxis: [
                {
                    y: 100,
                    borderColor: '#00ce06',
                    borderWidth: 2,
                    strokeDashArray: 0,
                    label: {
                        borderColor: '#00ce06',
                        style: {
                            color: '#fff',
                            background: '#00ce06',
                        },
                        text: 'KPI 100',
                    },
                },
            ],
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
            <div className="grid grid-cols-1 lg:grid-cols-1 grid-flow-row gap-24 w-full mt-32 mb-24 sm:mt-16">
                <div className="flex flex-col flex-auto">
                    <div className="flex flex-col flex-auto mt-2 mb-8">
                        <Chart
                            className="flex-auto w-full"
                            options={chartOptions}
                            series={series}
                            height={385}
                        />
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default memo(ChartWo)
