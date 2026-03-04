import { NextRequest, NextResponse } from 'next/server';

// routes publiques : création de compte et authentification
const PUBLIC_ROUTES = ['/login', '/register'];

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp < Date.now() / 1000;
    } catch {
        return true;
    }
}

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    const token = req.cookies.get('jwt_token')?.value;

    if (!token || isTokenExpired(token)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};