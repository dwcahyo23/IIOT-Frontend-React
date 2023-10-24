import { useEffect, useState, forwardRef } from 'react'
import { useDeepCompareEffect } from '@fuse/hooks'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import { alpha } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getMnOne, selectMnOne } from '../../store/mnOneSlice'
import dayjs from 'dayjs'

// function PrintManyApSheet() {
const PrintManyApSheet = forwardRef((ref, props) => {
    const dispatch = useDispatch()
    const [noPrint, setNoPrint] = useState(false)
    const routeParams = useParams()
    const [printData, setPrintData] = useState(null)

    useDeepCompareEffect(() => {
        function updateData() {
            const { uuid, sheet_no } = routeParams
            dispatch(
                getMnOne({
                    uuid: uuid,
                    sheet_no: sheet_no,
                    uuid_request: null,
                })
            ).then((action) => {
                setPrintData(action.payload)
                if (!action.payload) {
                    setNoPrint(true)
                }
            })
        }
        updateData()
    }, [dispatch, routeParams])

    if (noPrint) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" varian="h5">
                    There is no such data!
                </Typography>
            </motion.div>
        )
    }

    return (
        <div className="inline-block p-8 sm:p-8 text-left print:p-0 w-full overflow-auto">
            {printData && (
                <motion.div
                    initial={{ opacity: 0, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ bounceDamping: 0 }}
                >
                    <Card className="w-xl p-16 mx-auto rounded-2xl shadow print:w-auto print:rounded-none print:shadow-none print:bg-transparent">
                        <CardContent className="border">
                            <div className="grid grid-cols-12 gap-x-4 my-16">
                                <div className="col-span-4">
                                    <img
                                        className="w-11/12"
                                        src="https://garudametalindo.co.id/images2/logo.png"
                                        alt="logo"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-x-4 mt-16">
                                <Typography className="col-span-6 text-sm font-small">
                                    FO-03-04-01
                                </Typography>

                                <Typography className="col-span-6 text-sm font-small">
                                    REV. 06/01.03.2016
                                </Typography>
                            </div>
                            <div className="grid grid-cols-12 gap-x-4">
                                <Typography className="col-span-6 text-xl font-medium">
                                    NO. W/O : {printData.sheet?.sheet_no}
                                </Typography>

                                <Typography className="col-span-6 text-xl font-medium">
                                    MAINTENANCE WORK ORDER
                                </Typography>
                            </div>

                            <div className="grid grid-cols-12 gap-x-4">
                                <Typography className="col-span-6 font-medium tracking-tight">
                                    Nama Mesin : {printData.machine?.mch_name}
                                </Typography>

                                <Typography className="col-span-6 font-medium ">
                                    Kode Mesin : {printData.machine?.mch_code}
                                </Typography>

                                <Typography className="col-span-6 font-medium tracking-tight">
                                    Lokasi Mesin : {printData.machine?.mch_loc}
                                </Typography>

                                <Typography className="col-span-6 font-medium ">
                                    Hari/Tanggal :{' '}
                                    {dayjs(printData.sheet?.ymd).format(
                                        'dddd, DD-MM-YYYY'
                                    )}
                                </Typography>

                                <Typography className="col-span-6 font-medium tracking-tight">
                                    Pekerjaan diminta oleh :{' '}
                                    {printData.sheet?.appe_user}
                                </Typography>

                                <Typography className="col-span-6 font-medium ">
                                    Stop time mesin :{' '}
                                    {dayjs(printData.sheet?.s_ymd).format(
                                        'DD-MM-YYYY HH:mm:ss'
                                    )}
                                </Typography>

                                <Typography className="col-span-6 font-medium tracking-tight">
                                    Dept./Seksi terkait :{' '}
                                    {printData.sheet?.dep_no}
                                </Typography>

                                <Typography className="col-span-6 font-medium ">
                                    Jam terima WO :{' '}
                                    {dayjs(printData.sheet?.s_ymd).format(
                                        'DD-MM-YYYY HH:mm:ss'
                                    )}
                                </Typography>

                                <Typography className="col-span-6 font-medium tracking-tight">
                                    Tanggal permintaan selesai :
                                    {_.isNull(printData.sheet?.m_ymd)
                                        ? '-'
                                        : dayjs(printData.sheet?.m_ymd).format(
                                              'DD-MM-YYYY HH:mm:ss'
                                          )}
                                </Typography>

                                <Typography className="col-span-3 font-medium ">
                                    Leader : {printData.machine?.responsible}
                                </Typography>

                                <Typography className="col-span-3 font-medium ">
                                    Teknisi :{' '}
                                    {_.isNull(printData.report?.user_rep2)
                                        ? '-'
                                        : printData.report?.user_rep2}
                                </Typography>

                                <Typography className="col-span-6 w-11/12 font-medium tracking-tight">
                                    Kerusakan/ Pengerjaan yang diminta :
                                    {printData.sheet?.memo}
                                </Typography>

                                <Typography className="col-span-3 font-medium ">
                                    Mesin beroperasi : {printData.sheet?.shf_no}
                                </Typography>
                                <Typography className="col-span-3 font-medium ">
                                    Prioritas : {printData.sheet?.pri_no}
                                </Typography>
                            </div>

                            <div className="grid grid-cols-12 gap-x-4 mt-16">
                                <Typography className="col-span-6 text-sm font-small">
                                    FO-03-04-01
                                </Typography>

                                <Typography className="col-span-6 text-sm font-small">
                                    REV. 06/01.03.2016
                                </Typography>
                            </div>

                            <div className="grid grid-cols-12 gap-x-4 mt-6">
                                <div
                                    className="col-span-3 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    KRONOLOGI
                                </div>
                                <div
                                    className="col-span-3 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    ANALISA
                                </div>
                                <div
                                    className="col-span-3 font-bold font-medium text-md="
                                    color="text.secondary"
                                >
                                    PERBAIKAN
                                </div>
                                <div
                                    className="col-span-3 font-bold font-medium text-md="
                                    color="text.secondary"
                                >
                                    PENCEGAHAN
                                </div>

                                <div className="col-span-12 my-8 border-b" />

                                <Typography className="col-span-3 w-11/12 text-md font-medium">
                                    {printData.report?.chronological}
                                </Typography>
                                <Typography className="col-span-3 w-11/12 self-center">
                                    {printData.report?.analyzed}
                                </Typography>
                                <Typography className="col-span-3 w-11/12 self-center">
                                    {printData.report?.corrective}
                                </Typography>
                                <Typography className="col-span-3 w-11/12 self-center">
                                    {printData.report?.prevention}
                                </Typography>
                            </div>

                            <div className="grid grid-cols-12 gap-x-4 mt-32">
                                <div
                                    className="col-span-1 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    NO
                                </div>
                                <div
                                    className="col-span-3 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    SPAREPART
                                </div>

                                <div
                                    className="col-span-2 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    TGL PERMINTAAN
                                </div>

                                <div
                                    className="col-span-2 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    TGL ORDER/MRE
                                </div>

                                <div
                                    className="col-span-2 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    TGL READY
                                </div>

                                <div
                                    className="col-span-2 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    TGL SERAH TERIMA
                                </div>

                                <div className="col-span-12 my-8 border-b" />
                            </div>

                            {_.map(printData.requestList, (val, i) => (
                                <div
                                    className="grid grid-cols-12 gap-x-3 mt-8"
                                    key={i}
                                >
                                    <Typography className="col-span-1 w-11/12 text-md font-medium">
                                        {i + 1}
                                    </Typography>
                                    <Typography className="col-span-3 w-11/12 text-md font-medium">
                                        {val?.item_stock} | {val?.item_qty}{' '}
                                        {val?.item_uom}
                                    </Typography>
                                    <Typography className="col-span-2 w-11/12 text-md font-medium">
                                        {dayjs(val?.createdAt).format(
                                            'DD-MM-YYYY HH:mm:ss'
                                        )}
                                    </Typography>

                                    <Typography className="col-span-2 w-11/12 text-md font-medium">
                                        {_.isNull(val?.date_mre_request)
                                            ? '-'
                                            : dayjs(
                                                  val?.date_mre_request
                                              ).format('DD-MM-YYYY HH:mm:ss')}
                                    </Typography>

                                    <Typography className="col-span-2 w-11/12 text-md font-medium">
                                        {_.isNull(val?.date_ready_request)
                                            ? '-'
                                            : dayjs(
                                                  val?.date_ready_request
                                              ).format('DD-MM-YYYY HH:mm:ss')}
                                    </Typography>

                                    <Typography className="col-span-2 w-11/12 text-md font-medium">
                                        {_.isNull(val?.date_audit_request)
                                            ? '-'
                                            : dayjs(
                                                  val?.date_audit_request
                                              ).format('DD-MM-YYYY HH:mm:ss')}
                                    </Typography>
                                </div>
                            ))}

                            <div className="grid grid-cols-12 gap-x-4 mt-32">
                                <div
                                    className="col-span-3 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    TGL PENGERJAAN
                                </div>
                                <div
                                    className="col-span-3 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    TGL TARGET
                                </div>

                                <div
                                    className="col-span-3 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    TGL PENYELESAIAN
                                </div>

                                <div
                                    className="col-span-3 font-bold font-medium text-md"
                                    color="text.secondary"
                                >
                                    TOTAL TIME
                                </div>

                                <Typography className="col-span-3 w-11/12 text-md font-medium">
                                    {_.isNull(printData.report?.date_report)
                                        ? '-'
                                        : dayjs(
                                              printData.report?.date_report
                                          ).format('DD-MM-YYYY HH:mm:ss')}
                                </Typography>

                                <Typography className="col-span-3 w-11/12 text-md font-medium">
                                    {_.isNull(printData.report?.date_target)
                                        ? '-'
                                        : dayjs(
                                              printData.report?.date_target
                                          ).format('DD-MM-YYYY HH:mm:ss')}
                                </Typography>

                                <Typography className="col-span-3 w-11/12 text-md font-medium">
                                    {_.isNull(printData.report?.date_finish)
                                        ? '-'
                                        : dayjs(
                                              printData.report?.date_finish
                                          ).format('DD-MM-YYYY HH:mm:ss')}
                                </Typography>

                                <Typography className="col-span-3 w-11/12 text-md font-medium">
                                    {_.isNull(printData.report?.date_finish) &&
                                    _.isNull(printData.report?.date_report)
                                        ? '-'
                                        : dayjs(printData.report?.date_finish)
                                              .diff(
                                                  printData.report?.date_report,
                                                  'hour',
                                                  true
                                              )
                                              .toFixed(1)}{' '}
                                    hours
                                </Typography>
                            </div>

                            {/* <div className="mt-64">
                                <Typography className="font-medium">
                                    Please pay within 15 days. Thank you for
                                    your business.
                                </Typography>
                                <div className="flex items-start mt-16">
                                    <img
                                        className="flex-0 w-40 mt-8"
                                        src="assets/images/logo/logo.svg"
                                        alt="logo"
                                    />
                                    <Typography
                                        className="ml-24 text-sm"
                                        color="text.secondary"
                                    >
                                        In condimentum malesuada efficitur.
                                        Mauris volutpat placerat auctor. Ut ac
                                        congue dolor. Quisque scelerisque lacus
                                        sed feugiat fermentum. Cras aliquet
                                        facilisis pellentesque. Nunc hendrerit
                                        quam at leo commodo, a suscipit tellus
                                        dapibus. Etiam at felis volutpat est
                                        mollis lacinia. Mauris placerat sem sit
                                        amet velit mollis, in porttitor ex
                                        finibus. Proin eu nibh id libero
                                        tincidunt lacinia et eget.
                                    </Typography>
                                </div>
                            </div> */}
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
    )
})

export default PrintManyApSheet

/**

 Use the following elements to add breaks to your pages. This will make sure that the section in between
 these elements will be printed on a new page. The following two elements must be used before and after the
 page content that you want to show as a new page. So, you have to wrap your content with them.

 Elements:
 ---------
 <div className="page-break-after"></div>
 <div className="page-break-before"></div>


 Example:
 --------

 Initial page content!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the second page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the third page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>
 * */
