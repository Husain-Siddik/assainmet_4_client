import { Routes } from "@/types";

export const TutorRoutes: Routes[] = [

    {
        title: "Tutor MenegeMent ",

        items: [

            {
                title: "Home",
                url: "/",
            },

            {
                title: "Tutor Profile",
                url: "/tutor-dashboard/tutor-profile",
            },
            {
                title: "Update Profile",
                url: "/tutor-dashboard/update-profile",
            },
            {
                title: "Category Management",
                url: "/tutor-dashboard/category"
            }
        ],
    },


]