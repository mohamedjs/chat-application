import React from 'react';
import BasicSelect from '@/components/master/inputes/BasicSelect';
import { useGetAllCountriesQuery } from '@/store/api/countriesApi';

interface CountrySelectProps {
  onChange?: (value: string) => void;
  value?: string;
  error?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  onChange,
  value,
  error,
}) => {
  const { data: countries, isLoading, error: apiError } = useGetAllCountriesQuery();

  if (isLoading) {
    return <div className="text-gray-400">Loading countries...</div>;
  }

  if (apiError) {
    return <div className="text-red-500">Error loading countries</div>;
  }

  const countryOptions = countries?.map(country => ({
    value: country.name.common,
    label: country.name.common,
    icon: getFlagEmoji(country.flags.svg),
    additionalInfo: getDialCode(country.idd),
  })) || [];

  return (
    <BasicSelect
      label="Countries"
      name="country"
      options={countryOptions}
      value={value}
      onChange={onChange}
      error={error}
      placeholder="Select a country"
      size="lg"
    />
  );
};

// Helper function to get dial code
const getDialCode = (idd: { root?: string; suffixes?: string[] }) => {
  if (!idd.root || !idd.suffixes?.[0]) return '';
  return `${idd.root}${idd.suffixes[0]}`;
};

// Helper function to convert flag URL to emoji
const getFlagEmoji = (flagUrl: string) => {
  const countryCode = flagUrl.split('/').pop()?.split('.')[0];
  if (!countryCode) return '';
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  
  return String.fromCodePoint(...codePoints);
};

export default CountrySelect;
