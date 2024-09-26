'use client'
import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useForm } from "react-hook-form";
import Input from "@/components/atoms/input";
import { emailPattern, phonePattern } from "../../../constants/patterns";
import axios from "axios";
import Checkbox from "@/components/atoms/checkbox";

export default function Personaldata({ input, setStep, setInput }) {
  const { setValue, register, watch, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    defaultValues: {
      type: input?.firmOrder ? 'firm' : 'person',
      shipping_same_as_billing: !input?.billingDifferentThanShipping,
      billing_nip: input?.metaData?.find(el => el.key === '_billing_nip')?.value || '',
      billing_firmName: input?.billing?.company || '',
      billing_email: input?.billing?.email || '',
      billing_address: input?.billing?.address1 || '',
      billing_postalCode: input?.billing?.postcode || '',
      billing_city: input?.billing?.city || '',
      billing_phone: input?.billing?.phone || '',
      shipping_name: input?.shipping?.firstName || '',
      shipping_surname: input?.shipping?.lastName || '',
      shipping_address: input?.shipping?.address1 || '',
      shipping_postalCode: input?.shipping?.postcode || '',
      shipping_city: input?.shipping?.city || '',
      shipping_phone: input?.shipping?.phone || '',
      shipping_email: input?.shipping?.email || '',
    }
  });

  const [nipValue, setNipValue] = useState(false)
  const watchType = watch('type')
  const watchShippingSameAsBilling = watch('shipping_same_as_billing')

  useEffect(() => {
    const date = new Date().toISOString().split('T')[0]
    if (nipValue?.length === 10) {
      axios.get(`https://wl-api.mf.gov.pl/api/search/nip/${nipValue}?date=${date}`)
        .then(res => {
          debugger
          if (res.data.result?.subject) {
            let adress = res.data.result?.subject?.residenceAddress || res.data.result?.subject?.workingAddress

            if (!adress) {
              return null
            }

            const arr = adress.match(/^([^,]+)\s+([^,]+)?,\s*(\d{2}-\d{3})\s*([^,]+)$/)

            if (!arr) {
              return null
            }

            const [sentence, address, houseApart, postcode, city] = arr;

            setValue('billing_firmName', res.data.result.subject.name, { shouldValidate: true })
            setValue('billing_address', address + " " + houseApart, { shouldValidate: true })
            setValue('billing_postalCode', postcode, { shouldValidate: true })
            setValue('billing_city', city, { shouldValidate: true })

          } else {
          }
        })
    }
  }, [nipValue, setValue])

  useEffect(() => {
    setValue('shipping_same_as_billing', !input?.billingDifferentThanShipping)
    setValue('billing_nip', input?.metaData?.find(el => el.key === 'billing_tax_no')?.value || '')
    setValue('billing_firmName', input?.billing?.company || '')
    setValue('billing_email', input?.billing?.email || '')
    setValue('billing_address', input?.billing?.address1 || '')
    setValue('billing_postalCode', input?.billing?.postcode || '')
    setValue('billing_city', input?.billing?.city || '')
    setValue('billing_phone', input?.billing?.phone || '')
    setValue('shipping_name', input?.shipping?.firstName || '')
    setValue('shipping_surname', input?.shipping?.lastName || '')
    setValue('shipping_address', input?.shipping?.address1 || '')
    setValue('shipping_postalCode', input?.shipping?.postcode || '')
    setValue('shipping_city', input?.shipping?.city || '')
    setValue('shipping_phone', input?.shipping?.phone || '')
    setValue('shipping_email', input?.shipping?.email || '')
  }, [input])

  const submit = (data) => {

    setInput({
      ...input,
      firmOrder: data.type === 'firm',
      billingDifferentThanShipping: !data.shipping_same_as_billing,
      shipping: {
        firstName: data.type === 'person' ? data.shipping_name : data.shipping_same_as_billing ? data.billing_firmName : data.shipping_name,
        lastName: data.type === 'person' ? data.shipping_surname : data.shipping_same_as_billing ? '' : data.shipping_surname,
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
        firstName: data.type === 'person' ? data.shipping_name : data.billing_firmName,
        lastName: data.type === 'person' ? data.shipping_surname : '',
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
          key: 'billing_tax_no',
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
            register={register('billing_nip', { required: true, minLength: 10, maxLength: 10, onChange: (e) => { setNipValue(e.currentTarget.value) } })}
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
          <Checkbox
            text='Taki sam jak na fakturze.'
            name='shipping_same_as_billing'
            register={register('shipping_same_as_billing')}
            errors={errors}
          />
        )}

        {(watchType === 'person' || !watchShippingSameAsBilling) && (
          <>
            <div className={styles.columns}>
              <Input
                placeholder='Imię'
                name='shipping_name'
                register={register('shipping_name', { required: true, minLength: 3 })}
                errors={errors}
              />
              <Input
                placeholder='Nazwisko'
                name='shipping_surname'
                register={register('shipping_surname', { required: true, minLength: 3 })}
                errors={errors}
              />
            </div>
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