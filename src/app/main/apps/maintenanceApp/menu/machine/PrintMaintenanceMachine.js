import { useEffect, useState, forwardRef } from 'react'
import { useDeepCompareEffect } from '@fuse/hooks'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import logo from '../../components/logo.png'
import approve from '../../components/approve.png'

import dayjs from 'dayjs'
import _ from 'lodash'

const PrintMaintenanceMachine = forwardRef((props, ref) => {
    const data = props.params
    // console.log(_.isArray(data) && data[0]?.mch_process)
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
                            {_.isArray(data) &&
                            (data[0]?.mch_process == 'ASRS' ||
                                data[0]?.mch_process == 'GENERATOR' ||
                                data[0]?.mch_process == 'HOIST' ||
                                data[0]?.mch_process == 'KOMPRESOR') ? (
                                <Typography className="col-span-6 text-xl font-medium">
                                    DAFTAR INFRASTRUKTUR
                                </Typography>
                            ) : (
                                <Typography className="col-span-6 text-xl font-medium">
                                    DAFTAR MESIN
                                </Typography>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-4 my-16">
                        <Typography className="col-span-6 text-sm font-medium">
                            Lokasi : {_.isArray(data) && data[0]?.mch_process}
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
                                        NO
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-black">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        KODE MESIN
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-black">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        NAMA MESIN
                                    </Typography>
                                </td>
                                <td className="w-2/12 border border-black">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        DAYA
                                    </Typography>
                                </td>
                                <td className="w-3/12 border border-black">
                                    <Typography
                                        className="font-medium"
                                        align="center"
                                    >
                                        KETERANGAN
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
                                            >
                                                {val.mch_name}
                                            </Typography>
                                        </td>
                                        <td className="w-2/12 border border-black">
                                            <Typography
                                                className="font-medium"
                                                align="center"
                                            >
                                                {_.toNumber(val.mch_hp).toFixed(
                                                    1
                                                )}{' '}
                                                HP
                                            </Typography>
                                        </td>
                                        <td className="w-3/12 border border-black">
                                            <Typography
                                                className="font-medium"
                                                align="center"
                                            >
                                                {_.isNull(val.memo)
                                                    ? ''
                                                    : _.capitalize(val.memo)}
                                            </Typography>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <div></div>
                            )}
                        </tbody>
                    </table>

                    <div className="grid grid-cols-12 my-16">
                        {_.isArray(data) &&
                        (data[0]?.mch_process == 'ASRS' ||
                            data[0]?.mch_process == 'GENERATOR' ||
                            data[0]?.mch_process == 'HOIST' ||
                            data[0]?.mch_process == 'KOMPRESOR') ? (
                            <Typography className="col-span-6 text-sm font-small">
                                FO-03-03-08
                            </Typography>
                        ) : (
                            <Typography className="col-span-6 text-sm font-small">
                                FO-03-03-01
                            </Typography>
                        )}

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

export default PrintMaintenanceMachine
