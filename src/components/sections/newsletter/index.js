'use client'
import React from "react"
import { htmlDelete } from "../../../utils/delete-html"
import styles from './styles.module.scss'
import { useForm } from "react-hook-form"
import axios from "axios"

const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const namePattern = /^[a-z ,.'-]+$/i

export default function Newsletter({ data: { title, text, consent } }) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    axios.post('/api/newsletter-api', {
      name: data.name,
      email: data.email
    }).then(res => {
      'TODO: show success message'
    }).catch(err => {
      'TODO: show error message'
    })
  }

  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: htmlDelete(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Imię</span>
          <input {...register("name", { required: true, pattern: namePattern })} />
          {errors.name && <div className={styles.error}>Proszę poprawnie uzupełnić to pole</div>}
        </label>
        <label>
          <span>Adres e-mail</span>
          <input {...register("email", { required: true, pattern: emailPattern })} />
          {errors.email && <div className={styles.error}>Proszę poprawnie uzupełnić to pole</div>}
        </label>
        <button className="link">Wyślij</button>
        <label className={styles.check}>
          <input type="checkbox" {...register("check", { required: true })} />
          <span />
          <div dangerouslySetInnerHTML={{ __html: consent }} />
          {errors.check && <div className={styles.error}>
            Proszę zaakceptować politykę prywatności
          </div>}
        </label>
      </form>
    </section>
  )
}