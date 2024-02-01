import DownloadIcon from '@mui/icons-material/Download'
import { Workbook } from 'exceljs'
import { Button } from '@mui/material'
import { saveAs } from 'file-saver-es'
import { useDispatch } from 'react-redux'
import { showMessage } from 'app/store/fuse/messageSlice'
import _ from 'lodash'

function DonwloadExcelWorkOrder({ params }) {
    const dispatch = useDispatch()

    function handleExportExcell() {
        const workbook = new Workbook()
        const worksheet = workbook.addWorksheet('Main sheet')
        try {
            worksheet.columns = [
                { header: 'YMD', key: 'ymd', width: 32 },
                { header: 'CHK_YMD', key: 'chk_date', width: 32 },
                { header: 'CHK_MARK', key: 'chk_mark', width: 20 },
                { header: 'AP_SHEET', key: 'sheet_no', width: 20 },
                { header: 'COM', key: 'com_no', width: 20 },
                { header: 'MCH', key: 'mch_no', width: 20 },
                { header: 'DEP_NO', key: 'dep_no', width: 20 },
                { header: 'MEMO', key: 'memo', width: 40 },
                { header: 'S_MEMO', key: 's_memo', width: 40 },

                { header: 'CHK_REPORT', key: 'audit_report', width: 20 },
                { header: 'ANALYZED', key: 'analyzed', width: 40 },
                { header: 'CHRONOLOGICAL', key: 'chronological', width: 40 },
                { header: 'CORRECTIVE', key: 'corrective', width: 40 },
                { header: 'PREVENTION', key: 'prevention', width: 40 },
                { header: 'KIND', key: 'kind', width: 40 },
                { header: 'LEADER', key: 'user_rep1', width: 32 },
                { header: 'TECHNICAN', key: 'user_rep2', width: 32 },
            ]

            _.forEach(params, (val, index) => {
                let newData = { ...val }
                newData.audit_report = val?.report_index?.audit_report
                newData.analyzed = val?.report_index?.analyzed
                newData.chronological = val?.report_index?.chronological
                newData.corrective = val?.report_index?.corrective
                newData.prevention = val?.report_index?.prevention
                newData.kind = val?.report_index?.kind
                newData.user_rep1 = val?.report_index?.user_rep1
                newData.user_rep2 = val?.report_index?.user_rep2

                worksheet.addRow(newData)
            })

            worksheet.columns.forEach((column, columNumber) => {
                console.log(column)
                worksheet.getColumn(column.letter).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                }

                worksheet.getCell(`${column.letter}1`).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '96C8FB' },
                    bgColor: { argb: '96C8FB' },
                }
            })

            worksheet.eachRow((row, rowNumber) => {
                _.forEach(row.model.cells, (val) => {
                    if (val.value != undefined && val.value.length > 38) {
                        // worksheet.getRow(rowNumber).height = 60
                        worksheet.getCell(val.address).alignment = {
                            wrapText: true,
                        }
                    }
                })
            })

            workbook.xlsx.writeBuffer().then((buffer) => {
                saveAs(
                    new Blob([buffer], {
                        type: 'application/octet-stream',
                    }),
                    'DataGrid.xlsx'
                )
            })
        } catch (error) {
            dispatch(
                showMessage({
                    message: error.message,
                    variant: 'error',
                })
            )
        }
    }
    return (
        <Button
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleExportExcell}
        >
            Excell
        </Button>
    )
}

export default DonwloadExcelWorkOrder
