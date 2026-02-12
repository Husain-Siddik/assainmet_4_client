import { Signup } from "@/components/modules/signup/signup";
import { Button } from "@/components/ui/button";


function SignupPage() {
    return (
        <div className=" border bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">

            <div className="flex gap-3">
                <Button variant="outline" size="lg" className="border-green-300" > Join  As A Student </Button>
                <Button variant="outline" size="lg" className="border-pink-200" > Join As A Tutor </Button>
            </div>


            <div className="w-full max-w-sm md:max-w-4xl">
                <Signup />
            </div>
        </div>
    )
}

export default SignupPage;