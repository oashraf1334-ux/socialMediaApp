import { Schema, Types , models ,model } from "mongoose";


export enum GenderEnum {
  male = "MALE",
  female = "FEMALE",
}

export enum RoleEnum {
  user = "USER",
  admin = "ADMIN",
}

export interface IUser {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  username?:string;

  email: string;
  confirmEmailOTP: string;
  confirmedAt?: Date;

  password: string;
  resetPasswordOTP?: string;
  changeCredentialsTime?: string;

  phone?: string;
  address?: string;
  gender:GenderEnum;
  role: RoleEnum;



  createdAt: Date;
  updatedAt?: Date;
}

export const userSchema = new Schema<IUser>({
  _id: { 
    type: Types.ObjectId, 
    auto: true, 
    required: true 
    },
  firstName: { type: String, required: true ,minLength:3,maxLength:25 },
  lastName: { type: String, required: true ,minLength:3,maxLength:25 },

  email: { type: String, required: true, unique: true },
  confirmEmailOTP: { type: String },
  confirmedAt: { type: Date },

  password: { type: String, required: true },
  resetPasswordOTP: { type: String },
  changeCredentialsTime: { type: String },

  phone: { type: String },
  address: { type: String },
  gender: { type: String, enum: Object.values(GenderEnum),default:GenderEnum.male },
  role: { type: String, enum: Object.values(RoleEnum), default: RoleEnum.user },


},{
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true }
});

userSchema.virtual("username")
.set(function (value: string) {
  const [firstName, lastName] = value.split(" ")||[];
  this.set({ firstName, lastName });
}).get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export const userModel = models.User || model<IUser>("User", userSchema);
