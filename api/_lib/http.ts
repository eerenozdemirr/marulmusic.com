import type { IncomingMessage, ServerResponse } from 'node:http';

export type ApiRequest = IncomingMessage & {
  body?: unknown;
};

export type JsonResponse = ServerResponse & {
  status: (code: number) => JsonResponse;
  json: (body: unknown) => void;
};

export function readRequestBody(request: ApiRequest): Promise<Record<string, unknown>> {
  if (request.body && typeof request.body === 'object') {
    return Promise.resolve(request.body as Record<string, unknown>);
  }

  return new Promise((resolve, reject) => {
    let rawBody = '';

    request.on('data', (chunk) => {
      rawBody += chunk;
    });

    request.on('end', () => {
      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch (error) {
        reject(error);
      }
    });

    request.on('error', reject);
  });
}

export function methodNotAllowed(response: JsonResponse) {
  response.status(405).json({ error: 'Method not allowed' });
}
