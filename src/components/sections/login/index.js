'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import Input from "@/components/atoms/input"
import { emailPattern } from "../../../constants/patterns"
import { useForm } from "react-hook-form"
import { v4 } from "uuid";
import { useRouter } from 'next/navigation';
import LOGIN from "../../../mutations/login"
import { useMutation } from "@apollo/client"
import { setCookie } from "@/app/actions"

export default function Login() {
  const { push } = useRouter();
  const { register, handleSubmit, formState: { errors }, } = useForm()

  const [renewPass, setRenewPass] = useState(false)

  const onSubmit = (data) => {
    const Input = {
      clientMutationId: v4(),
      username: data.email,
      password: data.password,
    };
    login({ variables: { input: Input } })
  }
  const [login, {
    data: loginResponse,
    loading: loginLoading,
    error: loginError
  }] = useMutation(LOGIN, {
    onCompleted: (res) => {
      setCookie('authToken', res.login.authToken)
      push('/moje-kursy');
    },
    onError: (error) => {
      throw new Error(error?.graphQLErrors?.[0]?.message ?? error);
    }
  });

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