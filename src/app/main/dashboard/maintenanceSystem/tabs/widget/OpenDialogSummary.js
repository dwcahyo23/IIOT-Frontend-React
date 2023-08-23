import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'
import { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Tab,
    Typography,
    TextField,
    Grid,
    MenuItem,
} from '@mui/material'
import _ from 'lodash'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import TableIndex from 'src/app/main/apps/maintenanceSystem/machineTab/TableIndex'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import StatusColor from 'src/app/main/apps/maintenanceSystem/machineTab/utils/StatusColor'

function OpenDialogSummary({ data, header }) {
    const dispatch = useDispatch()
    const [tabValue, setTabValue] = useState('1')
    const [dataNull, setDataNull] = useState(true)
    const [selectOutstanding01, setSelectOutstanding01] = useState([])
    const [selectOutstanding02, setSelectOutstanding02] = useState([])
    const [selectOutstanding03, setSelectOutstanding03] = useState([])
    const [selectOutstanding04, setSelectOutstanding04] = useState([])

    const columnsOutstanding = [
        {
            field: 'sheet_no',
            headerName: 'AP-Sheet',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
        },
        {
            field: 'mch_code',
            headerName: 'Mch code',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueGetter: (params) => {
                return `${params.row.mch_index.mch_code || ''}`
            },
        },
        {
            field: 'mch_name',
            headerName: 'Mch name',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueGetter: (params) => {
                return `${params.row.mch_index.mch_name || ''}`
            },
        },
        {
            field: 's_memo',
            headerName: 'Problem',
            minWidth: 150,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'memo',
            headerName: 'Remarks',
            minWidth: 150,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'sprt',
            headerName: 'Need sparepart',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            align: 'center',
            renderCell: (params) => {
                if (params.row.sparepart.length > 0) {
                    return <StatusColor id="S" />
                } else {
                    return <StatusColor id="SN" />
                }
            },
        },
        {
            field: 'ymd',
            headerName: 'Date WO',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueFormatter: (params) =>
                params.value
                    ? dayjs(params.value).format('DD/MMM/YYYY HH:mm')
                    : '',
        },
        {
            field: 'date_sprt',
            headerName: 'Date Req Sparepart',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 120,
            valueGetter: (params) => {
                if (params.row.sparepart.length > 0) {
                    return dayjs(params.row.sparepart[0].createdAt).format(
                        'DD/MMM/YYYY HH:mm'
                    )
                }
            },
        },
        {
            field: 'stop_breakdown',
            headerName: 'Stoptime Breakdown',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 180,
            valueGetter: (params) => {
                if (params.row.sparepart.length > 0) {
                    const sprt = dayjs().diff(
                        dayjs(params.row.sparepart[0].createdAt),
                        'h'
                    )
                    const wo = dayjs().diff(dayjs(params.row.ymd), 'h')
                    return `${wo - sprt} hours`
                } else {
                    return `${dayjs().diff(dayjs(params.row.ymd), 'h')} hours`
                }
            },
        },
        {
            field: 'stop_sprt',
            headerName: 'Stoptime Sparepart',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 180,
            valueGetter: (params) => {
                if (params.row.sparepart.length > 0) {
                    return `${dayjs().diff(
                        dayjs(params.row.sparepart[0].createdAt),
                        'h'
                    )} hours`
                }
            },
        },
        {
            field: 'stop_wo',
            headerName: 'Total Stoptime WO',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 180,
            valueGetter: (params) => {
                return `${dayjs().diff(dayjs(params.row.ymd), 'h')} hours`
            },
        },
        {
            field: 'mre',
            headerName: 'MRE',
            minWidth: 150,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueGetter: (params) => {
                if (params.row.sparepart.length > 0) {
                    const group = _.groupBy(
                        params.row.sparepart,
                        (val) => val.mre_request
                    )
                    return JSON.stringify(_.keys(group))
                        .replace(/]|[[]/g, '')
                        .replace(/['"]+/g, '')
                }
            },
        },
        {
            field: 'sparepart',
            headerName: 'Sparepart',
            minWidth: 150,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueGetter: (params) => {
                if (params.row.sparepart.length > 0) {
                    const sparepart = []
                    _.forEach(params.row.sparepart, (val) =>
                        sparepart.push(val.item_stock)
                    )
                    return JSON.stringify(sparepart)
                        .replace(/]|[[]/g, '')
                        .replace(/['"]+/g, '')
                }
            },
        },
    ]

    const tableIndex = (data) => {}

    useEffect(() => {
        const breakdown = () => {
            const Outstanding = _(data.filteredItem.data)
                .filter((val) => {
                    if (
                        val.chk_mark == 'N' &&
                        (val.pri_no == '01' || val.pri_no == '05')
                    ) {
                        return val
                    }
                })
                .map((val) => {
                    return {
                        ...val,
                        sparepart: _.filter(data.sparepart, {
                            sheet_no: val.sheet_no,
                            audit_request: 'N',
                        }),
                    }
                })
                .value()
            setSelectOutstanding01(Outstanding)
            setDataNull(false)
        }

        const stillRun = () => {
            const Outstanding = _(data.filteredItem.data)
                .filter((val) => {
                    if (
                        val.chk_mark == 'N' &&
                        (val.pri_no == '02' || val.pri_no == '04')
                    ) {
                        return val
                    }
                })
                .map((val) => {
                    return {
                        ...val,
                        sparepart: _.filter(data.sparepart, {
                            sheet_no: val.sheet_no,
                            audit_request: 'N',
                        }),
                    }
                })
                .value()
            setSelectOutstanding02(Outstanding)
            setDataNull(false)
        }

        const preventive = () => {
            const Outstanding = _(data.filteredItem.data)
                .filter((val) => {
                    if (val.chk_mark == 'N' && val.pri_no == '03') {
                        return val
                    }
                })
                .map((val) => {
                    return {
                        ...val,
                        sparepart: _.filter(data.sparepart, {
                            sheet_no: val.sheet_no,
                            audit_request: 'N',
                        }),
                    }
                })
                .value()
            setSelectOutstanding03(Outstanding)
            setDataNull(false)
        }

        const project = () => {
            const Outstanding = _(data.filteredItem.data)
                .filter((val) => {
                    if (
                        val.chk_mark == 'N' &&
                        (val.pri_no == '06' || val.pri_no == '07')
                    ) {
                        return val
                    }
                })
                .map((val) => {
                    return {
                        ...val,
                        sparepart: _.filter(data.sparepart, {
                            sheet_no: val.sheet_no,
                            audit_request: 'N',
                        }),
                    }
                })
                .value()
            setSelectOutstanding03(Outstanding)
            setDataNull(false)
        }

        if (data) {
            breakdown()
            stillRun()
            preventive()
            project()
        }
    }, [data])

    function handleTabChange(ev, val) {
        setTabValue(val)
        if (val == 1) {
            header('Outstanding Breakdown')
        } else if (val == 2) {
            header('Outstanding Still Run')
        } else if (val == 3) {
            header('Outstanding Preventive')
        } else if (val == 4) {
            header('Outstanding Project')
        }
    }

    if (dataNull) {
        return <FuseLoading />
    }

    return (
        <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange}>
                    <Tab label="Outstanding Breakdown" value="1" />
                    <Tab label="Outstanding Still Run" value="2" />
                    <Tab label="Outstanding Preventive" value="3" />
                    <Tab label="Outstanding Project" value="4" />
                </TabList>
            </Box>
            <TabPanel value="1">
                <div style={{ width: 900, height: 450 }}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <TableIndex
                            params={{
                                row: selectOutstanding01,
                                columns: columnsOutstanding,
                            }}
                            tableIndex={tableIndex}
                        />
                    </div>
                </div>
            </TabPanel>
            <TabPanel value="2">
                <div style={{ width: 900, height: 450 }}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <TableIndex
                            params={{
                                row: selectOutstanding02,
                                columns: columnsOutstanding,
                            }}
                            tableIndex={tableIndex}
                        />
                    </div>
                </div>
            </TabPanel>
            <TabPanel value="3">
                <div style={{ width: 900, height: 450 }}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <TableIndex
                            params={{
                                row: selectOutstanding03,
                                columns: columnsOutstanding,
                            }}
                            tableIndex={tableIndex}
                        />
                    </div>
                </div>
            </TabPanel>
            <TabPanel value="4">
                <div style={{ width: 900, height: 450 }}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <TableIndex
                            params={{
                                row: selectOutstanding04,
                                columns: columnsOutstanding,
                            }}
                            tableIndex={tableIndex}
                        />
                    </div>
                </div>
            </TabPanel>
        </TabContext>
    )
}

export default OpenDialogSummary
