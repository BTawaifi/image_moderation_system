import { Joi } from "express-validation"

/**
 * Validate Id is Number
 */
export const paramValidation = {
    params: Joi.object({ id: Joi.number().required() })
}

/**
 * Validate body.state if one of strings ("Accepted" | "Rejected"| "Pending")
 */
export const body_stateValidation = {
    body: Joi.object({
        status: Joi.string().valid("Accepted", "Rejected", "Pending").required()
    })
}

export const validationOptions = { context: true, statusCode: 400, keyByField: true }
