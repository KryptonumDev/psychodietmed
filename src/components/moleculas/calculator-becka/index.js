'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"

const questions = [
  {
    question: 'Odczuwanie smutku i przygnębienia',
    zero: 'Nie jestem smutny ani przygnębiony',
    one: 'Odczuwam często smutek, przygnębienie',
    two: 'Przeżywam stale smutek, przygnębienie i nie mogę uwolnić się od tych przeżyć',
    three: 'Jestem stale tak smutny i nieszczęśliwy, że jest to nie do wytrzymania',
  },
  {
    question: 'Martwienie się o przyszłość',
    zero: 'Nie przejmuję się zbytnio swoją przyszłością',
    one: 'Często martwię się o swoją przyszłość',
    two: 'Obawiam się, że w przyszłości nic dobrego mnie nie czeka',
    three: 'Czuję, że przyszłość jest beznadziejna i nic tego nie zmieni',
  },
  {
    question: 'Uważasz, że zaniedbujesz swoje obowiązki?',
    zero: 'Sądzę, że nie popełniam większych zaniedbań',
    one: 'Sądzę, że czynię więcej zaniedbań niż inni',
    two: 'Kiedy zastanawiam się nad sobą, widzę mnóstwo błędów i zaniedbań',
    three: 'Jestem zupełnie niewydolny i wszystko robię źle',
  },
  {
    question: 'Jesteś zadowolony z siebie?',
    zero: 'To co robię sprawia mi przyjemność',
    one: 'Nie cieszy mnie to co robię',
    two: 'Nic mi teraz nie daje prawdziwego zadowolenia',
    three: 'Nie potrafię przeżywać zadowolenia i przyjemności. Wszystko mnie nuży',
  },
  {
    question: 'Czy często masz poczucie winy?',
    zero: 'Nie czuję się winnym ani wobec siebie, ani wobec innych',
    one: 'Dosyć często mam wyrzuty sumienia',
    two: 'Bardzo często czuję, że zawiniłem',
    three: 'Stale mam poczucie winy',
  },
  {
    question: 'Czy zasługujesz na karę?',
    zero: 'Sądzę, że nie zasługuję na karę',
    one: 'Sądzę, że zasługuję na karę',
    two: 'Spodziewam się ukarania',
    three: 'Wiem, że jestem karany',
  },
  {
    question: 'Zadowolenie z siebie',
    zero: 'Jestem z siebie zadowolony',
    one: 'Nie jestem z siebie zadowolony',
    two: 'Czuję do siebie niechęć',
    three: 'Nienawidzę siebie',
  },
  {
    question: 'Czy czujesz się gorszy od innych?',
    zero: 'Nie czuję się gorszy od innych ludzi',
    one: 'Zarzucam sobie, że jestem nieudolny i popełniam błędy',
    two: 'Stale potępiam siebie za popełnione błędy',
    three: 'Winię siebie za wszystko zło, które istnieje',
  },
  {
    question: 'Czy masz myśli samobójcze?',
    zero: 'Nie myślę o odebraniu sobie życia',
    one: 'Myślę o samobójstwie - ale nie mógłbym tego dokonać',
    two: 'Pragnę odebrać sobie życie',
    three: 'Popełnię samobójstwo, jak będzie odpowiednia sposobność',
  },
  {
    question: 'Często chce Ci się płakać?',
    zero: 'Nie płaczę częściej niż zwykle',
    one: 'Płaczę częściej niż dawniej',
    two: 'Ciągle chce mi się płakać',
    three: 'Chciałbym płakać, lecz nie jestem w stanie',
  },
  {
    question: 'Jesteś ostatnio bardziej nerwowy i rozdrażniony?',
    zero: 'Nie jestem bardziej podenerwowany niż dawniej',
    one: 'Jestem bardziej nerwowy i przykry niż dawniej',
    two: 'Stale jestem zdenerwowany lub rozdrażniony',
    three: 'Wszystko co dawniej mnie drażniło, stało się obojętne',
  },
  {
    question: 'Czy zmieniło się coś w Twoim zainteresowaniu innymi ludźmi?',
    zero: 'Ludzie interesują mnie jak dawniej',
    one: 'Interesuję się ludźmi mniej niż dawniej',
    two: 'Utraciłem większość zainteresowań innymi ludźmi',
    three: 'Utraciłem wszelkie zainteresowania innymi ludźmi',
  },
  {
    question: 'Czy ostatnio miewasz większe problemy z podejmowaniem różnych decyzji?',
    zero: 'Decyzję podejmuję łatwo, tak jak dawniej',
    one: 'Częściej niż kiedyś odwlekam podjęcie decyzji',
    two: 'Mam dużo trudności z podjęciem decyzji',
    three: 'Nie jestem w stanie podjąć żadnej decyzji',
  },
  {
    question: 'Czy uważasz, że wyglądasz gorzej i mniej atrakcyjnie niż kiedyś?',
    zero: 'Sądzę, że wyglądam nie gorzej niż dawniej',
    one: 'Martwię się tym, że wyglądam staro i nie atrakcyjnie',
    two: 'Czuję, że wyglądam coraz gorzej',
    three: 'Jestem przekonany, że wyglądam okropnie i odpychająco',
  },
  {
    question: 'Czy masz większe trudności z wykonywaniem różnych prac i zadań?',
    zero: 'Mogę pracować jak dawniej',
    one: 'Z trudem rozpoczynam każdą czynność',
    two: 'Z wielkim wysiłkiem zmuszam się do zrobienia czegokolwiek',
    three: 'Nie jestem w stanie nic robić',
  },
  {
    question: 'Masz kłopoty ze snem?',
    zero: 'Sypiam dobrze, jak zwykle',
    one: 'Sypiam gorzej niż dawniej',
    two: 'Rano budzę się 1-2 godzin za wcześnie i trudno jest mi ponownie usnąć',
    three: 'Budzę się kilka godzin za wcześnie i nie mogę usnąć',
  },
  {
    question: 'Czy męczysz się bardziej niż zwykle?',
    zero: 'Nie męczę się bardziej niż dawniej',
    one: 'Męczę się znacznie łatwiej niż kiedyś',
    two: 'Męczę się wszystkim co robię',
    three: 'Jestem zbyt zmęczony, aby cokolwiek robić',
  },
  {
    question: 'Czy masz kłopoty z apetytem?',
    zero: 'Mam apetyt nie gorszy niż dawniej',
    one: 'Mam trochę gorszy apetyt',
    two: 'Apetyt mam wyraźnie gorszy',
    three: 'Nie mam w ogóle apetytu',
  },
  {
    question: 'Czy ostatnio bardziej martwisz się swoim stanem zdrowia?',
    zero: 'Nie martwię się o swoje zdrowie',
    one: 'Martwię się swoimi dolegliwościami, mam rozstrój żołądka, zaparcie, bóle',
    two: 'Stan mego zdrowia bardzo mnie martwi, często o tym myślę',
    three: 'Martwię się o swoje zdrowie i nie potrafię myśleć o niczym innnym',
  },
  {
    question: 'Czy masz kłopoty z potencją?',
    zero: 'Moje zainteresowania seksualne nie uległy zmianom',
    one: 'Jestem mniej zainteresowany sprawami płci (seksu).',
    two: 'Seks wyraźnie mniej mnie interesuje',
    three: 'Zupełnie straciłem zainteresowanie sprawami seksu',
  }
]

export default function CalculatorBecka() {
  const {
    register,
    handleSubmit,
  } = useForm()
  const [result, setResult] = useState(null)

  const onSubmit = (data) => {
    let val = 0

    for (const [, value] of Object.entries(data)) {
      val += parseInt(value)
    }

    setResult(val)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <div className={styles.questions}>
        {questions.map((el, index) => (
          <label key={index} >
            <h3>{el.question}</h3>
            <div className={styles.grid}>
              <div className={styles.answer}>
                <span>0</span>
                <p>{el.zero}</p>
              </div>
              <div className={styles.answer}>
                <span>1</span>
                <p>{el.one}</p>
              </div>
              <div className={styles.answer}>
                <span>2</span>
                <p>{el.two}</p>
              </div>
              <div className={styles.answer}>
                <span>3</span>
                <p>{el.three}</p>
              </div>
            </div>
            <div className={styles.input}>
              <input {...register(`range-${index}`)} type="range" min={0} max={3} defaultValue={1} />
              <div className={styles.control}>
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
            </div>
          </label>
        ))}
      </div>
      <button className="link" >{result ? 'Przelicz wynik' : 'Pokaż wynik'}</button>
      <AnimatePresence mode="wait">
        {result &&
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={1} className={styles.result}>
            <p>
              Twój wynik testu to: <span>{result} punkty</span>
            </p>
            {result < 12 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={2} className={styles.success}>
                Twoje odpowiedzi sugerują, że <em>nie masz objawów depresji</em>.
              </motion.p>
            )}
            {(result < 20 && result > 11) && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={3} className={styles.success}>
                Twoje odpowiedzi sugerują, że masz objawy <em>łagodnej depresji</em>.
              </motion.p>
            )}
            {(result < 26 && result > 19) && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={4} className={styles.success}>
                Twoje odpowiedzi sugerują, że masz objawy <em>umiarkowanej depresji</em>.
              </motion.p>
            )}
            {result > 25 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={5} className={styles.success}>
                Twoje odpowiedzi sugerują, że masz objawy <em>ciężkiej depresji</em>.
              </motion.p>
            )}
            <p>
              Specjaliści PsychoDietMed oferują <em>kompleksową pomoc</em> i wsparcie dla osób borykających się z otyłością oraz zaburzeniami odżywiania. W naszej klinice łączymy dietetykę z psychoterapią i psychodietetyką.
            </p>
          </motion.div>
        }
      </AnimatePresence>
    </form>
  )
}