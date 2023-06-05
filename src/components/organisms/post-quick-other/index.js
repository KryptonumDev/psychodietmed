import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"
import { RightArrow } from "../../../assets/right-arrow"
import { LeftArrow } from "../../../assets/left-arrow"

export default function Other({ prev, next }) {

  return (
    <div className={styles.other}>
      {prev && (
        <Link className={styles.left} href={`/blog/${prev.slug}`}>
          <div>
            <LeftArrow />
            <span>Poprzedni artykuł</span>
          </div>
          <p>
            {prev.title}
          </p>
        </Link>
      )}
      {next && (
        <Link className={styles.right} href={`/blog/${next.slug}`}>
          <div>
            <span>Następny artykuł</span>
            <RightArrow />
          </div>
          <p>
            {next.title}
          </p>
        </Link>
      )}
    </div>
  )
}