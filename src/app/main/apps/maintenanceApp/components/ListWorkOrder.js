import { useEffect, useState, forwardRef } from 'react'
import {
    ListItemButton,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Tab,
    Button,
    Avatar,
    AppBar,
    Toolbar,
    Slide,
    Dialog,
    TextField,
} from '@mui/material'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver-es'
import { Download, Summarize } from '@mui/icons-material'
import AutoSizer from 'react-virtualized-auto-sizer'
import { List } from 'react-virtualized'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

import StatusChip from './StatusChip'
import {
    filteredErpsByMonth,
    erpMonth,
    selectErpMonth,
    setErpMonth,
    searchText,
    setSearchText,
} from '../store/erpStore/erpMnSlices'
import DialogWorkOrderMenu from './DialogMenu/DialogWorOrderMenu'
import FuseLoading from '@fuse/core/FuseLoading'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function ListWorkOrder() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [selectData, setSelectData] = useState(null)

    const [filterData, selectMonth, useMonth, search] = [
        useSelector(filteredErpsByMonth),
        useSelector(selectErpMonth),
        useSelector(erpMonth),
        useSelector(searchText),
    ]

    function handleMonth(event, value) {
        dispatch(setErpMonth(value.props.value))
    }

    function handleSearch(event, value) {
        dispatch(setSearchText(event.target.value))
    }

    function handleClose(event, reason) {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false)
        }
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
                        setSelectData(filterData[index])
                    }}
                >
                    <ListItemText>
                        <Typography className="text-13 mt-2 line-clamp-2">
                            {`${index + 1}. ${filterData[index].sheet_no}|${
                                filterData[index].mch_no
                            }`}
                        </Typography>
                    </ListItemText>

                    {filterData[index]?.report_index?.audit_report == 'Y' ? (
                        <div></div>
                    ) : filterData[index]?.report_index?.audit_report == 'N' ? (
                        <StatusChip id="R" />
                    ) : (
                        <StatusChip id="R" />
                    )}

                    {filterData[index].request_index.length > 0 &&
                        _.some(filterData[index].request_index, [
                            'audit_request',
                            'N',
                        ]) && <StatusChip id="S" />}

                    {filterData[index].chk_mark == 'N' ? (
                        <StatusChip
                            id={
                                (filterData[index].appe_user == 'DESYRUS' ||
                                    filterData[index].appe_user == 'desyrus' ||
                                    filterData[index].appe_user == 'SADRI' ||
                                    filterData[index].appe_user == 'sadri') &&
                                filterData[index].pri_no == '03'
                                    ? '031'
                                    : filterData[index].pri_no
                            }
                        />
                    ) : (
                        <StatusChip id={filterData[index].chk_mark} />
                    )}
                </ListItemButton>
            </ListItem>
        )
    }

    // if (filterData.length < 1) {
    //     return <FuseLoading />
    // }

    return (
        <div>
            <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
                <div className="flex items-center justify-center px-8 pt-12">
                    <Typography
                        className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                        color="text.secondary"
                    >
                        List Work Order
                    </Typography>
                </div>
                <div className="flex justify-start px-8 pt-12">
                    <FormControl
                        className="flex w-full sm:w-100 mx-8"
                        variant="outlined"
                    >
                        <InputLabel>Month</InputLabel>

                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            label="Category"
                            value={useMonth}
                            onChange={handleMonth}
                        >
                            {selectMonth.map((val, index) => (
                                <MenuItem value={val} key={index}>
                                    {val}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Search"
                        placeholder="Search.."
                        className="flex w-full sm:w-150 mx-8"
                        value={search}
                        onChange={handleSearch}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="flex px-8 pt-12">
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <List
                                width={width}
                                height={400}
                                rowCount={filterData.length}
                                rowHeight={40}
                                rowRenderer={rowRenderer}
                            />
                        )}
                    </AutoSizer>
                </div>
            </Paper>
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
                            Update Work Order
                        </Typography>

                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{ width: 1100, height: 600, zIndex: 1000 }}>
                    <DialogWorkOrderMenu params={{ data: selectData }} />
                </div>
            </Dialog>
        </div>
    )
}

export default ListWorkOrder
