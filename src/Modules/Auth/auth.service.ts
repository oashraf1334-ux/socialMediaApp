import type { Request, Response } from "express";
import { IsignupDTO } from "./auth.DTO";
import { userModel } from "../../DB/models/user.model";
import { BadRequestException, ConfilectException, NotFoundException } from "../../Utils/response/error.response";
import { UserReposetorie } from "../../DB/reposetories/user.reposetorie";
import { compareHash, generateHash } from "../../Utils/security/hash";
import { emailEvent } from "../../Utils/email/email.event";
import { generateOTP } from "../../Utils/generateOTP";
import { generateToken } from "../../Utils/security/token";
//import { UserReposetorie } from "../../DB/reposetories/user.reposetorie";



class AuthService {
    private _userModel = new UserReposetorie(userModel);

    constructor() {}
    public signup = async (req: Request, res: Response): Promise<Response> =>{
        const {username,email,password}: IsignupDTO = req.body;
        const checkUser = await this._userModel.findOne({filter:{email},options:{lean:true}});
        if(checkUser) throw new ConfilectException("User already exists");
        
        const otp = generateOTP();

        const user = await this._userModel.createUser({
            data:[{
                username,email,
                password:await generateHash(password),
                confirmEmailOTP:await generateHash(String(otp))
            }],
            options:{validateBeforeSave:true}
        })||[]
        emailEvent.emit("confirmEmail",{to:email,username ,otp});
        return res.status(201).json({ message: "user created successfully" ,user });
    };


    public login = async (req: Request, res: Response): Promise<Response> => {
        const {email , password} = req.body;
        const user = await this._userModel.findOne({
            filter:{email}
        });
        if(!user) throw new NotFoundException("User not found");
        if(!compareHash(password , user.password)) throw new BadRequestException("Email or password wrong");
        const accessToken = await generateToken({
            payload:{_id:user._id}
        })
        return res.status(200).json({ message: "user logged in successfully",accessToken });
    };


    public confirmEmail = async (req: Request, res: Response): Promise<Response> => {
        const {email , otp} = req.body;
        const user = await this._userModel.findOne({
            filter:{
                email , 
                confirmEmailOTP:{$exists:true},
                confirmedAt:{$exists:false}
            }
        });

        if(!user) throw new NotFoundException("Invalid Account");
        if(!compareHash(otp,user.confirmEmailOTP)) throw new BadRequestException("Invalid OTP");

        await this._userModel.updateOne({
            filter:{email},
            update:{
                confirmedAt:Date.now(),
                $unset:{confirmEmailOTP:true}
            }
        })
        return res.status(200).json({ message: "user confirmed successfully"});
    };
}

export default new AuthService();
