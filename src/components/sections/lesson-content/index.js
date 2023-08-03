'use client'
import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"
import { RightArrow } from "../../../assets/right-arrow"
import { LeftArrow } from "../../../assets/left-arrow"
import { Clock } from "../../../assets/clock"
import { Play } from "../../../assets/play"

export default function Content({ chapters, content, databaseId, video, params }) {

  let prev = null
  let next = null
  let totalTime = 0
  let chapterCount = 0

  const currentChapter = (() => {
    let chapter = null
    chapters.forEach((el, i) => {
      el.lessons.forEach((inEl, inI) => {
        if (inEl.lesson.databaseId === databaseId) {
          prev = el.lessons[inI - 1] ? `/akademia/${params.course}/${el.lessons[inI - 1].lesson.slug}` : null 
          next = el.lessons[inI + 1] ? `/akademia/${params.course}/${el.lessons[inI + 1].lesson.slug}` : null 
          chapter = { ...el, chapterNumber: i + 1 }
        }
      })
    });
    return chapter
  })()

  currentChapter.lessons.forEach(el => {
    totalTime += Number(el.lesson.lesson.time)
    chapterCount++
  })

  if (totalTime > 60) {
    totalTime = Math.floor(totalTime / 60) + ' godzin ' + totalTime % 60 + ' minut'
  } else {
    totalTime = totalTime + ' minut'
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.video}>
        <iframe className={styles.frame} frameBorder="0" src={video} title='Filmik' />
        <div className={styles.flex}>
          {prev ? (
            <Link href={prev}>
              <LeftArrow />
              Poprzednia lekcja
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next}>
              Następna lekcja
              <RightArrow />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <h2>O lekcji</h2>
        <div className='gutenberg' dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <aside className={styles.aside}>
        <p>Rozdział {currentChapter.chapterNumber}</p>
        <p>{currentChapter.title}</p>
        <div className={styles.flex}>
          <span>{chapterCount} lekcje</span>
          <span><Clock />{totalTime}</span>
        </div>
        {currentChapter.lessons.map((el, index) => (
          <div className={styles.lesson}>
            <h4 title={el.lesson.title}><strong>{currentChapter.chapterNumber}.{index + 1}</strong><span>{el.lesson.title}</span></h4>
            <span><Play />{el.lesson.lesson.time} minut</span>
          </div>
        ))}
      </aside>
    </section>
  )
}