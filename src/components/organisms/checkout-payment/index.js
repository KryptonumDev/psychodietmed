import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";

export default function Payment({ input, setInput, setStep, shippingMethods }) {
  return null
  const { register, watch, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur", defaultValues: { payment: paymentMethods[0].methodId } });

  const submit = (data) => {
    setInput({ ...input })
    setStep(5)
  }
  // TODO: validate inpost number

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.wrapper}>
      <fieldset>
        <legend>Wybierz opcję dostawy</legend>
        {paymentMethods.map((el, index) => (
          <label key={index}>
            <input type="radio" name="payment" value={el.methodId} {...register('payment', { required: true })} />
            <span className={styles.checkbox} />
            <span>{index}</span>
          </label>
        ))}
      </fieldset>
      <button className="link">Przechodzę do podsumowania</button>
    </form>
  )

}