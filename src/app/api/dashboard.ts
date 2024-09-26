import { deleteItem, getItem, postItem, putItem } from './index'

export async function getDataGerbangs() {
  const response = await getItem('api/gerbangs', true );
  return response
}

export async function createDataGerbangs(payload: any) {
  const response = await postItem('api/gerbangs', true, payload );
  return response
}

export async function updateDataGerbangs(payload: any) {
  const response = await putItem('api/gerbangs', true, payload );
  return response
}

export async function deleteDataGerbangs(payload: any) {
  const response = await deleteItem('api/gerbangs', true, payload);
  return response
}

export async function getDataLalin(date: string) {
  const response = await getItem(`api/lalins?tanggal=${date}`, true );
  return response
}