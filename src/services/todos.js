import { checkError, client } from './client';

export async function getListItems() {
  const response = await client.from().select();
  return checkError(response);
}
