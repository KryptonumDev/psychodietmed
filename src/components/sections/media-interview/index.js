'use client'
import InterviewImage from "@/components/organisms/interview-image"
import InterviewText from "@/components/organisms/interview-two-column"
import React from "react"

export default function Interview({ data }) {
  return (
    <>
      {data.map((item, index) => {
        switch (item.fieldGroupName) {
          case "Medium_Media_InterviewSection_QuestionAndImage":
            return <InterviewImage key={index} data={item} />
          case "Medium_Media_InterviewSection_QuestionAndTwoColumnAnswer":
            return <InterviewText key={index} data={item} />
          default:
            return <div> Błąd w CMS, proszę napisać do administratora systemu </div>
        }
      })}
    </>
  )
}