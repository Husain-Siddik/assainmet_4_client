"use server"

import { userService } from "@/services/user.service"


export const getUserSession = async () => {

    return await userService.getSession()
}