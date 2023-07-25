import React from "react"
import styles from "./styles.module.scss"

export default function Aside({ data }) {
  return (
    <aside className={styles.wrapper}>
      <h3>Twoje produkty:</h3>
      <ul>
        {data?.products?.map((el) => (
          <li key={el.name}>
            <h4>{el.name}</h4>
            <div className={styles.flex}>
              <span className={styles.count}><span>Ilość:</span> <strong>{el.qty}</strong></span>
              <span className={styles.price}>Cena: <strong dangerouslySetInnerHTML={{ __html: el.totalPrice }} /></span>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.sum}>
        Razem:
        <strong dangerouslySetInnerHTML={{ __html: data?.totalProductsPrice }} />
      </div>
    </aside>
  )
}