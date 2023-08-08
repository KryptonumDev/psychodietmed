'use client'
import React from "react"
import { useForm } from "react-hook-form"
import styles from './styles.module.scss'
import { emailPattern } from "../../../constants/patterns";
import { NEWSLETTER_GROUPID } from "../../../constants/mailerLite";
import Button from "@/components/atoms/button";

export default function Form({ consent, sentStatus, setSentStatus }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setSentStatus({ sent: true });
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        group_id: NEWSLETTER_GROUPID
      }),
    })
    .then(response => response.json())
    .then(response => {
      if(response.success){
        setSentStatus(prevStatus => ({ ...prevStatus, success: true }));
      } else {
        setSentStatus(prevStatus => ({ ...prevStatus, success: false }));
      }
    })
    .catch(() => {
      setSentStatus(prevStatus => ({ ...prevStatus, success: false }));
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Imię</span>
        <input {...register("name")} />
        {errors.name && <div className={styles.error}>Proszę poprawnie uzupełnić to pole</div>}
      </label>
      <label>
        <span>Adres e-mail</span>
        <input {...register("email", { required: true, pattern: emailPattern })} />
        {errors.email && <div className={styles.error}>Proszę poprawnie uzupełnić to pole</div>}
      </label>
      <label className={styles.check}>
        <input type="checkbox" {...register("check", { required: true })} />
        <span />
        <div dangerouslySetInnerHTML={{ __html: consent }} />
        {errors.check && <div className={styles.error}>
          Proszę zaakceptować politykę prywatności
        </div>}
      </label>
      <Button type="submit" disabled={sentStatus.sent && sentStatus.success === undefined}>Zapisz się</Button>
    </form>
  )
}