'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import Link from "next/link"
import { RightArrow } from "../../../assets/right-arrow"
import { LeftArrow } from "../../../assets/left-arrow"
import { Clock } from "../../../assets/clock"
import { Play } from "../../../assets/play"

function formatTime(minutes) {
  if (minutes > 60) {
    return Math.floor(minutes / 60) + ' godzin ' + minutes % 60 + ' minut'
  }
  return minutes + ' minut'
}

export default function Content({ course, title, modules, content, databaseId, video, params, currentLessonId }) {
  // Build flat list of all lessons for navigation
  const allLessons = []
  let currentModuleInfo = null
  let currentChapterInfo = null
  let currentLessonIndex = -1

  modules?.forEach((module, moduleIndex) => {
    module.chapters?.forEach((chapter, chapterIndex) => {
      chapter.lessons?.forEach((lessonWrapper, lessonIndex) => {
        const lesson = lessonWrapper.lesson
        const lessonInfo = {
          id: lesson?.databaseId,
          slug: lesson?.slug,
          title: lesson?.title,
          time: lesson?.lesson?.time || 0,
          moduleIndex,
          chapterIndex,
          lessonIndex,
          moduleTitle: module.title,
          chapterTitle: chapter.title,
          number: `${moduleIndex + 1}.${chapterIndex + 1}.${lessonIndex + 1}`
        }
        allLessons.push(lessonInfo)
        
        if (lesson?.databaseId === databaseId || lesson?.databaseId === currentLessonId) {
          currentLessonIndex = allLessons.length - 1
          currentModuleInfo = { index: moduleIndex, title: module.title }
          currentChapterInfo = { index: chapterIndex, title: chapter.title }
        }
      })
    })
  })

  const prev = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null
  const next = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null
  const currentLesson = allLessons[currentLessonIndex]

  // Get lessons in current chapter for sidebar
  const currentChapterLessons = allLessons.filter(
    l => l.moduleIndex === currentModuleInfo?.index && l.chapterIndex === currentChapterInfo?.index
  )

  // Calculate chapter stats
  let chapterTotalTime = 0
  currentChapterLessons.forEach(l => {
    chapterTotalTime += Number(l.time || 0)
  })

  // State for sidebar module expansion
  const [expandedModules, setExpandedModules] = useState({ [currentModuleInfo?.index]: true })

  const toggleModule = (moduleIndex) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex]
    }))
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.title}>
        <p className={styles.breadcrumb}>
          <span>{currentModuleInfo?.title}</span>
          <span className={styles.separator}>›</span>
          <span>Rozdział {(currentChapterInfo?.index || 0) + 1}: {currentChapterInfo?.title}</span>
        </p>
        <h1>Lekcja {currentLesson?.number}: {title}</h1>
      </div>
      <div className={styles.video}>
        <iframe className={styles.frame} frameBorder="0" src={video} title='Filmik' allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        <div className={styles.flex}>
          {prev ? (
            <Link href={`/moje-kursy/${params.course}/${prev.slug}`}>
              <LeftArrow />
              <span>Poprzednia lekcja</span>
            </Link>
          ) : (
            <span />
          )}
          <span/>
          {next ? (
            <Link href={`/moje-kursy/${params.course}/${next.slug}`}>
              <span>Następna lekcja</span>
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
        <div className={styles.asideInfo}>
          <div>
            <p>Rozdział {(currentModuleInfo?.index || 0) + 1}.{(currentChapterInfo?.index || 0) + 1}</p>
            <p>{currentChapterInfo?.title}</p>
          </div>
          <div className={styles.flex}>
            <span>{currentChapterLessons.length} lekcji</span>
            <span><Clock />{formatTime(chapterTotalTime)}</span>
          </div>
        </div>
        
        {/* Current chapter lessons */}
        {currentChapterLessons.map((lesson, index) => (
          <Link 
            href={`/moje-kursy/${course}/${lesson.slug}`} 
            key={lesson.id || index} 
            className={`${styles.lesson} ${lesson.id === databaseId ? styles.active : ''}`}
          >
            <h4 title={lesson.title}>
              <strong>{lesson.number}</strong>
              <span>{lesson.title}</span>
            </h4>
            <span><Play />{lesson.time} minut</span>
          </Link>
        ))}

        {/* Navigation to other modules - only show if there are other modules */}
        {modules?.length > 1 && (
          <div className={styles.otherModules}>
            <p className={styles.otherModulesTitle}>Inne moduły</p>
            {modules?.map((module, moduleIndex) => {
              if (moduleIndex === currentModuleInfo?.index) return null
              
              const isExpanded = expandedModules[moduleIndex]
              const moduleLessons = allLessons.filter(l => l.moduleIndex === moduleIndex)
              
              return (
                <div key={moduleIndex} className={styles.otherModule}>
                  <button 
                    type="button"
                    className={styles.moduleToggle}
                    onClick={() => toggleModule(moduleIndex)}
                  >
                    <span>{module.title}</span>
                    <span className={styles.toggleIcon}>{isExpanded ? '−' : '+'}</span>
                  </button>
                  {isExpanded && (
                    <div className={styles.moduleLessons}>
                      {moduleLessons.slice(0, 5).map((lesson, idx) => (
                        <Link 
                          key={lesson.id || idx}
                          href={`/moje-kursy/${course}/${lesson.slug}`}
                          className={styles.otherLesson}
                        >
                          <span>{lesson.number}</span>
                          <span>{lesson.title}</span>
                        </Link>
                      ))}
                      {moduleLessons.length > 5 && (
                        <p className={styles.moreLink}>
                          +{moduleLessons.length - 5} więcej lekcji
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </aside>
    </section>
  )
}