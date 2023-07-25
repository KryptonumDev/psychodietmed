'use client'
import React from "react"
import styles from './styles.module.scss'
import { Share } from "../../../assets/share"
import { Hearth } from "../../../assets/hearth"
import Form from "@/components/moleculas/comment-form"

export default function Contact({ title, excerpt }) {

  const shareData = {
    title: title || '',
    text: excerpt || '',
    url: window.location.href,
  };

  const handleShare = async (e) => {
    await navigator.share(shareData);
  }

  return (
    <div>
      <div className={styles.social}>
        {/* <div className={styles.info}>
          <Hearth />
          <span>Polub artykuł</span>
        </div> */}
        <button onClick={(e) => handleShare(e)} className={styles.info}>
          <Share />
          <span>Udostępnij artykuł</span>
        </button>
      </div>
      <Form />
    </div>
  )
}