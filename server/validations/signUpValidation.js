import Joi from "joi";

const schemaUser = Joi.object({
  firstName: Joi.string().min(2).max(30).required().trim(),
  lastName: Joi.string().min(2).max(30).required().trim(),
  username: Joi.string().min(4).max(30).required().trim(),
  phoneNumber: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  country: Joi.string().required().trim(),
  password: Joi.string()
    .min(6)
    .max(30)
    .trim()
    .regex(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}/
    ),
  confirmPassword: Joi.string().trim(),
});

export function validateSignUpInput(data) {
  let error = {};
  let result = Joi.validate(data, schemaUser);

  if (result.error) {
  }
}
