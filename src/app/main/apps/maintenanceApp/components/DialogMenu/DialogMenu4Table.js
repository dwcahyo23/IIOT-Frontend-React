import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    TextField,
    Input,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { styled } from '@mui/material/styles'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import InputIcon from '@mui/icons-material/Input'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CircularProgress from '@mui/material'
import { grey } from '@mui/material/colors'
import _ from 'lodash'
import dayjs from 'dayjs'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { showMessage } from 'app/store/fuse/messageSlice'
import {
    saveRequest,
    saveRequestPending,
} from '../../store/requestStore/requestMnSlice'
import { useSelector } from 'react-redux'
import { Save } from '@mui/icons-material'

function customCheckbox(theme) {
    return {
        '& .MuiCheckbox-root svg': {
            width: 16,
            height: 16,
            backgroundColor: 'transparent',
            border: `1px solid ${
                theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
            }`,
            borderRadius: 2,
        },
        '& .MuiCheckbox-root svg path': {
            display: 'none',
        },
        '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
        },
        '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
            position: 'absolute',
            display: 'table',
            border: '2px solid #fff',
            borderTop: 0,
            borderLeft: 0,
            transform: 'rotate(45deg) translate(-50%,-50%)',
            opacity: 1,
            transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
            content: '""',
            top: '50%',
            left: '39%',
            width: 5.71428571,
            height: 9.14285714,
        },
        '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after':
            {
                width: 8,
                height: 8,
                backgroundColor: '#1890ff',
                transform: 'none',
                top: '39%',
                border: 0,
            },
    }
}

function sendMsg(selection) {
    if (selection.length > 0) {
        let msg = `*Permintaan Sparepart*`
        msg += `\n\n${selection[0].sheet_no} |  ${selection[0].category_request}`
        msg += `\n${selection[0].mch_code} | ${
            selection[0].user_req1
        } | ${dayjs(selection[0].createdAt).format('DD/MM/YYYY HH:mm:ss')} `
        msg += `\n\nList permintaan:`
        _.forEach(selection, (entry, idx) => {
            msg += `\n*${idx + 1}.)* *${
                _.isNull(entry.item_stock) == false
                    ? entry.item_stock
                    : entry.name
            }* | ${entry.item_qty} ${entry.item_uom} | ${
                entry.item_ready == 'Y' ? '✅' : '❌'
            } `
            if (entry.audit_request == 'N') {
                if (
                    _.isNull(entry.mre_request) == false &&
                    entry.mre_request.length > 3
                ) {
                    msg += `\n↑ Sudah terbit MRE, _*${entry.mre_request}*_`
                    msg += `\n${dayjs(entry.date_mre_request).format(
                        'DD/MM/YY HH:mm:ss\n'
                    )}`
                }
                if (entry.item_ready == 'Y') {
                    msg += `\n ↑ Sudah digudang, silahkan diambil`
                    msg += `\n${dayjs(entry.ready_request).format(
                        'DD/MM/YY HH:mm:ss\n'
                    )}`
                }
            } else {
                msg += `\n ↑ Sudah audit, by ${entry.user_req2}`
                msg += `\n${dayjs(entry.date_audit_request).format(
                    'DD/MM/YY HH:mm:ss\n'
                )}`
            }
        })
        if (
            selection[0].mch_com == 'GM1' ||
            selection[0].mch_com == 'GM3' ||
            selection[0].mch_com == 'GM5'
        ) {
            axios.post('http://192.168.192.7:5010/send-message-group', {
                name: 'GM1 PENANGANAN SPAREPART',
                // number: '082124610363',
                message: msg,
            })
        } else if (selection[0].mch_com == 'GM2') {
            axios.post('http://192.168.192.7:5010/send-message-group', {
                name: 'GM2 PENANGANAN SPAREPART',
                // number: '082124610363',
                message: msg,
            })
        }
    }
}

function CustomToolbar(props) {
    const { user, selection } = props
    const isRoleUser = user.userRole == 'Inventory Maintenance' ? false : true
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const isPending = useSelector(saveRequestPending)

    const { handleSubmit, register } = useForm({
        shouldUseNativeValidation: true,
    })

    const onSubmit = async (data) => {
        const x = _.map(selection, (val) => {
            const obj = {
                ...val,
                item_ready: 'N',
                mre_request: data.mre_request,
                date_mre_request: dayjs(),
            }
            dispatch(saveRequest(obj)).then((action) => {
                if (action.payload) {
                    dispatch(
                        showMessage({
                            message: 'Data successfully saved',
                            variant: 'success',
                        })
                    )
                }
            })
            return obj
        })

        sendMsg(x)
    }

    const handleWa = () => {
        const { rows, column, selection } = props
        if (selection.length < 1) {
            dispatch(
                showMessage({
                    message: 'Selection cannot be empty',
                    variant: 'error',
                })
            )
        } else {
            let msg = `*Permintaan Sparepart*`
            msg += `\n\n${selection[0].sheet_no} |  ${selection[0].category_request}`
            msg += `\n${selection[0].mch_code} | ${
                selection[0].user_req1
            } | ${dayjs(selection[0].createdAt).format('DD/MM/YYYY HH:mm:ss')} `
            msg += `\n\nList permintaan:`
            _.forEach(selection, (entry, idx) => {
                msg += `\n*${idx + 1}.)* *${
                    _.isNull(entry.item_stock) == false
                        ? entry.item_stock
                        : entry.name
                }* | ${entry.item_qty} ${entry.item_uom} | ${
                    entry.item_ready == 'Y' ? '✅' : '❌'
                } `
                if (entry.audit_request == 'N') {
                    if (
                        _.isNull(entry.mre_request) == false &&
                        entry.mre_request.length > 3
                    ) {
                        msg += `\n↑ Sudah terbit MRE, _*${entry.mre_request}*_`
                        msg += `\n${dayjs(entry.date_mre_request).format(
                            'DD/MM/YY HH:mm:ss\n'
                        )}`
                    }
                    if (entry.item_ready == 'Y') {
                        msg += `\n ↑ Sudah digudang, silahkan diambil`
                        msg += `\n${dayjs(entry.ready_request).format(
                            'DD/MM/YY HH:mm:ss\n'
                        )}`
                    }
                } else {
                    msg += `\n ↑ Sudah audit, by ${entry.user_req2}`
                    msg += `\n${dayjs(entry.date_audit_request).format(
                        'DD/MM/YY HH:mm:ss\n'
                    )}`
                }
            })
            if (
                selection[0].mch_com == 'GM1' ||
                selection[0].mch_com == 'GM3' ||
                selection[0].mch_com == 'GM5'
            ) {
                axios
                    .post('http://192.168.192.7:5010/send-message-group', {
                        name: 'GM1 PENANGANAN SPAREPART',
                        // number: '082124610363',
                        message: msg,
                    })
                    .then(() =>
                        dispatch(
                            showMessage({
                                message: 'Sended wa successfully',
                                variant: 'success',
                            })
                        )
                    )
                    .catch((e) => {
                        // console.log(e)
                        dispatch(
                            showMessage({
                                message: `${e.message}`,
                                variant: 'error',
                            })
                        )
                    })
            } else if (selection[0].mch_com == 'GM2') {
                axios
                    .post('http://192.168.192.7:5010/send-message-group', {
                        name: 'GM2 PENANGANAN SPAREPART',
                        // number: '082124610363',
                        message: msg,
                    })
                    .then(() =>
                        dispatch(
                            showMessage({
                                message: 'Sended wa successfully',
                                variant: 'success',
                            })
                        )
                    )
                    .catch((e) => {
                        dispatch(
                            showMessage({
                                message: `${e.message}`,
                                variant: 'error',
                            })
                        )
                    })
            }
        }
    }

    const handleOptions = (options) => {
        const { selection, user } = props

        if (selection.length < 1) {
            dispatch(
                showMessage({
                    message: 'Selection cannot be empty',
                    variant: 'error',
                })
            )
        } else {
            const x = _.map(selection, (val) => {
                if (options === 'ready') {
                    const obj = {
                        ...val,
                        item_ready: 'Y',
                        date_ready_request: dayjs(),
                    }
                    dispatch(saveRequest(obj)).then((action) => {
                        if (action.payload) {
                            dispatch(
                                showMessage({
                                    message: 'Data successfully saved',
                                    variant: 'success',
                                })
                            )
                        }
                    })
                    return obj
                }
                if (options === 'audit') {
                    const obj = {
                        ...val,
                        audit_request: 'Y',
                        date_ready_request: dayjs(),
                        date_audit_request: dayjs(),
                    }
                    dispatch(saveRequest(obj)).then((action) => {
                        if (action.payload) {
                            dispatch(
                                showMessage({
                                    message: 'Data successfully saved',
                                    variant: 'success',
                                })
                            )
                        }
                    })
                    return obj
                }
                if (options === 'cancel') {
                    const obj = {
                        ...val,
                        audit_request: 'C',
                        date_audit_request: dayjs(),
                    }
                    dispatch(saveRequest(obj)).then((action) => {
                        if (action.payload) {
                            dispatch(
                                showMessage({
                                    message: 'Data successfully saved',
                                    variant: 'success',
                                })
                            )
                        }
                    })
                    return obj
                }
            })
            sendMsg(x)
        }
    }

    const handleMRE = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <GridToolbarContainer {...props}>
                <GridToolbarQuickFilter />
                <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<WhatsAppIcon />}
                    onClick={handleWa}
                >
                    Whatsapp
                </Button>

                <LoadingButton
                    loading={isPending}
                    loadingIndicator="Loading…"
                    variant="outlined"
                    startIcon={<InputIcon />}
                    onClick={() => handleOptions('ready')}
                    disabled={isRoleUser}
                >
                    <span>Ready</span>
                </LoadingButton>

                <LoadingButton
                    loading={isPending}
                    loadingIndicator="Loading…"
                    variant="outlined"
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={() => handleOptions('audit')}
                    disabled={isRoleUser}
                >
                    <span>Audit</span>
                </LoadingButton>

                <LoadingButton
                    loading={isPending}
                    loadingIndicator="Loading…"
                    variant="outlined"
                    startIcon={<HighlightOffIcon />}
                    onClick={() => handleOptions('cancel')}
                >
                    <span>Cancel</span>
                </LoadingButton>

                <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => handleMRE()}
                    startIcon={<InputIcon />}
                    disabled={isRoleUser}
                >
                    MRE
                </Button>
            </GridToolbarContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Please enter MRE</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register('mre_request')}
                            className="mt-8 mb-16"
                            required
                            label="MRE"
                            autoFocus
                            id="mre_request"
                            variant="outlined"
                            fullWidth
                        />

                        <LoadingButton
                            loading={isPending}
                            variant="contained"
                            color="primary"
                            loadingIndicator="Loading…"
                            startIcon={<Save />}
                            type="submit"
                        >
                            <span>Save</span>
                        </LoadingButton>

                        {/* <Button color="primary" type="submit">
                            Save
                        </Button> */}
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

CustomToolbar.propTypes = {
    rows: PropTypes.array.isRequired,
    column: PropTypes.array.isRequired,
    selection: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color:
        theme.palette.mode === 'light'
            ? 'rgba(0,0,0,.85)'
            : 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${
            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
        }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${
            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
        }`,
    },
    '& .MuiDataGrid-cell': {
        color:
            theme.palette.mode === 'light'
                ? 'rgba(0,0,0,.85)'
                : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
    '& .super-app-theme--header': {
        backgroundColor: '#9fc5e8',
        fontStyle: { color: '#000000' },
    },
    ...customCheckbox(theme),
}))

function DialogMenu4Table({ params, tableIndex }) {
    const rows = params.row
    const column = params.columns
    const user = params.user
    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const selection = rowSelectionModel

    return (
        <StyledDataGrid
            rows={params.row}
            columns={params.columns}
            getRowHeight={() => 'auto'}
            getRowId={(row) => row.uuid_request}
            onRowDoubleClick={(data) => tableIndex(data)}
            checkboxSelection
            density="compact"
            slots={{ toolbar: CustomToolbar }}
            slotProps={{ toolbar: { rows, column, selection, user } }}
            initialState={{
                pagination: { paginationModel: { pageSize: 100 } },
            }}
            pageSizeOptions={[25, 50, 100]}
            onRowSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids)
                const selectedRows = params.row.filter((row) =>
                    selectedIDs.has(row.uuid_request)
                )
                setRowSelectionModel(selectedRows)
                tableIndex({ multi: selectedRows })
            }}
        />
    )
}

export default DialogMenu4Table
