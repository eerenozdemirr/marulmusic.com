import { createSessionCookie, verifyStudioPassword } from '../_lib/session';
import { methodNotAllowed, readRequestBody, type ApiRequest, type JsonResponse } from '../_lib/http';

export default async function handler(request: ApiRequest, response: JsonResponse) {
  if (request.method !== 'POST') {
    methodNotAllowed(response);
    return;
  }

  try {
    const body = await readRequestBody(request);
    const password = typeof body.password === 'string' ? body.password : '';

    if (!verifyStudioPassword(password)) {
      response.status(401).json({ error: 'Geçersiz şifre' });
      return;
    }

    response.setHeader('Set-Cookie', createSessionCookie());
    response.status(200).json({ ok: true });
  } catch {
    response.status(500).json({ error: 'Studio girişi yapılamadı' });
  }
}
