import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

export class CustomerValidator {
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
        email: Joi.string().email(),
      },
    });
  }

  public putValidator() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email(),
      },
      [Segments.PARAMS]: {
        uuid: Joi.string().uuid().required(),
      },
    });
  }
}
