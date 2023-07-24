'use client'
import React from "react"
import { InlineWidget } from "react-calendly"

export default function Calendar({ calendlyUrl }) {
  if (!calendlyUrl) return null

  return (
    <div>
      <InlineWidget url={calendlyUrl} />
    </div>
  )
}