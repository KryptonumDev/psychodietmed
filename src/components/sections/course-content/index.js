'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import { Clock } from "../../../assets/clock"
import { Play } from "../../../assets/play"
import { Image } from "@/components/atoms/image"
import Link from "next/link"

function formatTime(minutes) {
  if (minutes > 60) {
    return Math.floor(minutes / 60) + ' godzin ' + minutes % 60 + ' minut'
  }
  return minutes + ' minut'
}

export default function Content({ disabled, slug, content, modules, author }) {
  const [expandedModules, setExpandedModules] = useState({})
  const [expandedChapters, setExpandedChapters] = useState({})
  const [expandedDescriptions, setExpandedDescriptions] = useState({})

  const toggleModule = (moduleIndex) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex]
    }))
  }

  const toggleChapter = (moduleIndex, chapterIndex) => {
    const key = `${moduleIndex}-${chapterIndex}`
    setExpandedChapters(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const toggleDescription = (moduleIndex, chapterIndex) => {
    const key = `${moduleIndex}-${chapterIndex}`
    setExpandedDescriptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <section className={styles.wrapper}>
      <div>
        <div className={styles.modules}>
          <h2>Program</h2>
          {modules?.map((module, moduleIndex) => {
            // Calculate module stats
            let moduleTime = 0
            let moduleLessonsCount = 0
            let moduleChaptersCount = module.chapters?.length || 0

            module.chapters?.forEach(chapter => {
              chapter.lessons?.forEach(lessonWrapper => {
                moduleTime += Number(lessonWrapper.lesson?.lesson?.time || 0)
                moduleLessonsCount++
              })
            })

            const isModuleExpanded = expandedModules[moduleIndex] !== false // Default to expanded

            return (
              <div key={moduleIndex} className={styles.module}>
                <button
                  type="button"
                  className={`${styles.moduleHeader} ${isModuleExpanded ? styles.expanded : ''}`}
                  onClick={() => toggleModule(moduleIndex)}
                  aria-expanded={isModuleExpanded}
                >
                  <div className={styles.moduleInfo}>
                    <h3>{module.title}</h3>
                    <div className={styles.moduleStats}>
                      <span><Clock color="#fff" />{formatTime(moduleTime)}</span>
                      <span>{moduleChaptersCount} rozdziałów</span>
                      <span>{moduleLessonsCount} lekcji</span>
                    </div>
                  </div>
                  <span className={styles.toggleIcon}>{isModuleExpanded ? '−' : '+'}</span>
                </button>

                {isModuleExpanded && (
                  <div className={styles.moduleContent}>
                    {/* Module description if available */}
                    {module.description && (
                      <div className={`${styles.moduleDescription} gutenberg`} dangerouslySetInnerHTML={{ __html: module.description }} />
                    )}

                    {module.chapters?.map((chapter, chapterIndex) => {
                      // Calculate chapter stats
                      let chapterTime = 0
                      let chapterLessonsCount = chapter.lessons?.length || 0

                      chapter.lessons?.forEach(lessonWrapper => {
                        chapterTime += Number(lessonWrapper.lesson?.lesson?.time || 0)
                      })

                      const chapterKey = `${moduleIndex}-${chapterIndex}`
                      const isChapterExpanded = expandedChapters[chapterKey] !== false // Default to expanded

                      return (
                        <div key={chapterIndex} className={styles.chapter}>
                          <button
                            type="button"
                            className={`${styles.chapterHeader} ${isChapterExpanded ? styles.expanded : ''}`}
                            onClick={() => toggleChapter(moduleIndex, chapterIndex)}
                            aria-expanded={isChapterExpanded}
                          >
                            <div className={styles.chapterInfo}>
                              <h4>Rozdział {moduleIndex + 1}.{chapterIndex + 1}: <span>{chapter.title}</span></h4>
                              <div className={styles.chapterStats}>
                                <span><Clock />{formatTime(chapterTime)}</span>
                                <span>{chapterLessonsCount} lekcji</span>
                              </div>
                            </div>
                            <span className={styles.toggleIcon}>{isChapterExpanded ? '−' : '+'}</span>
                          </button>

                          {isChapterExpanded && (
                            <div className={styles.chapterContent}>
                              {/* Chapter description if available - truncated with expand */}
                              {chapter.description && (
                                <div className={styles.chapterDescriptionWrapper}>
                                  <p className={`${styles.chapterDescription} ${expandedDescriptions[chapterKey] ? styles.expanded : ''}`}>
                                    {chapter.description}
                                  </p>
                                  {chapter.description.length > 200 && (
                                    <button
                                      type="button"
                                      className={styles.expandDescriptionBtn}
                                      onClick={() => toggleDescription(moduleIndex, chapterIndex)}
                                    >
                                      {expandedDescriptions[chapterKey] ? 'Zwiń' : 'Rozwiń'}
                                    </button>
                                  )}
                                </div>
                              )}

                              {/* Lessons */}
                              {chapter.lessons?.map((lessonWrapper, lessonIndex) => {
                                const lesson = lessonWrapper.lesson
                                const lessonNumber = `${moduleIndex + 1}.${chapterIndex + 1}.${lessonIndex + 1}`

                                if (disabled) {
                                  return (
                                    <span key={lesson?.id || lessonIndex} className={styles.lesson}>
                                      <h5 title={lesson?.title}>
                                        <strong>{lessonNumber}</strong>
                                        <span>{lesson?.title}</span>
                                      </h5>
                                      <span><Play />{lesson?.lesson?.time || 0} minut</span>
                                    </span>
                                  )
                                }

                                return (
                                  <Link key={lesson?.id || lessonIndex} href={`/moje-kursy/${slug}/${lesson?.slug}`} className={styles.lesson}>
                                    <h5 title={lesson?.title}>
                                      <strong>{lessonNumber}</strong>
                                      <span>{lesson?.title}</span>
                                    </h5>
                                    <span><Play />{lesson?.lesson?.time || 0} minut</span>
                                  </Link>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className={styles.aboutCourse}>
          <h2>O kursie</h2>
          <div className='gutenberg' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
      <aside>
        <div className={styles.author}>
          <p className={styles.authorTitle}>Autor kursu</p>
          <Image
            src={author?.proffesional?.avatar?.mediaItemUrl}
            alt={author?.proffesional?.avatar?.altText || ''}
            width={author?.proffesional?.avatar?.mediaDetails?.width}
            height={author?.proffesional?.avatar?.mediaDetails?.height}
            aspectRatio={true}
            className={styles.image}
          />
          <p className={styles.name}>{author?.title}</p>
          <small>{author?.proffesional?.proffesion}</small>
          {author?.proffesional?.courseExcerpt && (
            <p className={styles.excerpt}>{author.proffesional.courseExcerpt}</p>
          )}
        </div>
      </aside>
    </section>
  )
}