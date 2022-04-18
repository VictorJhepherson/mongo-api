import bcryptjs from 'bcryptjs';
import { userValidate } from '../errors/userValidate';
import { generateToken, createResponse, isEmpty } from '../utils/utils';
import User from '../models/Users';
import { IUser, IValidate } from '../interfaces';

export async function create(user: IUser) {
  try {
    const IValidate: IValidate = await userValidate(user);

    if (IValidate.success) {
      const passwordHash = await bcryptjs.hash(user.password, 9);

      const data = new User({
        name: user.name,
        email: user.email,
        password: passwordHash,
        avatar: user.avatar,
      });

      const newUser = await data.save();

      return createResponse(200, true, newUser);
    }

    return createResponse(400, false, '', '', IValidate.message);
  } catch (e) {
    if (e instanceof Error) {
      return createResponse(500, false, '', '', [e.message]);
    }
  }
}

export async function update(user: IUser) {
  try {
    const IValidate: IValidate = await userValidate(user);

    if (IValidate.success) {
      let passwordHash: string;
      if (!isEmpty(user.password)) {
        passwordHash = await bcryptjs.hash(user.password, 9);
      }

      const userUpdated = await User.findByIdAndUpdate(
        { _id: user.id },
        {
          $set: {
            name: user.name,
            email: user.email,
            password: passwordHash ? passwordHash : user.password,
          },
        },
        { new: true },
      );

      return createResponse(200, true, userUpdated);
    }

    return createResponse(400, false, '', '', IValidate.message);
  } catch (e) {
    if (e instanceof Error) {
      return createResponse(500, false, '', '', [e.message]);
    }
  }
}

export async function getById(id: string) {
  try {
    const user = await User.findById({ _id: id });

    if (user) return createResponse(200, true, user);

    return createResponse(400, false, '', '', ['Usuário não encontrado']);
  } catch (e) {
    if (e instanceof Error) {
      return createResponse(500, false, '', '', [e.message]);
    }
  }
}

export async function login(email: string, password: string) {
  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      const compare = await bcryptjs.compare(password, userExists.password);

      if (compare) {
        const token = generateToken(userExists.email, userExists.id.toString());

        return createResponse(200, true, userExists, token);
      }
    }

    return createResponse(400, false, '', '', ['Email ou senha inválido']);
  } catch (e) {
    if (e instanceof Error) {
      return createResponse(500, false, '', '', [e.message]);
    }
  }
}
