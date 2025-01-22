'use client';

import AuthHeader from '@/components/master/layout/AuthHeader'
import React from 'react'
import Logo from '@/asset/img/happy.gif';
import BaseInputOtp from '@/components/master/inputes/base-input-otp';
import BasicButton from '@/components/master/buttons/BasicButton';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authVerify, validationVerifySchema } from '@/store/auth/auth.type';
import { AuthService } from '@/store/auth/auth.service';
import { RootState, useAppDispatch } from '@/store/mainReducer';
import { useSelector } from 'react-redux';

const Verify = () => {
  const { loading, message } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const { control, handleSubmit, formState: { errors } } = useForm<authVerify>({
    resolver: yupResolver(validationVerifySchema),
    mode: 'all'
  });

  const onSubmit = (data: authVerify) => {
    dispatch(AuthService.verifyUserCode(data.otp))
  };

  return (
    <div className={"flex items-center justify-center min-h-screen bg-background text-foreground"}>
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <AuthHeader 
          subtitle='Please enter otp that you revived in your phone'
          logo={Logo} 
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <BaseInputOtp 
                  {...field}
                  size='lg' 
                  variant={(errors.otp || message) ? 'error' : 'default'}
                  fullWidth 
                  error={errors.otp?.message || message}
                  success={(field.value && !errors.otp && message == '') ? "Thanks you're add valida otp number" : '' }
                  id='otp-id'
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
  )
}

export default Verify