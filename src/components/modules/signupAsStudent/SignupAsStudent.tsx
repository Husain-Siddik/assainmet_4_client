
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
import Link from "next/link";

import { useForm } from '@tanstack/react-form'
import { FieldDescription, FieldGroup, Field, FieldLabel, FieldError, } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod"
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";



const formSchema = z.object({

  name: z.string().min(1, "this field is required "),
  email: z.email(),
  password: z.string().min(8, "minimum length is 8"),
  image: z.url()


})



export function SignUpAsStudent({
  className,
  ...props
}: React.ComponentProps<"div">) {


  const form = useForm({

    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",

    },
    validators: {

      onSubmit: formSchema,

    },

    onSubmit: async ({ value }) => {

      const finalData = {
        ...value,
        role: "STUDENT",
      };

      const toastId = toast.loading("Creating Student Account")

      try {
        const { data, error } = await authClient.signUp.email(finalData)

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }
        toast.success("Student Account Created Succesfully ", { id: toastId })

      } catch (error) {

        toast.error("Something went wrong , Pleace try again ", { id: toastId })
      }


    }

  })



  return (

    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account As A student</CardTitle>
          <CardDescription>
            Enter your info below to create your account
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
                    <FieldLabel htmlFor={field.name}>Img Url</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
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
        already have an account ? <Link href="/login">Log in </Link>
      </FieldDescription>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <Link href="/signup">Terms of Service</Link>{" "}
        and <Link href="/signup">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}
