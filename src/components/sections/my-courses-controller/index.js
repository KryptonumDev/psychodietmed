import React from "react"
import styles from './styles.module.scss'
import Content from "@/components/sections/my-courses-content";
import CallToAction from "../cooperate-cta";

export default function Controller({ cta, user }) {
  return (
    <div className={styles.wrapper}>
      <h1>Moje kursy</h1>
      <div>
        <Content data={user.courses} />
        <CallToAction data={cta} />
      </div>
    </div>
  )
}