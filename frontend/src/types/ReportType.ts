export type ReportType = {
    id: number,
    userId: number,
    callbackUrl: string,
    imagePath: string,
    prefilterReport: any,
    prefilterReportScore: number,
    status: 'Pending' | 'Accepted' | 'Rejected'
  }