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
    </div>
  );
}

export default ItemTab;
