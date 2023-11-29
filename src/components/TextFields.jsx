import { FormControl, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { errorField } from '../utils';
import ErrorMessage from './ErrorMessage';

const TextFields = ({ label, inputProps, control, name, errors }) => {
  return (
    <FormControl fullWidth sx={{ mb: '1rem' }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            {...errorField(errors[name])}
            variant='filled'
            label={label}
            InputProps={inputProps}
          />
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
};

export default TextFields;
