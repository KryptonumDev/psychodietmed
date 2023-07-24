'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"

const questions = [
  {
    question: 'Czuł(a) się Pan(i) podenerwowany(a), niespokojny(a), mocno spięty(a)?',
  },
  {
    question: 'Łatwo stawał(a) się Pan(i) rozdrażniony(a) lub poirytowany(a)',
  },
  {
    question: 'Obawiał(a) się Pan(i), że stanie się coś strasznego?',
  },
  {
    question: 'Nie mógł(a) Pan(i) przestać się martwić albo zapanować nad tym'
  },
  {
    question: 'Za bardzo się Pan(i) martwił(a) różnymi rzeczami'
  },
  {
    question: 'Miał(a) Pan(i) trudności z relaksowaniem się'
  },
  {
    question: 'Był(a) Pan(i) tak niespokojny(a), że nie mógł(a) usiedzieć na miejscu'
  }
]

const Shield = () => (
  <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2742_9126)">
      <path d="M11.0002 14.2497C10.7571 14.2497 10.5239 14.1531 10.352 13.9812C10.1801 13.8093 10.0835 13.5761 10.0835 13.333V5.99969C10.0835 5.75657 10.1801 5.52342 10.352 5.35151C10.5239 5.1796 10.7571 5.08302 11.0002 5.08302C11.2433 5.08302 11.4764 5.1796 11.6483 5.35151C11.8203 5.52342 11.9168 5.75657 11.9168 5.99969V13.333C11.9168 13.5761 11.8203 13.8093 11.6483 13.9812C11.4764 14.1531 11.2433 14.2497 11.0002 14.2497ZM11.7271 22.2797C13.7071 21.484 20.1668 18.3554 20.1668 11.5391V6.79902C20.1678 5.83562 19.8648 4.89646 19.3009 4.11531C18.7371 3.33417 17.9411 2.75088 17.0263 2.44852L11.2889 0.546439C11.1016 0.483218 10.8987 0.483218 10.7114 0.546439L4.974 2.44852C4.05927 2.75088 3.26327 3.33417 2.69938 4.11531C2.1355 4.89646 1.83248 5.83562 1.8335 6.79902V11.5391C1.8335 17.5543 8.25475 21.2338 10.2237 22.2183C10.4728 22.3371 10.7328 22.4314 11.0002 22.4997C11.2487 22.4489 11.4921 22.3752 11.7271 22.2797ZM16.4488 4.18836C16.9975 4.37024 17.4749 4.72037 17.8132 5.18902C18.1515 5.65767 18.3336 6.22101 18.3335 6.79902V11.5391C18.3335 17.2069 12.7537 19.8909 11.0432 20.5784C9.31258 19.713 3.66683 16.5038 3.66683 11.5391V6.79902C3.66676 6.22101 3.84881 5.65767 4.18713 5.18902C4.52546 4.72037 5.00285 4.37024 5.5515 4.18836L11.0002 2.38252L16.4488 4.18836ZM11.0002 16.083C10.8189 16.083 10.6416 16.1368 10.4909 16.2375C10.3401 16.3382 10.2227 16.4814 10.1533 16.6489C10.0839 16.8164 10.0657 17.0007 10.1011 17.1785C10.1365 17.3563 10.2238 17.5197 10.352 17.6479C10.4802 17.7761 10.6435 17.8634 10.8213 17.8987C10.9991 17.9341 11.1835 17.916 11.351 17.8466C11.5185 17.7772 11.6616 17.6597 11.7623 17.509C11.8631 17.3582 11.9168 17.181 11.9168 16.9997C11.9168 16.7566 11.8203 16.5234 11.6483 16.3515C11.4764 16.1796 11.2433 16.083 11.0002 16.083Z" fill="#B40909" />
    </g>
    <defs>
      <clipPath id="clip0_2742_9126">
        <rect width="22" height="22" fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
)

export default function CalculatorFear() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
          <div className={`${styles.question} ${errors[`radio-${index}`] ? styles.error : ''}`} key={index} >
            <AnimatePresence mode="wait">
              {errors[`radio-${index}`] && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.error}><Shield />Wypełnij wszystkie pola</motion.p>}
            </AnimatePresence>
            <h3>{el.question}</h3>
            <div className={styles.input}>
              <label>
                <input value={0} type="radio" {...register(`radio-${index}`, { required: true })} />
                <span>Wcale</span>
              </label>
              <label>
                <input value={1} type="radio" {...register(`radio-${index}`, { required: true })} />
                <span>Przez kilka dni</span>
              </label>
              <label>
                <input value={2} type="radio" {...register(`radio-${index}`, { required: true })} />
                <span>Więcej niż przez tydzień</span>
              </label>
              <label>
                <input value={3} type="radio" {...register(`radio-${index}`, { required: true })} />
                <span>Cały czas</span>
              </label>
            </div>
          </div>
        ))}
      </div>
      <button className="link" type="submit">{result ? 'Przelicz wynik' : 'Pokaż wynik'}</button>
      <AnimatePresence mode="wait">
        {result &&
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key={1} className={styles.result}>
            <p>
              Twój wynik testu to: <span>{result} punkty</span>
            </p>
            {result > 10 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={2} className={styles.success}>
                Wynik wskazuje na <em>potrzebę wizyty u specjalisty</em> w celu dalszej diagnostyki.
              </motion.p>
            )}
            {result < 11 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={3} className={styles.success}>
                Twój wynik <em>nie wskazuje</em> na występowanie zaburzenia lękowego uogólnionego.
              </motion.p>
            )}
            <p>
              SPamiętaj nie jest to diagnoza, a tylko narzędzie do wskazania problemu. Jest to bezpłatny i automatyczny test, który może pomóc odpowiedzieć na pytania dotyczące Twojego zdrowia. Nie zastąpi on jednak konsultacji z lekarzem psychiatrą lub psychologiem
            </p>
          </motion.div>
        }
      </AnimatePresence>
    </form>
  )
}