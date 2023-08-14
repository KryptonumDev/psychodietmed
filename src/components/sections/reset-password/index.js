'use client'
import React from "react"
import styles from './styles.module.scss'
import { useForm } from "react-hook-form"
import Input from "@/components/atoms/input"
import { v4 } from "uuid"
import { Info } from "../../../assets/info"
import RESET from "../../../mutations/reset-password"
import { useMutation } from "@apollo/client"
import Loader from "../loader"

export default function Reset({ resetkey, login }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [reset, { loading }] = useMutation(RESET, {
    onCompleted: (res) => {
      window.location.href = '/moje-kursy'
    },
    onError: (error) => {
      throw new Error(error?.graphQLErrors?.[0]?.message ?? error);
    }
  });

  const onSubmit = (data) => {
    const Input = {
      clientMutationId: v4(),
      key: resetkey,
      login: login,
      password: data.password,
    };
    reset({ variables: { input: Input } })
  }

  return (
    <section className={styles.wrapper}>
      <Loader show={loading} />
      <h1>Ustaw nowe hasło</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        <Input
          register={register("password", { required: true, minLength: 12, validate: value => value === watch('repeat-password') })}
          errors={errors}
          name="password"
          title="Nowe hasło"
          type="password"
          placeholder="Nowe hasło"
          error={null}
        />
        <Input
          register={register("repeat-password", { required: true, minLength: 12, validate: value => value === watch('password') })}
          errors={errors}
          name="repeat-password"
          title="Hasło"
          type="password"
          placeholder="Powtórz nowe hasło"
          error={null}
        />
        <p className={`${styles.support} ${watch('password')?.length >= 12 ? styles.active : ''} ${(errors['password']?.type === 'minLength' || errors['password']?.type === 'required') ? styles.error : ''}`}>
          <Info />Hasło powinno zawierać co najmniej 12 znaków</p>
        <p className={`${styles.support} ${styles.error} ${watch('password') === watch('repeat-password') ? styles.active : ''}`}><Info />Hasła powinny się zgadzać</p>
        <button disabled={loading} className="link" type="submit">Ustaw hasło</button>
      </form>
    </section >
  )
}