import React from "react"
import { Diplom } from "../../../assets/diplom"
import styles from './styles.module.scss'
import { Badge } from "../../../assets/badge"
import { CursorFinger } from "../../../assets/cursor-finger"
import Slider from "@/components/organisms/certificates-slider"

export default function Flex({ content, diploms, courses, certificates }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.left_column}>
        <div className={styles.blue_box}>
          {diploms.map(el => (
            <div className={styles.item}>
              <Diplom />
              <span>{el.diplom}</span>
            </div>
          ))}
          {courses.map(el => (
            <div className={styles.item}>
              <Badge />
              <span>{el.course}</span>
            </div>
          ))}
        </div>
        {certificates?.length > 0 && (<>
          <div className={styles.flex}>
            <CursorFinger />
            <span>Zobacz moje certyfikaty</span>
          </div>
          <Slider data={certificates} />
        </>
        )}
      </div>
      <div className={styles.right_column} dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  )
}