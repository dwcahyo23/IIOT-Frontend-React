import { TextField, MenuItem } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

function ItemTab(props) {
    const methods = useFormContext()
    const { control, formState } = methods
    const { errors } = formState

    return (
        <div>
            <Controller
                name="bom"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.bom}
                        helperText={errors?.bom?.message}
                        label="BOM"
                        autoFocus
                        id="bom"
                        variant="filled"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                )}
            />

            <Controller
                name="item_name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.item_name}
                        required
                        helperText={errors?.item_name?.message}
                        label="Item Name"
                        autoFocus
                        id="item_name"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="category"
                control={control}
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
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
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
                        <MenuItem value="SEA">Seal</MenuItem>
                    </TextField>
                )}
            />

            <Controller
                name="item_life_time"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.item_life_time}
                        required
                        helperText={errors?.item_life_time?.message}
                        label="Life Time"
                        id="item_life_time"
                        variant="outlined"
                        type="number"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="item_lead_time"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.item_lead_time}
                        required
                        helperText={errors?.item_lead_time?.message}
                        label="Lied Time"
                        id="item_lead_time"
                        variant="outlined"
                        type="number"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="item_status"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required
                        label="Status"
                        select
                        autoFocus
                        id="item_status"
                        fullWidth
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="1">In good condition</MenuItem>
                        <MenuItem value="2">Awaiting check conditions</MenuItem>
                        <MenuItem value="3">Over-limit lifetime</MenuItem>
                        <MenuItem value="4">Bad condition</MenuItem>
                        <MenuItem value="5">Repairing</MenuItem>
                        <MenuItem value="6">
                            Requires purchase sparepart
                        </MenuItem>
                    </TextField>
                )}
            />

            <Controller
                name="change_at"
                control={control}
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            {...field}
                            className="mt-8 mb-16"
                            id="change_at"
                            fullWidth
                            inputFormat="dd/MM/yyyy HH:mm"
                            required
                            label="On Change"
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                )}
            />
        </div>
    )
}

export default ItemTab
