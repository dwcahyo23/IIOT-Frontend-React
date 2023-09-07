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
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver-es'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import DownloadIcon from '@mui/icons-material/Download'
import InputIcon from '@mui/icons-material/Input'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import _ from 'lodash'
import dayjs from 'dayjs'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'

import { showMessage } from 'app/store/fuse/messageSlice'
import { saveMnOneRequest, getMnOne } from '../../../store/mnOneSlice'

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

function CustomToolbar(props) {
    const { user, selection } = props
    const isRoleUser = user.userRole == 'Inventory Maintenance' ? false : true
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const { handleSubmit, register } = useForm({
        shouldUseNativeValidation: true,
    })

    const onSubmit = async (data) => {
        dispatch(
            saveMnOneRequest({
                row: selection,
                options: data.mre_request,
                user: user.datumUuid,
            })
        )
            .then((action) => {
                if (action.payload) {
                    dispatch(
                        showMessage({
                            message: action.payload.message,
                            variant: 'success',
                        })
                    )
                }
            })
            .catch((e) => {
                dispatch(
                    showMessage({
                        message: `${e.message}`,
                        variant: 'error',
                    })
                )
            })
    }

    // const handleExportExcell = () => {
    //     const { rows, column } = props
    //     // console.log({ ...rows })
    //     const workbook = new Workbook()
    //     const worksheet = workbook.addWorksheet('Main sheet')
    //     try {
    //         const columnXlsx = []
    //         _.map(_.keys(rows[0]), (val) => {
    //             columnXlsx.push({
    //                 header: val.toLocaleUpperCase(),
    //                 key: val,
    //                 width: 25,
    //             })
    //         })
    //         worksheet.columns = columnXlsx

    //         _.forEach(rows, (val, index) => {
    //             worksheet.addRow({ ...val })
    //         })

    //         worksheet.columns.forEach((column, columNumber) => {
    //             worksheet.getCell(`${column.letter}1`).fill = {
    //                 type: 'pattern',
    //                 pattern: 'solid',
    //                 fgColor: { argb: '96C8FB' },
    //                 bgColor: { argb: '96C8FB' },
    //             }
    //         })

    //         worksheet.eachRow((row, rowNumber) => {
    //             // console.log(row.model)
    //             _.forEach(row.model.cells, (val) => {
    //                 // console.log(val)
    //                 // console.log(val.rawValue)
    //                 // if (val.value != undefined && val.value.length > 1000) {
    //                 if (
    //                     _.isObject(val.rawValue) &&
    //                     _.has(val.rawValue, 'mimetype')
    //                 ) {
    //                     console.log(val.rawValue?.mimetype)
    //                     const base64 = `data:${val.rawValue?.mimetype};base64,${val.rawValue?.data}`
    //                     // console.log(base64)
    //                     const images = workbook.addImage({
    //                         base64: base64,
    //                         extension: 'jpeg',
    //                     })
    //                     worksheet.getCell(val.address).value = null
    //                     worksheet.getRow(rowNumber).height = 120
    //                     worksheet.addImage(
    //                         images,
    //                         `${val.address}:${val.address}`
    //                     )
    //                 }

    //                 // console.log(val)
    //                 worksheet.getCell(val.address).border = {
    //                     top: { style: 'thin' },
    //                     left: { style: 'thin' },
    //                     bottom: { style: 'thin' },
    //                     right: { style: 'thin' },
    //                 }
    //             })
    //         })

    //         workbook.xlsx.writeBuffer().then((buffer) => {
    //             saveAs(
    //                 new Blob([buffer], { type: 'application/octet-stream' }),
    //                 'DataGrid.xlsx'
    //             )
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

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
            console.log(selection)
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
            dispatch(
                saveMnOneRequest({
                    row: selection,
                    options: options,
                    user: user.datumUuid,
                })
            )
                .then((action) => {
                    if (action.payload) {
                        dispatch(
                            showMessage({
                                message: action.payload.message,
                                variant: 'success',
                            })
                        )
                    }
                })
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
                    startIcon={<WhatsAppIcon />}
                    onClick={handleWa}
                >
                    Whatsapp
                </Button>

                <Button
                    color="primary"
                    startIcon={<InputIcon />}
                    onClick={() => handleOptions('ready')}
                    disabled={isRoleUser}
                >
                    Ready
                </Button>
                <Button
                    color="primary"
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={() => handleOptions('audit')}
                    disabled={isRoleUser}
                >
                    Audit
                </Button>
                <Button
                    color="primary"
                    startIcon={<HighlightOffIcon />}
                    onClick={() => handleOptions('cancel')}
                >
                    Cancel
                </Button>

                <Button color="primary" onClick={() => handleMRE()}>
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

                        <Button color="primary" type="submit">
                            Save
                        </Button>
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

function TableGrid({ params, tableIndex }) {
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

export default TableGrid
