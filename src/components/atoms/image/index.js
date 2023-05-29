import React from "react"
import styles from './styles.module.scss'
import NextImage from "next/image"

export const Image = (props) => (
  <div style={{ width: `${props.width}px`, height: `${props.height}px` }} className={`${styles.wrapper} ${props.className}`}>
    <NextImage src={props.src} alt={props.alt} width={props.width} height={props.height} />
  </div>
)