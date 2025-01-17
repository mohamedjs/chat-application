import { mockCountriesData } from '@/__mocks__/countriesData';

export async function GET() {
    return new Response(JSON.stringify(mockCountriesData), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
    });
}
