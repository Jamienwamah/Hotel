import { authMiddleware } from "@clerk/nextjs";



export default authMiddleware({
  publicRoutes: ['/', 'hotel-details/:id', '/api/uploadthing']

});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};

