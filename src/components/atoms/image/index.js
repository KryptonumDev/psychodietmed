import React from "react"
import styles from './styles.module.scss'
import NextImage from "next/image"

export const Image = ({ width, height, src, alt, className }) => (
  <div style={{ width: `${width}px`, height: `${height}px` }} className={`${styles.wrapper} ${className}`}>
    <NextImage src={src} alt={alt} width={width} height={height} />
  </div>
)