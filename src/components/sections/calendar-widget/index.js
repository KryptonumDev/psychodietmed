import React from "react"
import "./styles.css"

export default function Calendar({ code }) {
  if (!code) return null

  return (
    <section id='kalendarz'>
      {/* <iframe className="calendesk-frame" src="https://yypv0aiygw.calendesk.net/" scrolling="yes" title="PsychoDietMed" frameBorder="0"></iframe> */}
      <iframe class="calendesk-frame" src={code} title="PsychoDietMed" frameBorder="0"></iframe>
    </section>
  )
}