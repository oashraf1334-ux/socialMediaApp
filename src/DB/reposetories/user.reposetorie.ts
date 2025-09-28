import { CreateOptions, HydratedDocument, Model } from "mongoose";
import { IUser } from "../models/user.model";
import { DatabaseReposetories } from "./database.reposetorie";
import { BadRequestException } from "../../Utils/response/error.response";

export class UserReposetorie extends DatabaseReposetories<IUser>{
    constructor(protected override readonly model:Model<IUser>){
        super(model)
    }
    async createUser({data,options}:{data:Partial<IUser>[],options?:CreateOptions}):Promise<HydratedDocument<IUser>>{
        const [user] = await this.create({data,options})||[]
        if(!user) throw new BadRequestException("fail to signup");
        return user;
    }
}