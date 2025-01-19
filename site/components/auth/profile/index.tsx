'use client'
import React from 'react'
import Logo from '@/asset/img/logo.png';
import AuthHeader from '@/components/master/layout/AuthHeader';
import BasicButton from '@/components/master/buttons/BasicButton';
import { ArrowRight } from 'lucide-react';
import BasicInput from '@/components/master/inputes/BasicInput';
import UploadImage from './UploadImage';


const Profile = () => {

  const handleSubmit = () => {
    console.log('ok');
  }

  return (
    <div className={"flex items-center justify-center min-h-screen bg-background text-foreground"}>
        <div className="w-full max-w-sm text-center">
          {/* Logo */}
          <AuthHeader
            subtitle='Complete your profile to continue'
            logo={Logo} 
          />
          <div className='mb-4'>
            <UploadImage />
            <BasicInput
              size='default'
              fullWidth
              error="this field is required"
              name='first_name'
              label='First Name'
            />
            <BasicInput
              size='default'
              fullWidth
              error="this field is required"
              name='last_name'
              label='Last Name'
            />
            <BasicInput
              size='default'
              fullWidth
              error="this field is required"
              name='email'
              label='Email'
              type='email'
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

export default Profile