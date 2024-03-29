import React from "react"
import styles from "./styles.module.scss"
import { Butterfly } from "../../../assets/butterfly"
import { Diamond } from "../../../assets/diamond"

export default function Cards({ data: { leftColumnTitle, leftColumnList, rightColumnTitle, rightColumnList } }) {
  if (!leftColumnList || !rightColumnList) return null

  return (
    <section className={styles.wrapper}>
      <div className={styles.grid}>
        {leftColumnList && (
          <div className={styles.left}>
            <h3 dangerouslySetInnerHTML={{ __html: leftColumnTitle }} />
            {leftColumnList?.map((el, index) => (
              <div className={styles.item} key={index} >
                <Butterfly />
                <p dangerouslySetInnerHTML={{ __html: el.text }} />
              </div>
            ))}
          </div>
        )}
        {rightColumnList && (
          <div className={styles.right}>
            <h3 dangerouslySetInnerHTML={{ __html: rightColumnTitle }} />
            {rightColumnList?.map((el, index) => (
              <div className={styles.item} key={index}>
                <Diamond />
                <p dangerouslySetInnerHTML={{ __html: el.text }} />
              </div>
            ))}
          </div>)}
      </div>
    </section>
  )
}