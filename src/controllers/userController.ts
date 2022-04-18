import { Request, Response } from 'express';
import { IReturn, IUser } from '../interfaces';
import { create, update, getById, login } from '../modules/userModules';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user: IUser = req.body;

      const IReturn: IReturn = await create(user);

      return res.status(IReturn.statusCode).send({
        success: IReturn.success,
        data: IReturn.data,
        token: IReturn.token,
        errors: IReturn.errors,
      });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .send({ success: false, data: '', token: '', errors: [e.message] });
      }
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user: IUser = req.body;

      const IReturn: IReturn = await update(user);

      return res.status(IReturn.statusCode).send({
        success: IReturn.success,
        data: IReturn.data,
        token: IReturn.token,
        errors: IReturn.errors,
      });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .send({ success: false, data: '', token: '', errors: [e.message] });
      }
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const IReturn: IReturn = await getById(id);

      return res.status(IReturn.statusCode).send({
        success: IReturn.success,
        data: IReturn.data,
        token: IReturn.token,
        errors: IReturn.errors,
      });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .send({ success: false, data: '', token: '', errors: [e.message] });
      }
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const IReturn: IReturn = await login(email, password);

      return res.status(IReturn.statusCode).send({
        success: IReturn.success,
        data: IReturn.data,
        token: IReturn.token,
        errors: IReturn.errors,
      });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .send({ success: false, data: '', token: '', errors: [e.message] });
      }
    }
  }
}

export default new UserController();
