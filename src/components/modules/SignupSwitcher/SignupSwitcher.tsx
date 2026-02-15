"use client"

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { SignUpAsTutor } from "../signUpAsTutor/signUpAsTutor";
import { SignUpAsStudent } from "../signupAsStudent/SignupAsStudent";
import { cn } from "@/lib/utils";

export default function SignupSwitcher() {

    const [SignUprole, SetSignUprole] = useState<"STUDENT" | "TUTOR" | null>("STUDENT");

    return (
        <div className="  ">
            <div className="flex gap-3 justify-between">
                <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                        "border",
                        SignUprole === "STUDENT"
                            ? "border-green-300 bg-green-400"
                            : "border-red-300"
                    )}
                    onClick={() => SetSignUprole("STUDENT")}


                >
                    Join As A Student
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                        "border",
                        SignUprole === "TUTOR"
                            ? "border-green-300 bg-green-400"
                            : "border-red-300"
                    )}
                    onClick={() => SetSignUprole("TUTOR")}
                >
                    Join As A Tutor
                </Button>
            </div>

            <div className="w-full max-w-sm md:max-w-4xl mt-6 ">
                {SignUprole === "STUDENT" && <SignUpAsStudent />}
                {SignUprole === "TUTOR" && <SignUpAsTutor />}
            </div>
        </div>
    );
}
