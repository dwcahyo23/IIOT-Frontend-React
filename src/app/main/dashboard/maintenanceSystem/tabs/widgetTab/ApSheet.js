import { useEffect, useState, useRef } from 'react'
import { Box, Grid, TextField, MenuItem, Button } from '@mui/material'
import dayjs from 'dayjs'
import ReactToPrint from 'react-to-print'

import ApSheetPrint from './print/ApSheetPrint'

function ApSheet({ params }) {
    const componentRef = useRef()

    useEffect(() => {
        // console.log(params)
        // console.log(componentRef)
    })

    useEffect(() => {
        const isMre = _.some(params.requestList, (val) => {
            if (val.mre_request.length > 3) return val
        })
    }, [])

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ReactToPrint
                        trigger={() => (
                            <Button
                                className="px-16 min-w-100"
                                variant="contained"
                                color="secondary"
                            >
                                Print
                            </Button>
                        )}
                        content={() => componentRef.current}
                        pageStyle="@media print { @page { size: landscape; margin: 0mm; } }"
                        // "@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }"
                    />
                    <ApSheetPrint ref={componentRef} params={params} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ApSheet
