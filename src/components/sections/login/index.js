'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import Input from "@/components/atoms/input"
import { emailPattern } from "../../../constants/patterns"
import { useForm } from "react-hook-form"
import { Info } from "../../../assets/info"
import { v4 } from "uuid";

export default function Login({ login }) {
  const [renewPass, setRenewPass] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const Input = {
      clientMutationId: v4(),
      username: data.email,
      password: data.password,
    };
    login({ variables: { input: Input } })
  }

  return (
    <section onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      {renewPass ? (
        <>
          <h2>Nie pamiętasz hasła?</h2>
          <p>Żaden problem! Podaj adres e-mail, a wyślemy na niego link do zmiany hasła, który wystarczy kliknąć.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register("email", { required: true, pattern: emailPattern })}
              errors={errors}
              name="email"
              title="E-mail"
              placeholder="E-mail"
            />
            <button className="link" type="submit">Zresetuj hasło</button>
          </form>
          <button onClick={() => { setRenewPass(false) }} className={styles.button}>Zaloguj się</button>
        </>
      ) : (
        <>
          <h2>Zaloguj się, aby mieć dostęp do kursów</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register("email", { required: true, pattern: emailPattern })}
              errors={errors}
              name="email"
              title="E-mail"
              placeholder="E-mail"
            />
            <Input
              register={register("password", { required: true, minLength: 12 })}
              errors={errors}
              name="password"
              title="Hasło"
              placeholder="Hasło"
              type="password"
            />
            {/* <p className={styles.support}><Info />Hasło powinno zawierać co najmniej 12 znaków</p> */}
            <button className="link" type="submit">Zaloguj się</button>
          </form>
          <button onClick={() => { setRenewPass(true) }} className={styles.button}>Nie pamiętam hasła</button>
        </>
      )}
    </section >
  )
}