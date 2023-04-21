'use client'
import React, { useEffect, useRef } from "react"
import Link from "next/link"
import styles from './styles.module.scss';
import Image from "next/image";
import { removeWrap } from "@/app/helpers/title-modification";
import { motion } from "framer-motion";

export default function Hero({ data }) {
  const { pageTitle, link, content, image, logos } = data
  const constraintsRef = useRef(null)

  useEffect(() => {
    const orphans = ['a', 'i', 'o', 'u', 'w', 'z', 'np.'];
    const orphansRegex = new RegExp(` (${orphans.join('|')}) `, 'gi');

    if (typeof window !== 'undefined') {
      const paragraphs = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, a, button'));
      paragraphs.forEach(paragraph =>
        paragraph.childNodes.forEach(node =>
          node?.nodeType === Node.TEXT_NODE && (node.textContent = node.textContent.replace(orphansRegex, ` $1\u00A0`))
        )
      );
    }
  }, [])

  return (
    <section ref={constraintsRef} className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.info_content}>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(pageTitle) }} />
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: content }} />
          <Link className={styles.link + " link"} href={link.url}>
            {link.title}
          </Link>
        </div>
        <Image loading="eager" className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
      </div>
      <motion.div dragConstraints={constraintsRef} drag="x" className={styles.logos_wrapper}>
        {logos.map(({ logo, link }, index) => (
          <a target="__blank" rel='noreferer noopener' href={link} aria-label="prowadzi do artykuła nowostnego o Psycho diet med" key={index} >
            <Image className={styles.logo} src={logo.mediaItemUrl} alt={logo.altText} width={logo.mediaDetails.width} height={logo.mediaDetails.height} />
          </a>
        ))}
      </motion.div>
    </section>
  )
}