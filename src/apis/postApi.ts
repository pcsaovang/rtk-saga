import { httpClient } from 'utils/httpClient';
import { PostInterface } from 'types/postTypes';

export const POST_ENDPOINT = '/posts';

export async function fetchPostsApi(): Promise<PostInterface[]> {
  const res = await httpClient.get(POST_ENDPOINT);
  return res.data;
}

export async function fetchPostApi(id: number): Promise<PostInterface> {
  const res = await httpClient.get(`${POST_ENDPOINT}/${id}`);
  return res.data;
}
