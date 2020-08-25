import Joi from "joi";

export const schemaTodo = Joi.object({
  title: Joi.string().min(2).required(),
  body: Joi.string().required(),
  completed: Joi.bool(),
  created: Joi.date(),
});
