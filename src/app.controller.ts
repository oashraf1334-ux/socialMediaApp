import express from "express";
import type { Express, Request, Response } from "express";
import { config } from "dotenv";
import path from "node:path";
import cors from "cors";
import helmet from "helmet";
import rateLimit , {type RateLimitRequestHandler} from "express-rate-limit";
import AuthRouter from "./Modules/Auth/auth.controller";
import UsersRouter from "./Modules/users/users.controller";
import { globalErrorHandler } from "./Utils/response/error.response";
import connectDB from "./DB/connection";
config({path: path.resolve('./config/.env.dev')});

const limiter:RateLimitRequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per windowMs
    message: {
        status: 429,
        message:"Too many requests from this IP, please try again later."
    }
});


export const bootstrap = async (): Promise<void> => {
    const app: Express = express();

    app.use(cors(),express.json(),helmet(),limiter);
    await connectDB();
    const port:number = Number(process.env.PORT) || 5000;
    app.get("/users",(req:Request,res:Response)=>{
        res.status(200).json({message: "Hello from users route"});
    });

    app.use("/api/auth",AuthRouter);
    app.use("/api/users",UsersRouter);

    app.use('/*Dummy',(req:Request,res:Response)=>{
        res.status(404).json({message: "Route not found"});
    });

    app.use(globalErrorHandler);

    app.listen(port,()=>{
        console.log(`Server is running at http://localhost:${port}`);
    });
}