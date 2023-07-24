import React from "react"
import styles from './styles.module.scss'
import CalculatorBmi from "@/components/moleculas/calculator-bmi"
import { removeWrap } from "../../../utils/title-modification"
import CalculatorHomaIr from "@/components/moleculas/calculator-homa-ir"
import CalculatorBecka from "@/components/moleculas/calculator-becka"
import CalculatorFear from "@/components/moleculas/calculator-fear"

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
            case 'homa':
              return <CalculatorHomaIr />
            default:
              return null
          }
        })()}
      </div>
      {/* <CalculatorBecka />
      <CalculatorFear /> */}
    </section>
  )
}