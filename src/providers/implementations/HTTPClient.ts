import axios from 'axios';

type Options = {
    method: string,
    url: string,
    data?: string,
    headers: any
}

export async function makeHTTPRequest(url: string, method: string, body?: any) {
  try {
    const options: Options = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.data = body;
    }

    const response = await axios(options);

    return response;
  } catch (error) {
    console.error(error?.message);
    return error;
  }
}
