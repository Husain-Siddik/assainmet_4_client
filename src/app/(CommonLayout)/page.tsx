import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";



export default async function Home() {

  const sesion = await authClient.getSession()

  console.log(sesion);


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">


      <div>
        <h1>this is home </h1>
        <Button>Click me</Button>
      </div>
    </div>
  );
}
