'use client'
import React, { useMemo, useState } from "react"
import styles from './styles.module.scss'
import { removeWrap } from "../../../utils/title-modification"
import { Image } from "@/components/atoms/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion";
import { RightArrow } from "../../../assets/small-right-arrow"
import Button from "@/components/atoms/button"

export default function StepsToConsultation({ data, specialists }) {
  const { title, image, titleFirst, textFirst, illnes, titleSecond, textSecond, titleThird, textThird } = data

  const [chosenIllnes, setChosenIllnes] = useState(null)
  const [chosenSpecialist, setChosenSpecialist] = useState(null)
  const [step, setStep] = useState(1)

  const filtredSpecialists = useMemo(() => {
    return specialists.filter(el => {
      if (!chosenIllnes || !el.specialisations) return false
      return el.specialisations.nodes.some(inEl => inEl.id === chosenIllnes)
    })
  }, [specialists, chosenIllnes])

  const detailsClickHandler = (e, selectedStep) => {
    if(e){
      e.preventDefault();
      if(selectedStep === 3 && !chosenSpecialist) return;
      if(selectedStep === 2 && !chosenIllnes) return;
    }
    setStep(selectedStep);
  }

  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.grid}>
        <Image aspectRatio={false} className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        <div className={styles.sub_grid}>
          <details open={step === 1} className={styles.item} style={step !== 1 ? { cursor: 'pointer' } : {}}>
            <summary onClick={(e) => { detailsClickHandler(e, 1) }}  className={styles.step_flex}>
              <span className={styles.step_number}>01</span>
              <h3 className={styles.step_title}>{titleFirst}</h3>
            </summary>
            <AnimatePresence mode="wait" initial={false}>
              {step === 1 && (
                <motion.div
                  className={styles.step_content}
                  key="step1"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >
                  <div />
                  <div>
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: textFirst }} />
                    <div className={styles.buttons}>
                      {illnes?.map(el => (
                        <button
                          onClick={() => {
                            setChosenIllnes(el.id);
                            detailsClickHandler(null, 2);
                          }}
                          key={el.id}
                          className={`${styles.button} ${el.id === chosenIllnes ? styles.active : ''}`}
                        >{el.title}</button>
                      ))}
                    </div></div>
                </motion.div>
              )}
            </AnimatePresence>
          </details>
          <details open={step === 2} className={styles.item} style={(step !== 2 && chosenIllnes) ? { cursor: 'pointer' } : {}}>
            <summary onClick={(e) => { detailsClickHandler(e, 2) }}  className={styles.step_flex}>
              <span className={styles.step_number}>02</span>
              <h3 className={styles.step_title}>{titleSecond}</h3>
            </summary>
            <AnimatePresence mode="wait" initial={false}>
              {step === 2 && (
                <motion.div
                  key="step2"
                  className={styles.step_content}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >
                  <div />
                  <div>
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: textSecond }} />
                    <div className={styles.persons}>
                      {filtredSpecialists.length < 1 ? (
                        <div className={styles.notFound}>
                          <h3>Nie możesz znaleźć specjalisty?</h3>
                          <Button href='/kontakt'>Skontaktuj się z nami</Button>
                        </div>
                      ) : (
                        <>
                          {filtredSpecialists.map((el, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setChosenSpecialist(el)
                                setStep(3)
                              }}
                              className={styles.person}
                            >
                              <Image aspectRatio={true} className={styles.avatar} src={el.proffesional.personImage.mediaItemUrl} alt={el.proffesional.personImage.altText} width={el.proffesional.personImage.mediaDetails.width} height={el.proffesional.personImage.mediaDetails.height} />
                              <div className={styles.copy}>
                                <p className={styles.name}>{el.title}</p>
                                <p className={styles.profession}>{el.proffesional.proffesion}</p>
                              </div>
                              <RightArrow />
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </details>
          <details open={step === 3} className={styles.item} style={(step !== 3 && chosenSpecialist) ? { cursor: 'pointer' } : {}}>
            <summary onClick={(e) => { detailsClickHandler(e, 3) }} className={styles.step_flex}>
              <span className={styles.step_number}>03</span>
              <h3 className={styles.step_title}>{titleThird}</h3>
            </summary>
            <AnimatePresence mode="wait" initial={false}>
              {step === 3 && (
                <motion.div
                  key="step3"
                  className={styles.step_content}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >
                  <div />
                  <div>
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: textThird }} />
                    <Link className="link" href={chosenSpecialist ? `/specjalisci/${chosenSpecialist?.slug}#kalendarz` : '/umow-wizyte'}>Umów wizytę</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </details>

        </div>
      </div>
    </section>
  )
}