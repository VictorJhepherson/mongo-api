import validator from 'validator';

import { IUser, IValidate } from '../interfaces';
import { createValidate, isExists, isEmpty, isPassword } from '../utils/utils';

export async function userValidate(user: IUser): Promise<IValidate> {
  try {
    const errors = [];
    let userExists: IUser;

    if (!isEmpty(user.email)) {
      userExists = await isExists(user.email);
    }

    if (!isEmpty(user.email) && !validator.isEmail(user.email)) {
      errors.push('E-mail inválido');
      return createValidate(false, errors);
    }

    if (!isEmpty(user.email) && userExists) {
      errors.push('E-mail já cadastrado');
      return createValidate(false, errors);
    }

    if (!isEmpty(user.password) && !isPassword(user.password)) {
      errors.push('A senha deve ter de 6 a 15 caracteres');
      return createValidate(false, errors);
    }

    return createValidate(true, errors, userExists);
  } catch (e) {
    if (e instanceof Error) {
      return createValidate(false, [e.message]);
    }
  }
}
