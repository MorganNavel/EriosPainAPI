import Joi from "joi";
export const patientSchema = Joi.object({
    nom: Joi.string().required(),
    dateNaissance: Joi.date().required(),
    genre: Joi.string(),
});