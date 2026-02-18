"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { Type } from "lucide-react";
import { UpdateTutorProfile } from "@/actions/tutorAction";


const formSchema = z.object({
    bio: z.string().min(5, ""),
    pricePrHr: z.number().min(50),
});


type TutorProps = {
    tutor: {
        id: number;
        bio: string;
        pricePerHr: number;
        userId: string;
    };
};

export function UpdateTutorForm({ tutor }: TutorProps) {


    const form = useForm({

        defaultValues: { bio: tutor.bio, pricePrHr: tutor.pricePerHr },
        validators: { onSubmit: formSchema },

        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Updateing info...");

            const paylode = {
                bio: value.bio,
                pricePerHr: value.pricePrHr

            }


            try {
                const { data, error } = await UpdateTutorProfile(paylode)

                console.log(data.data);



                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }
                toast.success("Profile Updated Seccesfully", { id: toastId });

            } catch {
                toast.error("Something went wrong. Please try again.", { id: toastId });
            }
        },
    });

    return (
        <div
            className="flex justify-center items-center   dark:bg-black p-4"

        >
            <Card className="w-sm sm:w-100 rounded-2xl shadow-md border dark:border-green-500 bg-white dark:bg-gray-900">
                <CardHeader>
                    <CardTitle className="text-center">Update your Profile</CardTitle>


                </CardHeader>
                <CardContent>
                    <form
                        id="Update-tutorFrom"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup className="space-y-4">
                            {/* bio Field */}
                            <form.Field
                                name="bio"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>bio</FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                className={cn(isInvalid && "border-red-500")}
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    );
                                }}
                            />

                            {/* priceper hour  Field */}
                            <form.Field
                                name="pricePrHr"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Price Per Hour</FieldLabel>
                                            <Input
                                                type="number"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                                className={cn(isInvalid && "border-red-500")}
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    );
                                }}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full rounded-xl"
                        form="Update-tutorFrom"
                        type="submit"
                    >
                        Update
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
