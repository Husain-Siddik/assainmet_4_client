
"use client";


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import * as z from "zod"
import { useForm } from '@tanstack/react-form'
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";

//userId

const formSchema = z.object({

    name: z.string().min(1, "this field is required "),
    email: z.email(),
    image: z.url(),
    bio: z.string().min(1, "This field is required").max(500, "maximum  length is 500"),
    pricePerHr: z.int("Must be an integer").min(10, "Price must be at least 10"),
    password: z.string().min(8, "minimum length is 8"),


})

const ApiUrl = env.NEXT_PUBLIC_API_URL



export function SignUpAsTutor({
    className,
    ...props
}: React.ComponentProps<"div">) {






    const form = useForm({

        defaultValues: {
            name: "",
            email: "",
            image: "",
            bio: "",
            pricePerHr: 50,
            password: "",

        },
        validators: {

            onSubmit: formSchema,

        },

        onSubmit: async ({ value }) => {

            const UserData = {
                name: value.name,
                email: value.email,
                role: "TUTOR",
                password: value.password,
                image: value.image,

            }






            const toastId = toast.loading("Creating tutor Account...")

            try {
                const { data, error } = await authClient.signUp.email(UserData)

                if (error) {
                    toast.error(error.message, { id: toastId })
                    return
                }

                toast.success("User Created , Tutor Profile creating ....", { id: toastId })




                const tutorData = {
                    bio: value.bio,
                    pricePerHr: value.pricePerHr,
                    userId: data.user.id
                }

                try {

                    const result = await fetch(`${ApiUrl}/api/tutors`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(tutorData),

                    })
                    if (!result.ok) {
                        toast.error("Failed to create tutor", { id: toastId })
                    }


                    toast.success("tutor Account Creating Succesfully ", { id: toastId })




                } catch (error) {
                    toast.error("Something went wrong  when creating tutor, Pleace try again ", { id: toastId })
                }



            } catch (error) {

                toast.error("Something went wrong , Pleace try again ", { id: toastId })
            }


        }

    })



    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create your account As A Tutor</CardTitle>
                    <CardDescription>
                        Enter your info. below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <form id="sign-up-form" onSubmit={(e) => {

                        e.preventDefault()
                        form.handleSubmit()

                    }}>

                        <FieldGroup>
                            {/* transtack from  */}

                            <form.Field name="name" children={(field) => {

                                // now i can control condition  here 
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid

                                return (

                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            placeholder="Enter your name"
                                            value={field.state.value}
                                            onChange={(e) => { field.handleChange(e.target.value) }}
                                        />

                                        {/* error here */}

                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}

                                    </Field>


                                )

                            }}>

                            </form.Field>


                            <form.Field name="email" children={(field) => {

                                // now i can control condition  here 
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid

                                return (

                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                        <Input
                                            type="email"
                                            id={field.name}
                                            name={field.name}
                                            placeholder="example@gmail.com"
                                            value={field.state.value}
                                            onChange={(e) => { field.handleChange(e.target.value) }}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}

                                    </Field>


                                )

                            }}>

                            </form.Field>


                            <form.Field name="image" children={(field) => {

                                // now i can control condition  here 
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid

                                return (

                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Image Url</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            placeholder="https://example.com"
                                            value={field.state.value}
                                            onChange={(e) => { field.handleChange(e.target.value) }}
                                        />

                                        {/* error here */}

                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}

                                    </Field>


                                )

                            }}>

                            </form.Field>


                            <form.Field name="pricePerHr" children={(field) => {

                                // now i can control condition  here 
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid

                                return (

                                    <Field>
                                        <FieldLabel htmlFor={field.name}>pricePerHr</FieldLabel>
                                        <Input
                                            type="number"
                                            id={field.name}
                                            name={field.name}
                                            placeholder="100.0"
                                            value={field.state.value}
                                            onChange={(e) => { field.handleChange(Number(e.target.value)) }}
                                        />

                                        {/* error here */}

                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}

                                    </Field>


                                )

                            }}>

                            </form.Field>

                            <form.Field name="bio" children={(field) => {

                                // now i can control condition  here 
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid

                                return (

                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                        <Textarea

                                            id={field.name}
                                            name={field.name}
                                            placeholder="About yourself"
                                            value={field.state.value}
                                            onChange={(e) => { field.handleChange(e.target.value) }}
                                        />

                                        {/* error here */}

                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}

                                    </Field>


                                )

                            }}>

                            </form.Field>


                            <form.Field name="password" children={(field) => {

                                // now i can control condition  here 
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid

                                return (

                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                        <Input
                                            type="password"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => { field.handleChange(e.target.value) }}
                                        />

                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>


                                )

                            }}>

                            </form.Field>

                        </FieldGroup>

                    </form>

                </CardContent>

                <CardFooter className="">
                    <Button className="w-full" form="sign-up-form" type="submit">Submit</Button>
                </CardFooter>

            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <Link href="/signup">Terms of Service</Link>{" "}
                and <Link href="/signup">Privacy Policy</Link>.
            </FieldDescription>
        </div>
    )
}
