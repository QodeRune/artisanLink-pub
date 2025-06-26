// src/views/ProfileReports.tsx
import { reportService } from "@/services"
import { useUserHook } from "@/store"
import { useEffect, useState, type FC, type ReactNode } from "react"
import { useToast } from "@/core"
import { ArticleItemCard } from "@/components"
import clsx from "clsx"

export const ProfileReports: FC<{ className?: string; pageIntro?: ReactNode }> = ({ className, pageIntro }) => {
  const [reports, setReports] = useState<any[] | null>(null)
  const { addToast } = useToast()
  const { user: _user } = useUserHook()
  const user = Array.isArray(_user) ? _user[0] : _user

  const user_id = user.id

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportList = await reportService.getReportList({ user_id })
        setReports(reportList ?? [])
      } catch (err) {
        console.log(err)
        addToast({
          title: "",
          message: "Failed to load reports.",
          type: "error",
          size: "md",
          position: "top-right",
          duration: 3000,
        })
        setReports([])
      }
    }

    fetchReports()
  }, [user_id])

  const handleDownload = async ({ questionnaire_id, fileName }: { questionnaire_id: string; fileName?: string }) => {
    try {
      const isDownloaded = await reportService.downloadReport({
        user_id: user_id,
        questionnaire_id: questionnaire_id,
        fileName: fileName,
      })
      if (isDownloaded) {
        addToast({
          title: "",
          message: "Download Successful.",
          type: "success",
          size: "md",
          position: "top-right",
          duration: 3000,
        })
      }
    } catch (error) {}
  }

  const ReportList = () => {
    if (!reports || reports.length === 0) {
      return (
        <div className="u-text-center ">
          <p className="u-text-body-md">No reports available at the moment.</p>
        </div>
      )
    }

    return (
      <section className="profile-reports">
        {reports.map((report) => {
          const questionnaire_id = report.questionnaire_id

          return (
            <ArticleItemCard
              onClick={() => handleDownload({ questionnaire_id: questionnaire_id })}
              key={questionnaire_id}
              title={report.title}
            />
          )
        })}
      </section>
    )
  }

  const reportClasses = clsx([
    "profile-report grid-section scroll-y u-padding-block-end-sm .u-padding-bottom-sm article-card-item-list-page",
    className,
  ])

  const PageIntro = () => pageIntro ?? <h1 className="u-bold-text padding-inline-lg">Profile Reports</h1>

  return (
    <section className={reportClasses}>
      <PageIntro />
      <ReportList />
    </section>
  )
}
