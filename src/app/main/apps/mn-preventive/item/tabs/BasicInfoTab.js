/* eslint-disable jsx-a11y/label-has-associated-control */
import { TextField } from '@mui/material';
import ReactSelect from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  return (
    <div className="container">
      <section>
        <label>Selecte</label>
        <Controller
          name="ReactSelect"
          control={control}
          render={({ field }) => (
            <ReactSelect
              className="mt-8 mb-16"
              {...field}
              options={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
              ]}
            />
          )}
        />
      </section>

      <section>
        <label>Machine Code</label>
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
              autoFocus
              id="mch_code"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </section>

      <section>
        <label>Machine Name</label>
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
              autoFocus
              id="mch_name"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </section>

      <section>
        <label>Machine Location</label>
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
              autoFocus
              id="mch_loc"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </section>
    </div>
  );
}

export default BasicInfoTab;
