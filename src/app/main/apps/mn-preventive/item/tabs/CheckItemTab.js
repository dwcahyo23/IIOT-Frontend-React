import { TextField, MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function CheckItemTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
      <Controller
        name="check"
        control={control}
        render={({ field: { onChange } }) => (
          <TextField
            className="mt-8 mb-16"
            required
            label="Values"
            select
            autoFocus
            onChange={onChange}
            defaultValue="1"
            fullWidth
          >
            <MenuItem value="1">In good condition</MenuItem>
            <MenuItem value="2">In supervision condition</MenuItem>
            <MenuItem value="3">Bad condition</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="check_date"
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              {...field}
              className="mt-8 mb-16"
              id="change_at"
              fullWidth
              inputFormat="dd/MM/yyyy HH:mm aaa"
              required
              label="On Change"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        )}
      />
    </div>
  );
}

export default CheckItemTab;
