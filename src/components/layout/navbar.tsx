"use client";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,

} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,

  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,

} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { LogoutButton } from "../modules/logout/log-outButton";



interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };

  userdata?: {
    name: string;
    email: string;
    emailVerified: boolean;
    id: string;
    image?: string;
    role: string;


  }
}

const Navbar = ({
  logo = {
    title: "SkillBridge.com",
  },
  menu = [
    {
      title: "Home",

      url: "/"
    },

    {
      title: "About",
      url: "/about",
    },

  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  userdata,
  className,
}: Navbar1Props) => {
  return (
    <section className={cn("py-4", className)}>
      <div className="container px-4 mx-auto">
        {/* Desktop Menu */}

        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              {/* <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              /> */}
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </div>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            {/* dark mode / Light mode */}
            <ModeToggle />

            {!userdata?.email && (
              <>

                <Button asChild variant="outline">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}

            {userdata?.email &&

              <>
                <Button asChild variant="outline">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <LogoutButton></LogoutButton>
              </>
            }

          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader className="" >

                  <SheetTitle className="">
                    <div>
                      {logo.title}
                    </div>
                  </SheetTitle>



                  <div className="">
                    <div className="flex items-center justify-between rounded-lg border px-3 py-2 hover:bg-muted transition-colors">
                      <span className="text-sm font-medium">
                        Theme
                      </span>

                      <ModeToggle />
                    </div>
                  </div>

                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">

                    {/* dark mode / Light mode */}


                    {/* hide log in afer log in  */}

                    {!userdata?.email && (
                      <>

                        <Button asChild variant="outline">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>

                        <Button asChild variant="outline">
                          <Link href={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                      </>
                    )}

                    {/* logout handel  */}
                    {userdata?.email &&

                      <>
                        <Button asChild variant="outline">
                          <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <LogoutButton></LogoutButton>
                      </>
                    }



                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {


  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild

        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >

        <Link href={item.url}>{item.title}</Link>


      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {


  return (
    <Link href={item.url} key={item.title} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};



export { Navbar };
