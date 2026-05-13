import crypto from 'node:crypto';
import type { ApiRequest } from './http';

const COOKIE_NAME = 'marul_studio_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

function getSessionSecret() {
  const secret = process.env.STUDIO_SESSION_SECRET;

  if (!secret) {
    throw new Error('STUDIO_SESSION_SECRET is not configured');
  }

  return secret;
}

function sign(value: string) {
  return crypto.createHmac('sha256', getSessionSecret()).update(value).digest('hex');
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function createSessionCookie() {
  const issuedAt = Date.now().toString();
  const payload = Buffer.from(issuedAt).toString('base64url');
  const signature = sign(payload);
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';

  return `${COOKIE_NAME}=${payload}.${signature}; HttpOnly; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function clearSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

export function isAuthenticated(request: ApiRequest) {
  const cookies = request.headers.cookie ?? '';
  const rawCookie = cookies
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));

  if (!rawCookie) {
    return false;
  }

  const token = rawCookie.slice(COOKIE_NAME.length + 1);
  const [payload, signature] = token.split('.');

  if (!payload || !signature || !safeCompare(sign(payload), signature)) {
    return false;
  }

  const issuedAt = Number(Buffer.from(payload, 'base64url').toString('utf8'));
  if (!Number.isFinite(issuedAt)) {
    return false;
  }

  return Date.now() - issuedAt < SESSION_MAX_AGE_SECONDS * 1000;
}

export function verifyStudioPassword(password: string) {
  const expectedPassword = process.env.STUDIO_PASSWORD;

  if (!expectedPassword) {
    throw new Error('STUDIO_PASSWORD is not configured');
  }

  return safeCompare(password, expectedPassword);
}
