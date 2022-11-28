import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

export class ForgotValidator {
  public emailForgotValidator() {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    });
  }

  public passwordResetValidator() {
    return celebrate({
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      },
    });
  }
}
