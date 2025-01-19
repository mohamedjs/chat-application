'use client';

import AuthHeader from '@/components/master/layout/AuthHeader'
import React from 'react'
import Logo from '@/asset/img/happy.gif';
import BaseInputOtp from '@/components/master/inputes/base-input-otp';
import BasicButton from '@/components/master/buttons/BasicButton';
import { ArrowRight } from 'lucide-react';


const Verify = () => {
  const handleSubmit = () => {
    console.log('ok');
  }
  return (
    <div className={"flex items-center justify-center min-h-screen bg-background text-foreground"}>
        <div className="w-full max-w-sm text-center">
          {/* Logo */}
          <AuthHeader 
            subtitle='Please enter otp that you revived in your phone'
            logo={Logo} 
          />
          <div className='mb-4'>
            <BaseInputOtp 
              size='lg' 
              variant='error' 
              fullWidth 
              error="otp that you enter it's wrong please fix it"
              id='otp-id'
            />
          </div>
          {/* Next Button */}
          <BasicButton
            fullWidth
            size={'lg'}
            variant="default"
            iconPosition="right"
            onClick={handleSubmit}
            icon={<ArrowRight className="h-4 w-4" />}
          >
            NEXT
          </BasicButton>
        </div>
    </div>
  )
}

export default Verify