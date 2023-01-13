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
  // const images = watch('images');
  // console.log(JSON.parse(images));

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

      <Controller
        name="machineIndexUuid"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            autoFocus
            label="Machine UUID"
            id="machineIndexUuid"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="machine_index.mch_code"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            autoFocus
            label="Machine Code"
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
            autoFocus
            label="Machine Name"
            id="mch_name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="machine_index.mch_com"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            autoFocus
            label="Plant Name"
            id="mch_com"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
