import React from "react";
import styles from "./styles.module.scss";
import { removeWrap } from "../../../utils/title-modification";
import Link from "next/link";
import { Image } from "@/components/atoms/image";

export default function Recruitment({ data: { title, text, link, grid } }) {
  return (
    <section className={styles.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      <Link className="link" href={link.url}>{link.title}</Link>
      <div className={styles.grid}>
        {grid.map((el, i) => (
          <div key={i} className={styles.item}>
            <Image className={styles.image} src={el.icon.mediaItemUrl} alt={el.icon.altText} width={el.icon.mediaDetails.width} height={el.icon.mediaDetails.height} />
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: el.text }} />
          </div>
        ))}
      </div>
    </section>
  )
}