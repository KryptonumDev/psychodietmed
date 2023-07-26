'use client'
import React from "react"
import { InlineWidget } from "react-calendly"
import "./styles.css"

export default function Calendar({ calendlyUrl }) {
  if (!calendlyUrl) return null

  return (
    <div>
      <iframe className="calendesk-frame" src="https://au8s6ssfmk.calendesk.net/" scrolling="yes" title="Kryptonum" frameBorder="0"></iframe>
      {/* <InlineWidget url={calendlyUrl} /> */}
    </div>
  )
}