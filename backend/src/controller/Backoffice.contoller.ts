import type { Request, Response } from "express";
import { Report } from "../entity/Report";
import { createReport, deleteReport, findAllReports, findReport, updateAndArchiveReport, updateReport } from "../service/CRUDFunctions.service";
import type { ReportType } from "../types/Report_Request";

export async function Backoffice_Delete(req: Request, res: Response) {
    const request_param_id = +req.params["id"]!;
    try {
        const DR = await deleteReport(request_param_id);
        res.send(DR);
    } catch (error: any) {
        res.status(406).send(error.message);
    }
}

export async function Backoffice_Patch(req: Request, res: Response) {
    const request_body: ReportType = req.body
    const request_param_id = +req.params["id"]!;
    try {
        const DR = await updateReport(request_param_id, request_body)
        res.send(DR)
    } catch (error: any) {
        res.status(404).send(error.message)
    }
}

export async function Backoffice_Put(req: Request, res: Response) {
    const request_body_status: { status: ('Pending' | 'Accepted' | 'Rejected') } = req.body
    const request_param_id = +req.params["id"]!;
    try {
        const Tran = await updateAndArchiveReport(request_param_id, request_body_status.status)
        res.send(Tran)
    } catch (error: any) {
        res.status(404).send(error.message)
    }
}

export async function Backoffice_Get(req: Request, res: Response) {
    const request_param_id = +req.params["id"]!;
    try {
        const DR = await findReport(request_param_id)
        if (DR instanceof Report)
            res.send(DR)
        else {
            throw new Error("Entity Not Found");
        }
    } catch (error: any) {
        res.status(404).send(error.message)
    }
}

export async function Backoffice_Post(req: Request, res: Response) {
    try {
        const requestBody: ReportType = req.body
        const DR = await createReport(requestBody)
        res.send(DR)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
export async function Backoffice_Get_All(_req: Request, res: Response) {
    const reports = await findAllReports();
    const reportsSorted = reports.sort((a, b) => {
        if (b.prefilterReportScore != null && a.prefilterReportScore != null) {
            return b.prefilterReportScore - a.prefilterReportScore
        }
        else {
            return b.id - a.id
        }
    })
    res.send(reportsSorted)
}