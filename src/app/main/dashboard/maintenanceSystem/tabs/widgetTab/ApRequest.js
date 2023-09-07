import { useState, useEffect } from 'react'
import FuseUtils from '@fuse/utils/FuseUtils'
import {
    Box,
    Grid,
    TextField,
    MenuItem,
    Typography,
    Checkbox,
    Button,
    FormControlLabel,
} from '@mui/material'
import {
    Controller,
    useFormContext,
    useFieldArray,
    useWatch,
} from 'react-hook-form'
import dayjs from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useDispatch, useSelector } from 'react-redux'
import VirtualizedData from 'src/app/main/apps/maintenanceSystem/machineTab/utils/VirtualizedData'

import { showMessage } from 'app/store/fuse/messageSlice'
import { selectStock } from 'src/app/main/apps/maintenanceSystem/store/machineChildren/machineStock'
import { getMnReqSlice } from '../../store/mnReqSlice'
import { selectUser } from 'app/store/userSlice'
import { saveMnOneRequest } from '../../store/mnOneSlice'
import _ from 'lodash'
import { Watch } from '@mui/icons-material'

function ApRequest() {
    const methods = useFormContext()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const stock = useSelector(selectStock)
    const { control, formState, getValues, setValue, unregister } = methods
    const [hidSparepart, setHidSparepart] = useState(false)
    const [hidRole, setHidRole] = useState(false)
    const [withMonitor, setWithMonitor] = useState(false)

    const uuid = FuseUtils.generateGUID()

    const { fields: requestList } = useFieldArray({
        name: 'requestList',
        control,
    })

    const { isDirty, isValid } = formState

    const { fields: sparepartList } = useFieldArray({
        name: 'sparepartList',
        control,
    })
    const sheet = getValues('sheet')
    const request = getValues('request')

    useEffect(() => {}, [requestList, sheet])

    const watchAll = useWatch({ control, name: 'request' })
    const { item_stock, audit_request, mre_request, item_ready, with_monitor } =
        watchAll

    useEffect(() => {
        item_stock == '#0 ADD NEW ITEM'
            ? setHidSparepart(false)
            : setHidSparepart(true)
    }, [item_stock])

    useEffect(() => {
        setWithMonitor(with_monitor)
        // console.log(with_monitor)
    }, [with_monitor])

    useEffect(() => {
        mre_request && mre_request.length > 3
            ? setValue(
                  'request.date_mre_request',
                  dayjs().format('YYYY-MM-DD HH:mm:ss')
              )
            : setValue('request.date_mre_request', null)
    }, [mre_request])

    useEffect(() => {
        item_ready == 'Y'
            ? setValue(
                  'request.date_ready_request',
                  dayjs().format('YYYY-MM-DD HH:mm:ss')
              )
            : setValue('request.date_ready_request', null)
    }, [item_ready])

    useEffect(() => {
        if (audit_request == 'Y') {
            setValue('request.user_req2', user.data.displayName)
            setValue(
                'request.date_audit_request',
                dayjs().format('YYYY-MM-DD HH:mm:ss')
            )
        } else {
            setValue('request.user_req2', '')
            setValue('request.date_audit_request', null)
        }
    }, [audit_request])

    useEffect(() => {
        const userRole = user.data.userRole
        userRole != 'Inventory Maintenance'
            ? setHidRole(true)
            : setHidRole(false)
    }, [user])

    function handleSaveRequest() {
        // console.log(getValues('request'))
        // console.log(getValues('sparepart'))
        // console.log(getValues())

        dispatch(
            saveMnOneRequest({
                row: { uuid_request: uuid, ...getValues('request') },
                options: 'save',
                user: user.data.datumUuid,
            })
        ).then((action) => {
            if (!action.error) {
                dispatch(
                    showMessage({
                        message: 'Data saved successfully',
                        variant: 'success',
                    })
                )

                if (withMonitor) {
                    dispatch(
                        saveMnOneRequest({
                            row: { ...getValues(), uuid_request: uuid },
                            options: 'lifeTime',
                            user: user.data.datumUuid,
                        })
                    )
                }
            } else {
                const errors = action.error.message
                dispatch(
                    showMessage({
                        message: errors,
                        variant: 'error',
                    })
                )
            }
        })
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Controller
                        name="request.sheet_no"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                required
                                label="Ap-Sheet"
                                autoFocus
                                id="Ap-Sheet"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="request.category_request"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                required
                                label="Category"
                                autoFocus
                                id="Category"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="request.date_request"
                        control={control}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    {...field}
                                    ampm={false}
                                    className="mt-8 mb-16"
                                    id="Target"
                                    label="Target"
                                    value={dayjs(field.value)}
                                    sx={{
                                        width: '100%',
                                    }}
                                    slotProps={{
                                        popper: {
                                            disablePortal: true,
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="request.mch_code"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                required
                                label="Machine code"
                                autoFocus
                                id="Machine code"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="request.mch_com"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                required
                                label="Machine com"
                                autoFocus
                                id="Machine com"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="request.item_stock"
                        control={control}
                        render={({ field }) => (
                            <VirtualizedData field={field} data={stock} />
                        )}
                    />
                </Grid>
                {!hidSparepart && (
                    <Grid item xs={12}>
                        <Controller
                            name="request.new_sparepart"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    required
                                    label="New Sparepart"
                                    autoFocus
                                    id="new_sparepart"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                )}
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Controller
                        name="request.item_name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                required
                                label="Remarks"
                                autoFocus
                                id="Remarks"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={3}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="request.item_qty"
                        defaultValue={1}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                required
                                label="Qty"
                                autoFocus
                                id="Qty"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="request.item_uom"
                        defaultValue="PCS"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                required
                                label="Uom"
                                autoFocus
                                id="Uom"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="request.user_req1"
                        defaultValue={user.data.displayName}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                required
                                label="User"
                                autoFocus
                                id="User"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {/* <Grid item xs={2}>
                    <Controller
                        name="request.date_audit_request"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Date Audit"
                                id="Date Audit"
                                variant="outlined"
                                value={
                                    _.isNull(field.value) == false
                                        ? dayjs(field.value).format(
                                              'YYYY-MM-DD HH:mm:ss'
                                          )
                                        : ''
                                }
                                fullWidth
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="request.date_mre_request"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Date MRE"
                                id="Date MRE"
                                value={
                                    _.isNull(field.value) == false
                                        ? dayjs(field.value).format(
                                              'YYYY-MM-DD HH:mm:ss'
                                          )
                                        : ''
                                }
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="request.date_ready_request"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Date Ready"
                                id="Date Ready"
                                value={
                                    _.isNull(field.value) == false
                                        ? dayjs(field.value).format(
                                              'YYYY-MM-DD HH:mm:ss'
                                          )
                                        : ''
                                }
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        )}
                    />
                </Grid> */}
                <Grid item xs={2}>
                    <Controller
                        name="request.with_monitor"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...field}
                                        checked={field.value}
                                    />
                                }
                                label="Life time ?"
                            />
                        )}
                    />
                </Grid>
            </Grid>
            {withMonitor && (
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Controller
                            name="sparepart.item_life_time"
                            control={control}
                            defaultValue="8760"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    required
                                    label="Life Time"
                                    id="item_life_time"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Controller
                            name="sparepart.item_lead_time"
                            control={control}
                            defaultValue="4380"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    required
                                    label="Lead Time"
                                    id="item_lead_time"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <Controller
                            name="sparepart.category"
                            control={control}
                            defaultValue="BLT"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    required
                                    label="Category"
                                    select
                                    autoFocus
                                    id="category"
                                    fullWidth
                                >
                                    <MenuItem value="BLT">Belt</MenuItem>
                                    <MenuItem value="BRG">Bearing</MenuItem>
                                    <MenuItem value="SRV">Servo</MenuItem>
                                    <MenuItem value="CTR">Contactor</MenuItem>
                                    <MenuItem value="INV">Inverter</MenuItem>
                                    <MenuItem value="SNR">Sensor</MenuItem>
                                    <MenuItem value="HYD">Hydraulic</MenuItem>
                                    <MenuItem value="PNU">Pneumatic</MenuItem>
                                    <MenuItem value="SOL">Solenoid</MenuItem>
                                    <MenuItem value="REG">Regulator</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>
                </Grid>
            )}
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Controller
                        name="request.audit_request"
                        defaultValue="N"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-8 mb-16"
                                label="Audit"
                                select
                                autoFocus
                                id="Audit"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            >
                                <MenuItem id="Audit" value="Y">
                                    Audit
                                </MenuItem>
                                <MenuItem id="Audit" value="C">
                                    Cancel
                                </MenuItem>
                                <MenuItem id="Audit" value="N">
                                    n.audit
                                </MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>

                {!hidRole && (
                    <Grid item xs={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Controller
                                    name="request.mre_request"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="MRE"
                                            autoFocus
                                            id="MRE"
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="request.item_ready"
                                    defaultValue="N"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            label="Item Ready"
                                            select
                                            autoFocus
                                            id="Item Ready"
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        >
                                            <MenuItem value="Y">Ready</MenuItem>
                                            <MenuItem value="N">
                                                Not Yet
                                            </MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="request.user_req2"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mt-8 mb-16"
                                            required
                                            label="Auditor"
                                            autoFocus
                                            id="Auditor"
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                )}

                <Grid item xs={4}>
                    <Button
                        className="whitespace-nowrap mb-16 mt-16"
                        variant="contained"
                        color="secondary"
                        disabled={!isDirty && !isValid}
                        onClick={handleSaveRequest}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ApRequest
