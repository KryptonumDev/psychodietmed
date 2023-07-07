import React from "react"
import styles from './styles.module.scss'
import CalculatorBmi from "@/components/moleculas/calculator-bmi"
import { removeWrap } from "../../../utils/title-modification"

export default function Hero({ data: { title, subTitle, description, calculatorType } }) {
  return (
    <section className={styles.wrapper}>
      <h1 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.grid}>
        <div className={styles.content}>
          <h2>{subTitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        {(() => {
          switch (calculatorType) {
            case 'bmi':
              return <CalculatorBmi />
            default:
              return null
          }
        })()}
      </div>
    </section>
  )
}