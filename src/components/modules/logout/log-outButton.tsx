"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        const toastId = toast.loading("Logging out...");

        try {
            await authClient.signOut();

            toast.success("Logged out successfully", { id: toastId });
            router.push("/login");
        } catch {
            toast.error("Something went wrong", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={loading}
            className="font-bold text-sm hover:bg-pink-700"

        >
            {loading && <Spinner />}
            Logout
        </Button>
    );
}
