import Joi from "joi";
import isEmpty from "is-empty";

const schemaLogin = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .trim()
    // .regex(
    //     /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}/
    // )
});

const validateLoginInput = (data) => {
    let errors = {};
    let result = schemaLogin.validate(data);

    if (result.error) {
        errors = result.error.message;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export default validateLoginInput;