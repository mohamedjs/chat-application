import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
}

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1/' }),
  endpoints: (builder) => ({
    getAllCountries: builder.query<Country[], void>({
      query: () => 'all',
      transformResponse: (response: Country[]) =>
        response.sort((a, b) => a.name.common.localeCompare(b.name.common)),
    }),
  }),
});

export const { useGetAllCountriesQuery } = countriesApi;
