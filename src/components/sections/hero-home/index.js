'use client'
import React, { useRef } from "react"
import Link from "next/link"
import styles from './styles.module.scss';
import Image from "next/image";
import { motion } from "framer-motion";
import { removeWrap } from "../../../utils/title-modification";
import Button from "@/components/atoms/button";

export default function Hero({ data }) {
  const { pageTitle, link, content, image, logos } = data
  const constraintsRef = useRef(null)

  return (
    <section ref={constraintsRef} className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.info_content}>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(pageTitle) }} />
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
          <Button href={link.url}>{link.title}</Button>
        </div>
        <Image priority className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <motion.div dragConstraints={constraintsRef} drag="x" className={styles.logos_wrapper}>
        {logos.map(({ logo, link }, index) => (
          <Link href={link} aria-label="Artykuł o PsychoDietMed w zewnętrznym medium" key={index} >
            <Image className={styles.logo} src={logo.mediaItemUrl} alt={logo.altText} width={logo.mediaDetails.width} height={logo.mediaDetails.height} />
          </Link>
        ))}
      </motion.div>
    </section>
  )
}
