import {
    ListItemButton,
    ListItem,
    ListItemText,
    Box,
    Paper,
    Typography,
    Tab,
    Tabs,
    Button,
    Avatar,
    Badge,
    AppBar,
    Toolbar,
    Slide,
    Dialog,
    IconButton,
} from '@mui/material'
import { memo, useState, useEffect, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import _, { get } from 'lodash'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver-es'
import { SaveAs, Cancel, Download } from '@mui/icons-material'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useDispatch } from 'react-redux'

import { getMnOne } from '../../store/mnOneSlice'
import { selectApUser, selectApUserById } from '../../store/userSlice'
import { selectApRep } from '../../store/mnRepSlice'
import StatusColor from 'src/app/main/apps/maintenanceSystem/machineTab/utils/StatusColor'
import OpenDialog from './OpenDialog'

function CustomToolbar({ props }) {
    const handleExportExcell = () => {
        const { rows } = props
        const workbook = new Workbook()
        const worksheet = workbook.addWorksheet('ERP')
        try {
            const columnXlsx = []
            _.map(_.keys(rows[0]), (val) => {
                columnXlsx.push({
                    header: val.toLocaleUpperCase(),
                    key: val,
                    width: 25,
                })
            })
            worksheet.columns = columnXlsx

            _.forEach(rows, (val, index) => {
                worksheet.addRow({
                    ...val,
                    unit_id: dayjs(val.ymd).format('MMM'),
                    s_ymd: dayjs(val.ymd).format('YYYY-MM-DD HH:mm:ss'),
                    s_ymd: dayjs(val.s_ymd).format('YYYY-MM-DD HH:mm:ss'),
                    mch_index: '',
                })
            })

            worksheet.columns.forEach((column, columNumber) => {
                worksheet.getCell(`${column.letter}1`).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '96C8FB' },
                    bgColor: { argb: '96C8FB' },
                }
            })

            worksheet.eachRow((row, rowNumber) => {
                _.forEach(row.model.cells, (val) => {
                    worksheet.getCell(val.address).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    }
                })
            })

            workbook.xlsx.writeBuffer().then((buffer) => {
                saveAs(
                    new Blob([buffer], { type: 'application/octet-stream' }),
                    'AP_Sheet.xlsx'
                )
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Button
            color="primary"
            startIcon={<Download />}
            onClick={handleExportExcell}
        >
            Excell
        </Button>
    )
}

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function LastApUser({ data }) {
    const dispatch = useDispatch()
    const user = useSelector((selectApUser) =>
        selectApUserById(selectApUser, data.user)
    )
    const data_report = useSelector(selectApRep)
    const listItem = data?.listItemMonth
    const lastTab = Object.keys(listItem).length - 1
    const [tabValue, setTabValue] = useState(0)
    const currentRange = Object.keys(listItem)[tabValue]
    const [filteredItem, setFilteredItem] = useState([])
    const [itemLength, setItemLength] = useState(0)
    const [countNaudit, setCountNaudt] = useState(0)
    const [open, setOpen] = useState(false)
    const [selectData, setSelectData] = useState(null)
    const [toolBarHeader, setToolBarHeader] = useState('Update')

    useEffect(() => {
        if (data && listItem[currentRange]) {
            setItemLength(listItem[currentRange]?.data.length)
            setFilteredItem(listItem[currentRange])
        }
    })

    useEffect(() => {
        // console.log(filteredItem)
        // console.log(lastTab)
    }, [itemLength, filteredItem, lastTab, selectData])

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false)
        }
    }

    const header = (data) => {
        setToolBarHeader(data)
    }

    const findReport = (data) => {
        const id = _.find(data_report, { sheet_no: data })
        return _.isUndefined(id) == false ? id.audit_report : 'N'
    }

    const RowList = (props) => {
        const { index, style } = props
        return (
            <ListItem key={index} style={style} component="div" disablePadding>
                {data?.leader == 'Inventory' ? (
                    <ListItemButton
                        onClick={() => {
                            setOpen(true)
                            setSelectData(filteredItem?.data[index])
                            console.log(filteredItem?.data[index])
                        }}
                        // component={Link}
                        // to={`/apps/maintenanceSystem/machines/${filteredItem?.data[index].mch_index?.uuid}/${filteredItem?.data[index].sheet_no}`}
                    >
                        <ListItemText>
                            <Typography className="text-13 mt-2 line-clamp-2">
                                {`${index + 1}. ${
                                    filteredItem?.data[index].sheet_no
                                } || ${filteredItem?.data[index].mch_code} || ${
                                    filteredItem?.data[index].mch_com
                                } || ${
                                    filteredItem?.data[index].user_req1
                                } || ${
                                    _.isNull(
                                        filteredItem?.data[index].item_stock
                                    )
                                        ? filteredItem?.data[index].item_name
                                        : filteredItem?.data[index].item_stock
                                } || ${filteredItem?.data[index].item_qty}  ${
                                    filteredItem?.data[index].item_uom
                                }`}
                            </Typography>
                        </ListItemText>
                        <StatusColor
                            id={filteredItem?.data[index].audit_request}
                        />
                        {filteredItem?.data[index].mre_request.length > 0 && (
                            <StatusColor id="MRE" />
                        )}
                        {filteredItem?.data[index].item_ready == 'Y' &&
                            filteredItem?.data[index].audit_request == 'N' && (
                                <StatusColor id="Ready" />
                            )}
                    </ListItemButton>
                ) : (
                    <ListItemButton
                        onClick={() => {
                            setOpen(true)
                            setSelectData(filteredItem?.data[index])
                        }}
                        // component={Link}
                        // to={`/apps/maintenanceSystem/machines/${filteredItem?.data[index].mch_index?.uuid}/${filteredItem?.data[index].sheet_no}`}
                    >
                        <ListItemText>
                            <Typography className="text-13 mt-2 line-clamp-2">
                                {`${index + 1}. ${
                                    filteredItem?.data[index].sheet_no
                                }|${filteredItem?.data[index].mch_no}`}
                            </Typography>
                        </ListItemText>

                        {findReport(filteredItem?.data[index].sheet_no) ==
                            'N' && <StatusColor id="R" />}

                        {filteredItem?.data[index].chk_mark == 'N' ? (
                            <StatusColor
                                id={
                                    filteredItem?.data[index].appe_user !=
                                    'DESYRUS'
                                        ? filteredItem?.data[index].pri_no
                                        : '031'
                                }
                            />
                        ) : (
                            <StatusColor
                                id={filteredItem?.data[index].chk_mark}
                            />
                        )}
                    </ListItemButton>
                )}
            </ListItem>
        )
    }

    return (
        <div>
            <Paper className="flex flex-col flex-auto p-10 shadow rounded-2xl overflow-hidden h-full">
                <div className="flex flex-auto items-center min-w-0">
                    <div className="flex flex-col sm:flex-row items-start justify-between">
                        <div className="w-full items-center">
                            <Avatar
                                className="flex-0 w-64 h-64"
                                alt="user photo"
                                src={user?.photoURL}
                            >
                                {user?.displayName[0]}
                            </Avatar>
                            <Typography className="text-14 font-medium">
                                {user?.displayName}
                            </Typography>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row ml-16 items-end justify-between">
                        <div className="w-full">
                            <Typography className="text-13 mt-2 line-clamp-2">
                                Leader: {data?.leader}
                            </Typography>
                            <Typography className="text-13 mt-2 line-clamp-2">
                                Breakdown: {filteredItem.breakdown?.pass || 0}
                            </Typography>
                            <Typography className="text-13 mt-2 line-clamp-2">
                                Still Run: {filteredItem.still_run?.pass || 0}
                            </Typography>
                            <Typography className="text-13 mt-2 line-clamp-2">
                                Preventive: {filteredItem.preventive?.pass || 0}
                            </Typography>
                        </div>
                    </div>
                    {data && (
                        <CustomToolbar props={{ rows: filteredItem?.data }} />
                    )}
                </div>

                {data?.leader == 'Inventory' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-1 grid-flow-row gap-24 w-full">
                        <Tabs
                            value={tabValue}
                            onChange={(ev, value) => setTabValue(value)}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="scrollable"
                            scrollButtons="auto"
                            classes={{ root: 'w-full h-16 border-b-1' }}
                        >
                            {Object.entries(listItem).map(([key, value]) => (
                                <Tab disableRipple key={key} label={key} />
                            ))}
                        </Tabs>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-1 grid-flow-row gap-24 w-full">
                        <Tabs
                            value={tabValue}
                            onChange={(ev, value) => setTabValue(value)}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="scrollable"
                            scrollButtons="auto"
                            classes={{ root: 'w-full h-16 border-b-1' }}
                        >
                            {Object.entries(listItem).map(([key, value]) => (
                                <Tab
                                    disableRipple
                                    key={key}
                                    label={
                                        <Badge
                                            badgeContent={
                                                _.filter(
                                                    listItem[key]?.data,
                                                    (val) => {
                                                        return (
                                                            val.chk_mark == 'N'
                                                        )
                                                    }
                                                ).length
                                            }
                                            color="error"
                                        >
                                            {key}
                                        </Badge>
                                    }
                                />
                            ))}
                        </Tabs>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-1 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
                    <div className="flex flex-col flex-auto">
                        <AutoSizer disableHeight>
                            {({ width }) => (
                                <FixedSizeList
                                    width={width}
                                    height={280}
                                    itemCount={itemLength}
                                    itemSize={40}
                                    className="py-0 mt-8 divide-y"
                                >
                                    {RowList}
                                </FixedSizeList>
                            )}
                        </AutoSizer>
                    </div>
                </div>
            </Paper>
            <Dialog
                open={open}
                maxWidth={'xl'}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            {toolBarHeader}
                        </Typography>

                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <OpenDialog data={{ selectData }} header={header} />
            </Dialog>
        </div>
    )
}

export default memo(LastApUser)
