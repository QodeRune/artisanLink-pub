// src/views/assessment/RenderOptions.tsx
import type { IRenderOptionProps } from "@/types"
import { OptionItem } from "./OptionItem"

export const RenderOptions = ({ options, isRequired = false, ...rest }: IRenderOptionProps) => {
  const topLevelOptions = options.filter((opt) => opt.level === "top")
  const subOptions = options.filter((opt) => opt.level === "sub")

  return (
    <>
      {topLevelOptions.map((opt) => {
        const { questionnaireId, questionId } = opt
        const children = subOptions.filter((child) => child.parentOption_id === opt.id)
        return (
          <OptionItem
            isRequired={isRequired}
            key={opt.id}
            questionnaireId={rest.questionnaireId ?? questionnaireId}
            questionId={rest.questionId ?? questionId}
            option={opt}
            subOptions={children}
          />
        )
      })}
    </>
  )
}
