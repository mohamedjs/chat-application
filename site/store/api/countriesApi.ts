import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Country {
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
  cca2: string;
}

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getAllCountries: builder.query<Country[], void>({
      query: () => 'listCountries',
      transformResponse: (response: Country[]) => response.sort((a, b) => a.name.common.localeCompare(b.name.common)),
    }),
  }),
});

export const { useGetAllCountriesQuery } = countriesApi;
