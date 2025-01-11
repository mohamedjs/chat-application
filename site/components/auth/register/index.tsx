'use client';
import React, { useState } from 'react';
import BasicInput from '@/components/master/inputes/BasicInput';
import BasicButton from '@/components/master/buttons/BasicButton';
import BasicHeader from '@/components/master/layout/BasicHeader';
import CountrySelect from './CountrySelect';
import Logo from '@/asset/img/logo.png';
import Image from 'next/image';
import { useGetAllCountriesQuery } from '@/store/api/countriesApi';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegisterProps {
  onSubmit?: (data: { country: string; phone: string }) => void;
  className?: string;
}

const Register: React.FC<RegisterProps> = ({ onSubmit, className }) => {
  const { data: countries } = useGetAllCountriesQuery();
  const [formData, setFormData] = useState({
    country: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    country: '',
    phone: '',
  });

  // Get the selected country's dial code
  const getSelectedCountryDialCode = () => {
    if (!countries || !formData.country) return '';
    const country = countries.find(c => c.name.common === formData.country);
    if (!country?.idd.root) return '';
    return `${country.idd.root}${country.idd.suffixes?.[0] || ''}`;
  };

  const handleSubmit = () => {
    // Reset errors
    setErrors({ country: '', phone: '' });

    // Validate
    let hasError = false;
    const newErrors = { ...errors };

    if (!formData.country) {
      newErrors.country = 'Please select a country';
      hasError = true;
    }

    if (!formData.phone) {
      newErrors.phone = 'Please enter your phone number';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <div className={cn(
      "flex items-center justify-center min-h-screen bg-background text-foreground",
      className
    )}>
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-48 h-44 mx-auto">
            <Image src={Logo} className="w-full" alt="Logo" />
          </div>
        </div>

        {/* Header */}
        <BasicHeader
          title="Ratatouille"
          subtitle="Please confirm your country code and enter your phone number."
          titleClassName="text-2xl mb-4 text-foreground"
          subtitleClassName="mb-8 text-muted-foreground"
        />

        {/* Country Select */}
        <div className="mb-4">
          <CountrySelect
            value={formData.country}
            onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
            error={errors.country}
          />
        </div>

        {/* Phone Input */}
        <div className="mb-6">
          <BasicInput
            label="Phone"
            type="text"
            placeholder={getSelectedCountryDialCode()}
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            error={errors.phone}
            size="lg"
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
  );
};

export default Register;
