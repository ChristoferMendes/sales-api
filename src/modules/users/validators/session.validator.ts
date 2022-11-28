import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

export class SessionValidator {
  public postValidator() {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    });
  }
}
