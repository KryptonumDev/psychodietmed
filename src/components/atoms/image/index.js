import React from "react"
import styles from './styles.module.scss'
import NextImage from "next/image"

export const Image = ({ loading = 'lazy', quality, width, height, src, alt, className, aspectRatio = false }) => (
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
    <NextImage loading={loading} quality={quality ? quality : '70'} src={src} alt={alt || ''} width={width} height={height} />
  </div>
)