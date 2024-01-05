import { useEffect, useState, useRef } from 'react'
import { Box, Grid, TextField, MenuItem, Button } from '@mui/material'
import dayjs from 'dayjs'
import ReactToPrint from 'react-to-print'

import DialogMenu1Print from './DialogMenu1Print'

function DialogMenu1({ params }) {
    const componentRef = useRef()

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
                    <DialogMenu1Print ref={componentRef} params={params} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default DialogMenu1
