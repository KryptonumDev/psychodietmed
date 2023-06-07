import React from "react"
import styles from "./styles.module.scss"
import { Butterfly } from "../../../assets/butterfly"
import { Diamond } from "../../../assets/diamond"
import { removeWrap } from "../../../utils/title-modification"

export default function Cards({ data: { title, leftColumnTitle, leftColumnList, rightColumnTitle, rightColumnList } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.grid}>
        <div className={styles.left}>
          <h3 dangerouslySetInnerHTML={{ __html: leftColumnTitle }} />
          {leftColumnList?.map((el, index) => (
            <div className={styles.item} key={index} >
              <Butterfly />
              <p dangerouslySetInnerHTML={{ __html: el.text }} />
            </div>
          ))}
        </div>
        <div className={styles.right}>
          <h3 dangerouslySetInnerHTML={{ __html: rightColumnTitle }} />
          {rightColumnList?.map((el, index) => (
            <div className={styles.item} key={index}>
              <Diamond />
              <p dangerouslySetInnerHTML={{ __html: el.text }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}