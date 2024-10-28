// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const access_token = localStorage.getItem("access_token");
//   const path = request.nextUrl.pathname;
//   const referer = request.headers.get("referer");

//   //   if (access_token !== "" && path.startsWith("/")) {

//   //   }

//   // Protect /app/settings route
//   // if (!token?.value && path.startsWith('/app/settings')) {
//   //   return NextResponse.redirect(new URL('/auth/login', request.url));
//   // }

//   // Protect /auth/login if the user is already authenticated
//   // if (token?.value && path.startsWith('/auth/login')) {
//   //   return NextResponse.redirect(new URL('/app', request.url));
//   // }

//   // Protect /auth/signup if the user is already authenticated
//   if (token?.value && path.startsWith("/auth/signup")) {
//     return NextResponse.redirect(new URL("/app", request.url));
//   }

//   // Protect /auth/create-profile page
//   // if (path === '/auth/create-profile') {
//   //   if (
//   //     referer?.includes('/auth/success') ||
//   //     referer?.includes('/auth/login')
//   //   ) {
//   //     return NextResponse.next();
//   //   } else {
//   //     return NextResponse.redirect(new URL('/app', request.url));
//   //   }
//   // }

//   // Protect /auth/signup/verify-otp route
//   if (path === "/auth/signup/verify-otp") {
//     if (
//       referer &&
//       (referer.includes("/auth/signup") || referer.includes("/auth/login"))
//     ) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/auth/signup", request.url));
//     }
//   }

//   // Protect /auth/success route
//   if (path === "/auth/success") {
//     if (referer?.includes("/auth/signup/verify-otp")) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/app", request.url));
//     }
//   }

//   // Protect /auth/reset-password/change route
//   if (path === "/auth/reset-password/change") {
//     if (referer?.includes("/auth/reset-password/verify-otp")) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/app", request.url));
//     }
//   }

//   // Protect /auth/password-updated route
//   if (path === "/auth/password-updated") {
//     if (referer?.includes("/auth/reset-password/change")) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/app", request.url));
//     }
//   }

//   // Protect /auth/reset-password/verify-otp route
//   if (path === "/auth/reset-password/verify-otp") {
//     if (referer?.includes("/auth/reset-password")) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/app", request.url));
//     }
//   }

//   // If no refreshToken and trying to access protected routes, redirect to login
//   // if (!refreshToken?.value && !path.startsWith('/auth') && path != '/') {
//   //   return NextResponse.redirect(new URL('/auth/login', request.url));
//   // }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/app/:path*", "/auth/:path*"],
// };
