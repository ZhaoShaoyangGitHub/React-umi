import request from '@/utils/request';

export async function getUserInfo(): Promise<any> {
  return request('/api/currentUser');
}

export async function getUserDetail(): Promise<any> {
  return request('/api/getUserDetail');
}

export async function fakeAccountLogout(): Promise<any> {
  return request('/api/logout');
}
