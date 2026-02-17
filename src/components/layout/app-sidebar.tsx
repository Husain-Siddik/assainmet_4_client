import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,

  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { UserRoutes } from "@/routes/UserRoutes"
import { AdminRoutes } from "@/routes/AdminRoutes"
import { TutorRoutes } from "@/routes/TutorRoutes"
import { Routes } from "@/types"

import { LogoutButton } from "../modules/logout/log-outButton"
import { ModeToggle } from "./ModeToggle"


// This is sample data.
// const data = {
//   versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
//   navMain: [

//     {
//       title: "Welcome to SkillBrige ",
//       url: "#",
//       items: [
//         {
//           title: "student-dashboard",
//           url: "/student-dashboard",
//           isActive: true,
//         },
//         {
//           title: "admin-dashboard",
//           url: "/admin-dashboard",
//         },
//         {
//           title: "Caching",
//           url: "#",
//         },
//         {
//           title: "Styling",
//           url: "#",
//         },
//         {
//           title: "Optimizing",
//           url: "#",
//         },
//         {
//           title: "Configuring",
//           url: "#",
//         },
//         {
//           title: "Testing",
//           url: "#",
//         },
//         {
//           title: "Authentication",
//           url: "#",
//         },
//         {
//           title: "Deploying",
//           url: "#",
//         },
//         {
//           title: "Upgrading",
//           url: "#",
//         },
//         {
//           title: "Examples",
//           url: "#",
//         },
//       ],
//     },


//   ],
// }

export function AppSidebar(
  { user, ...props }:
    { user: { role: string } & React.ComponentProps<typeof Sidebar> }

) {

  let routes: Routes[] = []

  switch (user.role) {

    case "STUDENT":
      routes = UserRoutes

      break;

    case "ADMIN":
      routes = AdminRoutes

      break;

    case "TUTOR":
      routes = TutorRoutes

      break;

    default:
      routes = []
      break;
  }


  return (
    <Sidebar {...props}>

      <SidebarContent>

        <div className="flex items-center justify-between rounded-lg border px-3 py-2 hover:bg-muted transition-colors">
          <span className="text-sm font-medium">
            Theme
          </span>

          <ModeToggle />
        </div>



        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (

          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>



            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      {/* log Out  */}
      <LogoutButton />
    </Sidebar>
  )
}
