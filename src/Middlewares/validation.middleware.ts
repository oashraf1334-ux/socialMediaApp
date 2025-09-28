
import type { NextFunction ,Request ,Response } from "express";
import { ZodError, ZodType } from "zod";
import { BadRequestException } from "../Utils/response/error.response";
import z from "zod";
type ReqTypeKey = keyof Request;
type schemaType = Partial<Record<ReqTypeKey, ZodType>>;
export const validation = (schema:schemaType) => {
    return (req:Request,res:Response,next:NextFunction):NextFunction => {
       const validationErrors: Array<{
            key: ReqTypeKey;
            issues: Array<{ message: string; path: (string | number | symbol)[] }>;
       }> = [];
        for (const key of Object.keys(schema) as ReqTypeKey[]) {
            if(!schema[key]) continue;
            const validationResult = schema[key].safeParse(req[key]);
            if (!validationResult.success) {
                const errors = validationResult.error as ZodError;
                validationErrors.push({
                    key,
                    issues: errors.issues.map((issue) => ({message: issue.message, path: issue.path})),
                });
            }
            if (validationErrors.length > 0) {
                throw new BadRequestException("validation error", { cause: validationErrors });
            }
        }
        
        return next() as unknown as NextFunction;
    };
};


export const generalFields = {
    username: z.string().min(2).max(100),
    email: z.email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
    otp:z.string().regex(/^\d{6}/)
}