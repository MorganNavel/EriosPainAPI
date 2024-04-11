import Joi from "joi";

export const userSchema = Joi.object({
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    occupation: Joi.string().required()
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})