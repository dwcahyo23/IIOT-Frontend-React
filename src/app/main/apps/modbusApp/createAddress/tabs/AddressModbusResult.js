import React from 'react'
import { Grid, Box } from '@mui/material'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExportContainer,
    GridCsvExportMenuItem,
} from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import _ from 'lodash'
import { useFormContext, useFieldArray } from 'react-hook-form'

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

function CustomExportButton(props) {
    return (
        <GridToolbarExportContainer {...props}>
            <GridCsvExportMenuItem options={csvOptions} />
        </GridToolbarExportContainer>
    )
}

function CustomToolbar(props) {
    return (
        <GridToolbarContainer {...props}>
            <CustomExportButton />
        </GridToolbarContainer>
    )
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
    ...customCheckbox(theme),
}))

function AddressModbusResult() {
    const methods = useFormContext()
    const { control, watch } = methods
    const { fields, remove, append } = useFieldArray({
        name: 'ModbusAppResults',
        control,
    })

    const columns = [
        {
            field: 'createdAt',
            headerName: 'Date',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueFormatter: (params) =>
                new Date(Date.parse(params.value)).toLocaleDateString(),
        },
        {
            field: 'data_result.count',
            headerName: 'Count',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueGetter: (params) =>
                params.row.data_result.count.toLocaleString(),
        },
        {
            field: 'data_result.run',
            headerName: 'Run',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueGetter: (params) => params.row.data_result.run,
        },
        {
            field: 'data_result.off',
            headerName: 'Off',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueGetter: (params) => params.row.data_result.off,
        },
    ]

    return (
        <Box
            sx={{
                width: '100%',
                '& .super-app-theme--header': {
                    backgroundColor: '#9fc5e8',
                    fontStyle: { color: '#000000' },
                },
            }}
        >
            <StyledDataGrid
                rows={fields}
                columns={columns}
                autoHeight
                getRowId={(row) => row.uuid}
                checkboxSelection
                density="compact"
                slots={{ toolbar: CustomToolbar }}
            />
        </Box>
    )
}

export default AddressModbusResult
