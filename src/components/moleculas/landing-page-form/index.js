'use client'
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import styles from './styles.module.scss'
import Checkbox from "@/components/atoms/checkbox"
import Input from "@/components/atoms/input"
import axios from "axios"
import Button from "@/components/atoms/button"
import SelectTime from "@/components/atoms/select-time"
import { AnimatePresence, motion } from 'framer-motion';
import { emailPattern, phonePattern } from "../../../constants/patterns"
import { LANDINGPAGE_GROUPID } from "../../../constants/mailerLite"
import { redirect } from "next/navigation"

const Form = ({ landing, id }) => {
  const url = `https://wp.psychodietmed.pl/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`;
  const [sentStatus, setSentStatus] = useState({ sent: false });
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
  const selectTimeWatch = watch(["preferencedDate", "preferencedTime"]);

  const onSubmit = data => {
    setSentStatus({ sent: true });

    const { name, surname, email, tel, preferencedDate, preferencedTime } = data;

    const datePreference = (preferencedDate || preferencedTime)
      ? `Preferencja co do czasu kontaktu: ${preferencedDate ? `${preferencedDate}${preferencedTime ? ', ' : ''}` : ''}${preferencedTime || ''}`
      : 'Bez preferencji co do czasu kontaktu';

    let body = new FormData();
    body.append('name', name)
    body.append('surname', surname)
    body.append('email', email)
    body.append('tel', tel)
    body.append('datePreference', datePreference)

    axios.post(url, body)
      .then((res) => {
        if (res.status === 200) {
          setSentStatus(prevStatus => ({ ...prevStatus, success: true }));
          reset();
          fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name,
              email: email,
              group_id: LANDINGPAGE_GROUPID
            }),
          })
            .then(response => response.json())
            .then(() => { })
            .catch();

          window.location.href = `/landing/${landing}/dziekuje-za-zapis`
        } else {
          setSentStatus(prevStatus => ({ ...prevStatus, success: false }));
        }
      }).catch(() => {
        setSentStatus(prevStatus => ({ ...prevStatus, success: false }));
      })
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <AnimatePresence mode="wait">
        {sentStatus.success !== undefined && (
          sentStatus.success ? (
            <motion.div
              className={styles.status}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Heart />
              <h3>Dziękujemy za wiadomość!</h3>
              <p>Specjaliści PsychoDietMed odpowiedzą najszybciej, jak to możliwe.</p>
              <Button type="button" onClick={() => setSentStatus({ sent: false })}>Wypełnij ponownie</Button>
            </motion.div>
          ) : (
            <motion.div
              className={styles.status}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Error />
              <h3>Ups! Coś poszło nie tak.</h3>
              <p>Aby skontaktować się ze specjalistami PsychoDietMed, wypełnij formularz ponownie.</p>
              <Button type="button" onClick={() => setSentStatus({ sent: false })}>Wypełnij ponownie</Button>
            </motion.div>
          )
        )}
      </AnimatePresence>
      <div className={styles.flex}>
        <Input
          name={'name'}
          register={register('name', { required: true, minLength: 3 })}
          placeholder='Imię'
          errors={errors}
          error="Proszę poprawnie uzupełnić to pole"
        />
        <Input
          name={'surname'}
          register={register('surname', { required: true, minLength: 3 })}
          placeholder='Nazwisko'
          errors={errors}
          error="Proszę poprawnie uzupełnić to pole"
        />
      </div>
      <div className={styles.flex}>
        <Input
          name={'email'}
          register={register('email', { required: true, pattern: emailPattern })}
          placeholder='Adres e-mail'
          errors={errors}
          error="Proszę poprawnie uzupełnić to pole"
        />
        <Input
          type="number"
          name={'tel'}
          register={register('tel', { required: true, pattern: phonePattern })}
          placeholder='Numer telefonu'
          errors={errors}
          error="Proszę poprawnie uzupełnić to pole"
        />
      </div>
      <SelectTime
        placeholder='Najdogodniejszy czas na kontakt'
        registerTime={register('preferencedTime')}
        registerDate={register('preferencedDate')}
        errors={errors}
        watch={watch}
        selectTimeWatch={selectTimeWatch}
      />
      <Checkbox
        text={'Wyrażam zgodę na przesyłanie informacji o produktach i usługach Smart Coaching Sylwia Prawdzik. Szczegóły związane z&nbsp;przetwarzaniem danych osobowych znajdziesz w <a href="/polityka-prywatnosci" target="_blank" rel="noopener">polityce prywatności</a>'}
        name='checkbox'
        register={register('checkbox', { required: true })}
        errors={errors}
        error='Proszę zaakceptować politykę prywatności'
      />
      <Button
        type="submit"
        disabled={sentStatus.sent && sentStatus.success === undefined}
      >Wyślij wypełniony formularz</Button>
    </form>
  );
};

export default Form;


const Heart = () => (
  <motion.svg
    xmlns='http://www.w3.org/2000/svg'
    width='82'
    height='86'
    fill='none'
    animate={{
      y: [0, -10, 0],
      rotate: [0, 10, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    }}
  >
    <g clipPath='url(#a)'>
      <path
        fill='#194574'
        d='M59.793 7.288a21.295 21.295 0 00-10.91 3.227c-3.3 2.053-6.019 4.97-7.882 8.46a22.329 22.329 0 00-7.881-8.46 21.296 21.296 0 00-10.91-3.227c-6.134.276-11.912 3.057-16.073 7.736C1.975 19.702-.231 25.898 0 32.257 0 48.36 16.353 65.949 30.068 77.874 33.13 80.54 37 82.004 41 82.004s7.871-1.463 10.933-4.13C65.65 65.949 82.001 48.36 82.001 32.257c.231-6.36-1.974-12.555-6.136-17.233-4.16-4.679-9.94-7.46-16.072-7.736zm-12.25 65.167a9.944 9.944 0 01-6.542 2.475 9.945 9.945 0 01-6.543-2.475C16.903 57.187 6.834 42.538 6.834 32.257c-.233-4.481 1.252-8.876 4.132-12.227 2.88-3.35 6.922-5.385 11.243-5.659 4.322.274 8.363 2.308 11.243 5.659 2.88 3.35 4.366 7.746 4.132 12.227 0 .94.36 1.84 1.001 2.504a3.356 3.356 0 002.416 1.037c.906 0 1.775-.373 2.416-1.037a3.61 3.61 0 001-2.504c-.233-4.481 1.252-8.876 4.133-12.227 2.88-3.35 6.921-5.385 11.243-5.659 4.32.274 8.362 2.308 11.243 5.659 2.88 3.35 4.365 7.746 4.132 12.227 0 10.281-10.07 24.93-27.624 40.184v.014z'
      ></path>
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M0 .5h82v85H0z'></path>
      </clipPath>
    </defs>
  </motion.svg>
)

const Error = () => (
  <motion.svg
    xmlns='http://www.w3.org/2000/svg'
    width='82'
    height='85'
    fill='none'
    animate={{
      x: [-2, 3, -2, 0, 0, 0, 0, 0, 0, 0],
    }}
    transition={{
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    }}
  >
    <g fill='#194574' clipPath='url(#a)'>
      <path d='M54.665 28.334a3.357 3.357 0 00-2.415-1.037c-.906 0-1.775.373-2.416 1.037L41 37.493l-8.836-9.16a3.353 3.353 0 00-2.403-.993 3.357 3.357 0 00-2.386 1.037 3.607 3.607 0 00-1 2.474 3.612 3.612 0 00.958 2.49l8.836 9.16-8.836 9.158a3.612 3.612 0 00-.959 2.491 3.607 3.607 0 001 2.474 3.357 3.357 0 002.387 1.037 3.353 3.353 0 002.403-.994L41 47.508l8.835 9.16a3.353 3.353 0 002.404.993 3.358 3.358 0 002.386-1.037 3.607 3.607 0 001-2.474 3.612 3.612 0 00-.959-2.49L45.83 42.5l8.835-9.158c.641-.664 1-1.565 1-2.504 0-.94-.359-1.84-1-2.504z'></path>
      <path d='M41 0c-8.109 0-16.036 2.493-22.778 7.163C11.479 11.833 6.224 18.47 3.12 26.236A43.946 43.946 0 00.788 50.791c1.582 8.245 5.487 15.817 11.22 21.761 5.735 5.944 13.04 9.991 20.993 11.631a39.658 39.658 0 0023.689-2.418c7.492-3.217 13.895-8.664 18.4-15.653C79.595 59.122 82 50.906 82 42.5c-.012-11.268-4.335-22.07-12.022-30.039C62.292 4.494 51.87.012 41 0zm0 77.917c-6.758 0-13.363-2.078-18.982-5.97-5.619-3.89-9.998-9.422-12.584-15.894A36.622 36.622 0 017.49 35.591c1.318-6.87 4.572-13.181 9.35-18.134 4.779-4.954 10.867-8.327 17.494-9.693a33.048 33.048 0 0119.741 2.015c6.243 2.68 11.58 7.22 15.334 13.045 3.754 5.824 5.758 12.671 5.758 19.676-.01 9.39-3.613 18.392-10.019 25.032-6.405 6.64-15.09 10.374-24.148 10.385z'></path>
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M0 0h82v85H0z'></path>
      </clipPath>
    </defs>
  </motion.svg>
)