'use client'
import React, { useRef } from "react"
import Link from "next/link"
import styles from './styles.module.scss';
import Image from "next/image";
import { removeWrap } from "@/app/helpers/title-modification";
import { motion } from "framer-motion";

export default function Hero({ data }) {
  const { pageTitle, link, content, image, logos } = data
  const constraintsRef = useRef(null)
  return (
    <section ref={constraintsRef} className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.info_content}>
          <h1 dangerouslySetInnerHTML={{ __html: removeWrap(pageTitle) }} />
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <Link className="link" href={link.url}>
            {link.title}
          </Link>
        </div>
        <Image loading="eager" className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
      </div>
      <motion.div dragConstraints={constraintsRef} drag="x" className={styles.logos_wrapper}>
        {logos.map(({ logo }, index) => (
          <Image key={index} className={styles.logo} src={logo.mediaItemUrl} alt={logo.altText} width={logo.mediaDetails.width} height={logo.mediaDetails.height} />
        ))}
      </motion.div>
    </section>
  )
}