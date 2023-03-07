import {
    Checkbox,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    TableCell,
    TableRow,
    TableSortLabel,
    Tooltip,
    TableHead,
    lighten,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@mui/system'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { removeItems } from '../store/itemsSlice'

const rows = [
    {
        uuid: 'image',
        align: 'left',
        disablePadding: true,
        label: '',
        sort: false,
    },
    {
        uuid: 'bom',
        align: 'left',
        disablePadding: false,
        label: 'BOM',
        sort: true,
    },
    {
        uuid: 'category',
        align: 'left',
        disablePadding: false,
        label: 'Category',
        sort: true,
    },
    {
        uuid: 'item_name',
        align: 'left',
        disablePadding: false,
        label: 'Sprepart Name',
        sort: true,
    },
    {
        uuid: 'mch_code',
        align: 'left',
        disablePadding: false,
        label: 'Machine Code',
        sort: true,
    },
    {
        uuid: 'mch_name',
        align: 'left',
        disablePadding: false,
        label: 'Machine Name',
        sort: true,
    },
    {
        uuid: 'mch_com',
        align: 'left',
        disablePadding: false,
        label: 'Plant Name',
        sort: true,
    },
    {
        uuid: 'item_life_time',
        align: 'left',
        disablePadding: false,
        label: 'Life Time',
        sort: true,
    },
    {
        uuid: 'change_next',
        align: 'left',
        disablePadding: false,
        label: 'Inspection Date',
        sort: true,
    },
    {
        uuid: 'item_status',
        align: 'left',
        disablePadding: false,
        label: 'Status',
        sort: true,
    },
]

function ItemsTableHead(props) {
    const { selectedItemsIds } = props
    const numSelected = selectedItemsIds.length
    const [selectedItemsMenu, setSelectedItemsMenu] = useState(null)
    const dispatch = useDispatch()

    const createSortHandler = (property) => (event) => {
        props.onRequestSort(event, property)
    }

    function openSelectedItemsMenu(event) {
        setSelectedItemsMenu(event.currentTarget)
    }

    function closeSelectedItemsMenu() {
        setSelectedItemsMenu(null)
    }

    return (
        <TableHead>
            <TableRow className="h-48 sm:h-64">
                <TableCell
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? lighten(theme.palette.background.default, 0.4)
                                : lighten(
                                      theme.palette.background.default,
                                      0.02
                                  ),
                    }}
                    padding="none"
                    className="w-40 md:w-64 text-center z-99"
                >
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < props.rowCount
                        }
                        checked={
                            props.rowCount !== 0 &&
                            numSelected === props.rowCount
                        }
                        onChange={props.onSelectAllClick}
                    />
                    {numSelected > 0 && (
                        <Box
                            className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
                            sx={{
                                background: (theme) =>
                                    theme.palette.background.default,
                            }}
                        >
                            <IconButton
                                aria-owns={
                                    selectedItemsMenu
                                        ? 'selectedItemsMenu'
                                        : null
                                }
                                aria-haspopup="true"
                                onClick={openSelectedItemsMenu}
                                size="large"
                            >
                                <FuseSvgIcon>
                                    heroicons-outline:dots-horizontal
                                </FuseSvgIcon>
                            </IconButton>
                            <Menu
                                uuid="selectedItemsMenu"
                                anchorEl={selectedItemsMenu}
                                open={Boolean(selectedItemsMenu)}
                                onClose={closeSelectedItemsMenu}
                            >
                                <MenuList>
                                    <MenuItem
                                        onClick={() => {
                                            dispatch(
                                                removeItems(selectedItemsIds)
                                            )
                                            props.onMenuItemClick()
                                            closeSelectedItemsMenu()
                                        }}
                                    >
                                        <ListItemIcon className="min-w-40">
                                            <FuseSvgIcon>
                                                heroicons-outline:trash
                                            </FuseSvgIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Remove" />
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    )}
                </TableCell>
                {rows.map((row) => {
                    return (
                        <TableCell
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? lighten(
                                              theme.palette.background.default,
                                              0.4
                                          )
                                        : lighten(
                                              theme.palette.background.default,
                                              0.02
                                          ),
                            }}
                            className="p-4 md:p-16"
                            key={row.uuid}
                            align={row.align}
                            padding={row.disablePadding ? 'none' : 'normal'}
                            sortDirection={
                                props.order.uuid === row.uuid
                                    ? props.order.direction
                                    : false
                            }
                        >
                            {row.sort && (
                                <Tooltip
                                    title="Sort"
                                    placement={
                                        row.align === 'right'
                                            ? 'bottom-end'
                                            : 'bottom-start'
                                    }
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={props.order.uuid === row.uuid}
                                        direction={props.order.direction}
                                        onClick={createSortHandler(row.uuid)}
                                        className="font-semibold"
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            )}
                        </TableCell>
                    )
                }, this)}
            </TableRow>
        </TableHead>
    )
}

export default ItemsTableHead
