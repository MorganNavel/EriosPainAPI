import Joi from "joi";

export const streamSchema = Joi.object({
    patientId: Joi.number().required(),
    records: Joi.array().items(Joi.number()).required(),
});