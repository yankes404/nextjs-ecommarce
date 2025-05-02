import NextAuth from "next-auth";

import { API_ROUTE_PREFIX, AUTH_ROUTES, PROTECTED_ROUTES, DEFAULT_LOGIN_REDIRECT } from "@/routes";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async(req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth && req.auth.user;

    const isApiRoute = nextUrl.pathname.startsWith(API_ROUTE_PREFIX);
    const isAuthRoute = AUTH_ROUTES.some((route) => nextUrl.pathname.startsWith(route));
    const isProtectedRoute = PROTECTED_ROUTES.some((route) => nextUrl.pathname.startsWith(route));

    if (isApiRoute) return;
    
    if (isAuthRoute && isLoggedIn) {
        const callbackUrl = nextUrl.searchParams.get("callback_url");
        return Response.redirect(new URL(callbackUrl ?? DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (isProtectedRoute && !isLoggedIn) {
        return Response.redirect(new URL("/sign-in", nextUrl));
    }
});

export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
}