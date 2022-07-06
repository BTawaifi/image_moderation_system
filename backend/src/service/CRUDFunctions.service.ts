import axios from "axios";
import { AppDataSource } from "../data-source";
import { Archive } from "../entity/Archive";
import { Report } from "../entity/Report";
import type { ReportType } from "../types/Report_Request";

/**
 * Creates New Report
 * @param report 
 * @returns Promise<InsertResult>
 */
export function createReport(report: ReportType | Report, archive?: boolean) {
    const newReport: Report = new Report()
    newReport.userId = report.userId;
    newReport.imagePath = report.imagePath;
    newReport.callbackUrl = report.callbackUrl;
    newReport.prefilterReport = report.prefilterReport;
    newReport.prefilterReportScore = report.prefilterReportScore;
    newReport.status = report.status ? report.status : "Pending";

    try {
        if (archive) {
            return AppDataSource.getRepository(Archive).save(newReport);
        }
        else {
            return AppDataSource.getRepository(Report).save(newReport);
        }
    } catch (error) {
        throw new Error("Entity Creation Failed")
    }
}

/**
 * Performs ACID transaction on the report (removes from report table, insert into archive modified with new status from frontend)
 * @param report 
 * @returns 
 */
export async function updateAndArchiveReport(id: number, status: ('Pending' | 'Accepted' | 'Rejected')) {
    const reportToUpdate = await AppDataSource.manager.findOneBy(Report, {
        id: id,
    })

    if (reportToUpdate) {
        reportToUpdate.status = status ? status : "Pending";

        return await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.remove(Report, reportToUpdate);
            await transactionalEntityManager.insert(Archive, reportToUpdate);
        })
            .then(async () => {
                await axios.post(reportToUpdate.callbackUrl, { reportToUpdate })
                    .catch(() => { console.log("CALLBACK URL SENDING FAILURE")}) //implement rollback transaction logic
            })
            .catch(() => { throw new Error("Transaction Failed") })
    }

    throw new Error("Entity Not Found");
}


/**
 * Updates Report
 * @param report 
 * @returns 
 */
export async function updateReport(id: number, report: ReportType) {
    const reportToUpdate = await findReport(id)

    if (reportToUpdate) {
        reportToUpdate.id = id;
        reportToUpdate.userId = report.userId;
        reportToUpdate.imagePath = report.imagePath;
        reportToUpdate.callbackUrl = report.callbackUrl;
        reportToUpdate.prefilterReport = report.prefilterReport;
        reportToUpdate.prefilterReportScore = report.prefilterReportScore;
        //reportToUpdate.status = report.status (maybe if you want to implement archive patching)
        return AppDataSource.getRepository(Report).save(reportToUpdate);
    }

    throw new Error("Entity Not Found");
}

/**
 * Find A Single Report
 * @param id 
 * @returns 
 */
export async function findReport(id: number) {
    const report = await AppDataSource.getRepository(Report).findOne({ where: { id: id } });
    if (report) {
        return report
    } else {
        throw new Error("Entity Not Found");
    }
}

/**
 * Get All Reports
 * @returns 
 */
export function findAllReports() {
    return AppDataSource.getRepository(Report).find();
}

/**
 * Deletes Report
 * @param id 
 * @returns 
 */
export async function deleteReport(id: number) {
    const report = await findReport(id);
    if (report) {
        return AppDataSource.getRepository(Report).remove(report);
    }
    throw new Error("Entity Doesn't Exist");
}