'use client'
import React, { useEffect, useState } from "react"
import { htmlDelete } from "../../../utils/delete-html"
import { CursorFinger } from "../../../assets/cursor-finger"
import IllnesGrid from "@/components/moleculas/illnes-grid-with-popup"
import styles from './styles.module.scss'

export default function Flex({ title, text, resultTitle, result, problems }) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const escFunction = (event) => {
      if (event.keyCode === 27) {
        setActive(null)
      }
    }
    document.addEventListener("keydown", escFunction, false)

    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [setActive])

  return (
    <div className={styles.info_flex}>
      <div onClick={() => { setActive(null) }} className={`${styles.text_part} ${active !== null ? styles.blurred : ''} `}>
        <h1 dangerouslySetInnerHTML={{ __html: htmlDelete(title) }} />
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <div className={styles.right_column}>
        <p className={styles.result}><span>{resultTitle}</span> {result}</p>
        <div className={styles.problems}>
          <p>Z czym się zmagałam?</p>
          <p><CursorFinger /> Kliknij, aby dowiedzieć się więcej</p>
        </div>
        <IllnesGrid active={active} setActive={setActive} problems={problems} />
      </div>
    </div>
  )
}