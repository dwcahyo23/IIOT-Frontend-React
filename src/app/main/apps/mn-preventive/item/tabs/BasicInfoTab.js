/* eslint-disable jsx-a11y/label-has-associated-control */
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
// eslint-disable-next-line unused-imports/no-unused-imports
import WindowedSelect from 'react-windowed-select';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, watch, formState } = methods;
  const machines = watch('machines');
  const { errors } = formState;

  // const options = Array.from(new Array(1000), (_, index) => ({
  //   label: `Item ${index}`,
  //   value: index,
  // }));

  // const getMachines = machines.map((machine) => ({
  //   label: machine.mch_code,
  //   value: machine.uuid,
  // }));

  return (
    <div className="container">
      {/* <section>
        <label>Selecte</label>
        <Controller
          name="machineIndexUuid"
          control={control}
          render={({ field }) => (
            <WindowedSelect {...field} className="mt-8 mb-16" options={getMachines} />
          )}
        />
      </section> */}
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
