import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { userService } from "@/services/user.service";


async function layout(

    { children }: { children: React.ReactNode }

) {

    const session = await userService.getSession()

    const userdata = session.data?.user

    console.log(userdata);


    return (
        <div>

            <Navbar userdata={userdata} />

            {children}

            <Footer />

        </div>
    );
}

export default layout;