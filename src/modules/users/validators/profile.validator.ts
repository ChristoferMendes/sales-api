import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

export class ProfileValidator {
  public postValidator() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string(),
        email: Joi.string().email(),
        old_password: Joi.string(),
        password: Joi.string().optional(),
        password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
      },
    });
  }
}
