import Link from "next/link"
import React from "react"
import styles from './styles.module.scss'
import Slider from "@/components/organisms/posts-slider"
import { htmlDelete } from "../../../utils/delete-html"

export default function OtherPosts({ data, text, title }) {
  return (
    <section>
      <div className={styles.flex}>
        <div className={styles.text}>
          <h2>{title ? htmlDelete(title) : 'Zobacz również'}</h2>
          {text && (
            <div dangerouslySetInnerHTML={{ __html: text }} />
          )}
        </div>
        <Link className={`link ${styles.link}`} href='/kontakt'>Umów wizytę</Link>
      </div>
      <Slider data={data} />
      <Link className={`link ${styles.blog}`} href='/blog'>Przejdź na bloga</Link>
    </section>
  )

}