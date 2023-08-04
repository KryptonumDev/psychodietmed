'use client'
import React from "react"
import styles from './styles.module.scss'
import { Clock } from "../../../assets/clock"
import { Play } from "../../../assets/play"
import { Image } from "@/components/atoms/image"
import Link from "next/link"

export default function Content({ disabled, slug, content, chapters, author }) {
  return (
    <section className={styles.wrapper}>
      <div>
        <h2>O kursie</h2>
        <div className='gutenberg' dangerouslySetInnerHTML={{ __html: content }} />
        <div className={styles.chapters}>
          <h2>Program</h2>
          {chapters.map((chapter, index) => {
            let totalTime = 0
            let chapterCount = 0
            chapter.lessons.forEach(el => {
              totalTime += Number(el.lesson.lesson.time)
              chapterCount++
            })

            if (totalTime > 60) {
              totalTime = Math.floor(totalTime / 60) + ' godzin ' + totalTime % 60 + ' minut'
            } else {
              totalTime = totalTime + ' minut'
            }

            return (
              <div key={index} className={styles.chapter}>
                <div className={styles.info}>
                  <h3>Rozdział {index + 1} <span>{chapter.title}</span></h3>
                  <span><Clock />{totalTime}</span>
                  <span>{chapterCount} lekcje</span>
                </div>
                {chapter.lessons.map((el, inI) => {
                  if (disabled) {
                    return (
                      <span key={inI} className={styles.lesson}>
                        <h4 title={el.lesson.title}><strong>{index + 1}.{inI + 1}</strong><span>{el.lesson.title}</span></h4>
                        <span><Play />{el.lesson.lesson.time} minut</span>
                      </span>
                    )
                  }

                  return (
                    <Link key={inI} href={`/moje-kursy/${slug}/${el.lesson.slug}`} className={styles.lesson}>
                      <h4 title={el.lesson.title}><strong>{index + 1}.{inI + 1}</strong><span>{el.lesson.title}</span></h4>
                      <span><Play />{el.lesson.lesson.time} minut</span>
                    </Link>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      <aside>
        <div className={styles.author}>
          <p className={styles.authorTitle}>Autor kursu</p>
          <Image
            src={author.proffesional.avatar.mediaItemUrl}
            alt={author.proffesional.avatar.altText}
            width={author.proffesional.avatar.mediaDetails.width}
            height={author.proffesional.avatar.mediaDetails.height}
            aspectRatio={true}
            className={styles.image}
          />
          <p className={styles.name}>{author.title}</p>
          <small>{author.proffesional.proffesion}</small>
          {author.proffesional.courseExcerpt && (
            <p className={styles.excerpt}>{author.proffesional.courseExcerpt}</p>
          )}
        </div>
      </aside>
    </section>
  )
}