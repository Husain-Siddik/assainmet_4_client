"use client"

import { useState } from "react";
import { SignupAsStudent } from "@/components/modules/signupAsStudent/SignupAsStudent";
import { SignupAsTutor } from "@/components/modules/signUpAsTutor/signUpAsTutor";
import { Button } from "@/components/ui/button";

export default function SignupSwitcher() {

    const [role, setRole] = useState<"STUDENT" | "TUTOR" | null>("STUDENT");

    return (
        <div className="  ">
            <div className="flex gap-3 justify-between">
                <Button
                    variant="outline"
                    size="lg"
                    className="border-green-300"
                    onClick={() => setRole("STUDENT")}
                >
                    Join As A Student
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    className="border-pink-200"
                    onClick={() => setRole("TUTOR")}
                >
                    Join As A Tutor
                </Button>
            </div>

            <div className="w-full max-w-sm md:max-w-4xl mt-6 ">
                {role === "STUDENT" && <SignupAsStudent />}
                {role === "TUTOR" && <SignupAsTutor />}
            </div>
        </div>
    );
}
