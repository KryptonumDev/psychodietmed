import React from "react"
import styles from './styles.module.scss';
import Image from "next/image";
import { removeWrap } from "../../../utils/title-modification";

export default function StatisticsFlex({ data }) {

  const { title, textTop, pinkList, blueList, textBot, counters, image } = data
  return (
    <section className={styles.wrapper}>
      <div>
        <div className={styles.tabletFlex}>
          <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
          <div className={styles.topText} dangerouslySetInnerHTML={{ __html: textTop }} />
        </div>
        <div className={styles.pinkListTitle} dangerouslySetInnerHTML={{ __html: pinkList.title }} />
        <ul className={styles.pinkList}>
          {pinkList.listItems.map((item, index) => (
            <li className={styles.item} key={index}>
              <Image src={item.icon.mediaItemUrl} alt={item.icon.altText} width={item.icon.mediaDetails.width} height={item.icon.mediaDetails.height} />
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
        <div className={styles.blueListTitle} dangerouslySetInnerHTML={{ __html: blueList.title }} />
        <ul className={styles.blueList}>
          {blueList.listItems.map((item, index) => (
            <li className={styles.item} key={index}>
              <Image src={item.icon.mediaItemUrl} alt={item.icon.altText} width={item.icon.mediaDetails.width} height={item.icon.mediaDetails.height} />
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
        <div className={styles.botText} dangerouslySetInnerHTML={{ __html: textBot }} />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.counters}>
          {counters.map((counter, index) => (
            <div className={styles.counterItem} key={index}>
              <span>{counter.number}</span>
              <p>{counter.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.imageWrapper}>
          <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        </div>
      </div>
    </section>
  )
}