import React from "react"
import styles from './styles.module.scss'
import { Share } from "../../../assets/share"
import { Hearth } from "../../../assets/hearth"
import Form from "@/components/moleculas/comment-form"

export default function Contact({ }) {
  return (
    <div>
      <div className={styles.social}>
        <div className={styles.info}>
          <Hearth />
          <span>Polub artykuł</span>
        </div>
        <div className={styles.info}>
          <Share />
          <span>Udostępnij artykuł</span>
        </div>
      </div>
      <Form />
    </div>
  )
}