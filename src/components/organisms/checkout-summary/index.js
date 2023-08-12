import React from "react"
import styles from "./styles.module.scss"
import { RightArrow } from "../../../assets/small-right-arrow"
import Input from "@/components/atoms/input"
import { useForm } from "react-hook-form"

export default function Summary({ submit, needsShippingAddress, setStep, input }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => {
    submit(data)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.wrapper} ${needsShippingAddress ? '' : styles.altGrid}`}>
      <h2>Kupujesz jako</h2>
      <div className={`${styles.grid} ${needsShippingAddress ? '' : styles.altGrid}`}>
        <div className={styles.clientType}>
          <label>
            <input checked={true} type="radio" name="clientType" value="person" />
            <span className={styles.checkbox} />
            {input.firmOrder ? <p>Firma</p> : <p>Osoba prywatna</p>}

          </label>
          <button className={styles.change} onClick={() => { setStep(2) }}>
            Zmień
            <RightArrow />
          </button>
        </div>
        <div className={styles.shipping}>
          <div className={styles.flex}>
            <h3>Adres dostawy</h3>
            <button className={styles.change} onClick={() => { setStep(2) }}>
              Zmień
              <RightArrow />
            </button>
          </div>
          <p>{input.shipping.address1}</p>
          <p>{input.shipping.postcode} {input.shipping.city}</p>
        </div>
        <div className={styles.billing}>
          <div className={styles.flex}>
            <h3>Dane odbiorcy</h3>
            <button className={styles.change} onClick={() => { setStep(2) }}>
              Zmień
              <RightArrow />
            </button>
          </div>
          {input.firmOrder ? (
            <>
              <div className={styles.params}>
                <p title={input.billing.company}>{input.billing.company}</p>
                <p>NIP: {input.metaData[0].value}</p>
              </div>
              <div className={styles.params}>
                <p title={input.billing.email}>{input.billing.email}</p>
                <p>tel. {input.billing.phone}</p>
              </div>
            </>
          ) : (
            <>
              <p>{input.billing.firstName} {input.billing.lastName}</p>
              <div className={styles.params}>
                <p>{input.billing.email}</p>
                <p>tel. {input.billing.phone}</p>
              </div>
            </>
          )}
        </div>
        {needsShippingAddress && (
          <div className={styles.delivery}>
            <div className={styles.flex}>
              <h3>Dostawa</h3>
              <button className={styles.change} onClick={() => { setStep(2) }}>
                Zmień
                <RightArrow />
              </button>
            </div>
            <label>
              <input checked={true} type="radio" name="delivery" value="person" />
              <span className={styles.checkbox} />
              <p>{input.shippingMethod.label} <small>{input.shippingMethod.cost}&nbsp;zł</small></p>
            </label>
          </div>
        )}
        <label className={styles.comment} >
          <h3>Komentarz do zamówienia</h3>
          <Input register={register('comment')} rows={5} errors={errors} placeholder={'Dodaj komentarz do zamówienia'} />
        </label>
      </div>
      <div className={styles.control}>
        <label className={`${styles.check} ${errors.check ? styles.error : ''}`}>
          <input type="checkbox" {...register("check", { required: true })} />
          <span />
          <div dangerouslySetInnerHTML={{ __html: "<p>Akceptuję <a href='/regulamin'>regulamin</a> sklepu</p>" }} />
        </label>
        <button className={`${styles.submit} link`}>Przejdź do płatności</button>
      </div>
    </form>
  )
}