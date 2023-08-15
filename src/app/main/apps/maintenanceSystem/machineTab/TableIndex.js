import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExportContainer,
    GridCsvExportMenuItem,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import { Button } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import DownloadIcon from '@mui/icons-material/Download'
import { styled } from '@mui/material/styles'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver-es'
import _ from 'lodash'
import { expect } from 'chai'

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

const csvOptions = { delimiter: ';' }

// const sendMsgGroup = async (params) => {
//     await axios({
//         method: 'post',
//         url: 'http://192.168.192.7:5010/send-message-group',
//         data: {
//             name: params.name,
//             message: params.msg,
//         },
//     })
// }

// const sendMsg = async (params) => {
//     await axios({
//         method: 'post',
//         url: 'http://192.168.192.7:5010/send-message',
//         data: {
//             number: params.number,
//             message: params.msg,
//         },
//     })
// }

function CustomToolbar(props) {
    const handleExportExcell = () => {
        const { rows, column } = props
        console.log({ ...rows })
        const workbook = new Workbook()
        const worksheet = workbook.addWorksheet('Main sheet')
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
                worksheet.addRow({ ...val })
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
                console.log(row.model)
                _.forEach(row.model.cells, (val) => {
                    // console.log(val.value)
                    // if (val.value != undefined && val.value.length > 1000) {
                    if (val.rawValue) {
                        // console.log(val.value)
                        const base64 = `data:${val.rawValue?.mimetype};base64,${val.rawValue?.data}`
                        // console.log(base64)
                        const images = workbook.addImage({
                            base64: base64,
                            extension: 'jpeg',

                            // val.value.substring(
                            //     val.value.indexOf('base64,') + 7
                            // ),
                        })
                        worksheet.getCell(val.address).value = null
                        worksheet.getRow(rowNumber).height = 120
                        worksheet.addImage(
                            images,
                            `${val.address}:${val.address}`
                        )
                    }

                    // console.log(val)
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
                    'DataGrid.xlsx'
                )
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <GridToolbarContainer {...props}>
            <GridToolbarQuickFilter />
            <Button
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={handleExportExcell}
            >
                Excell
            </Button>
        </GridToolbarContainer>
    )
}

CustomToolbar.propTypes = {
    rows: PropTypes.array.isRequired,
    column: PropTypes.array.isRequired,
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

function TableIndex({ params, tableIndex }) {
    const rows = params.row
    const column = params.columns
    if (!params) {
        return null
    }
    const [filter, setFilter] = useState('')
    const [rowSelectionModel, setRowSelectionModel] = useState([])

    useEffect(() => {
        if (params.filter) {
            setFilter(params.filter)
        }
    }, [params])

    useEffect(() => {
        // console.log(rowSelectionModel)
    }, [rowSelectionModel])

    return (
        <StyledDataGrid
            rows={params.row}
            columns={params.columns}
            getRowHeight={() => 'auto'}
            getRowId={(row) =>
                row.uuid || row.uuid_request || row.sheet_no || row.id_genba
            }
            onRowDoubleClick={(data) => tableIndex(data)}
            checkboxSelection
            density="compact"
            slots={{ toolbar: CustomToolbar }}
            slotProps={{ toolbar: { rows, column } }}
            autoPageSize
            onRowSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids)
                const selectedRows = params.row.filter((row) =>
                    selectedIDs.has(
                        row.uuid ||
                            row.uuid_request ||
                            row.sheet_no ||
                            row.id_genba
                    )
                )
                setRowSelectionModel(selectedRows)
                tableIndex(selectedRows)
            }}
        />
    )
}

export default TableIndex
