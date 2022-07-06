import { Joi } from "express-validation"
import type { PrefilterResponseType } from "./Prefilter_Response"

export const ReportValidation = {
    body: Joi.object({
        userId: Joi.number().required(),
        callbackUrl: Joi.string().required(),
        imagePath: Joi.string().required(),
        prefilterReport: Joi.object().optional(),
        prefilterReportScore: Joi.number().optional(),
        //status: Joi.string().valid("Accepted", "Rejected", "Pending").optional()  --For Moderation Only
    })
}

export type ReportType = {
    userId: number,
    callbackUrl: string,
    imagePath: string,
    prefilterReport: PrefilterResponseType,
    prefilterReportScore: number,
    status: 'Pending' | 'Accepted' | 'Rejected'
}