import { ErrorResponse, RegisterRequest } from '../types';

const BASE_API =
  location.hostname === 'localhost'
    ? 'http://localhost:5001/quearh-69/asia-southeast2/register'
    : 'https://asia-southeast2-quearh-69.cloudfunctions.net/register';

async function register(request: RegisterRequest) {
  const response = await fetch(BASE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...request }),
  });
  if (!response.ok) {
    const { message } = (await response.json()) as ErrorResponse;

    throw new Error(message);
  }
}

export { register };
