import { constant } from 'lodash';

interface Options {
  link: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: object;
}

interface ResponseError {
  error_message: string;
}

export default async function QueryRequest<T>(options: Options): Promise<T> {
  return fetch(options.link, {
    method: options.method,
    body: JSON.stringify(options.body),
  }).then(async (res) => {
    const responseData = (await res.json().catch(constant(null))) as T | ResponseError | null;
    if (res.ok) {
      if (!responseData) {
        throw new Error('Не вдалось отримати відповідь сервера');
      }
      return responseData as T;
    }

    throw new Error(`${res.status}: ${(responseData as ResponseError)?.error_message ?? res.statusText}`);
  });
}