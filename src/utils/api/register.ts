import { ErrorResponse, RegisterRequest } from '../types';

const BASE_API = 'http://localhost:5001/quearh-69/asia-southeast2/register';

async function register(request: RegisterRequest) {
    const response = await fetch(BASE_API, {
        method: 'POST',
        // mode: 'no-cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ ...request }), // body data type must match "Content-Type" header
    });
    if (!response.ok) {
        const { message } = (await response.json()) as ErrorResponse;

        throw new Error(message);
    }
}

export { register };
