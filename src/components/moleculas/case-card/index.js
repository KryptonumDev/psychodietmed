import React from "react"
import styles from './styles.module.scss';
import { Image } from "@/components/atoms/image";
import { removeWrap } from "../../../utils/title-modification";
import Button from "@/components/atoms/button";

export default function Card({ specialist, slug, name, avatar, comment, linkText, before, after, boldText }) {
  return (
    <div className={(after?.mediaItemUrl && before?.mediaItemUrl) ? `${styles.slide}` : `${styles.wide} ${styles.slide}`} >
      <div className={styles.slideAuthor}>
        <Image aspectRatio={true} quality='90' src={avatar.mediaItemUrl} alt={avatar.altText} width={avatar.mediaDetails.width} height={avatar.mediaDetails.height} className={styles.slideAuthorImage} />
        <div className={styles.slideAuthorName}>{name}</div>
        <svg className={styles.svg} width="59" height="58" viewBox="0 0 59 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_578_1245)">
            <path d="M19.8333 9.66504H10.1667C7.60291 9.66504 5.14415 10.6835 3.3313 12.4963C1.51845 14.3092 0.5 16.7679 0.5 19.3317L0.5 28.9984C0.5 30.2803 1.00922 31.5096 1.91565 32.4161C2.82208 33.3225 4.05145 33.8317 5.33333 33.8317H19.6158C19.0424 37.2067 17.2946 40.2704 14.6811 42.4814C12.0676 44.6925 8.75667 45.9087 5.33333 45.915C4.69239 45.915 4.0777 46.1697 3.62449 46.6229C3.17128 47.0761 2.91667 47.6908 2.91667 48.3317C2.91667 48.9726 3.17128 49.5873 3.62449 50.0406C4.0777 50.4938 4.69239 50.7484 5.33333 50.7484C10.4591 50.7426 15.3733 48.7039 18.9977 45.0794C22.6222 41.455 24.6609 36.5408 24.6667 31.415V14.4984C24.6667 13.2165 24.1574 11.9871 23.251 11.0807C22.3446 10.1743 21.1152 9.66504 19.8333 9.66504Z" fill="#E4EEF7" />
            <path d="M53.6673 9.66504H44.0007C41.4369 9.66504 38.9781 10.6835 37.1653 12.4963C35.3524 14.3092 34.334 16.7679 34.334 19.3317V28.9984C34.334 30.2803 34.8432 31.5096 35.7496 32.4161C36.6561 33.3225 37.8854 33.8317 39.1673 33.8317H53.4498C52.8764 37.2067 51.1286 40.2704 48.5151 42.4814C45.9016 44.6925 42.5906 45.9087 39.1673 45.915C38.5264 45.915 37.9117 46.1697 37.4585 46.6229C37.0053 47.0761 36.7507 47.6908 36.7507 48.3317C36.7507 48.9726 37.0053 49.5873 37.4585 50.0406C37.9117 50.4938 38.5264 50.7484 39.1673 50.7484C44.2931 50.7426 49.2072 48.7039 52.8317 45.0794C56.4561 41.455 58.4949 36.5408 58.5007 31.415V14.4984C58.5007 13.2165 57.9914 11.9871 57.085 11.0807C56.1786 10.1743 54.9492 9.66504 53.6673 9.66504Z" fill="#E4EEF7" />
          </g>
        </svg>
      </div>
      <div className={styles.slideText} dangerouslySetInnerHTML={{ __html: comment }} />
      {specialist && (
        <div className={styles.specialistWrap}>
          <p>Specjalista, z którym współpracowałam:</p>
          <div className={styles.specialist}>
            <Image
              quality={100}
              src={specialist.proffesional.avatar.mediaItemUrl}
              alt={specialist.proffesional.avatar.altText}
              width={specialist.proffesional.avatar.mediaDetails.width}
              height={specialist.proffesional.avatar.mediaDetails.height}
              className={styles.avatar}
            />
            <p>{specialist.title}</p>
          </div>
        </div>
      )}
      {after?.mediaItemUrl && before?.mediaItemUrl && (
        <Button theme="secondary" href={`/efekty-wspolpracy/${slug}`} className={styles.slideLink}>{linkText}</Button>
      )}
      {after?.mediaItemUrl && before?.mediaItemUrl ? (
        <div className={styles.slideImages}>
          <div className={styles.before}>
            <Image aspectRatio={true} quality='90' src={before.mediaItemUrl} alt={before.altText} width={before.mediaDetails.width} height={before.mediaDetails.height} className={`${styles.image}`} />
            <svg width="110" height="68" viewBox="0 0 110 68" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M56.5 0H0.5L109.5 68V33.5L56.5 0Z" fill="#DEAFB8" />
              <path d="M54.7589 17.6877C57.1776 19.1375 59.7635 18.4023 61.1516 16.0865C62.5809 13.702 61.9761 11.171 59.5401 9.71087L54.7197 6.82154L47.2856 19.2242L48.9668 20.2319L51.6196 15.806L54.7589 17.6877ZM58.3437 11.0457C59.9219 11.9916 60.3307 13.4492 59.395 15.0102C58.4799 16.537 56.9674 16.9595 55.3035 15.9622L52.5244 14.2964L55.496 9.3388L58.3437 11.0457ZM67.6051 19.908C67.3203 19.644 67.1007 19.4658 66.8091 19.291C65.6597 18.6021 64.4696 18.6815 63.6021 19.3507L64.26 18.0196L62.7504 17.1147L57.7327 25.4861L59.3452 26.4526L62.0083 22.0096C62.9749 20.3971 64.4736 20.0363 66.0003 20.9514L66.7208 21.3833L67.6051 19.908ZM70.2873 33.0113L71.0996 31.6561L66.5365 28.921L74.5236 25.9437L75.3154 24.6228L68.7795 20.7052L67.9672 22.0604L72.496 24.775L64.5329 27.79L63.7515 29.0937L70.2873 33.0113ZM75.4181 36.3665C77.4938 37.6107 79.5072 37.4417 80.9985 35.8873L79.4889 34.9824C78.6386 35.7785 77.5067 35.7996 76.2545 35.049C74.6591 34.0928 74.3189 32.5597 75.2579 30.7208L81.7525 34.5904L82.1124 33.99C83.6033 31.5026 83.0294 28.9201 80.6449 27.4908C78.209 26.0308 75.4551 26.8517 73.8819 29.4764C72.319 32.0838 72.9479 34.8859 75.4181 36.3665ZM79.8326 28.846C81.2564 29.6995 81.6104 31.1708 80.7775 32.5603L75.94 29.6607C77.0301 28.3088 78.4259 28.0029 79.8326 28.846ZM84.4584 41.7852C85.7964 42.5872 87.2782 42.6826 88.5161 41.8623L87.7382 43.4713L89.1792 44.335L96.7469 31.7093L95.1516 30.7531L91.7996 36.3454C91.8504 34.9768 91.109 33.763 89.8224 32.9918C87.335 31.5009 84.7115 32.4933 83.1692 35.0664C81.6371 37.6225 82.0225 40.3251 84.4584 41.7852ZM85.6583 40.5224C84.0115 39.5353 83.7912 37.7244 84.8297 35.9918C85.8579 34.2764 87.5589 33.617 89.2057 34.6041C90.8525 35.5912 91.1243 37.433 90.0961 39.1485C89.0473 40.8982 87.3052 41.5095 85.6583 40.5224Z" fill="#181818" />
            </svg>
          </div>
          <div className={styles.after}>
            <Image aspectRatio={true} quality='90' src={after.mediaItemUrl} alt={after.altText} width={after.mediaDetails.width} height={after.mediaDetails.height} className={`${styles.image}`} />
            <svg width="110" height="68" viewBox="0 0 110 68" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M56.5 0H0.5L109.5 68V33.5L56.5 0Z" fill="#DEAFB8" />
              <path d="M62.0128 22.4816C64.4315 23.9314 67.0174 23.1963 68.4055 20.8804C69.8348 18.4959 69.23 15.9649 66.794 14.5048L61.9736 11.6155L54.5395 24.0181L56.2207 25.0258L58.8735 20.6L62.0128 22.4816ZM65.5976 15.8396C67.1758 16.7856 67.5846 18.2431 66.6489 19.8042C65.7338 21.3309 64.2213 21.7535 62.5574 20.7561L59.7784 19.0904L62.7499 14.1327L65.5976 15.8396ZM66.5715 25.5172C65.0189 28.1076 65.7816 31.0364 68.3033 32.5479C70.8079 34.0491 73.7505 33.3412 75.3031 30.7509C76.8557 28.1606 76.093 25.2317 73.5884 23.7305C71.0667 22.219 68.1241 22.9269 66.5715 25.5172ZM68.2012 26.4941C69.25 24.7443 71.0951 24.1947 72.7247 25.1715C74.3372 26.138 74.7394 28.0346 73.6906 29.7844C72.6418 31.5341 70.7796 32.0735 69.1671 31.1069C67.5374 30.1301 67.1524 28.2438 68.2012 26.4941Z" fill="#181818" />
            </svg>
          </div>
        </div>
      ) : (
        <div className={styles.slideBoldText} dangerouslySetInnerHTML={{ __html: removeWrap(boldText) }} />
      )}
    </div>
  )
}