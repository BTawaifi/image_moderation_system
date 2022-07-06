import type { NextFunction, Request, Response } from "express";
import type { PrefilterResponseType } from "../types/Prefilter_Response";
import { sendImageBytesToPrefilter, sendImageUrlToPrefilter } from "../service/PrefilterReport.service";
import { createReport } from "../service/CRUDFunctions.service";
import type { ReportType } from "../types/Report_Request";
import type { InvokingSystemRequestType } from "../types/InvokingSystem_Request";
import DotEnv from "dotenv";
import axios from "axios";
DotEnv.config()


/**
 * Sends request to prefilter depending on image type, Returns a report and score
 * @param Request 
 * @returns 
 */
async function handlePrefilter(Request: InvokingSystemRequestType) {
    try {
        let prefilterResponseJson: PrefilterResponseType
        if (Request.imageUrl) {
            prefilterResponseJson = await sendImageUrlToPrefilter(Request.imageUrl) as PrefilterResponseType;
        }
        else {
            prefilterResponseJson = await sendImageBytesToPrefilter(Request.imageBytes) as PrefilterResponseType;
        }

        //Further checks can be added later
        const prefilterResponseScore = (prefilterResponseJson.nudity.raw + prefilterResponseJson.weapon + prefilterResponseJson.drugs + prefilterResponseJson.offensive.prob + prefilterResponseJson.gore.prob) / 5

        return { PFR: prefilterResponseJson, PFRS: prefilterResponseScore }

    } catch (error) {
        throw new Error("Prefilter Operation Failed");
    }
}

/**
 * Recieve Incoming Report, Store Img, Send Img To Prefilter, Fill New DB Entity With Acquired Data
 */
export async function handleIncomingReport(req: Request, res: Response, _next: NextFunction) {
    const requestBody = req.body as InvokingSystemRequestType

    if (requestBody.imageUrl) {
        try {
            const prefilterOperation = await handlePrefilter(requestBody)
            const imagePath = await axios.post(`${process.env["FILESERVER_HOST"]}:${process.env["FILESERVER_LOCAL_PORT"]}/images`, { imageUrl: requestBody.imageUrl, userId: requestBody.userId });
            if (!imagePath) {
                throw new Error("Image Storage Failed")
            }

            const report: ReportType = {
                userId: requestBody.userId,
                callbackUrl: requestBody.callbackUrl,
                imagePath: imagePath.data,
                prefilterReport: prefilterOperation.PFR,
                prefilterReportScore: prefilterOperation.PFRS,
                status: "Pending"
            }

            await createReport(report)
                .then((data) => {
                    res.send(data)
                }).catch((err) => { throw new Error(err) })

        } catch (error) {
            res.status(400).send(error)
        }

    }

    //ImageBytes, preferably as Read Stream
    else if (requestBody.imageBytes) {
        try {
            const prefilterOperation = await handlePrefilter(requestBody)

            const imagePath = await axios.post(`${process.env["FILESERVER_HOST"]}:${process.env["FILESERVER_LOCAL_PORT"]}/images`, { byteStream: requestBody.imageBytes, userId: requestBody.userId })
            if (!imagePath) {
                throw new Error("Image Storage Failed")
            }

            const report: ReportType = {
                userId: requestBody.userId,
                callbackUrl: requestBody.callbackUrl,
                imagePath: imagePath.data,
                prefilterReport: prefilterOperation.PFR,
                prefilterReportScore: prefilterOperation.PFRS,
                status: "Pending"
            }

            await createReport(report)
                .then((data) => {
                    res.send(data)
                }).catch((err) => { throw new Error(err) })

        } catch (error) {
            res.status(400).end().send(error)
        }
    }
    res.end()
    return;
}