'use client'
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import styles from './styles.module.scss'
import Select, { components } from 'react-select'

const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const namePattern = /^[a-z ,.'-]+$/i

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="36" height="19" viewBox="0 0 36 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.0003 18.4704C17.0147 18.4722 16.0384 18.2743 15.1273 17.8881C14.2162 17.5019 13.3881 16.9349 12.6903 16.2195L0.435278 3.62413C0.152822 3.33382 -0.00585937 2.94009 -0.00585938 2.52954C-0.00585938 2.11899 0.152822 1.72526 0.435278 1.43496C0.717734 1.14466 1.10083 0.981567 1.50028 0.981567C1.89973 0.981567 2.28282 1.14466 2.56528 1.43496L14.8203 14.0304C15.664 14.8965 16.8078 15.383 18.0003 15.383C19.1928 15.383 20.3365 14.8965 21.1803 14.0304L33.4353 1.43496C33.7177 1.14466 34.1008 0.981567 34.5003 0.981567C34.8997 0.981567 35.2828 1.14466 35.5653 1.43496C35.8477 1.72526 36.0064 2.11899 36.0064 2.52954C36.0064 2.94009 35.8477 3.33382 35.5653 3.62413L23.3103 16.2195C22.6125 16.9349 21.7844 17.5019 20.8732 17.8881C19.9621 18.2743 18.9859 18.4722 18.0003 18.4704V18.4704Z" fill="#194574" />
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
      <label>
        <span>Imię</span>
        <input placeholder='Imię' {...register("name", { required: true, pattern: namePattern })} />
        {errors.name && <div className={styles.error}>Proszę poprawnie uzupełnić to pole</div>}
      </label>
      <label>
        <span>Adres e-mail</span>
        <input placeholder='Adres e-mail' {...register("email", { required: true, pattern: emailPattern })} />
        {errors.name && <div className={styles.error}>Proszę poprawnie uzupełnić to pole</div>}
      </label>
      <label>
        <span>Temat wiadomości</span>
        <Select
          components={{ DropdownIndicator, NoOptionsMessage }}
          classNamePrefix="react-select"
          className="input"
          placeholder="Wybierz kategorię"
          onChange={(e) => { setSubject(e.value) }}
          defaultValue={{ value: subjects[0].subject, label: subjects[0].subject }}
          options={subjects.map(el => {
            return { value: el.subject, label: el.subject }
          })} />
        {errors.name && <div className={styles.error}>Proszę poprawnie uzupełnić to pole</div>}
      </label>
      <label>
        <span>Twoja wiadomość</span>
        <textarea rows='5' placeholder='Twoja wiadomość' {...register("name", { required: true, pattern: namePattern })} />
        {errors.name && <div className={styles.error}>Proszę poprawnie uzupełnić to pole</div>}
      </label>
      <button className={`${styles.submit} link`}>Wyślij wiadomość</button>
    </form>
  )
}