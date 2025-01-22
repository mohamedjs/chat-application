'use client';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BasicInput from '@/components/master/inputes/BasicInput';
import BasicButton from '@/components/master/buttons/BasicButton';
import CountrySelect from './CountrySelect';
import Logo from '@/asset/img/logo.png';
import { Country, useGetAllCountriesQuery } from '@/store/api/countriesApi';
import { ArrowRight, Loader2 } from 'lucide-react';
import AuthHeader from '@/components/master/layout/AuthHeader';
import { authRegister, validationRegiterSchema } from '@/store/auth/auth.type';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/mainReducer';
import { AuthService } from '@/store/auth/auth.service';


const Register = () => {
  const { data: countries } = useGetAllCountriesQuery();
  const {loading} = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const { control, handleSubmit, watch, formState: { errors } } = useForm<authRegister>({
    resolver: yupResolver(validationRegiterSchema),
    defaultValues: {
      country: '',
      phone: '',
    },
    mode: 'all'
  });

  // Get the selected country's dial code
  const getSelectedCountryDialCode = () => {
    if (!countries || !watch('country')) return '';
    const country = countries.find(c => c.cca2 === watch('country'));
    if (!country?.idd.root) return '';
    return `${country.idd.root}${country.idd.suffixes?.[0] || ''}`;
  };

  const onSubmit = (data: authRegister) => {
    dispatch(AuthService.sendCodeToUser(data.phone))
  };

  useEffect(()=> {
    console.log(errors)
  }, [errors])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <AuthHeader 
          subtitle='Please confirm your country code and enter your phone number.' 
          logo={Logo} 
        />

        {/* Country Select */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountrySelect
                  {...field}
                  error={errors.country?.message}
                  success={watch('country') != '' && !errors.country ? 'Valid selected country data' : ''}
                />
              )}
            />
          </div>

          {/* Phone Input */}
          <div className="mb-6">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <BasicInput
                  {...field}
                  label="Phone"
                  type="phone"
                  placeholder={getSelectedCountryDialCode()}
                  error={errors.phone?.message}
                  success={(field.value != '' && !errors.phone) ? 'Valid phone number' : '' }
                  size="lg"
                  id="phone"
                />
              )}
            />
          </div>

          {/* Next Button */}
          <BasicButton
            fullWidth
            size={'lg'}
            variant="default"
            iconPosition="right"
            icon={!loading ? <ArrowRight className="h-4 w-4" /> : <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            type='submit'
            disabled={loading}
          >
            NEXT
          </BasicButton>
        </form>
      </div>
    </div>
  );
};

export default Register;
