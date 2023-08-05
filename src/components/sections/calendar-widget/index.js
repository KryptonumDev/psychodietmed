import React from "react"
import "./styles.css"

export default function Calendar({ calendlyUrl }) {
  if (!calendlyUrl) return null

  return (
    <div>
      <iframe class="calendesk-frame" src="https://yypv0aiygw.calendesk.net/" scrolling="yes" title="PsychoDietMed" frameBorder="0"></iframe>
      {/* <iframe class="calendesk-frame" src="https://06bfebkar8.calendesk.net/" scrolling="yes" title="PsychoDietMed" frameBorder="0"></iframe> */}
    </div>
  )
}