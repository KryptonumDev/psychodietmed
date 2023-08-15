'use client'
import Input from "@/components/atoms/input"
import React from "react"
import { useForm } from "react-hook-form";
import { emailPattern, namePattern } from "../../../constants/patterns";
import Checkbox from "@/components/atoms/checkbox";
import styles from './styles.module.scss'

export default function Form() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    // axios.post('/api/newsletter', {
    //   name: data.name,
    //   email: data.email
    // }).then(res => {
    //   'TODO: show success message'
    // }).catch(err => {
    //   'TODO: show error message'
    // })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        rows={3}
        placeholder='Dodaj komentarz'
        name='comment'
        register={register('comment', { required: true, minLength: 3 })}
        errors={errors}
      />
      <Input
        placeholder='Adres e-mail'
        name='email'
        register={register('email', { required: true, pattern: emailPattern })}
        errors={errors}
      />
      <Input
        placeholder='Imię'
        name='name'
        register={register('name', { required: true, minLength: 3, pattern: namePattern })}
        errors={errors}
      />
      <Checkbox
        text='Zapisz moje dane w przeglądarce, aby dane pola wypełniały się automatycznie przy kolejnych komentarzach.'
        name='accept'
        register={register('accept')}
        errors={errors}
      />
      <button className={`${styles.submit} link`}>Wyślij wiadomość</button>
    </form>
  )
}