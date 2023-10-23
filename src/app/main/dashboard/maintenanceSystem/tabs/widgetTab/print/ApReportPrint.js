import { useEffect, useState, forwardRef } from 'react'
import { useDeepCompareEffect } from '@fuse/hooks'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import logo from './logo.png'
import approve from './approve.png'
import dayjs from 'dayjs'
import _ from 'lodash'

const ApReportPrint = forwardRef((props, ref) => {
    const data = props.params

    const renderList = () => {
        const listItems = []

        for (let i = 0; i < 13; i++) {
            listItems.push(
                <tr key={i}>
                    <td className="border border-black" height="22"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                </tr>
            )
        }

        return listItems
    }

    const renderListSP = () => {
        const listItems = []

        for (let i = 0; i < 5; i++) {
            listItems.push(
                <tr key={i}>
                    <td className="border border-black" height="22"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                    <td className="border border-black"></td>
                </tr>
            )
        }

        return listItems
    }

    return (
        // className="hidden print:block"
        <div ref={ref} className="hidden print:block">
            <div className="inline-block p-16 sm:p-16 text-left print:p-0 w-full overflow-auto">
                <div className="w-xl p-16 mx-16 rounded-2xl shadow print:w-1/2 print:rounded-none print:shadow-none print:bg-transparent">
                    <div className="grid grid-cols-12 gap-x-4 my-32">
                        <div className="col-span-4">
                            <img className="w-11/12" src={logo} alt="logo" />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-4 my-32">
                        <Typography className="col-span-6 text-xl font-medium"></Typography>

                        <Typography
                            className="col-span-6 text-xl font-medium"
                            align="right"
                        >
                            LAPORAN MAINTENANCE
                        </Typography>
                    </div>

                    <table className="table-auto my-32 w-full border-collapse border border-black">
                        <tbody>
                            <tr>
                                <td
                                    rowSpan="3"
                                    className="w-3/12 border border-black"
                                >
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        TGL
                                    </Typography>
                                </td>
                                <td
                                    rowSpan="3"
                                    className="w-3/12 border border-black"
                                >
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        TEKNISI PELAKSANA
                                    </Typography>
                                </td>
                                <td
                                    colSpan="3"
                                    className="w-3/12 border border-black"
                                >
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        KEGIATAN
                                    </Typography>
                                </td>
                                <td
                                    rowSpan="3"
                                    className="w-3/12 border border-black"
                                >
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        BREAKDOWN TIME
                                    </Typography>
                                </td>
                                <td
                                    rowSpan="3"
                                    className="w-3/12 border border-black"
                                >
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        PARAF KA.SHIFT
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    rowSpan="2"
                                    className="w-6/12 border border-black"
                                >
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        LANGKAH PENGERJAAN
                                    </Typography>
                                </td>
                                <td
                                    colSpan="2"
                                    className="w-6/12 border border-black"
                                >
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        WAKTU
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-6/12 border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        INTERNAL
                                    </Typography>
                                </td>
                                <td className="w-6/12 border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        EXTERNAL
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black">
                                    <Typography className="font-medium ml-5">
                                        {_.isNull(data.report?.date_report)
                                            ? '-'
                                            : dayjs(
                                                  data.report?.date_report
                                              ).format('DD-MM-YYYY')}
                                    </Typography>
                                </td>
                                <td className="border border-black">
                                    <Typography className="font-medium ml-5">
                                        {_.capitalize(data.report?.user_rep2)}
                                    </Typography>
                                </td>
                                <td className="border border-black">
                                    <Typography className="font-medium ml-5">
                                        {_.capitalize(data.report?.corrective)}
                                    </Typography>
                                </td>
                                <td className="border border-black"></td>
                                <td className="border border-black"></td>
                                <td className="border border-black"></td>
                                <td className="border border-black"></td>
                            </tr>

                            {renderList()}
                        </tbody>
                    </table>

                    <table className="table-auto my-32 w-full border-collapse border border-black">
                        <tbody>
                            <tr>
                                <td className="w-1/12 border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        NO
                                    </Typography>
                                </td>
                                <td className="w-7/12 border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        NAMA SPAREPART
                                    </Typography>
                                </td>
                                <td className="w-2/12 border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        QUANTITY
                                    </Typography>
                                </td>
                                <td className="w-2/12 border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        STATUS
                                    </Typography>
                                </td>
                            </tr>

                            {data?.requestList.length > 0 ? (
                                _.map(data.requestList, (val, i) => (
                                    <tr key={i}>
                                        <td className="border border-black">
                                            <Typography
                                                className="font-medium ml-5"
                                                align="center"
                                            >
                                                {i + 1}
                                            </Typography>
                                        </td>
                                        <td className="border border-black">
                                            <Typography className="font-medium ml-5 inline-block">
                                                {val.item_stock}
                                            </Typography>
                                        </td>
                                        <td className="border border-black">
                                            <Typography
                                                className="font-medium ml-5"
                                                lign="center"
                                            >
                                                {val.item_qty} {val.item_uom}
                                            </Typography>
                                        </td>
                                        <td className="border border-black">
                                            <Typography
                                                className="font-medium ml-5"
                                                align="center"
                                            >
                                                {val.mre_request.length > 3
                                                    ? 'Order'
                                                    : 'Ambil stock'}
                                            </Typography>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black">
                                        <Typography
                                            className="font-medium ml-5"
                                            align="center"
                                        >
                                            1
                                        </Typography>
                                    </td>
                                    <td className="border border-black"></td>
                                    <td className="border border-black"></td>
                                    <td className="border border-black"></td>
                                </tr>
                            )}

                            {renderListSP()}
                        </tbody>
                    </table>

                    <table className="table-auto my-32 w-full border-collapse border border-black">
                        <tbody>
                            <tr>
                                <td className="w-3/12 border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        SEBAB KERUSAKAN
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        DESKRIPSI ANALISA
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        DIPERIKSA
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        DIBUAT
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    rowSpan="2"
                                    className="w-3/12 border border-black"
                                ></td>
                                <td
                                    rowSpan="2"
                                    className="w-3/12 border border-black"
                                >
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        {_.capitalize(data.report?.analyzed)}
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-black h-96">
                                    {data.report?.audit_report == 'Y' && (
                                        <img
                                            className="m-auto"
                                            width="30%"
                                            src={approve}
                                            alt="logo"
                                        />
                                    )}
                                </td>
                                <td className="w-3/12 border border-black h-96">
                                    {data.report?.audit_report == 'Y' && (
                                        <img
                                            className="m-auto"
                                            width="30%"
                                            src={approve}
                                            alt="logo"
                                        />
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        {_.capitalize(
                                            data.machine?.responsible
                                        )}
                                    </Typography>
                                </td>
                                <td className="border border-black">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        {_.capitalize(data.report?.user_rep2)}
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="grid grid-cols-12 my-32">
                        <Typography className="col-span-6 text-sm font-small">
                            FO-03-03-07
                        </Typography>

                        <Typography
                            className="col-span-6 text-sm font-small"
                            align="right"
                        >
                            REV. 06/01.03.2016
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default ApReportPrint
