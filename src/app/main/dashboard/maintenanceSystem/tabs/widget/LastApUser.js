import {
    ListItemButton,
    ListItem,
    ListItemText,
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
    TextField,
} from '@mui/material'
import { memo, useState, useEffect, forwardRef } from 'react'
import _ from 'lodash'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver-es'
import { Download } from '@mui/icons-material'
import AutoSizer from 'react-virtualized-auto-sizer'
import { List } from 'react-virtualized'
import { useDispatch } from 'react-redux'

import { selectApReq } from '../../store/mnReqSlice'
import { selectApUser, selectApUserById } from '../../store/userSlice'
import { selectApRep } from '../../store/mnRepSlice'
import StatusColor from 'src/app/main/apps/maintenanceSystem/machineTab/utils/StatusColor'
import TableIndex from 'src/app/main/apps/maintenanceSystem/machineTab/TableIndex'
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

                if (_.isNull(val) == false) {
                    if (
                        val == 'date_target' ||
                        val == 'date_finish' ||
                        val == 'createdAt' ||
                        val == 'updatedAt' ||
                        val == 'date_request' ||
                        val == 'date_audit_request' ||
                        val == 'date_ready_request' ||
                        val == 'date_mre_request'
                    ) {
                        worksheet.addRow({
                            date_target: dayjs(val.date_target).format(
                                'YYYY-MM-DD HH:mm:ss'
                            ),
                            date_finish: dayjs(val.date_finish).format(
                                'YYYY-MM-DD HH:mm:ss'
                            ),
                            createdAt: dayjs(val.createdAt).format(
                                'YYYY-MM-DD HH:mm:ss'
                            ),
                            updatedAt: dayjs(val.updatedAt).format(
                                'YYYY-MM-DD HH:mm:ss'
                            ),
                            date_request: dayjs(val.date_request).format(
                                'YYYY-MM-DD HH:mm:ss'
                            ),
                            date_ready_request: dayjs(
                                val.date_ready_request
                            ).format('YYYY-MM-DD HH:mm:ss'),
                            date_audit_request: dayjs(val.date_request).format(
                                'YYYY-MM-DD HH:mm:ss'
                            ),
                            date_mre_request: dayjs(
                                val.date_ready_request
                            ).format('YYYY-MM-DD HH:mm:ss'),
                        })
                    }
                }
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
    const sparepart = useSelector(selectApReq)

    const listItem = data?.listItemMonth
    const lastTab = Object.keys(listItem).length - 1
    const [tabValue, setTabValue] = useState(0)
    const currentRange = Object.keys(listItem)[tabValue]
    const [filteredItem, setFilteredItem] = useState([])
    const [filteredText, setFilteredText] = useState(null)
    const [open, setOpen] = useState(false)
    const [selectData, setSelectData] = useState(null)
    const [toolBarHeader, setToolBarHeader] = useState('Update')

    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if (data && listItem[currentRange]) {
            setFilteredItem(listItem[currentRange])
        }
    })

    useEffect(() => {
        // console.log(filteredText)
    }, [filteredText])

    useEffect(() => {
        // console.log(filteredItem)
    }, [filteredItem])

    useEffect(() => {
        console.log(selectData)
    }, [selectData])

    useEffect(() => {
        function getFilteredArray() {
            if (searchText.length === 0) {
                return filteredItem?.data
            }

            return _.filter(filteredItem?.data, (val) => {
                if (
                    (!_.isUndefined(val.sheet_no) &&
                        val.sheet_no
                            .toLowerCase()
                            .includes(searchText.toLowerCase())) ||
                    (!_.isUndefined(val.mch_no) &&
                        val.mch_no
                            .toLowerCase()
                            .includes(searchText.toLowerCase())) ||
                    (!_.isUndefined(val.mch_code) &&
                        val.mch_code
                            .toLowerCase()
                            .includes(searchText.toLowerCase())) ||
                    (!_.isUndefined(val.user_req1) &&
                        val.user_req1
                            .toLowerCase()
                            .includes(searchText.toLowerCase())) ||
                    (!_.isUndefined(val.mre_request) &&
                        val.mre_request
                            .toLowerCase()
                            .includes(searchText.toLowerCase()))
                ) {
                    return val
                }

                if (searchText == 'mre' && !_.isUndefined(val.mre_request)) {
                    return val.mre_request.length > 0
                }

                if (searchText == 'ready' && !_.isUndefined(val.item_ready)) {
                    return val.item_ready == 'Y' && val.audit_request == 'N'
                }

                if (
                    searchText == 'audit' &&
                    (!_.isUndefined(val.chk_mark) ||
                        !_.isUndefined(val.audit_request))
                ) {
                    return val.chk_mark == 'Y' || val.audit_request == 'Y'
                }

                if (
                    searchText == 'unaudit' &&
                    (!_.isUndefined(val.chk_mark) ||
                        !_.isUndefined(val.audit_request))
                ) {
                    return val.chk_mark == 'N' || val.audit_request == 'N'
                }
            })
        }

        if (filteredItem?.data) {
            setFilteredText(getFilteredArray())
            // console.log(getFilteredArray())
        }
    }, [searchText, filteredItem])

    const handleSearchText = (event) => {
        setSearchText(event.target.value)
    }

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

    const findRequest = (data) => {
        const id = _.filter(sparepart, { sheet_no: data })
        return _.every(id, { audit_request: 'Y' })
    }

    function rowRenderer({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) {
        return (
            <ListItem key={index} style={style} component="div" disablePadding>
                {data?.leader == 'Inventory' ? (
                    <ListItemButton
                        onClick={() => {
                            setOpen(true)
                            setSelectData(filteredText[index])
                            // console.log(filteredText[index])
                        }}
                    >
                        <ListItemText>
                            <Typography className="text-13 mt-2 line-clamp-2">
                                {`${index + 1}. ${
                                    filteredText[index].sheet_no
                                } || ${filteredText[index].mch_code} || ${
                                    filteredText[index].mch_com
                                } || ${filteredText[index].user_req1} || ${
                                    _.isNull(filteredText[index].item_stock)
                                        ? filteredText[index].item_name
                                        : filteredText[index].item_stock
                                } || ${filteredText[index].item_qty}  ${
                                    filteredText[index].item_uom
                                } || ${filteredText[index].mre_request}`}
                            </Typography>
                        </ListItemText>

                        {filteredText[index].audit_request == 'Y' ? (
                            <StatusColor id="Y" />
                        ) : (
                            <StatusColor id="N" />
                        )}
                        {filteredText[index].mre_request?.length > 0 && (
                            <StatusColor id="MRE" />
                        )}
                        {filteredText[index].item_ready == 'Y' &&
                            filteredText[index].audit_request == 'N' && (
                                <StatusColor id="Ready" />
                            )}
                    </ListItemButton>
                ) : (
                    <ListItemButton
                        onClick={() => {
                            setOpen(true)
                            setSelectData(filteredText[index])
                        }}
                    >
                        <ListItemText>
                            <Typography className="text-13 mt-2 line-clamp-2">
                                {`${index + 1}. ${
                                    filteredText[index].sheet_no
                                }|${filteredText[index].mch_no}`}
                            </Typography>
                        </ListItemText>

                        {findReport(filteredText[index].sheet_no) == 'N' && (
                            <StatusColor id="R" />
                        )}

                        {findRequest(filteredText[index].sheet_no) == false && (
                            <StatusColor id="S" />
                        )}

                        {filteredText[index].chk_mark == 'N' ? (
                            <StatusColor
                                id={
                                    (filteredText[index].appe_user ==
                                        'DESYRUS' ||
                                        filteredText[index].appe_user ==
                                            'desyrus' ||
                                        filteredText[index].appe_user ==
                                            'SADRI') &&
                                    filteredText[index].pri_no == '03'
                                        ? '031'
                                        : filteredText[index].pri_no
                                }
                            />
                        ) : (
                            <StatusColor id={filteredText[index].chk_mark} />
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
                </div>

                <div className="flex flex-auto items-center min-w-0">
                    <div className="flex flex-col sm:flex-row items-start justify-between">
                        <TextField
                            label="Search"
                            placeholder="Enter a keyword..."
                            className="flex w-full sm:w-256 m-8"
                            value={searchText}
                            inputProps={{
                                'aria-label': 'Search',
                            }}
                            onChange={handleSearchText}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    {data && (
                        <div className="flex flex-col sm:flex-row ml-16 items-end justify-between">
                            <CustomToolbar
                                props={{ rows: filteredItem?.data }}
                            />
                        </div>
                    )}
                </div>

                {data?.leader == 'Inventory' ? (
                    <div className="flex flex-auto items-center min-w-0">
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
                    <div className="flex flex-auto items-center min-w-0">
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
                                                _.reject(
                                                    listItem[key]?.data,
                                                    (item) =>
                                                        _.find(data_report, {
                                                            sheet_no:
                                                                item.sheet_no,
                                                            audit_report: 'Y',
                                                        })
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

                <div className="flex flex-col flex-auto">
                    {filteredText && filteredText.length > 0 && (
                        <AutoSizer disableHeight>
                            {({ width }) => (
                                <List
                                    width={width}
                                    height={300}
                                    rowCount={filteredText.length}
                                    rowHeight={40}
                                    rowRenderer={rowRenderer}
                                />
                            )}
                        </AutoSizer>
                    )}
                </div>
            </Paper>
            <Dialog
                open={open}
                maxWidth={'xl'}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar position="sticky">
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
