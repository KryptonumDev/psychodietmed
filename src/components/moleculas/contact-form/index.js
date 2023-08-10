'use client'
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import styles from './styles.module.scss'
import Select, { components } from 'react-select'
import Checkbox from "@/components/atoms/checkbox"
import Input from "@/components/atoms/input"

const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const namePattern = /^[a-z ,.'-]+$/i

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.5642 12.6572C28.4248 12.5127 28.2589 12.398 28.0761 12.3197C27.8933 12.2415 27.6973 12.2012 27.4992 12.2012C27.3012 12.2012 27.1052 12.2415 26.9224 12.3197C26.7396 12.398 26.5737 12.5127 26.4342 12.6572L19.5642 19.718C19.4248 19.8625 19.2589 19.9772 19.0761 20.0555C18.8933 20.1337 18.6973 20.174 18.4992 20.174C18.3012 20.174 18.1052 20.1337 17.9224 20.0555C17.7396 19.9772 17.5737 19.8625 17.4342 19.718L10.5642 12.6572C10.4248 12.5127 10.2589 12.398 10.0761 12.3197C9.89331 12.2415 9.69725 12.2012 9.49924 12.2012C9.30122 12.2012 9.10516 12.2415 8.92237 12.3197C8.73958 12.398 8.57368 12.5127 8.43424 12.6572C8.15486 12.946 7.99805 13.3368 7.99805 13.7441C7.99805 14.1514 8.15486 14.5421 8.43424 14.8309L15.3192 21.9072C16.163 22.7733 17.3067 23.2598 18.4992 23.2598C19.6917 23.2598 20.8355 22.7733 21.6792 21.9072L28.5642 14.8309C28.8436 14.5421 29.0004 14.1514 29.0004 13.7441C29.0004 13.3368 28.8436 12.946 28.5642 12.6572Z" fill="#194574" />
      </svg>
    </components.DropdownIndicator>
  )
}

const NoOptionsMessage = props => {
  return (
    <components.NoOptionsMessage {...props}>
      <div>Brak wyników</div>
    </components.NoOptionsMessage>
  );
};

export default function Form({ subjects }) {

  const [subject, setSubject] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    'TODO: send data to wp'
  }

  'TODO: react select'

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <Input
        name={'name'}
        register={register('name', { required: true, pattern: namePattern })}
        placeholder='Imię'
        title={'Imię'}
        errors={errors}
        error="Proszę poprawnie uzupełnić to pole"
      />
      <Input
        name={'email'}
        register={register('email', { required: true, pattern: emailPattern })}
        placeholder='Adres e-mail'
        title={'Adres e-mail'}
        errors={errors}
        error="Proszę poprawnie uzupełnić to pole"
      />
      <label>
        <span>Temat wiadomości</span>
        <Select
          components={{ DropdownIndicator, NoOptionsMessage }}
          classNamePrefix="react-select"
          className="input dark"
          placeholder="Wybierz kategorię"
          onChange={(e) => { setSubject(e.value) }}
          defaultValue={{ value: subjects[0].subject, label: subjects[0].subject }}
          options={subjects.map(el => {
            return { value: el.subject, label: el.subject }
          })} />
      </label>
      <Input
        rows={5}
        name={'text'}
        register={register('text', { required: true, minLength: 3 })}
        placeholder='Twoja wiadomość'
        title={'Twoja wiadomość'}
        errors={errors}
        error="Proszę poprawnie uzupełnić to pole"
      />
      <Checkbox
        text='Akceptuję <a href="/polityka-prywatnosci">politykę prywatności</a>.'
        name='checkbox'
        register={register('checkbox', { required: true })}
        errors={errors}
        error='Proszę zaakceptować politykę prywatności'
      />
      <button className={`${styles.submit} link`}>Wyślij wiadomość</button>
    </form>
  )
}