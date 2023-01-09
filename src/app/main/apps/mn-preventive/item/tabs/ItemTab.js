import TextField from '@mui/material/TextField';
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
            autoFocus
            id="category"
            variant="outlined"
            fullWidth
          />
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
