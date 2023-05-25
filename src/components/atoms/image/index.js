import React from "react"
import styles from './styles.module.scss'
import NextImage from "next/image"

export const Image = (props) => (
  <div style={{ width: `${props.width}px`, height: `${props.height}px` }} className={styles.wrapper}>
    <NextImage {...props} />
  </div>
)