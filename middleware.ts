import { authMiddleware } from "@clerk/nextjs";
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

export default authMiddleware({
  publicRoutes:["/"]

});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};


 

 
