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
    filteredRequestByMonth,
    erpMonth,
    selectErpMonth,
    setErpMonth,
    searchText,
    setSearchText,
} from '../store/erpStore/erpMnSlices'
import DialogInventoryMenu from './DialogMenu/DialogInventoryMenu'
import FuseLoading from '@fuse/core/FuseLoading'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function ListInventory() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [selectData, setSelectData] = useState(null)

    const [filterData, selectMonth, useMonth, search] = [
        useSelector(filteredRequestByMonth),
        useSelector(selectErpMonth),
        useSelector(erpMonth),
        useSelector(searchText),
    ]

    useEffect(() => {
        // console.log(filterData)
    }, [filterData])

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
                            {`${index + 1}. ${filterData[index].sheet_no} | ${
                                filterData[index].mch_code
                            } |${filterData[index].user_req1} | ${
                                _.isNull(filterData[index].item_stock)
                                    ? filterData[index].item_name
                                    : filterData[index].item_stock
                            } | ${filterData[index].item_qty}  ${
                                filterData[index].item_uom
                            } | ${filterData[index].mre_request}`}
                        </Typography>
                    </ListItemText>

                    {filterData[index].audit_request == 'Y' ? (
                        <StatusChip id="Y" />
                    ) : (
                        <StatusChip id="N" />
                    )}

                    {filterData[index].mre_request?.length > 0 && (
                        <StatusChip id="MRE" />
                    )}
                    {filterData[index].item_ready == 'Y' &&
                        filterData[index].audit_request == 'N' && (
                            <StatusChip id="Ready" />
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
                        List Request Sparepart
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
                    <DialogInventoryMenu params={{ data: selectData }} />
                </div>
            </Dialog>
        </div>
    )
}

export default ListInventory
