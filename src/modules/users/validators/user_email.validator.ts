import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

export class UserEmailValidator {
  public postValidator() {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    });
  }
}
