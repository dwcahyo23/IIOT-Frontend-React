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

const ApSheetPrint = forwardRef((props, ref) => {
    const data = props.params
    return (
        // className="hidden print:block"
        <div ref={ref}>
            <div className="inline-block p-16 sm:p-16 text-left print:p-0 w-full overflow-auto">
                <div className="w-xl p-16 mx-16 rounded-2xl shadow print:w-auto print:rounded-none print:shadow-none print:bg-transparent">
                    <div className="grid grid-cols-12 gap-x-4 my-16">
                        <div className="col-span-4">
                            <img className="w-11/12" src={logo} alt="logo" />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-4 my-16">
                        <Typography className="col-span-6 text-xl font-medium">
                            NO. W/O : {data.sheet?.sheet_no}
                        </Typography>

                        <Typography
                            className="col-span-6 text-xl font-medium"
                            align="right"
                        >
                            MAINTENANCE WORK ORDER
                        </Typography>
                    </div>

                    <table className="table-auto my-16 w-full border-collapse border border-slate-400">
                        <tbody>
                            <tr>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Nama Mesin/Barang *)
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {data.machine?.mch_name}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Kode Mesin/Barang *)
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {data.machine?.mch_code}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Lokasi Mesin/Barang *)
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {data.machine?.mch_loc}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Hari/Tanggal
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {dayjs(data.sheet?.ymd).format(
                                            'dddd, DD-MM-YYYY'
                                        )}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Pekerjaan diminta oleh
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {_.capitalize(data.sheet?.appe_user)}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Jam Stop time mesin
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {dayjs(data.sheet?.s_ymd).format(
                                            'HH:mm:ss'
                                        )}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Dept./Seksi terkait
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {data.sheet?.dep_no}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Jam Terima W/O
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {dayjs(data.sheet?.s_ymd).format(
                                            'HH:mm:ss'
                                        )}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Tanggal target
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {_.isNull(data.sheet?.m_ymd)
                                            ? '-'
                                            : dayjs(data.sheet?.m_ymd).format(
                                                  'DD-MM-YYYY HH:mm:ss'
                                              )}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Diterima oleh
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {_.capitalize(
                                            data.machine?.responsible
                                        )}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <Typography className="font-medium ml-5">
                                        Kerusakan/Pengerjaan yang diminta *)
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Mesin Beroperasi
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        Prioritas Pengerjaan
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan="2"
                                    className="border border-slate-300 h-80"
                                >
                                    <Typography className="font-medium ml-5">
                                        {data.sheet?.memo}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {data.sheet?.shf_no} shift
                                    </Typography>
                                </td>

                                {/* 
                                <MenuItem value="01">Breakdown</MenuItem>
                                <MenuItem value="02">Still Run</MenuItem>
                                <MenuItem value="03">Preventive</MenuItem>
                                <MenuItem value="04">
                                    Workshop Stil Run
                                </MenuItem>
                                <MenuItem value="05">
                                    Workshop Breakdown
                                </MenuItem>
                                <MenuItem value="06">
                                    Project Machinery
                                </MenuItem>
                                <MenuItem value="07">Project Workshop</MenuItem> */}
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {data.sheet?.pri_no == '01'
                                            ? 'Breakdown'
                                            : data.sheet?.pri_no == '02'
                                            ? 'Still Run'
                                            : data.sheet?.pri_no == '03'
                                            ? 'Preventive'
                                            : data.sheet?.pri_no == '04'
                                            ? 'Workshop Still Run'
                                            : data.sheet?.pri_no == '05'
                                            ? 'Workshop Breakdown'
                                            : data.sheet?.pri_no == '06'
                                            ? 'Project Machinery'
                                            : data.sheet?.pri_no == '07'
                                            ? 'Project Workshop'
                                            : 'undefined'}
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="table-auto my-16 w-full border-collapse border border-slate-400">
                        <tbody>
                            <tr>
                                <td className="w-1/12 border border-slate-300">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        NO
                                    </Typography>
                                </td>
                                <td className="w-auto border border-slate-300">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        INTRUKSI KERJA
                                    </Typography>
                                </td>
                                <td className="w-auto border border-slate-300">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        KERUSAKAN
                                    </Typography>
                                </td>
                                <td className="w-auto border border-slate-300">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        PERBAIKAN
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300 ">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        1
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {_.capitalize(data.report?.corrective)}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {_.capitalize(
                                            data.report?.chronological
                                        )}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography className="font-medium ml-5">
                                        {_.capitalize(data.report?.corrective)}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300 ">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        2
                                    </Typography>
                                </td>
                                <td className="border border-slate-300"></td>
                                <td className="border border-slate-300"></td>
                                <td className="border border-slate-300"></td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300 ">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        3
                                    </Typography>
                                </td>
                                <td className="border border-slate-300"></td>
                                <td className="border border-slate-300"></td>
                                <td className="border border-slate-300"></td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300 ">
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        4
                                    </Typography>
                                </td>
                                <td className="border border-slate-300"></td>
                                <td className="border border-slate-300"></td>
                                <td className="border border-slate-300"></td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="table-auto my-16 w-full border-collapse border border-slate-400">
                        <tbody>
                            <tr>
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        PENGERJAAN
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        ORDER PART
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        PART DATANG
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        SELESAI
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        {_.isNull(data.report?.date_report)
                                            ? '-'
                                            : dayjs(
                                                  data.report?.date_report
                                              ).format('DD-MM-YYYY HH:mm:ss')}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        {_.some(data.requestList, (val) => {
                                            if (val.mre_request.length > 3)
                                                return val
                                        })
                                            ? dayjs(
                                                  data.requestList[0]
                                                      .date_mre_request
                                              ).format('DD-MM-YYYY HH:mm:ss')
                                            : '-'}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        {_.some(data.requestList, (val) => {
                                            if (
                                                val.mre_request.length > 3 &&
                                                _.isNull(
                                                    val.date_ready_request
                                                ) == false
                                            )
                                                return val
                                        })
                                            ? dayjs(
                                                  data.requestList[0]
                                                      .date_ready_request
                                              ).format('DD-MM-YYYY HH:mm:ss')
                                            : '-'}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        {_.isNull(data.report?.date_finish)
                                            ? '-'
                                            : dayjs(
                                                  data.report?.date_finish
                                              ).format('DD-MM-YYYY HH:mm:ss')}
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="table-auto my-16 w-full border-collapse border border-slate-400">
                        <tbody>
                            <tr>
                                <td
                                    className="border border-slate-300 w-6/12"
                                    colSpan="3"
                                >
                                    <Typography
                                        className="font-medium ml-5"
                                        align="center"
                                    >
                                        Konfirmasi apabila breakdown lebih dari
                                        4 jam
                                    </Typography>
                                </td>
                                <td
                                    className="border border-slate-300 w-6/12"
                                    colSpan="2"
                                >
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        Konfirmasi setelelah pekerjaan selesai
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className="relative w-3/12 border border-slate-300 h-96"
                                    rowSpan="3"
                                >
                                    <Typography className="absolute inset-x-0 top-0 font-medium ml-5">
                                        Alasan:
                                    </Typography>
                                </td>
                                <td
                                    className="border w-3/12 border-slate-300"
                                    colSpan="2"
                                >
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        Paraf
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-slate-300">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        Yang Menyerahkan
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-slate-300">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        Yang Menerima
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300 h-96"></td>
                                <td className="border border-slate-300 h-96"></td>
                                <td className="border border-slate-300 h-96">
                                    {data.report?.audit_report == 'Y' && (
                                        <img
                                            className="m-auto"
                                            width="30%"
                                            src={approve}
                                            alt="logo"
                                        />
                                    )}
                                </td>
                                <td className="border border-slate-300 h-96">
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
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium self-end w-full"
                                        align="center"
                                    >
                                        PD
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium self-end w-full"
                                        align="center"
                                    >
                                        PC
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium self-end w-full"
                                        align="center"
                                    >
                                        {_.capitalize(
                                            data.machine?.responsible
                                        )}
                                    </Typography>
                                </td>
                                <td className="border border-slate-300">
                                    <Typography
                                        className="font-medium self-end w-full"
                                        align="center"
                                    >
                                        {_.capitalize(data.sheet?.appe_user)}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className="border border-slate-300"
                                    colSpan="3"
                                >
                                    <Typography className="font-medium ml-5">
                                        Tanggal penyerahan hasil perbaikan :{' '}
                                        {_.isNull(data.report?.date_finish)
                                            ? '-'
                                            : dayjs(
                                                  data.report?.date_finish
                                              ).format('DD-MM-YYYY')}
                                    </Typography>
                                </td>
                                <td
                                    className="border border-slate-300"
                                    colSpan="2"
                                >
                                    <Typography className="font-medium ml-5">
                                        Tanggal input riwayat mesin :{' '}
                                        {_.isNull(data.report?.date_finish)
                                            ? '-'
                                            : dayjs(
                                                  data.report?.date_finish
                                              ).format('DD-MM-YYYY')}
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Typography className="text-sm font-small">
                        *) Coret yang tidak perlu
                    </Typography>

                    <div className="grid grid-cols-12 my-16">
                        <Typography className="col-span-6 text-sm font-small">
                            FO-03-04-01
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

export default ApSheetPrint
