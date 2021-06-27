export interface CountdownInterface {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownState {
  counter: number;
  countdown: CountdownInterface;
  status: 'idle' | 'loading' | 'failed';
}

export type Sequence<T> = [T, T, T, ...T[]];