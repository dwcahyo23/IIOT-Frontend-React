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
import { Download, Summarize, Create } from '@mui/icons-material'
import AutoSizer from 'react-virtualized-auto-sizer'
import { List } from 'react-virtualized'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import StatusChip from './StatusChip'
import {
    searchText,
    filteredScw,
    setSearchText,
} from '../store/scwStore/scwProductionSlices'
import DialogMenuScw from './DialogMenu/DialogMenuScw'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function ListScw() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [selectData, setSelectData] = useState(null)

    const [filterData, search] = [
        useSelector(filteredScw),
        useSelector(searchText),
    ]

    function rowRenderer({
        key, // Unique key within array of row
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
                            {`${index + 1}.${_.truncate(
                                filterData[index].problem,
                                {
                                    length: '15',
                                }
                            )} | ${filterData[index].mch_code} | ${
                                filterData[index].req_to
                            }`}
                        </Typography>
                    </ListItemText>

                    <StatusChip id={filterData[index].status} />
                </ListItemButton>
            </ListItem>
        )
    }

    function handleSearch(event, value) {
        dispatch(setSearchText(event.target.value))
    }

    function handleCreate(event, value) {
        setOpen(true)
        setSelectData({})
    }

    function handleClose(event, reason) {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false)
        }
    }

    return (
        <div>
            <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
                <div className="flex items-center justify-center px-8 pt-12">
                    <Typography
                        className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                        color="text.secondary"
                    >
                        List SCW
                    </Typography>
                </div>
                <div className="flex justify-start px-8 pt-12">
                    <TextField
                        label="Search"
                        placeholder="Search.."
                        className="flex mx-8"
                        value={search}
                        onChange={handleSearch}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        className="mt-8"
                        startIcon={<Create />}
                        variant="outlined"
                        color="secondary"
                        onClick={handleCreate}
                    >
                        Create
                    </Button>
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
                            Production App
                        </Typography>

                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{ width: 1100, height: 600, zIndex: 1000 }}>
                    <DialogMenuScw params={{ data: selectData }} />
                </div>
            </Dialog>
        </div>
    )
}

export default ListScw
