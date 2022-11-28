import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

export class UserValidator {
  public getValidator() {
    return celebrate({
      [Segments.PARAMS]: {
        uuid: Joi.string().uuid().required(),
      },
    });
  }
  public postValidator() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    });
  }
}
