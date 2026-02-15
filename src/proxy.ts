


import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { userService } from './services/user.service'
import { UserRole } from './types/userRole.type';


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const pathName = request.nextUrl.pathname

    let isAuthenticated = false;

    const session = await userService.getSession()

    if (session.data) {
        isAuthenticated = true;

        // isAdmin = session.data?.user?.role === UserRole.ADMIN;
        // isTutor = session.data?.user?.role === UserRole.TUTOR;
        // isStudent = session.data?.user?.role === UserRole.STUDENT;
    }


    if (isAuthenticated === false) {
        return NextResponse.redirect(new URL("/login", request.url))

    }

    const role = session.data.user.role

    // Admin Route 
    if (pathName.startsWith("/admin-dashboard") && role !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    //  Tutor Route
    if (pathName.startsWith("/tutor-dashboard") && role !== UserRole.TUTOR) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    //  Student Route 
    if (pathName.startsWith("/student-dashboard") && role !== UserRole.STUDENT) {
        return NextResponse.redirect(new URL("/", request.url));
    }






    return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        "/admin-dashboard/:path*",
        "/tutor-dashboard/:path*",
        "/student-dashboard/:path*",
    ],
}