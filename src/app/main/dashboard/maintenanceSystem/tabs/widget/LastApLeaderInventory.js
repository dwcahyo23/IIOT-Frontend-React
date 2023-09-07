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
import { useCallback } from 'react'
import _ from 'lodash'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver-es'
import { Download } from '@mui/icons-material'
import AutoSizer from 'react-virtualized-auto-sizer'
import { List } from 'react-virtualized'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { colors } from '@mui/material'

import { selectApReq } from '../../store/mnReqSlice'
import { selectApUser, selectApUserById } from '../../store/userSlice'
import { selectApRep } from '../../store/mnRepSlice'
import SummaryWo from './SummaryWo'
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
                    unit_id: dayjs(val.createdAt).format('MMM'),

                    createdAt: dayjs(val.createdAt).format(
                        'YYYY-MM-DD HH:mm:ss'
                    ),
                    updatedAt: dayjs(val.updatedAt).format(
                        'YYYY-MM-DD HH:mm:ss'
                    ),
                    date_request: dayjs(val.createdAt).format(
                        'YYYY-MM-DD HH:mm:ss'
                    ),
                    date_ready_request: dayjs(val.date_ready_request).format(
                        'YYYY-MM-DD HH:mm:ss'
                    ),
                    date_audit_request: dayjs(val.date_request).format(
                        'YYYY-MM-DD HH:mm:ss'
                    ),
                    date_mre_request: dayjs(val.date_ready_request).format(
                        'YYYY-MM-DD HH:mm:ss'
                    ),
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

function LastApLeaderInventory({ data }) {
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

    const handleTabChange = (event, value) => {
        setTabValue(value)
    }

    const header = (data) => {
        setToolBarHeader(data)
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
            </ListItem>
        )
    }

    const container = {
        show: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <div>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-16 w-full min-w-0 p-24"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.div
                    variants={item}
                    className="sm:col-span-2 md:col-span-2"
                >
                    <SummaryWo
                        data={{
                            count: filteredItem?.request,
                            title: 'Inventory',
                            name: 'AP Request',
                            colorHg: colors.blue[400],
                            colorLw: colors.blue[300],
                        }}
                    />
                </motion.div>

                <motion.div variants={item}>
                    <SummaryWo
                        data={{
                            count: filteredItem?.request_audit_N,
                            title: 'N.Audit',
                            name: 'AP Request',
                            colorHg: colors.red[400],
                            colorLw: colors.red[300],
                        }}
                    />
                </motion.div>

                <motion.div variants={item}>
                    <SummaryWo
                        data={{
                            count: filteredItem?.request_mre,
                            title: 'Publish MRE',
                            name: 'MRE',
                            colorHg: colors.green[400],
                            colorLw: colors.green[300],
                        }}
                    />
                </motion.div>

                <motion.div variants={item}>
                    <SummaryWo
                        data={{
                            count: filteredItem?.request_ready,
                            title: 'Ready Sparepart',
                            name: 'Ready',
                            colorHg: colors.orange[400],
                            colorLw: colors.orange[300],
                        }}
                    />
                </motion.div>

                <motion.div
                    variants={item}
                    className="sm:col-span-2 md:col-span-5"
                >
                    <Paper className="flex flex-col flex-auto p-10 shadow rounded-2xl overflow-hidden h-full">
                        <div className="flex flex-auto items-center min-w-0">
                            <div className="flex flex-col">
                                <div className="w-full grid justify-items-center">
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
                            <div className="flex flex-col">
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
                                <div className="flex flex-col">
                                    <CustomToolbar
                                        props={{ rows: filteredItem?.data }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-auto items-center min-w-0">
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="scrollable"
                                scrollButtons="auto"
                                classes={{ root: 'w-full h-16 border-b-1' }}
                            >
                                {Object.entries(listItem).map(
                                    ([key, value]) => (
                                        <Tab
                                            disableRipple
                                            key={key}
                                            label={key}
                                        />
                                    )
                                )}
                            </Tabs>
                        </div>

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
                </motion.div>
            </motion.div>

            <Dialog
                open={open}
                maxWidth={'xl'}
                style={{ zIndex: 1000 }}
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
                <OpenDialog
                    data={{ selectData }}
                    header={header}
                    parentName="Inventory"
                />
            </Dialog>
        </div>
    )
}

export default memo(LastApLeaderInventory)
