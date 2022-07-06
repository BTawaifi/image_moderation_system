import { Joi } from "express-validation"

export const InvokingSystemRequestValidation = {
    body: Joi.object({
        userId: Joi.number().required(),
        callbackUrl: Joi.string().required(),
        imageUrl: Joi.string().uri(),
        imageBytes: Joi.any()
    }).xor('imageUrl', 'imageBytes')
}

export type InvokingSystemRequestType = {
    userId: number,
    imageUrl?: string,
    imageBytes?: any, //possibly multipart/formdata stream or readstream
    callbackUrl: string
}