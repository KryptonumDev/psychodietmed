import React from "react"
import styles from './styles.module.scss'

export default function Specialisations({ setCurrentStep, specializations, chosenSpecialisations, setChosenSpecialisations }) {

  const clickHandler = (e) => {
    if (chosenSpecialisations) {
      if (chosenSpecialisations.includes(e.target.innerText)) {
        let newArr = chosenSpecialisations.filter(el => el !== e.target.innerText)
        setChosenSpecialisations(newArr.length > 0 ? newArr : null)
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
      <h1 dangerouslySetInnerHTML={{ __html: '<span class="underline-second">Wybierz</span>, z czym masz problem?' }} />
      <p>A pomożemy Ci przywrócić wewnętrzny spokój</p>
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