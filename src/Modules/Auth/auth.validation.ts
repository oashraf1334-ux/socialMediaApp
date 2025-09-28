import z from "zod";
import { generalFields } from "../../Middlewares/validation.middleware";


export const loginSchema = {
    body: z.strictObject({
        email: generalFields.email,
        password: generalFields.password,
    })
}
export const confirmEmailSchema = {
    body: z.strictObject({
        email: generalFields.email,
        otp: generalFields.otp,
    })
}

export const signupSchema = {
    body: loginSchema.body.extend({
            username: generalFields.username,
            confirmPassword: generalFields.confirmPassword
        }).refine((data) => data.confirmPassword === data.password,{
            message: "Password and confirm password must match",
        })
}