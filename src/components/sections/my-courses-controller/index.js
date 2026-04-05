import React from "react"
import styles from './styles.module.scss'
import Content from "@/components/sections/my-courses-content";
import CallToAction from "../cooperate-cta";
import LogoutButton from "@/components/atoms/logout-button";

export default function Controller({ cta, corses }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Moje kursy</h1>
        <LogoutButton />
      </div>
      <div>
        <Content data={corses} />
        <CallToAction data={cta} />
      </div>
    </div>
  )
}