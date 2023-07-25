'use client'
import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useForm } from "react-hook-form";
import Input from "@/components/atoms/input";
import { emailPattern, phonePattern } from "../../../constants/patterns";
import axios from "axios";

export default function Personaldata({ input, setStep, setInput }) {
  const { setValue, register, watch, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur", defaultValues: { type: 'person', shipping_same_as_billing: true } });

  const [nipValue, setNipValue] = useState(false)
  const [isTrueNip, setIsTrueNip] = useState(false)
  const watchType = watch('type')
  const watchShippingSameAsBilling = watch('shipping_same_as_billing')

  useEffect(() => {
    // https://wl-api.mf.gov.pl/api/search/nip/9512465557?date=2023-04-14
    const date = new Date().toISOString().split('T')[0]
    if (nipValue?.length === 10) {
      axios.get(`https://wl-api.mf.gov.pl/api/search/nip/${nipValue}?date=${date}`)
        .then(res => {
          if (res.data.result.subject) {
            const [sentence, address, postcode, city] = res.data.result.subject.workingAddress.match(/^([^,]+),\s*([^,]+)\s([^,]+)$/);

            setValue('billing_firmName', res.data.result.subject.name)
            setValue('billing_address', address)
            setValue('billing_postalCode', postcode)
            setValue('billing_city', city)

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
    
    setInput({
      ...input,
      firmOrder: data.type === 'firm',
      shipping: {
        firstName: data.type === 'person' ? data.shipping_name.split(' ')[0] : data.shipping_same_as_billing ? data.billing_firmName : data.shipping_name.split(' ')[0],
        lastName: data.type === 'person' ? data.shipping_name.split(' ')[1] : data.shipping_same_as_billing ? '' : data.shipping_name.split(' ')[1],
        address1: data.type === 'person' ? data.shipping_address : data.shipping_same_as_billing ? data.billing_address : data.shipping_address,
        address2: '',
        city: data.type === 'person' ? data.shipping_city : data.shipping_same_as_billing ? data.billing_city : data.shipping_city,
        country: 'PL',
        state: '',
        postcode: data.type === 'person' ? data.shipping_postalCode : data.shipping_same_as_billing ? data.billing_postalCode : data.shipping_postalCode,
        email: data.type === 'person' ? data.shipping_email : data.shipping_same_as_billing ? data.billing_email : data.shipping_email,
        phone: data.type === 'person' ? data.shipping_phone : data.shipping_same_as_billing ? data.billing_phone : data.shipping_phone,
        company: data.type === 'person' ? '' : data.billing_firmName,
      },
      billing: {
        firstName: data.type === 'person' ? data.shipping_name.split(' ')[0] : data.billing_firmName,
        lastName: data.type === 'person' ? data.shipping_name.split(' ')[1] : '',
        address1: data.type === 'person' ? data.shipping_address : data.billing_address,
        address2: '',
        city: data.type === 'person' ? data.shipping_city : data.billing_city,
        country: 'PL',
        state: '',
        postcode: data.type === 'person' ? data.shipping_postalCode : data.billing_postalCode,
        email: data.type === 'person' ? data.shipping_email : data.billing_email,
        phone: data.type === 'person' ? data.shipping_phone : data.billing_phone,
        company: data.type === 'person' ? '' : data.billing_firmName,
      },
      metaData: [
        {
          key: '_billing_nip',
          value: data.billing_nip || '',
        }
      ]
    })
    setStep(3)
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
      {watchType === 'firm' && (
        <fieldset className={styles.billing}>
          <legend>Dane firmowe do faktury</legend>
          <Input
            placeholder='NIP'
            name='billing_nip'
            register={register('billing_nip', { required: true, minLength: 10, maxLength: 10, onChange: (e) => { setNipValue(e.currentTarget.value) }, validate: () => isTrueNip })}
            errors={errors}
          />
          <Input
            placeholder='Nazwa firmy'
            name='billing_firmName'
            register={register('billing_firmName', { required: true, minLength: 3 })}
            errors={errors}
          />
          <Input
            placeholder='Adres e-mail'
            name='billing_email'
            register={register('billing_email', { required: true, pattern: emailPattern })}
            errors={errors}
          />
          <Input
            placeholder='Ulica i numer'
            name='billing_address'
            register={register('billing_address', { required: true })}
            errors={errors}
          />
          <div className={styles.flex}>
            <Input
              placeholder='Kod pocztowy'
              name='billing_postalCode'
              register={register('billing_postalCode', { required: true })}
              errors={errors}
            />
            <Input
              placeholder='Miejscowość'
              name='billing_city'
              register={register('billing_city', { required: true })}
              errors={errors}
            />
          </div>
          <Input
            className={styles.phone}
            placeholder='Telefon (opcjonalnie)'
            name='billing_phone'
            register={register('billing_phone', { pattern: phonePattern })}
            errors={errors}
            error={'Niepoprawny numer telefonu'}
          />
        </fieldset>
      )}
      <fieldset className={styles.shipping}>
        <legend>Adres dostawy</legend>

        {watchType === 'firm' && (
          <label className={styles.checkbox}>
            <input {...register('shipping_same_as_billing')} type="checkbox" />
            <span>Taki sam jak na fakturze.</span>
          </label>
        )}

        {(watchType === 'person' || !watchShippingSameAsBilling) && (
          <>
            <Input
              placeholder='Imię i nazwisko'
              name='shipping_name'
              register={register('shipping_name', { required: true, minLength: 3 })}
              errors={errors}
            />
            <Input
              placeholder='Adres e-mail'
              name='shipping_email'
              register={register('shipping_email', { required: true, pattern: emailPattern })}
              errors={errors}
            />
            <Input
              placeholder='Ulica i numer'
              name='shipping_address'
              register={register('shipping_address', { required: true })}
              errors={errors}
            />
            <div className={styles.flex}>
              <Input
                placeholder='Kod pocztowy'
                name='shipping_postalCode'
                register={register('shipping_postalCode', { required: true })}
                errors={errors}
              />
              <Input
                placeholder='Miejscowość'
                name='shipping_city'
                register={register('shipping_city', { required: true })}
                errors={errors}
              />
            </div>
            <Input
              className={styles.phone}
              placeholder='Telefon (opcjonalnie)'
              name='shipping_phone'
              register={register('shipping_phone', { pattern: phonePattern })}
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