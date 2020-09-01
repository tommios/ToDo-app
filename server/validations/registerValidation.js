import Joi from "joi";
import isEmpty from "is-empty";

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
        .required()
        .trim(),
        // .regex(
        //     /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}/
        // ),
    confirmPassword: Joi.string().trim().required().valid(Joi.ref('password'))
});

const validateRegisterInput = (data) => {
    let errors = {};
    //let result = Joi.validate(data, schemaUser);

    let result=schemaUser.validate(data);

    if (result.error) {
        errors = result.error.message;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateRegisterInput;
