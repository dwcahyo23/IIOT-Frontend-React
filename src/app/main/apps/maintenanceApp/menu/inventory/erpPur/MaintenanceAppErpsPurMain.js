import { motion } from 'framer-motion'
import _ from 'lodash'
import { filterdErpsPur } from '../../../store/erpPurStore/erpPurMnSlices'
import ListErpStock from '../../../components/ListErpStock'
import StatusChip from '../../../components/StatusChip'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

const container = {
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

const columns = [
    {
        field: 'pur_sheet_no',
        headerName: 'MRE',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'left',
        width: 150,
    },
    {
        field: 'mat_no',
        headerName: 'Material No',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'left',
        width: 200,
    },
    {
        field: 'mat_name',
        headerName: 'Material Name',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'left',
        width: 300,
    },
    {
        field: 'pp_ymd',
        headerName: 'PP Date',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY'),
    },
    {
        field: 'ove_mk',
        headerName: 'Over',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        renderCell: (params) =>
            params.value == 'Y' ? (
                <StatusChip id="over_y" />
            ) : (
                <StatusChip id="over_n" />
            ),
    },
    {
        field: 'eta_ymd',
        headerName: 'ETA Date',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY'),
    },
    {
        field: 'ship_ymd',
        headerName: 'ETD Date',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY'),
    },

    // {
    //     field: 'mch_no',
    //     headerName: 'Machine No',
    //     headerClassName: 'super-app-theme--header',
    //     headerAlign: 'center',
    //     align: 'left',
    //     width: 200,
    //     valueFormatter: (params) =>
    //         _.isNull(params.value) ? '-' : params.value,
    // },

    // {
    //     field: 'issue_qty',
    //     headerName: 'Issue Qty',
    //     headerClassName: 'super-app-theme--header',
    //     headerAlign: 'center',
    //     align: 'center',
    //     width: 100,
    //     // valueFormatter: (params) => params.value.replace(/\.00/g, ''),
    // },
    // {
    //     field: 'unit_no',
    //     headerName: 'UOM',
    //     headerClassName: 'super-app-theme--header',
    //     headerAlign: 'center',
    //     align: 'center',
    //     width: 100,
    // },
    // {
    //     field: 'modi_time',
    //     headerName: 'Date',
    //     headerClassName: 'super-app-theme--header',
    //     headerAlign: 'center',
    //     align: 'center',
    //     width: 250,
    //     valueFormatter: (params) =>
    //         dayjs(params.value).format('DD/MM/YY HH:mm'),
    // },
]

function MaintenanceAppErpsPurMain() {
    const filterData = useSelector(filterdErpsPur)

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 gap-16 w-full min-w-0 pt-24"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
                <ListErpStock params={filterData} columns={columns} />
            </motion.div>
        </motion.div>
    )
}

export default MaintenanceAppErpsPurMain
