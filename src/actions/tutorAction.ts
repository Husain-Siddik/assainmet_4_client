"use server"

import { tutorService } from "@/services/tutor.service"
import { userService } from "@/services/user.service"


export const getTutor = async () => {

    return await userService.getSession()
}

export const UpdateTutorProfile = async (paylod: {
    bio: string;
    pricePerHr: number;
}) => {
    const res = await tutorService.updateTutorProfile(paylod)
    return res

}