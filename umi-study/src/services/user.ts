import request from '@/utils/request';

export async function getUserInfo(): Promise<any> {
  return await request('/api/currentUser');
}
