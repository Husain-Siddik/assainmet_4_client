import { cookies } from "next/headers"


export const userService = {


    getSession: async function () {


        try {
            const cookiesStore = await cookies()

            console.log(cookiesStore.toString());

            const res = await fetch("", {

                headers: {
                    Cookie: cookiesStore.toString()
                },

                cache: "no-store"

            })

            const session = await res.json()

            if (session === null) {

                return {
                    data: null,
                    error: {
                        message: "Session is missing "
                    }
                }

            }

            return {
                data: session,
                error: null
            }


        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: {
                    message: "Somthing Went Wrong In Capturing Session "
                }
            }


        }

    }


}
