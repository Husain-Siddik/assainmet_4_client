
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const tutorService = {


    getTutorByUser: async function () {
        try {

            const cookieStore = await cookies();


            const res = await fetch(`${API_URL}/api/tutors/byuser`, {
                method: "GET",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            if (!res.ok) {
                return { data: null, error: { message: "Failed to fetch tutor profile" } };
            }

            const data = await res.json();
            return { data, error: null };

        } catch (err) {
            return { data: null, error: { message: "Something went wrong while fetching tutor profile" } };
        }
    },

    updateTutorProfile: async function (payload: {
        bio: string;
        pricePerHr: number;

    }) {
        try {

            const cookieStore = await cookies();


            const res = await fetch(`${API_URL}/api/tutors/byuser`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            });

            if (!res.ok) {
                return { data: null, error: { message: "Failed to update  tutor profile" } };
            }

            const data = await res.json();
            return { data: data, error: null };



        } catch (err) {
            return { data: null, error: { message: "Something went wrong while fetching tutor profile" } };
        }
    }


};
