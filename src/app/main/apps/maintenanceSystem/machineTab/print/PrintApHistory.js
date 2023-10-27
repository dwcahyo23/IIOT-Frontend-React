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

const PrintApHistory = forwardRef((props, ref) => {
    const data = props.params
    return (
        // className="hidden print:block"
        <Box ref={ref} className="hidden print:block">
            <div className="inline-block p-16 sm:p-16 text-left print:p-0 w-full overflow-auto">
                <div className="w-xl p-16 mx-16 rounded-2xl shadow print:w-auto print:rounded-none print:shadow-none print:bg-transparent">
                    <div className="grid grid-cols-12 gap-x-4 my-16">
                        <div className="col-span-4">
                            <img className="w-11/12" src={logo} alt="logo" />
                        </div>
                        <div className="col-span-4">
                            <Typography className="col-span-6 text-xl font-medium">
                                RIWAYAT MESIN
                            </Typography>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-4 my-16">
                        <Typography className="col-span-6 text-sm font-medium">
                            NAMA MESIN :{' '}
                            {_.isArray(data) && data[0]?.mch_process}
                        </Typography>
                    </div>
                    <div className="grid grid-cols-3 gap-x-4 my-16">
                        <Typography className="col-span-6 text-sm font-medium">
                            KODE MESIN : {_.isArray(data) && data[0]?.mch_code}
                        </Typography>
                    </div>
                    <div className="grid grid-cols-3 gap-x-4 my-16">
                        <Typography className="col-span-6 text-sm font-medium">
                            LOKASI MESIN : {_.isArray(data) && data[0]?.mch_com}
                        </Typography>
                    </div>

                    <table className="table-auto my-16 w-full border-collapse border border-black">
                        <tbody>
                            <tr>
                                <td className="w-1/12 border border-black">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        TANGGAL
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-black">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        KERUSAKAN
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-black">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        ANALISA
                                    </Typography>
                                </td>
                                <td className="w-2/12 border border-black">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        KRONOLOGI
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-black">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        PERBAIKAN
                                    </Typography>
                                </td>
                            </tr>
                            {_.isArray(data) ? (
                                _.map(data, (val, i) => (
                                    <tr key={i}>
                                        <td className="w-1/12 border border-black">
                                            <Typography
                                                className="font-medium"
                                                align="center"
                                            >
                                                {i + 1}
                                            </Typography>
                                        </td>
                                        <td className="w-3/12 border border-black">
                                            <Typography
                                                className="font-medium"
                                                align="center"
                                            >
                                                {val.mch_code}
                                            </Typography>
                                        </td>
                                        <td className="w-3/12 border border-black">
                                            <Typography
                                                className="font-medium"
                                                align="center"
                                            ></Typography>
                                        </td>
                                        <td className="w-2/12 border border-black">
                                            <Typography
                                                className="font-medium"
                                                align="center"
                                            ></Typography>
                                        </td>
                                        <td className="w-3/12 border border-black">
                                            <Typography
                                                className="font-medium"
                                                align="center"
                                            ></Typography>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <div></div>
                            )}
                        </tbody>
                    </table>

                    <div className="grid grid-cols-12 my-16">
                        <Typography className="col-span-6 text-sm font-small">
                            FO-03-04-03
                        </Typography>

                        <Typography
                            className="col-span-6 text-sm font-small"
                            align="right"
                        >
                            REV. 01/02.01.2006
                        </Typography>
                    </div>
                </div>
            </div>
        </Box>
    )
})

export default PrintApHistory
