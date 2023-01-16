/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { TextField, Autocomplete } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import _ from 'lodash';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, watch, formState } = methods;
  const machines = watch('machines');
  const isNew = watch('isNew');
  const { errors } = formState;

  const getMachines = machines.map((machine) => ({
    label: machine.mch_code,
    value: machine.uuid,
  }));

  return (
    <div className="container">
      {/* <Controller
        name="machineIndexUuid"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            sx={{ width: 300 }}
            label="Category"
            select
            autoFocus
            id="category"
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getMachines.map((mch) => (
              <MenuItem key={mch.value} value={mch.value}>
                {mch.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      /> */}

      {/* <Controller
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
      /> */}

      <Controller
        name="machineIndexUuid"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            freeSolo
            options={getMachines}
            onChange={(_, data) => field.onChange(data)}
            getOptionLabel={(option) =>
              option.label || _.find(getMachines, { value: field.value }).label
            }
            value={field.value || null}
            isOptionEqualToValue={(option, value) => option.value === field.value}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="mt-8 mb-16"
                variant="outlined"
                fullWidth
                autoFocus
                label="MachineIndexUUID"
              />
            )}
          />
        )}
      />
      {!isNew && (
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
              variant="filled"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
      )}

      {!isNew && (
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
              variant="filled"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
      )}

      {!isNew && (
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
              variant="filled"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
      )}
    </div>
  );
}

export default BasicInfoTab;
