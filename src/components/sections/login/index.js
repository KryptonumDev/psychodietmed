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
import SEND_RESET from "../../../mutations/send-password-reset"
import Button from "@/components/atoms/button"
import { AnimatePresence, motion } from "framer-motion"

export default function Login() {
  const { push } = useRouter();
  const { register, handleSubmit, formState: { errors }, } = useForm()

  const [ loginStatus, setLoginStatus ] = useState({ sending: false });
  const [renewPass, setRenewPass] = useState(false);

  const loginSumbit = (data) => {
    setLoginStatus({ sending: true });
    const Input = {
      clientMutationId: v4(),
      username: data.email,
      password: data.password,
    };
    login({ variables: { input: Input } })
  }

  const resetSubmit = (data) => {
    setLoginStatus({ sending: true });
    const Input = {
      clientMutationId: v4(),
      username: data.email,
    };
    debugger
    reset({ variables: { input: Input } })
  }

  const [login, {
    loading: loginLoading,
  }] = useMutation(LOGIN, {
    ignoreResults: true,
    onCompleted: (res) => {
      debugger
      setCookie('authToken', res.login.authToken)
      localStorage.setItem('authToken', res.login.authToken)
      push('/moje-kursy');
      setLoginStatus({ sending: false });
    },
    onError: (error) => {
      debugger
      setLoginStatus({ sending: false, error: 'Nieprawidłowy adres e-mail' });
      if (error.message === "invalid_email") {
        setLoginStatus({ sending: false, error: 'Nieprawidłowy adres e-mail' });
      }
      if(error.message === "invalid_password") {
        setLoginStatus({ sending: false, error: 'Nieprawidłowe hasło' });
      }
    }
  });

  const [reset, {
    loading: resetLoading,
  }] = useMutation(SEND_RESET, {
    onCompleted: (res) => {
      debugger
      setRenewPass(false);
      setLoginStatus({ sending: false });
    },
    onError: () => {
      setLoginStatus({ sending: false, error: 'Coś poszło nie tak. Spróbuj ponownie później.' });
    }
  });

  return (
    <section className={styles.wrapper}>
      {renewPass ? (
        <>
          <h2>Nie pamiętasz hasła?</h2>
          <p>Żaden problem! Podaj adres e-mail, a wyślemy na niego link do zmiany hasła, który wystarczy kliknąć.</p>
          <form onSubmit={handleSubmit(resetSubmit)}>
            <Input
              register={register("email", { required: true, pattern: emailPattern })}
              errors={errors}
              name="email"
              title="E-mail"
              placeholder="E-mail"
            />
            <AnimatePresence mode='wait'>
              {loginStatus.error && (
                <motion.p
                  className={styles.error}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >{loginStatus.error}</motion.p>
              )}
            </AnimatePresence>
            <Button type="submit" disabled={loginStatus.sending}>Zresetuj hasło</Button>
          </form>
          <button onClick={() => { setRenewPass(false) }} className={styles.button}>Zaloguj się</button>
        </>
      ) : (
        <>
          <h2>Zaloguj się, aby mieć dostęp do kursów</h2>
          <form onSubmit={handleSubmit(loginSumbit)}>
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
            <AnimatePresence mode='wait'>
              {loginStatus.error && (
                <motion.p
                  className={styles.error}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >{loginStatus.error}</motion.p>
              )}
            </AnimatePresence>
            <Button type="submit" disabled={loginStatus.sending}>Zaloguj się</Button>
          </form>
          <button onClick={() => { setRenewPass(true) }} className={styles.button}>Nie pamiętam hasła</button>
        </>
      )}
    </section >
  )
}