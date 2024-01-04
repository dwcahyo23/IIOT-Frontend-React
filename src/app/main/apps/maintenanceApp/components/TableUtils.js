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

function CustomToolbar(props) {
    return (
        <GridToolbarContainer {...props}>
            <GridToolbarQuickFilter />
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

function TableUtils({ params, tableIndex }) {
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

    useEffect(() => {}, [rowSelectionModel])

    return (
        <StyledDataGrid
            rows={params.row}
            columns={params.columns}
            getRowHeight={() => 'auto'}
            getRowId={(row) => row.id_genba || row.sheet}
            onRowDoubleClick={(data) => tableIndex(data)}
            checkboxSelection
            density="compact"
            slotProps={{ toolbar: { rows, column } }}
            autoPageSize
        />
    )
}

export default TableUtils
