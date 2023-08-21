'use client'
import React from "react"
import styles from './styles.module.scss'
import Input from "@/components/atoms/input"
import { useForm } from "react-hook-form"
import { emailPattern, phonePattern } from "../../../constants/patterns"
import Button from "@/components/atoms/button"
import { motion } from "framer-motion"
import { v4 } from "uuid"

export const PopUp = ({ service, specialistId, serviceId, setPopupOpened, chosenDate, chosenTime, name }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    fetch("https://www.psychodietmed.pl/api/create-booking", {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        message: data.message,
        employeId: specialistId,
        serviceId: serviceId,
        date: chosenDate.format('YYYY-MM-DD'),
        time: chosenTime
      })
    })
      .then(response => response.json())
      .then(res => {
        debugger
        const session = v4()
        fetch("https://www.psychodietmed.pl/api/create-transaction", {
          method: 'POST',
          body: JSON.stringify({
            amount: service.price,
            sessionId: session,
            email: data.email,
            description: `Konsultacja online, ${name}`,
            urlReturn: `https://www.psychodietmed.pl/api/complete-booking/?session=${session}&id=${res[0].id}&amount=${service.price}`,
          })
        })
          .then(response => response.json())
          .then(res => {
            if (!res.link) throw new Error('Nie udało się stwozryć płatnośći')
            window.location.href = res.link
          })
          .catch(err => {
            alert(err.message)
            console.log(err)
          })
      })
      .catch(err => {
        alert(err.message)
        console.log(err)
      })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.popup}>
      <div onClick={() => { setPopupOpened(false) }} className={styles.overlay} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Uzupełnij formularz rezerwacji</h3>
        <p>{chosenDate.format('DD MMMM YYYY')}, {chosenTime}, 50&nbsp;min</p>
        <p>Konsultacja online, {name}</p>
        <p>{(service.price / 100)}&nbsp;zł</p>
        <div className={styles.flex}>
          <Input
            register={register('name', { required: true, minLength: 3 })}
            errors={errors}
            label="Imię"
            name='name'
            placeholder="Imię"
          />
          <Input
            register={register('surname', { required: true, minLength: 3 })}
            errors={errors}
            label="Nazwisko"
            name='surname'
            placeholder="Nazwisko"
          />
        </div>
        <Input
          register={register('phone', { required: true, pattern: phonePattern })}
          errors={errors}
          label="Telefon"
          name='phone'
          placeholder="Telefon"
        />
        <Input
          register={register('email', { required: true, pattern: emailPattern })}
          errors={errors}
          label="Twój adres E-mail"
          name='email'
          placeholder="Twój adres E-mail"
        />
        <Input
          register={register('message')}
          rows={3}
          errors={errors}
          label="Dodatkowe informacje"
          name='message'
          placeholder="Dodatkowe informacje"
        />
        <Button type="submit">Przejdź do płatności</Button>
      </form>
    </motion.div>
  )
}  