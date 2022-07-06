import express from 'express'
import { handleIncomingReport } from './controller/IncomingReport.controller'
import { validate, ValidationError } from 'express-validation'
import type { NextFunction, Request, Response } from "express";
import { ReportValidation } from './types/Report_Request';
import { Backoffice_Delete, Backoffice_Get, Backoffice_Get_All, Backoffice_Patch, Backoffice_Post, Backoffice_Put } from './controller/Backoffice.contoller';
import { InvokingSystemRequestValidation } from './types/InvokingSystem_Request'
import { validationOptions, paramValidation, body_stateValidation } from './types/Extra'


const router = express.Router()

router.use((_req, _res, next) => {
    next()
})

/**
 * Recieve New Report From Invoking System
 * @param userId 
 * @param ImgUrl? 
 * @param ImgBytes? 
 * @param callbackUrl 
 * @returns 
 */
router.post('/report',
    validate(InvokingSystemRequestValidation, validationOptions),
    handleIncomingReport)


/**
 * Create New Report
 * @param userId 
 * @param storedFilePath 
 * @param callbackUrl 
 * @param prefilterResponseJson 
 * @param status 
 * @returns 
 */
router.post('/backoffice/report',
    validate(ReportValidation, validationOptions), Backoffice_Post)


/**
 * Gets All Reports
 */
router.get('/backoffice/report', Backoffice_Get_All)


/**
 * Gets Report By Id
 */
router.get('/backoffice/report/:id',
    validate(paramValidation, validationOptions),
    Backoffice_Get)

/**
 * Patches The Report By Id
 * @param userId 
 * @param storedFilePath 
 * @param callbackUrl 
 * @param prefilterResponseJson 
 * @param status 
 * @returns 
 */
router.patch('/backoffice/report/:id',
    validate(paramValidation),
    validate(ReportValidation, validationOptions), Backoffice_Patch)


/**
 * Change Post Status And Archive
 * @param status 
 * @returns 
 */
router.put('/backoffice/report/:id',
    validate(paramValidation),
    validate(body_stateValidation, validationOptions), Backoffice_Put)

/**
 * Deletes Report By Id
 */
router.delete('/backoffice/report/:id',
    validate(paramValidation, validationOptions), Backoffice_Delete)

/**
 * Route Not Found Middleware
 */
router.all('*', (_req, res) => {
    res.status(404).send("Requested Endpoint Not Found")
})

/**
 * Error Handling Middleware
 */
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    console.error(err.stack)
    res.status(500).send('Internal Error')
    return;
})


export default (router)