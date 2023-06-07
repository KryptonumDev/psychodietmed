import React from "react"
import styles from './styles.module.scss'
import NextImage from "next/image"

export const Image = ({ quality, width, height, src, alt, className, aspectRatio = false }) => (
  <div
    style={{
      width: `${width}px`,
      height: `${height}px`,
      aspectRatio: aspectRatio
        ? `${width}/${height}`
        : 'none'
    }}
    className={`${styles.wrapper} ${className}`}
  >
    <NextImage quality={quality} src={src} alt={alt} width={width} height={height} />
  </div>
)