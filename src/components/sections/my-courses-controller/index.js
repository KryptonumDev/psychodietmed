import React from "react"
import styles from './styles.module.scss'
import Content from "@/components/sections/my-courses-content";
import CallToAction from "../cooperate-cta";

export default function Controller({ cta, corses }) {
  return (
    <div className={styles.wrapper}>
      <h1>Moje kursy</h1>
      <div>
        <Content data={corses} />
        <CallToAction data={cta} />
      </div>
    </div>
  )
}