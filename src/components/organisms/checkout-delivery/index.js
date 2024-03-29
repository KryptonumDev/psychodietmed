import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { InpostGeowidget } from "react-inpost-geowidget";
import { Cross } from "../../../assets/cross";

export default function Delivery({ input, setInput, setStep, shippingMethods }) {
  const { register, watch, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    defaultValues: {
      delivery: input?.shippingMethod?.methodId || shippingMethods[0].methodId
    }
  });

  const [inpostNumber, setInpostNumber] = useState(input?.inpostNumber || null)
  const chosenRadio = watch('delivery')

  const submit = (data) => {
    setInput({ ...input, shippingMethod: shippingMethods.filter(el => el.methodId === data.delivery)[0], inpostNumber: inpostNumber })
    setStep(4)
  }

  const onPointCallback = (e) => {
    setInpostNumber(e)
  }
  
  return (
    <form onSubmit={handleSubmit(submit)} className={styles.wrapper}>
      <fieldset>
        <legend>Wybierz opcję dostawy</legend>
        {shippingMethods.map(el => (
          <label className={el.methodId === 'easypack_parcel_machines' ? styles.expanded : ''} key={el.instanceId}>
            <div className={styles.flex}>
              <input type="radio" name="delivery" value={el.methodId} {...register('delivery', { required: true })} />
              <span className={styles.checkbox} />
              <span>{el.label}</span>
              {el.cost && <p>{el.cost}&nbsp;zł</p>}
            </div>
            {el.methodId === 'easypack_parcel_machines' && (
              <div className={`${styles.widget} ${(chosenRadio === 'easypack_parcel_machines' && !inpostNumber) ? styles.active : ''}`}>
                <InpostGeowidget
                  className={styles.inpost}
                  token={process.env.NEXT_PUBLIC_INPOST_GEO_KEY}
                  config='parcelCollect'
                  onPoint={onPointCallback}
                />
              </div>
            )}
            {(el.methodId === 'easypack_parcel_machines' && inpostNumber) && (
              <div className={styles.inpostNumber}>
                <p>
                  {inpostNumber.address.line1}, {inpostNumber.address.line2} - {inpostNumber.name}
                </p>
                <button onClick={() => { setInpostNumber(null) }}>
                  <Cross />
                </button>
              </div>
            )}
          </label>
        ))}
      </fieldset>
      <button className="link">Przechodzę dalej</button>
    </form>
  )

}