import { TextField, MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

function ItemTab(props) {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <div>
      <Controller
        name="bom"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="BOM"
            autoFocus
            id="bom"
            variant="outlined"
            fullWidth
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
            required
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
            <MenuItem value="6">Requires purchase sparepart</MenuItem>
          </TextField>
        )}
      />
    </div>
  );
}

export default ItemTab;
