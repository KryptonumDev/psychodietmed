'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import { removeWrap } from "@/app/helpers/title-modification";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function ReviewsSlider({ data }) {
  const { title, text, comments } = data

  const [activeSlide, setActiveSlide] = useState(0)

  const dragEndHandler = (event, info) => {
    const offset = info.offset.x
    if (Math.abs(offset) > 5) {
      const direction = offset < 0 ? 1 : -1
      let nextSlide = 0
      if (direction === 1) {
        nextSlide = activeSlide + direction < comments.length ? activeSlide + direction : 0
      } else if (direction === -1) {
        nextSlide = activeSlide + direction >= 0 ? activeSlide + direction : comments.length - 1
      }
      setActiveSlide(nextSlide)
    }
  }
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <motion.div dragConstraints={{ left: 0, right: 0 }} drag="x" onDragEnd={dragEndHandler}>
        <AnimatePresence mode='popLayout'>
          {comments.map(({ text, author, after, before, boldText }, index) => {
            if (index !== activeSlide) {
              return null
            }
            return (
              <motion.div key={author.name + index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={(after?.mediaItemUrl && before?.mediaItemUrl) ? `${styles.slide}` : `${styles.wide} ${styles.slide}`} >
                <div className={styles.slideAuthor}>
                  <Image quality='90' src={author.avatar.mediaItemUrl} alt={author.avatar.altText} width={author.avatar.mediaDetails.width} height={author.avatar.mediaDetails.height} className={styles.slideAuthorImage} />
                  <div className={styles.slideAuthorName}>{author.name}</div>
                  <svg className={styles.svg} width="59" height="58" viewBox="0 0 59 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_578_1245)">
                      <path d="M19.8333 9.66504H10.1667C7.60291 9.66504 5.14415 10.6835 3.3313 12.4963C1.51845 14.3092 0.5 16.7679 0.5 19.3317L0.5 28.9984C0.5 30.2803 1.00922 31.5096 1.91565 32.4161C2.82208 33.3225 4.05145 33.8317 5.33333 33.8317H19.6158C19.0424 37.2067 17.2946 40.2704 14.6811 42.4814C12.0676 44.6925 8.75667 45.9087 5.33333 45.915C4.69239 45.915 4.0777 46.1697 3.62449 46.6229C3.17128 47.0761 2.91667 47.6908 2.91667 48.3317C2.91667 48.9726 3.17128 49.5873 3.62449 50.0406C4.0777 50.4938 4.69239 50.7484 5.33333 50.7484C10.4591 50.7426 15.3733 48.7039 18.9977 45.0794C22.6222 41.455 24.6609 36.5408 24.6667 31.415V14.4984C24.6667 13.2165 24.1574 11.9871 23.251 11.0807C22.3446 10.1743 21.1152 9.66504 19.8333 9.66504Z" fill="#E4EEF7" />
                      <path d="M53.6673 9.66504H44.0007C41.4369 9.66504 38.9781 10.6835 37.1653 12.4963C35.3524 14.3092 34.334 16.7679 34.334 19.3317V28.9984C34.334 30.2803 34.8432 31.5096 35.7496 32.4161C36.6561 33.3225 37.8854 33.8317 39.1673 33.8317H53.4498C52.8764 37.2067 51.1286 40.2704 48.5151 42.4814C45.9016 44.6925 42.5906 45.9087 39.1673 45.915C38.5264 45.915 37.9117 46.1697 37.4585 46.6229C37.0053 47.0761 36.7507 47.6908 36.7507 48.3317C36.7507 48.9726 37.0053 49.5873 37.4585 50.0406C37.9117 50.4938 38.5264 50.7484 39.1673 50.7484C44.2931 50.7426 49.2072 48.7039 52.8317 45.0794C56.4561 41.455 58.4949 36.5408 58.5007 31.415V14.4984C58.5007 13.2165 57.9914 11.9871 57.085 11.0807C56.1786 10.1743 54.9492 9.66504 53.6673 9.66504Z" fill="#E4EEF7" />
                    </g>
                  </svg>
                </div>
                <div className={styles.slideText} dangerouslySetInnerHTML={{ __html: text }} />
                {/* <Link href='#' className={styles.slideLink}>Placeholder</Link> */}
                {after?.mediaItemUrl && before?.mediaItemUrl ? (
                  <div className={styles.slideImages}>
                    <Image quality='90' src={before.mediaItemUrl} alt={before.altText} width={before.mediaDetails.width} height={before.mediaDetails.height} className={`${styles.before} ${styles.image}`} />
                    <Image quality='90' src={after.mediaItemUrl} alt={after.altText} width={after.mediaDetails.width} height={after.mediaDetails.height} className={`${styles.after} ${styles.image}`} />
                  </div>
                ) : (
                  <div className={styles.slideBoldText} dangerouslySetInnerHTML={{ __html: removeWrap(boldText) }} />
                )}

              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
      <div className={styles.control}>
        <button aria-label='strzałka w lewo' onClick={() => { setActiveSlide(activeSlide - 1 >= 0 ? activeSlide - 1 : data.comments.length - 1) }}>
          <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.625 20.1666H16.875L23.0437 14.135C23.2195 13.9646 23.359 13.7618 23.4542 13.5384C23.5494 13.315 23.5984 13.0753 23.5984 12.8333C23.5984 12.5913 23.5494 12.3517 23.4542 12.1283C23.359 11.9049 23.2195 11.7021 23.0437 11.5317C22.6924 11.1902 22.2172 10.9985 21.7219 10.9985C21.2265 10.9985 20.7513 11.1902 20.4 11.5317L12.3563 19.415C11.652 20.0995 11.2542 21.0291 11.25 22C11.2591 22.9645 11.6566 23.8867 12.3563 24.5666L20.4 32.45C20.5748 32.6197 20.7821 32.7541 21.0101 32.8455C21.238 32.9369 21.4821 32.9835 21.7285 32.9826C21.9749 32.9818 22.2187 32.9335 22.4459 32.8405C22.6732 32.7476 22.8795 32.6117 23.0531 32.4408C23.2267 32.2699 23.3642 32.0672 23.4576 31.8443C23.5511 31.6214 23.5988 31.3827 23.5979 31.1418C23.597 30.9009 23.5477 30.6626 23.4526 30.4403C23.3575 30.2181 23.2186 30.0164 23.0437 29.8466L16.875 23.8333H35.625C36.1223 23.8333 36.5992 23.6402 36.9508 23.2963C37.3025 22.9525 37.5 22.4862 37.5 22C37.5 21.5137 37.3025 21.0474 36.9508 20.7036C36.5992 20.3598 36.1223 20.1666 35.625 20.1666Z" fill="#194574" />
          </svg>
        </button>
        {data.comments.map((el, index) => (
          <button aria-label={`komentarz numer ${index + 1}`} onClick={() => { setActiveSlide(index) }} className={index === activeSlide ? `${styles.active} ${styles.dot}` : styles.dot} key={index} />
        ))}
        <button aria-label='strzałka w prawo' onClick={() => { setActiveSlide(activeSlide + 1 < data.comments.length ? activeSlide + 1 : 0) }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.9997 22.0002C32.9908 21.0357 32.6021 20.1135 31.918 19.4335L24.053 11.5502C23.7095 11.2087 23.2448 11.0171 22.7605 11.0171C22.2762 11.0171 21.8115 11.2087 21.468 11.5502C21.2962 11.7206 21.1598 11.9234 21.0667 12.1468C20.9736 12.3702 20.9257 12.6099 20.9257 12.8519C20.9257 13.0939 20.9736 13.3335 21.0667 13.5569C21.1598 13.7803 21.2962 13.9831 21.468 14.1535L27.4997 20.1669H9.16634C8.68011 20.1669 8.2138 20.36 7.86998 20.7038C7.52616 21.0477 7.33301 21.514 7.33301 22.0002C7.33301 22.4864 7.52616 22.9527 7.86998 23.2966C8.2138 23.6404 8.68011 23.8335 9.16634 23.8335H27.4997L21.468 29.8652C21.1228 30.208 20.9279 30.6739 20.9262 31.1604C20.9244 31.6469 21.116 32.1141 21.4588 32.4594C21.8016 32.8046 22.2675 32.9995 22.754 33.0012C23.2405 33.0029 23.7078 32.8113 24.053 32.4685L31.918 24.5852C32.6066 23.9007 32.9956 22.9711 32.9997 22.0002V22.0002Z" fill="#194574" />
          </svg>
        </button>
      </div>
    </section >
  )
}