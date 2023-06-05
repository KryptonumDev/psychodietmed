'use client'
import React, { useState } from "react"
import { Button } from "@/components/atoms/content-post-navigation-button"
import ScrollPercentBar from "@/components/atoms/scroll-percent-bar"
import { Image } from "@/components/atoms/image"
import { OpenNavButton } from "../../../assets/open-nav-button"
import styles from './styles.module.scss'

export default function ContentPostNavigation({ headings, author }) {

  const [isMobileOpened, setIsMobileOpened] = useState(false)

  return (
    <>
      <div className={`${styles.control} ${isMobileOpened ? styles.active : ''}`}>
        <div className={`${styles.open_nav} ${isMobileOpened ? styles.active : ''}`}>
          <button onClick={() => { setIsMobileOpened(!isMobileOpened) }}>
            <OpenNavButton />
          </button>
        </div>
        {author && (
          <div className={styles.flex}>
            <Image width='110' height='110' src={author.proffesional.personImage.mediaItemUrl} alt={author.proffesional.personImage.altText} className={styles.author_image} />
            <div>
              <p className={styles.author_name}>{author.title}</p>
              <p className={styles.author_proffesion}>{author.proffesional.proffesion}</p>
            </div>
          </div>
        )}
        <ScrollPercentBar />
        <ul>
          {headings?.map((heading, index) => (
            <li key={index} className="anim">
              <Button className={styles.button} heading={heading} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}