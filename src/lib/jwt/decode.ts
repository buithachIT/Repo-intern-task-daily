import { STORAGE_KEY } from '@/config/storageKeys';
import { JwtPayload } from '@/types/jwt';
import jwt from 'jsonwebtoken';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const JWT_SECRET = process.env.JWT_SECRET as string;

export function getUserIdFromToken(token?: string): string | null {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return decoded.id;
    } catch (err) {
        console.error('[JWT] Decode error:', err);
        return null;
    }
}