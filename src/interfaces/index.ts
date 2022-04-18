import { Types } from 'mongoose';

export interface IReturn {
  statusCode: number;
  success: boolean;
  data: unknown;
  token?: string;
  errors?: string[];
}

export interface IUser {
  id?: Types.ObjectId;
  name?: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface UserPayload {
  id: string;
  email: string;
}

export interface IValidate {
  success: boolean;
  data: unknown;
  message: string[];
}
