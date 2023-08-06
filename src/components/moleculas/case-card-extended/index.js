import React from "react"
import styles from './styles.module.scss';
import Link from "next/link";
import { Image } from "@/components/atoms/image";
import { removeWrap } from "../../../utils/title-modification";
import { RightArrow } from "../../../assets/small-right-arrow";
import { Butterfly } from "../../../assets/butterfly";
import Category from "@/components/atoms/category-pill";
import Button from "@/components/atoms/button";

const Quote = () => (
  <svg className={styles.svg} width="59" height="58" viewBox="0 0 59 58" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_578_1245)">
      <path d="M19.8333 9.66504H10.1667C7.60291 9.66504 5.14415 10.6835 3.3313 12.4963C1.51845 14.3092 0.5 16.7679 0.5 19.3317L0.5 28.9984C0.5 30.2803 1.00922 31.5096 1.91565 32.4161C2.82208 33.3225 4.05145 33.8317 5.33333 33.8317H19.6158C19.0424 37.2067 17.2946 40.2704 14.6811 42.4814C12.0676 44.6925 8.75667 45.9087 5.33333 45.915C4.69239 45.915 4.0777 46.1697 3.62449 46.6229C3.17128 47.0761 2.91667 47.6908 2.91667 48.3317C2.91667 48.9726 3.17128 49.5873 3.62449 50.0406C4.0777 50.4938 4.69239 50.7484 5.33333 50.7484C10.4591 50.7426 15.3733 48.7039 18.9977 45.0794C22.6222 41.455 24.6609 36.5408 24.6667 31.415V14.4984C24.6667 13.2165 24.1574 11.9871 23.251 11.0807C22.3446 10.1743 21.1152 9.66504 19.8333 9.66504Z" fill="#E4EEF7" />
      <path d="M53.6673 9.66504H44.0007C41.4369 9.66504 38.9781 10.6835 37.1653 12.4963C35.3524 14.3092 34.334 16.7679 34.334 19.3317V28.9984C34.334 30.2803 34.8432 31.5096 35.7496 32.4161C36.6561 33.3225 37.8854 33.8317 39.1673 33.8317H53.4498C52.8764 37.2067 51.1286 40.2704 48.5151 42.4814C45.9016 44.6925 42.5906 45.9087 39.1673 45.915C38.5264 45.915 37.9117 46.1697 37.4585 46.6229C37.0053 47.0761 36.7507 47.6908 36.7507 48.3317C36.7507 48.9726 37.0053 49.5873 37.4585 50.0406C37.9117 50.4938 38.5264 50.7484 39.1673 50.7484C44.2931 50.7426 49.2072 48.7039 52.8317 45.0794C56.4561 41.455 58.4949 36.5408 58.5007 31.415V14.4984C58.5007 13.2165 57.9914 11.9871 57.085 11.0807C56.1786 10.1743 54.9492 9.66504 53.6673 9.66504Z" fill="#E4EEF7" />
    </g>
  </svg>
)

export default function Card({ slug, name, avatar, comment, linkText, before, after, differences, problems, result, resultTitle, boldText }) {
  return (
    <div className={styles.slide} >
      <Quote />
      <div className={styles.content}>
        <div className={styles.slideAuthor}>
          <Image aspectRatio={true} quality='90' src={avatar.mediaItemUrl} alt={avatar.altText} width={avatar.mediaDetails.width} height={avatar.mediaDetails.height} className={styles.slideAuthorImage} />
          <div className={styles.slideAuthorName}>{name}</div>
        </div>
        <div className={styles.middle}>
          <div className={styles.info}>
            <p><strong>{resultTitle}</strong>{result}</p>
            <p><strong>Z czym się zmagałam?</strong></p>
            <div className={styles.illnes}>
              {problems.map(el => (
                <Category key={el?.title} name={el?.title} href={'#'} />
              ))}
            </div>
          </div>
          <div className={styles.differences}>
            {differences && (
              <>
                <div className={styles.differences_title}>Co się zmieniło?</div>
                {differences?.map(el => (
                  <p key={el.difference}><Butterfly />{el.difference}</p>
                ))}
              </>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          {after?.mediaItemUrl && before?.mediaItemUrl ? (
            <div className={styles.slideImages}>
              <Image aspectRatio={true} quality='90' src={before.mediaItemUrl} alt={before.altText} width={before.mediaDetails.width} height={before.mediaDetails.height} className={`${styles.before} ${styles.image}`} />
              <Image aspectRatio={true} quality='90' src={after.mediaItemUrl} alt={after.altText} width={after.mediaDetails.width} height={after.mediaDetails.height} className={`${styles.after} ${styles.image}`} />
            </div>
          ) : (
            <div className={styles.slideBoldText} dangerouslySetInnerHTML={{ __html: removeWrap(boldText) }} />
          )}
          <div className={styles.slideText} dangerouslySetInnerHTML={{ __html: comment }} />
        </div>
      </div>
      {after?.mediaItemUrl && before?.mediaItemUrl && (
        <Button theme="secondary" href={`/efekty-wspolpracy/${slug}`} className={styles.slideLink}>{linkText}</Button>
      )}
    </div>
  )
}
