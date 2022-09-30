import { checkError, client } from './client';

export async function getListItems() {
  const response = await client.from('todos').select('*');
  return response.data;
}

export async function createListItem(description) {
  const response = await client
    .from('todos')
    .insert([{ description }])
    .order('id', { ascending: true })
    .single();
  return checkError(response);
}
