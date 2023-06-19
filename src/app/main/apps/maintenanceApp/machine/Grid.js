import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    GridToolbarExport,
    GridToolbarContainer,
} from '@mui/x-data-grid'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { format, differenceInHours, addHours } from 'date-fns'
import ProgressBar from './ProgressBar'
import _ from 'lodash'
import axios from 'axios'

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

const sendMsg = async (params) => {
    await axios({
        method: 'post',
        url: 'http://192.168.192.7:5010/send-message-group',
        data: {
            name: params.name,
            message: params.msg,
        },
    })
}

function CustomToolbar(props) {
    const { rows, rowModesModel, index } = props

    const handleSendWhatsapp = () => {
        const d = _.filter(rows, (x) => _.includes(rowModesModel, x.uuid))

        let msg = `*Hello Group Maintenance*\n`
        msg += `\nBelow info sparepart lifetime ${index.mch_code}:\n`
        _.forEach(d, async (field, i) => {
            msg += `\n*${i + 1}. Item name:* ${field.item_name} \n*BOM:* ${
                field.bom
            } \n*Category:* ${field.category} \n*Lifetime:* ${
                field.item_life_time
            }\n*Leadtime:* ${field.item_lead_time}\n*Last Change:* ${format(
                new Date(field.change_at),
                'dd MMM yyyy'
            )}\n*End Lifetime:* ${format(
                addHours(new Date(field.change_at), field.item_life_time),
                'dd MMM yyyy'
            )}\n `
        })

        if (rowModesModel.length > 0) {
            return sendMsg({ name: 'GALINDO TEST', msg: msg })
        }
    }

    return (
        <GridToolbarContainer>
            <GridToolbarExport />
            <Button
                color="primary"
                startIcon={<WhatsAppIcon />}
                onClick={handleSendWhatsapp}
            >
                Send
            </Button>
        </GridToolbarContainer>
    )
}

CustomToolbar.propTypes = {
    rows: PropTypes.array.isRequired,
    index: PropTypes.object.isRequired,
    rowModesModel: PropTypes.array.isRequired,
}

function CustomPagination() {
    const apiRef = useGridApiContext()
    const page = useGridSelector(apiRef, gridPageSelector)
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)

    return (
        <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            page={page + 1}
            count={pageCount}
            // @ts-expect-error
            renderItem={(props2) => (
                <PaginationItem {...props2} disableRipple />
            )}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    )
}

function ProgresBarCalc(params) {
    return (
        differenceInHours(
            addHours(new Date(params.row.change_at), params.row.item_life_time),
            new Date()
        ) / params.row.item_life_time
    )
}

function EndLifeTimeCalc(params) {
    return format(
        addHours(new Date(params.row.change_at), params.row.item_life_time),
        'dd MMM yyyy'
    )
}

function RenderProgres(params) {
    return <ProgressBar value={params.value} />
}

function Grid({ course }) {
    const rows = course.mn_items
    const index = course.machine_index
    const [rowModesModel, setRowModesModel] = useState([])

    const columns = [
        {
            field: 'item_name',
            headerName: 'NAME',
            flex: 1,
            minWidth: 250,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'bom',
            headerName: 'BOM',
            width: 150,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'progress_bar',
            headerName: 'PROGRESS',
            width: 100,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueGetter: ProgresBarCalc,
            renderCell: RenderProgres,
        },
        {
            field: 'item_life_time',
            headerName: 'LIFE TIME',
            type: 'number',
            width: 100,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'item_lead_time',
            headerName: 'LEAD TIME',
            type: 'number',
            width: 100,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },

        {
            field: 'end_life_time',
            headerName: 'END LIFE TIME',
            width: 130,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            valueGetter: EndLifeTimeCalc,
        },
    ]

    return (
        <Box
            sx={{
                height: 400,
                width: '100%',
                '& .super-app-theme--header': {
                    backgroundColor: '#9fc5e8',
                    fontStyle: { color: '#000000' },
                },
            }}
        >
            <StyledDataGrid
                rows={course.mn_items}
                columns={columns}
                getRowId={(row) => row.uuid}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                    setRowModesModel(newSelectionModel)
                }}
                density="compact"
                pageSize={5}
                rowsPerPageOptions={[5]}
                components={{
                    Pagination: CustomPagination,
                    Toolbar: CustomToolbar,
                }}
                componentsProps={{
                    toolbar: { rows, index, rowModesModel },
                }}
            />
        </Box>
    )
}

export default Grid
