'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import { removeWrap } from "@/app/helpers/title-modification";
import Image from "next/image";
import Link from "next/link";

export default function ReviewsSlider({ data }) {
  const { title, text, comments } = data

  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <div >
        {comments.map(({ text, author, after, before }, index) => (
          <div className={activeSlide === index ? `${styles.active} ${styles.slide}` : `${styles.slide}`} key={index}>
            <div className={styles.slideContent}>
              <div className={styles.slideAuthor}>
                <Image src={author.avatar.mediaItemUrl} alt={author.avatar.altText} width={author.avatar.mediaDetails.width} height={author.avatar.mediaDetails.height} className={styles.slideAuthorImage} />
                <div className={styles.slideAuthorName}>{author.name}</div>
                <svg className={styles.svg} width="59" height="58" viewBox="0 0 59 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_578_1245)">
                    <path d="M19.8333 9.66504H10.1667C7.60291 9.66504 5.14415 10.6835 3.3313 12.4963C1.51845 14.3092 0.5 16.7679 0.5 19.3317L0.5 28.9984C0.5 30.2803 1.00922 31.5096 1.91565 32.4161C2.82208 33.3225 4.05145 33.8317 5.33333 33.8317H19.6158C19.0424 37.2067 17.2946 40.2704 14.6811 42.4814C12.0676 44.6925 8.75667 45.9087 5.33333 45.915C4.69239 45.915 4.0777 46.1697 3.62449 46.6229C3.17128 47.0761 2.91667 47.6908 2.91667 48.3317C2.91667 48.9726 3.17128 49.5873 3.62449 50.0406C4.0777 50.4938 4.69239 50.7484 5.33333 50.7484C10.4591 50.7426 15.3733 48.7039 18.9977 45.0794C22.6222 41.455 24.6609 36.5408 24.6667 31.415V14.4984C24.6667 13.2165 24.1574 11.9871 23.251 11.0807C22.3446 10.1743 21.1152 9.66504 19.8333 9.66504Z" fill="#E4EEF7" />
                    <path d="M53.6673 9.66504H44.0007C41.4369 9.66504 38.9781 10.6835 37.1653 12.4963C35.3524 14.3092 34.334 16.7679 34.334 19.3317V28.9984C34.334 30.2803 34.8432 31.5096 35.7496 32.4161C36.6561 33.3225 37.8854 33.8317 39.1673 33.8317H53.4498C52.8764 37.2067 51.1286 40.2704 48.5151 42.4814C45.9016 44.6925 42.5906 45.9087 39.1673 45.915C38.5264 45.915 37.9117 46.1697 37.4585 46.6229C37.0053 47.0761 36.7507 47.6908 36.7507 48.3317C36.7507 48.9726 37.0053 49.5873 37.4585 50.0406C37.9117 50.4938 38.5264 50.7484 39.1673 50.7484C44.2931 50.7426 49.2072 48.7039 52.8317 45.0794C56.4561 41.455 58.4949 36.5408 58.5007 31.415V14.4984C58.5007 13.2165 57.9914 11.9871 57.085 11.0807C56.1786 10.1743 54.9492 9.66504 53.6673 9.66504Z" fill="#E4EEF7" />
                  </g>
                </svg>
              </div>
              <div className={styles.slideText} dangerouslySetInnerHTML={{ __html: text }} />
            </div>
            <Link href='#' className={styles.slideLink}>Placeholder</Link>
            <div className={styles.slideImages}>
              <Image src={after.mediaItemUrl} alt={after.altText} width={after.mediaDetails.width} height={after.mediaDetails.height} className={`${styles.after} ${styles.image}`} />
              <Image src={before.mediaItemUrl} alt={before.altText} width={before.mediaDetails.width} height={before.mediaDetails.height} className={`${styles.before} ${styles.image}`} />
            </div>
          </div>
        ))
        }
      </div >

      {/* <Control>
        <button aria-label='strzałka w lewo' onClick={() => { setActiveSlide(activeSlide - 1 >= 0 ? activeSlide - 1 : 0) }}>
          <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" transform="translate(0.715698 0.480469)" fill="white" />
            <path d="M11.381 32.4805L54.0471 32.4805" stroke="#0F3730" strokeWidth="1.5" strokeLinecap="square" />
            <path d="M26.4748 17.387C26.4748 25.1463 19.6413 32.4805 11.3813 32.4805" stroke="#0F3730" strokeWidth="1.5" strokeLinecap="square" />
            <path d="M26.4748 47.5739C26.4748 39.8146 19.6413 32.4805 11.3813 32.4805" stroke="#0F3730" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
        {data.comments.map((el, index) => (
          <button aria-label={`komentarz numer ${index + 1}`} onClick={() => { setActiveSlide(index) }} className={index === activeSlide ? 'active dot' : "dot"} key={index} />
        ))}
        <button aria-label='strzałka w prawo' onClick={() => { setActiveSlide(activeSlide + 1 < data.comments.length ? activeSlide + 1 : activeSlide) }}>
          <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" transform="translate(0.284241 0.480469)" fill="white" />
            <path d="M53.615 32.4805L10.949 32.4805" stroke="#0F3730" strokeWidth="1.5" strokeLinecap="square" />
            <path d="M38.5225 47.5739C38.5225 39.8146 45.3561 32.4805 53.616 32.4805" stroke="#0F3730" strokeWidth="1.5" strokeLinecap="square" />
            <path d="M38.5225 17.387C38.5225 25.1463 45.3561 32.4805 53.616 32.4805" stroke="#0F3730" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
      </Control> */}
    </section >
  )
}