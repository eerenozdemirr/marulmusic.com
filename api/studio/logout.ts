import { clearSessionCookie } from '../_lib/session';
import { methodNotAllowed, type ApiRequest, type JsonResponse } from '../_lib/http';

export default function handler(request: ApiRequest, response: JsonResponse) {
  if (request.method !== 'POST') {
    methodNotAllowed(response);
    return;
  }

  response.setHeader('Set-Cookie', clearSessionCookie());
  response.status(200).json({ ok: true });
}
