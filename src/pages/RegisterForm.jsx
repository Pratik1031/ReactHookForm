import React from 'react';
import { Box, Avatar, Typography, InputAdornment, Button } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TextFields from '../components/TextFields';
import SelectFields from '../components/SelectFields';
import CheckboxFields from '../components/CheckboxFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { pawdRegExp, phoneRegExp } from '../utils';

const Schema = yup.object({
  fullName: yup.string().required('Full Name is Required '),
  email: yup.string().required('Email is required').email(),
  mobile: yup
    .string()
    .required('Mobile Phone is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  country: yup.string().required('Country is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      pawdRegExp,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  cofirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match'),
  privacy: yup.bool().oneOf([true], 'Field must be checked'),
});

const RegisterForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      country: '',
      mobile: '',
      password: '',
      cofirmPassword: '',
      privacy: false,
    },
    resolver: yupResolver(Schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '3rem',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <HowToRegIcon />
      </Avatar>
      <Typography component='h1'>Sign Up</Typography>

      <Box
        noValidate
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%', mt: '2rem' }}
      >
        <TextFields
          label='Full Name'
          control={control}
          name='fullName'
          errors={errors}
        />
        <TextFields
          label='Email'
          control={control}
          name='email'
          errors={errors}
        />
        <TextFields
          control={control}
          name='mobile'
          label='Mobile'
          errors={errors}
          inputProps={{
            startAdornment: (
              <InputAdornment position='start'>+91</InputAdornment>
            ),
            type: 'number',
          }}
        />
        <SelectFields
          control={control}
          name='country'
          label='Country'
          errors={errors}
        />
        <TextFields
          control={control}
          name='password'
          label='Password '
          errors={errors}
        />
        <TextFields
          control={control}
          name='cofirmPassword'
          label='Confirm Password'
          errors={errors}
        />
        <CheckboxFields control={control} name='privacy' errors={errors} />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          SignUp
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
