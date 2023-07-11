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
} from '@mui/material'
import { memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { FixedSizeList } from 'react-window'
import StatusColor from 'src/app/main/apps/maintenanceSystem/machineTab/utils/StatusColor'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver-es'
import DownloadIcon from '@mui/icons-material/Download'
import dayjs from 'dayjs'

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

function LastAp({ data }) {
    const listItem = data && data.listItemMonth
    const [tabValue, setTabValue] = useState(0)
    const currentRange = Object.keys(listItem)[tabValue]
    const [filteredItem, setFilteredItem] = useState([])
    const [itemLength, setItemLength] = useState(0)

    useEffect(() => {
        if (data && listItem && listItem[currentRange]) {
            setItemLength(listItem[currentRange].length)
            setFilteredItem(listItem[currentRange])
        }
    })

    useEffect(() => {}, [itemLength, filteredItem])

    const RowList = (props) => {
        const { index, style } = props
        return (
            <ListItem key={index} style={style} component="div" disablePadding>
                <ListItemButton
                    component={Link}
                    to={`/apps/maintenanceSystem/machines/${
                        filteredItem[index].mch_index &&
                        filteredItem[index].mch_index.uuid
                    }`}
                >
                    <ListItemText
                        primary={`${index + 1}. ${
                            filteredItem[index].sheet_no
                        } ${filteredItem[index].mch_no}`}
                    />
                    <StatusColor id={filteredItem[index].pri_no} />
                    <StatusColor id={filteredItem[index].chk_mark} />
                </ListItemButton>
            </ListItem>
        )
    }

    return (
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
            <div className="flex flex-col sm:flex-row items-start justify-between">
                <Typography className="text-lg font-small tracking-tight leading-6 truncate">
                    AP Sheet
                </Typography>
                {data && <CustomToolbar props={{ rows: data.raw }} />}
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
                    <FixedSizeList
                        height={300}
                        width={400}
                        itemCount={itemLength}
                        itemSize={35}
                        className="py-0 mt-8 divide-y"
                    >
                        {RowList}
                    </FixedSizeList>
                </div>
            </div>
        </Paper>
    )
}

export default memo(LastAp)
