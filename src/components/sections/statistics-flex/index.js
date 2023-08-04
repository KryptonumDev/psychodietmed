import React from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import { Image } from "@/components/atoms/image";

export default function StatisticsFlex({ data }) {

  const { title, textTop, pinkList, blueList, textBot, counters, image } = data
  return (
    <section className={styles.wrapper}>
      <div className={styles.grid}>
        <div>
          <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
          <div className={styles.topText} dangerouslySetInnerHTML={{ __html: textTop }} />
          <p className={styles.pinkListTitle} dangerouslySetInnerHTML={{ __html: pinkList.title }} />
          <ul className={styles.pinkList}>
            {pinkList.listItems.map((item, index) => (
              <li className={styles.pinkItem} key={index}>
                <Image src={item.icon.mediaItemUrl} alt={item.icon.altText} width={item.icon.mediaDetails.width} height={item.icon.mediaDetails.height} />
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.counters}>
            {counters.map((counter, index) => (
              <div className={styles.counterItem} key={index}>
                <span>
                  {counter.number}
                </span>
                <p>{counter.text}</p>
              </div>
            ))}
          </div>
          <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        </div>
      </div>
      <div className={styles.cta}>
        <p className={styles.blueListTitle} dangerouslySetInnerHTML={{ __html: blueList.title }} />
        <ul className={styles.blueList}>
          {blueList.listItems.map((item, index) => (
            <li className={styles.blueItem} key={index}>
              <Image src={item.icon.mediaItemUrl} alt={item.icon.altText} width={item.icon.mediaDetails.width} height={item.icon.mediaDetails.height} />
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
        <div className={styles.botText} dangerouslySetInnerHTML={{ __html: textBot }} />
      </div>
    </section>
  )
}