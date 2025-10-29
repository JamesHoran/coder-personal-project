import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // You can add additional logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes that don't require authentication
        const publicRoutes = ["/", "/auth/login", "/auth/signup", "/auth/forgot-password"];

        // Check if the current path is a public route
        if (publicRoutes.some(route => pathname.startsWith(route))) {
          return true;
        }

        // For all other routes, require authentication
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

// Specify which routes should use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
