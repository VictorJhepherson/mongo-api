import { sign } from 'jsonwebtoken';
import { IReturn, IUser, IValidate } from '../interfaces';
import User from '../models/Users';

export const createResponse = (
  statusCode: number,
  success: boolean,
  data?: unknown,
  token?: string,
  errors?: string[],
): IReturn => {
  const IReturn: IReturn = {
    statusCode: statusCode,
    success: success,
    data: data,
    token: token,
    errors: errors,
  };

  return IReturn;
};

export const createValidate = (
  success: boolean,
  message: string[],
  data?: unknown,
): IValidate => {
  const IValidate: IValidate = {
    success: success,
    message: message,
    data: data,
  };

  return IValidate;
};

export const isExists = async (email: string): Promise<IUser> => {
  const user: IUser = await User.findOne({ email });

  return user;
};

export const isEmpty = (value: string): boolean => {
  return value === undefined;
};

export const isPassword = (password: string): boolean => {
  if (password.length < 6 || password.length > 15) return false;

  return true;
};

export const generateToken = (email: string, id: string): string => {
  const token = sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return token;
};
