import { cookies } from "next/headers"


const AUTH_URL = process.env.AUTH_URL


export const userService = {




    getSession: async function () {


        try {
            const cookiesStore = await cookies()



            const res = await fetch(`${AUTH_URL}/get-session`, {

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

            return {
                data: null,
                error: {
                    message: "Somthing Went Wrong In Capturing Session "
                }
            }


        }

    },





}


