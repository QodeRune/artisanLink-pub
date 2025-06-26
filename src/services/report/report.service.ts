// src/services/report/report.service.ts
import type { IResponseDTO } from "@/types"
import { api, ReportEndpoints } from "../api"

export const reportService = {
  getReportList: async ({ user_id }: { user_id: String }) => {
    const endpoint = `${ReportEndpoints.REPORT_LIST}/${user_id}`
    const reportData = await api.authenticatedGet<IResponseDTO<any[]>>({
      endpoint: endpoint,
    })
    console.log(reportData)

    if (!reportData["success"]) {
      throw new Error("error fetching resource")
    }
    const { data } = reportData
    return data
  },
  downloadReport: async ({
    user_id,
    questionnaire_id,
  }: // fileName,
  {
    user_id: String
    questionnaire_id: String
    fileName?: string
  }) => {
    return await api.download({
      endpoint: `${ReportEndpoints.DOWNLOAD_REPORT}/${user_id}/${questionnaire_id}`,
      // config: {body: {fileName:}}
    })
  },
}
