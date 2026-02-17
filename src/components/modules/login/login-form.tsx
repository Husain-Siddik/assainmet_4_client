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
import Link from "next/link"
import * as z from "zod"
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";

import { getUserSession } from "@/actions/sessionAction";
import { useRouter } from "next/navigation";







//user  get from session



const formSchema = z.object({

  email: z.email(),
  password: z.string().min(8, "minimum length is 8"),

})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();


  const form = useForm({

    defaultValues: {
      email: "",
      password: "",
    },
    validators: {

      onSubmit: formSchema,

    },

    onSubmit: async ({ value }) => {

      const finalData = {
        ...value,

      };



      const toastId = toast.loading("Logging in to your account...")

      try {
        const { data, error } = await authClient.signIn.email(finalData)

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        if (!error) {
          toast.success("Logged in successfully", { id: toastId })
          router.push("/dashboard")
        }

      } catch (error) {

        toast.error("Something went wrong. Please try again. ", { id: toastId })
      }


    }

  })



  //user get from session 







  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>

          <form id="login-form" onSubmit={(e) => {

            e.preventDefault()
            form.handleSubmit()

          }}>

            <FieldGroup>
              {/* transtack from  */}




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
                      value={field.state.value}
                      onChange={(e) => { field.handleChange(e.target.value) }}
                    />
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
          <Button className="w-full" form="login-form" type="submit">Login</Button>
        </CardFooter>
      </Card>


      <FieldDescription className="px-6 text-center">
        Don't  have an account ? <Link href="/signup">Sign up </Link>
      </FieldDescription>


    </div>
  )
}
