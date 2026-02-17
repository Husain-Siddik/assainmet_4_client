import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (

        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <Spinner className="w-10 h-10" />
            <p className="text-sm text-muted-foreground">
                Loading, please wait...
            </p>
        </div>

    )


}