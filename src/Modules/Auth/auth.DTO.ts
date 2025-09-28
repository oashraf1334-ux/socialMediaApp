import z from "zod";
import { signupSchema } from "./auth.validation";


export type IsignupDTO = z.infer<typeof signupSchema.body>;