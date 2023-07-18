import { fetchWithRetry } from './fetchWithRetry';
import type { Coffee } from '../types';

export async function fetchCoffee() {
  const response = await fetchWithRetry('https://random-data-api.com/api/coffee/random_coffee');
  const { notes, ...rest } = await response.json();

  return ({ notes: notes.split(', '), ...rest }) as Coffee;
}
