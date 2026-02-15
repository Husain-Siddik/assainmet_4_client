





import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { userService } from './services/user.service'
import { UserRole } from './types/userRole.type';


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const pathName = request.nextUrl.pathname
    console.log(pathName);

    let isAuthenticated = false;
    let isAdmin = false;
    let isTutor = false;
    let isStudent = false;


    const session = await userService.getSession()

    if (session.data) {
        isAuthenticated = true;

        isAdmin = session.data?.user?.role === UserRole.ADMIN;
        isTutor = session.data?.user?.role === UserRole.TUTOR;
        isStudent = session.data?.user?.role === UserRole.STUDENT;
    }

    console.log("student ", isStudent, "tiotor =>", isTutor, "isAdmin >>", isAdmin);

    if (isAuthenticated === false) {
        console.log("rearntin log in ");

        return NextResponse.redirect(new URL("/login", request.url))

    }


    return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: '/about/:path*',
}