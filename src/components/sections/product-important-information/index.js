import React from "react"
import styles from "./styles.module.scss"
import { Info } from "../../../assets/info"
import { removeWrap } from "../../../utils/title-modification"
import Link from "next/link"

export default function ImportantInformation({ data: { title, list } }) {
  if(!list) return null

  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <ul>
        {list?.map((item, index) => (
          <li key={index} >
            <Info />
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
      <Link className="link" href='#zakup'>Chcę ten produkt!</Link>
    </section>
  )
}