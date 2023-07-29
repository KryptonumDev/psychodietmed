'use client'
import React, { useCallback, useMemo, useState } from "react"
import styles from './styles.module.scss'
import { removeWrap } from "../../../utils/title-modification"
import { Image } from "@/components/atoms/image"
import Link from "next/link"

export default function StepsToConsultation({ data, specialists }) {
  const { title, image, titleFirst, textFirst, illnes, titleSecond, textSecond, titleThird, textThird } = data

  const [chosenIllnes, setChosenIllnes] = useState(null)
  const [chosenSpecialist, setChosenSpecialist] = useState(null)
  const [step, setStep] = useState(1)

  const filtredSpecialists = useMemo(() => {
    return specialists.filter(el => {
      if (!chosenIllnes || !el.specialisations) return false
      return el.specialisations.some(inEl => inEl.id === chosenIllnes)
    })
  }, [specialists, chosenIllnes])

  const detailsClickHandler = useCallback((e, step) => {
    e.preventDefault()
    if (step === 2 && !chosenIllnes) return
    if (step === 3 && !chosenSpecialist) return
    setStep(step)
  }, [chosenIllnes, chosenSpecialist, setStep])

  useMemo(() => {
    if (chosenSpecialist && step === 2) setStep(3)
    else if (chosenIllnes && step === 1) setStep(2)
  }, [chosenIllnes, chosenSpecialist])


  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.grid}>
        <Image aspectRatio={true} className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        <div className={styles.sub_grid}>

          <details onClick={(e) => { detailsClickHandler(e, 1) }} open={step === 1} className={styles.item}>
            <summary className={styles.step_flex}>
              <div className={styles.step_number}>01</div>
              <h3 className={styles.step_title}>{titleFirst}</h3>
            </summary>
            <div className={styles.step_content}>
              <div />
              <div>
                <div className={styles.text} dangerouslySetInnerHTML={{ __html: textFirst }} />
                <div className={styles.buttons}>
                  {/* {illnes?.map(el => (
                    <button onClick={() => { setChosenIllnes(el.id); setChosenSpecialist(null) }} key={el.id} className={`${styles.button} ${el.id === chosenIllnes ? styles.active : ''}`}>{el.title}</button>
                  ))} */}
                </div></div>
            </div>
          </details>

          <details onClick={(e) => { detailsClickHandler(e, 2) }} open={step === 2} className={styles.item}>
            <summary className={styles.step_flex}>
              <div className={styles.step_number}>02</div>
              <h3 className={styles.step_title}>{titleSecond}</h3>
            </summary>
            <div className={styles.step_content}>
              <div />
              <div>
                <div className={styles.text} dangerouslySetInnerHTML={{ __html: textSecond }} />
                <div className={styles.persons}  >
                  {filtredSpecialists.map(el => (
                    <button key={el.id} onClick={() => { setChosenSpecialist(el) }} className={styles.person}>
                      <Image aspectRatio={true} className={styles.avatar} src={el.proffesional.personImage.mediaItemUrl} alt={el.proffesional.personImage.altText} width={el.proffesional.personImage.mediaDetails.width} height={el.proffesional.personImage.mediaDetails.height} />
                      <div>
                        <p className={styles.name}>{el.title}</p>
                        <p className={styles.profession}>{el.proffesional.proffesion}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </details>

          <details onClick={(e) => { detailsClickHandler(e, 3) }} open={step === 3} className={styles.item}>
            <summary className={styles.step_flex}>
              <div className={styles.step_number}>03</div>
              <h3 className={styles.step_title}>{titleThird}</h3>
            </summary>
            <div className={styles.step_content}>
              <div />
              <div>
                <div className={styles.text} dangerouslySetInnerHTML={{ __html: textThird }} />
                <Link className="link" href={chosenSpecialist ? `/specjalisci/${chosenSpecialist?.slug}` : '/kontakt'}>Umów wizytę</Link>
              </div>
            </div>
          </details>

        </div>
      </div>
    </section>
  )
}