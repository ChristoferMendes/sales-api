import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';
import { CategoryEnum } from './entity/category.enum';

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
        description: Joi.string().required(),
      },
    });
  }

  public putValidator() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string(),
        price: Joi.number().precision(2),
        quantity: Joi.number(),
        description: Joi.number(),
        category: Joi.string().valid(...Object.values(CategoryEnum)),
      },
      [Segments.PARAMS]: {
        uuid: Joi.string().uuid().required(),
      },
    });
  }
}
