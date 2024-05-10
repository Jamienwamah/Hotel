import { clerkMiddleware } from "@clerk/nextjs/server";

const publicPaths = ['/', 'hotel-details/:id', '/api/uploadthing']

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
