export interface PostInterface {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface PostStateInterface {
  data: PostInterface[] | null | undefined;
  status: 'idle' | 'loading' | 'failed';
}

export interface PostPayloadInterface {
  id: number;
}