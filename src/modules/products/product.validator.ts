import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

export class ProductValidator {
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
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
    });
  }

  public putValidator() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
      [Segments.PARAMS]: {
        uuid: Joi.string().uuid().required(),
      },
    });
  }
}
