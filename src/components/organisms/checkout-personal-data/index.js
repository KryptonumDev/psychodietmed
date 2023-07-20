'use client'
import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useForm } from "react-hook-form";
import Input from "@/components/atoms/input";
import { emailPattern, phonePattern } from "../../../constants/patterns";
import axios from "axios";

export default function Personaldata({ data }) {
  const { setValue, register, watch, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur", defaultValues: { type: 'person' } });

  const [nipValue, setNipValue] = useState(false)
  const [isTrueNip, setIsTrueNip] = useState(false)
  const watchType = watch('type')

  useEffect(() => {
    // https://wl-api.mf.gov.pl/api/search/nip/9512465557?date=2023-04-14
    const date = new Date().toISOString().split('T')[0]
    if (nipValue?.length === 10) {
      axios.get(`https://wl-api.mf.gov.pl/api/search/nip/${nipValue}?date=${date}`)
        .then(res => {
          if (res.data.result.subject) {
            setValue('firmName', res.data.result.subject.name)
            setValue('firmAdres', res.data.result.subject.workingAddress)
            setIsTrueNip(true)
          } else {
            // toast.warn('Brak informacji w bazie NIP')
            setIsTrueNip(false)
          }
        })
        .catch(err => {
          // toast.error(err.response.data.message)
        })
    }
  }, [nipValue, setValue])


  const submit = (data) => {
  }

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.wrapper}>
      <fieldset>
        <legend>Kupujesz jako</legend>
        <div className={styles.radio}>
          <label>
            <input {...register('type')} type="radio" value="person" />
            <span />
            <p>Osoba prywatna</p>
          </label>
          <label>
            <input {...register('type')} type="radio" value="firm" />
            <span />
            <p>Firma</p>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Adres dostawy</legend>
        {watchType === 'firm' ? (
          <>
            <Input
              placeholder='NIP'
              name='nip'
              register={register('nip', { required: true, minLength: 10, maxLength: 10, onChange: (e) => { setNipValue(e.currentTarget.value) }, validate: () => isTrueNip })}
              errors={errors}
            />
            <Input
              placeholder='Nazwa firmy'
              name='firmName'
              register={register('firmName', { required: true, minLength: 3 })}
              errors={errors}
            />
          </>
        ) : (
          <Input
            placeholder='Imię i nazwisko'
            name='name'
            register={register('name', { required: true, minLength: 3 })}
            errors={errors}
          />
        )}
        <Input
          placeholder='Adres e-mail'
          name='email'
          register={register('email', { required: true, pattern: emailPattern })}
          errors={errors}
        />
        {true && (
          <>
            <Input
              placeholder='Ulica i numer'
              name='address'
              register={register('address', { required: true })}
              errors={errors}
            />
            <div className={styles.flex}>
              <Input
                placeholder='Kod pocztowy'
                name='postalCode'
                register={register('postalCode', { required: true })}
                errors={errors}
              />
              <Input
                placeholder='Miejscowość'
                name='city'
                register={register('city', { required: true })}
                errors={errors}
              />
            </div>
            <Input
              className={styles.phone}
              placeholder='Telefon (opcjonalnie)'
              name='phone'
              register={register('phone', { pattern: phonePattern })}
              errors={errors}
              error={'Niepoprawny numer telefonu'}
            />
          </>
        )}
      </fieldset>
      <button className={`link ${styles.submit}`} type='submit'>Przechodzę dalej</button>
    </form>
  )
}