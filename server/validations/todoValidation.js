import Joi from "joi";

export const schemaTodo = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  body: Joi.string().required(),
  completed: Joi.string(),
  created: Joi.date(),
});
