import { useEffect, useState, useRef } from 'react'
import { Box, Grid, TextField, MenuItem, Button } from '@mui/material'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import ReactToPrint from 'react-to-print'

import ApSheetPrint from './print/ApSheetPrint'

function ApSheet({ params }) {
    const methods = useFormContext()
    const { control, formState } = methods
    const { errors } = formState
    const componentRef = useRef()

    useEffect(() => {
        console.log(params)
        console.log(componentRef)
    })

    useEffect(() => {
        const isMre = _.some(params.requestList, (val) => {
            if (val.mre_request.length > 3) return val
        })
        console.log(isMre)
    }, [])

    return (
        <Box>
            {/* <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Controller
                        name="sheet.sheet_no"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Sheet no"
                                id="sheet_no"
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="sheet.s_memo"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Problem"
                                id="s_memo"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={6}
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        name="sheet.memo"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Remarks"
                                id="memo"
                                variant="outlined"
                                fullWidth
                                disabled
                                multiline
                                rows={6}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="sheet.s_ymd"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                value={dayjs(field.value).format(
                                    'DD/MM/YYYY HH:mm'
                                )}
                                label="Stoptime"
                                id="s_ymd"
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="sheet.ymd"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Date"
                                id="ymd"
                                value={dayjs(field.value).format(
                                    'DD/MM/YYYY HH:mm'
                                )}
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="sheet.modi_user"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="User"
                                id="modi_user"
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="sheet.chk_mark"
                        defaultValue="N"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Audit"
                                select
                                autoFocus
                                id="chk_mark"
                                fullWidth
                                disabled
                            >
                                <MenuItem value="Y">Audit</MenuItem>
                                <MenuItem value="N">n.audit</MenuItem>
                                <MenuItem value="C">Cancel</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="sheet.pri_no"
                        defaultValue="N"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Prino"
                                select
                                autoFocus
                                id="pri_no"
                                fullWidth
                                disabled
                            >
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
                                <MenuItem value="07">Project Workshop</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
            </Grid> */}
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
                    />
                    <ApSheetPrint ref={componentRef} params={params} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ApSheet
