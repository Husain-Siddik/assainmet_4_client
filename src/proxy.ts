


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


    if (pathName.startsWith('/dashboard')) {

        if (role == UserRole.ADMIN) {
            return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }
        if (role == UserRole.TUTOR) {
            return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
        }

        if (role == UserRole.STUDENT) {
            return NextResponse.redirect(new URL("/student-dashboard", request.url));
        }


    }





    return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        "/dashboard",
        "/admin-dashboard/:path*",
        "/tutor-dashboard/:path*",
        "/student-dashboard/:path*",
    ],
}