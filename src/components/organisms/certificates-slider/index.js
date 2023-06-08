'use client'
import React from "react"
import Image from "next/image";
import styles from './styles.module.scss';

import LightGallery from "lightgallery/react"
import 'lightgallery/css/lightgallery.css'

export default function Slider({ data }) {
  return (
    <LightGallery className='grid' mode="lg-fade">
      {data.map((el, index) => (
        <Image key={index} width={el.certificate.mediaDetails.width} height={el.certificate.mediaDetails.height} src={el.certificate.mediaItemUrl} alt={el.certificate.altText} className={styles.certificate} />

      ))}
    </LightGallery>
  )
}