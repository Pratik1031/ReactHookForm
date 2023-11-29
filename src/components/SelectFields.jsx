import { FormControl, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import { errorField } from '../utils';
import ErrorMessage from './ErrorMessage';

const SelectFields = ({ label, name, control, errors }) => {
  const [listCountry, setListCountry] = useState([]);

  const CountryNames = listCountry.map((item) => item.name.common).sort();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setListCountry(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <FormControl fullWidth sx={{ mb: '1rem' }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            {...errorField(errors[name])}
            required
            variant='filled'
            label={label}
            select
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {CountryNames.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
};

export default SelectFields;
