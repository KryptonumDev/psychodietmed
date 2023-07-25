import React from "react"
import styles from './styles.module.scss'

export default function Specialisations({ setCurrentStep, specializations, chosenSpecialisations, setChosenSpecialisations }) {

  const clickHandler = (e) => {
    if (chosenSpecialisations) {
      if (chosenSpecialisations.includes(e.target.innerText)) {
        setChosenSpecialisations(chosenSpecialisations.filter(el => el !== e.target.innerText))
      } else {
        setChosenSpecialisations([...chosenSpecialisations, e.target.innerText])
      }
    } else {
      setChosenSpecialisations([e.target.innerText])
    }
  }

  const classtest = (el) => {
    if (chosenSpecialisations?.includes(el.title))
      return styles.active

    return ''
  }

  return (
    <section className={styles.wrapper}>
      <h1 dangerouslySetInnerHTML={{ __html: '<span class="underline-second">Umów wizytę</span>, a pomożemy Ci przywrócić wewnętrzny spokój!' }} />
      <p>Powiedz nam, z czym się zmagasz</p>
      <div className={styles.grid}>
        {specializations?.map((el, index) => (
          <button onClick={(e) => { clickHandler(e) }} key={index} className={`${styles.item} ${classtest(el)}`}>
            {el.title}
          </button>
        ))}
      </div>
      <button onClick={() => { setCurrentStep(2) }} disabled={!chosenSpecialisations} className='link'>Przechodzę dalej</button>
    </section>
  )
}