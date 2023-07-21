import React from "react"
import styles from "./styles.module.scss"
import { RightArrow } from "../../../assets/small-right-arrow"

export default function Summary({ setStep }) {
  return (
    <div className={styles.wrapper}>
      <h2>Kupujesz jako</h2>

      <div className={styles.grid}>
        <form className={styles.clientType}>
          <label>
            <input checked={true} type="radio" name="clientType" value="person" />
            <span className={styles.checkbox} />
            <p>Osoba prywatna</p>
          </label>
          <button className={styles.change} onClick={() => { setStep(2) }}>
            Zmień
            <RightArrow />
          </button>
        </form>
        <form className={styles.shipping}>
          <div className={styles.flex}>
            <h3>Adres dostawy</h3>
            <button className={styles.change} onClick={() => { setStep(2) }}>
              Zmień
              <RightArrow />
            </button>
          </div>
        </form>
        <form className={styles.billing}>
          <div className={styles.flex}>
            <h3>Dane odbiorcy</h3>
            <button className={styles.change} onClick={() => { setStep(2) }}>
              Zmień
              <RightArrow />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}