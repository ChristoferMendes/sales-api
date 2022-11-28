import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

export class OrderValidator {
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
        customer_uuid: Joi.string().uuid().required(),
        products: Joi.array().required(),
      },
    });
  }
}
