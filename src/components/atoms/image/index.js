import React from "react"
import styles from './styles.module.scss'
import NextImage from "next/image"

export const Image = ({ loading = 'lazy', priority = false, quality, width, height, src, alt, className, aspectRatio = false, sizes }) => (
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
    <NextImage 
      loading={priority ? undefined : loading} 
      priority={priority}
      quality={quality ? quality : '70'} 
      src={src} 
      alt={alt || ''} 
      width={width} 
      height={height}
      sizes={sizes}
    />
  </div>
)