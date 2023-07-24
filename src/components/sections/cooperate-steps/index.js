import Link from "next/link"
import React from "react"
import styles from "./styles.module.scss"
import { Image } from "@/components/atoms/image"
import { RightArrow } from "../../../assets/small-right-arrow"

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
                <details open={!index} key={index}>
                  <summary>
                    <span className={styles.symbol} />
                      <h3>{el.name}</h3>
                  </summary>
                  <div className={styles.wrap}>
                    {el.arr.map((inEl, index) => (
                      <span key={index} className={styles.illnes}>
                        {inEl.title}
                      </span>
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