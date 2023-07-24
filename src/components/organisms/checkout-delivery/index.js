import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";

export default function Delivery({ input, setInput, setStep, shippingMethods }) {
  const { register, watch, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur", defaultValues: { delivery: shippingMethods[0].methodId } });

  const [inpostNumber, setInpostNumber] = useState(null)

  const submit = (data) => {
    setInput({ ...input, shippingMethod: data.delivery, inpostNumber: inpostNumber })
    setStep(4)
  }

  const onPointCallback = (e) => {
    setInpostNumber(e)
  }
  // TODO: validate inpost number

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
            {/* {el.methodId === 'easypack_parcel_machines' && (
              <InpostGeowidget
                token={process.env.NEXT_PUBLIC_INPOST_GEO_KEY}
                config='parcelCollect'
                onPoint={onPointCallback}
              />
            )} */}
          </label>
        ))}
      </fieldset>
      <button className="link">Przechodzę dalej</button>
    </form>
  )

}