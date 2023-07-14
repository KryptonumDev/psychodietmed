'use client'
import Link from "next/link"
import React, { useCallback } from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"
import { RightArrow } from "../../../assets/small-right-arrow"
import { CursorFinger } from "../../../assets/cursor-finger"
import { useState } from "react"

export default function Steps({ specialisations, data: { titleFirst, linkFirst, titleSecond, gridSecond, linkSecond, titleThird, linkThird, gridThird, titleFourth, gridFourth } }) {

  const proffessions = (() => {
    const proffessions = []
    specialisations.forEach(el => {
      el.profesje.nodes.forEach(inEl => {
        if (proffessions.findIndex(el => el.name === inEl.name) === -1) {
          proffessions.push({ name: inEl.name, arr: [el] })
        } else {
          proffessions[proffessions.findIndex(el => el.name === inEl.name)].arr.push(el)
        }
      })
    })
    return proffessions
  })()

  const [opened, setOpened] = useState(1)
  const [chosenButtons, setChosenButtons] = useState([])

  const handleOpen = useCallback((e, number) => {
    e.preventDefault()
    setOpened(number + 1)
  }, [setOpened])

  const handleChose = useCallback((el) => {
    // if (chosenButtons.findIndex(inEl => inEl.slug === el.slug) === -1) {
    //   setChosenButtons([...chosenButtons.filter(inEl => inEl !== el.slug)])
    // } else {
    //   setChosenButtons([...chosenButtons, el])
    // }
  }, [setChosenButtons, chosenButtons])


  return (
    <section className={styles.wrapper}>
      <div className={styles.step}>
        <div className={`${styles.line} ${styles.first}`}>
          <span className={styles.top} />
          <span className={styles.left} />
          <span className={styles.bottom} />
        </div>
        <div className={styles.content}>
          <span className={styles.number}>01</span>
          <div className={styles.inner}>
            <h2>{titleFirst}</h2>
            <div className={styles.chose}>
              {proffessions.map((el, index) => (
                <details onClick={(e) => { handleOpen(e, index) }} open={opened === index + 1} key={index}>
                  <summary>
                    <span className={styles.symbol} />
                    <div className={styles.flex}>
                      <h3>{el.name}</h3>
                      <div className={styles.cursor}>
                        <CursorFinger />
                        <span>Kliknij, aby wybrać</span>
                      </div>
                    </div>
                  </summary>
                  <div className={styles.wrap}>
                    {el.arr.map((inEl, index) => (
                      <button onClick={() => { handleChose(inEl) }} key={index} className={styles.illnes}>
                        {inEl.title}
                      </button>
                    ))}
                  </div>
                </details>
              ))}
            </div>
            <div className={styles.flex}>
              <Link className="link" href={linkFirst.url}>{linkFirst.title}</Link>
              <Link className={styles.link} href={'/zespol'}>Poznaj specjalistów PsychoDietMed <RightArrow /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.line}>
          <span className={styles.top} />
          <span className={styles.left} />
          <span className={styles.bottom} />
        </div>
        <div className={styles.content}>
          <span className={styles.number}>02</span>
          <div className={styles.inner}>
            <h2>{titleSecond}</h2>
            <div className={styles.grid}>
              {gridSecond.map((el, index) => (
                <div key={index} className={styles.itemBlue}>
                  <Image width={el.icon.mediaDetails.width}
                    height={el.icon.mediaDetails.height}
                    src={el.icon.mediaItemUrl}
                    alt={el.icon.altText}
                    className={styles.icon}
                    aspectRatio={true} />
                  <p>{el.text}</p>
                </div>
              ))}
            </div>
            <Link className="link" href={linkSecond.url}>{linkSecond.title}</Link>
          </div>
        </div>
      </div>
      <div className={styles.step}>
        <div className={`${styles.line} ${styles.last}`}>
          <span className={styles.top} />
          <span className={styles.left} />
          <span className={styles.bottom} />
        </div>
        <div className={styles.content}>
          <span className={styles.number}>03</span>
          <div className={styles.inner}>
            <h2>{titleThird}</h2>
            <div className={styles.grid}>
              {gridThird.map((el, index) => (
                <div key={index} className={styles.itemPink}>
                  <Image width={el.icon.mediaDetails.width}
                    height={el.icon.mediaDetails.height}
                    src={el.icon.mediaItemUrl}
                    alt={el.icon.altText}
                    className={styles.icon}
                    aspectRatio={true} />
                  <p>{el.text}</p>
                </div>
              ))}
            </div>
            <Link className="link" href={linkThird.url}>{linkThird.title}</Link>
          </div>
        </div>
      </div>
      <div className={styles.step}>
        <div />
        <div className={styles.content}>
          <span className={styles.number}>04</span>
          <div className={styles.inner}>
            <h2>{titleFourth}</h2>
            <div className={styles.grid}>
              {gridFourth.map((el, index) => (
                <div key={index} className={styles.itemExtended}>
                  <Image width={el.icon.mediaDetails.width}
                    height={el.icon.mediaDetails.height}
                    src={el.icon.mediaItemUrl}
                    alt={el.icon.altText}
                    className={styles.image}
                    aspectRatio={true} />
                  <div dangerouslySetInnerHTML={{ __html: el.text }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}