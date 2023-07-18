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
} from '@mui/material'
import { memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { FixedSizeList } from 'react-window'
import StatusColor from 'src/app/main/apps/maintenanceSystem/machineTab/utils/StatusColor'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { selectApUser, selectApUserById } from '../../store/userSlice'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver-es'
import DownloadIcon from '@mui/icons-material/Download'
import AutoSizer from 'react-virtualized-auto-sizer'

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
            startIcon={<DownloadIcon />}
            onClick={handleExportExcell}
        >
            Excell
        </Button>
    )
}

function LastApUser({ data }) {
    const user = useSelector((selectApUser) =>
        selectApUserById(selectApUser, data.user)
    )
    const listItem = data?.listItemMonth
    const lastTab = Object.keys(listItem).length - 1
    const [tabValue, setTabValue] = useState(0)
    const currentRange = Object.keys(listItem)[tabValue]
    const [filteredItem, setFilteredItem] = useState([])
    const [itemLength, setItemLength] = useState(0)

    useEffect(() => {
        if (data && listItem[currentRange]) {
            setItemLength(listItem[currentRange]?.data.length)
            setFilteredItem(listItem[currentRange])
        }
    })

    useEffect(() => {
        // console.log(filteredItem)
        // console.log(lastTab)
    }, [itemLength, filteredItem, lastTab])

    const RowList = (props) => {
        const { index, style } = props
        return (
            <ListItem key={index} style={style} component="div" disablePadding>
                {data?.leader == 'Inventory' ? (
                    <ListItemButton
                        component={Link}
                        to={`/apps/maintenanceSystem/machines/${filteredItem?.data[index].mch_index?.uuid}`}
                    >
                        <ListItemText>
                            <Typography className="text-13 mt-2 line-clamp-2">
                                {`${index + 1}. ${
                                    filteredItem?.data[index].sheet_no
                                }|${
                                    _.isNull(
                                        filteredItem?.data[index].item_stock
                                    )
                                        ? filteredItem?.data[index].item_name
                                        : filteredItem?.data[index].item_stock
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
                        component={Link}
                        to={`/apps/maintenanceSystem/machines/${filteredItem?.data[index].mch_index?.uuid}`}
                    >
                        <ListItemText>
                            <Typography className="text-13 mt-2 line-clamp-2">
                                {`${index + 1}. ${
                                    filteredItem?.data[index].sheet_no
                                }|${filteredItem?.data[index].mch_no}`}
                            </Typography>
                        </ListItemText>
                        <StatusColor id={filteredItem?.data[index].chk_mark} />
                        <StatusColor id={filteredItem?.data[index].pri_no} />
                    </ListItemButton>
                )}
            </ListItem>
        )
    }

    return (
        <Paper className="flex flex-col flex-auto p-8 shadow rounded-2xl overflow-hidden h-full">
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
                {data && <CustomToolbar props={{ rows: filteredItem?.data }} />}
            </div>

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
            <div className="grid grid-cols-1 lg:grid-cols-1 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
                <div className="flex flex-col flex-auto">
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <FixedSizeList
                                width={width}
                                height={300}
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
    )
}

export default memo(LastApUser)
