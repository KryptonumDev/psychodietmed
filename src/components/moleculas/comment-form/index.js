import React from "react"
import styles from './styles.module.scss'

export default function Form() {
  return (
    <form className={styles.form}>
      <legend>Zostaw komentarz</legend>
      <label className={styles.label}>
        <span>Dodaj komentarz</span>
        <textarea rows={5} placeholder="Dodaj komentarz" />
      </label>
      <label className={styles.label}>
        <span>Adres e-mail</span>
        <input placeholder="Adres e-mail" />
      </label>
      <label className={styles.label}>
        <span>Imię</span>
        <input placeholder="Imię" />
      </label>
      <label className={styles.check}>
        <input type="checkbox" />
        <span />
        <p>Zapisz moje dane w przeglądarce, aby dane pola wypełniały się automatycznie przy kolejnych komentarzach.</p>
      </label>
      <button className={`${styles.link} link`}>Wyślij wiadomość</button>
    </form>
  )
}