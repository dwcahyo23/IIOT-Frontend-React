import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  return (
    <div>
      <Controller
        name="machine_index.mch_code"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.mch_code}
            required
            helperText={errors?.mch_code?.message}
            label="Machine Code"
            autoFocus
            id="mch_code"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="machine_index.mch_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.mch_name}
            required
            helperText={errors?.mch_name?.message}
            label="Machine Name"
            autoFocus
            id="mch_name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="machine_index.mch_loc"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.mch_loc}
            required
            helperText={errors?.mch_loc?.message}
            label="Machine Location"
            autoFocus
            id="mch_loc"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
