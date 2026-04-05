'use client'
import React, { useEffect, useState } from "react"
import { htmlDelete } from "../../../utils/delete-html"
import { CursorFinger } from "../../../assets/cursor-finger"
import IllnesGrid from "@/components/moleculas/illnes-grid-with-popup"
import styles from './styles.module.scss'
import { Image } from "@/components/atoms/image"
import { AngleRightDouble } from "../../../assets/angle-right-double"
import { removeWrap } from "../../../utils/title-modification"

export default function Flex({ comment, afterImage, beforeImage, title, text, resultTitle, result, problems }) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const escFunction = (event) => {
      if (event.keyCode === 27) {
        setActive(null)
      }
    }
    document.addEventListener("keydown", escFunction, false)

    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [setActive])

  return (
    <div className={styles.info_flex}>
      <div className={styles.images}>
        <div >
          <Image
            loading='eager'
            width={beforeImage.mediaDetails.width}
            height={beforeImage.mediaDetails.height}
            src={beforeImage.mediaItemUrl}
            alt={beforeImage.altText}
            className={styles.left}
            aspectRatio={true}
          />
          <svg width="110" height="68" viewBox="0 0 110 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56.5 0H0.5L109.5 68V33.5L56.5 0Z" fill="#DEAFB8" />
            <path d="M54.7589 17.6877C57.1776 19.1375 59.7635 18.4023 61.1516 16.0865C62.5809 13.702 61.9761 11.171 59.5401 9.71087L54.7197 6.82154L47.2856 19.2242L48.9668 20.2319L51.6196 15.806L54.7589 17.6877ZM58.3437 11.0457C59.9219 11.9916 60.3307 13.4492 59.395 15.0102C58.4799 16.537 56.9674 16.9595 55.3035 15.9622L52.5244 14.2964L55.496 9.3388L58.3437 11.0457ZM67.6051 19.908C67.3203 19.644 67.1007 19.4658 66.8091 19.291C65.6597 18.6021 64.4696 18.6815 63.6021 19.3507L64.26 18.0196L62.7504 17.1147L57.7327 25.4861L59.3452 26.4526L62.0083 22.0096C62.9749 20.3971 64.4736 20.0363 66.0003 20.9514L66.7208 21.3833L67.6051 19.908ZM70.2873 33.0113L71.0996 31.6561L66.5365 28.921L74.5236 25.9437L75.3154 24.6228L68.7795 20.7052L67.9672 22.0604L72.496 24.775L64.5329 27.79L63.7515 29.0937L70.2873 33.0113ZM75.4181 36.3665C77.4938 37.6107 79.5072 37.4417 80.9985 35.8873L79.4889 34.9824C78.6386 35.7785 77.5067 35.7996 76.2545 35.049C74.6591 34.0928 74.3189 32.5597 75.2579 30.7208L81.7525 34.5904L82.1124 33.99C83.6033 31.5026 83.0294 28.9201 80.6449 27.4908C78.209 26.0308 75.4551 26.8517 73.8819 29.4764C72.319 32.0838 72.9479 34.8859 75.4181 36.3665ZM79.8326 28.846C81.2564 29.6995 81.6104 31.1708 80.7775 32.5603L75.94 29.6607C77.0301 28.3088 78.4259 28.0029 79.8326 28.846ZM84.4584 41.7852C85.7964 42.5872 87.2782 42.6826 88.5161 41.8623L87.7382 43.4713L89.1792 44.335L96.7469 31.7093L95.1516 30.7531L91.7996 36.3454C91.8504 34.9768 91.109 33.763 89.8224 32.9918C87.335 31.5009 84.7115 32.4933 83.1692 35.0664C81.6371 37.6225 82.0225 40.3251 84.4584 41.7852ZM85.6583 40.5224C84.0115 39.5353 83.7912 37.7244 84.8297 35.9918C85.8579 34.2764 87.5589 33.617 89.2057 34.6041C90.8525 35.5912 91.1243 37.433 90.0961 39.1485C89.0473 40.8982 87.3052 41.5095 85.6583 40.5224Z" fill="#181818" />
          </svg>
        </div>
        <AngleRightDouble />
        <div className={styles.left_wrap}>
          <Image
            loading='eager'
            width={afterImage.mediaDetails.width}
            height={afterImage.mediaDetails.height}
            src={afterImage.mediaItemUrl}
            alt={afterImage.altText}
            className={styles.right}
            aspectRatio={true}
          />
          <svg width="110" height="68" viewBox="0 0 110 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56.5 0H0.5L109.5 68V33.5L56.5 0Z" fill="#DEAFB8" />
            <path d="M62.0128 22.4816C64.4315 23.9314 67.0174 23.1963 68.4055 20.8804C69.8348 18.4959 69.23 15.9649 66.794 14.5048L61.9736 11.6155L54.5395 24.0181L56.2207 25.0258L58.8735 20.6L62.0128 22.4816ZM65.5976 15.8396C67.1758 16.7856 67.5846 18.2431 66.6489 19.8042C65.7338 21.3309 64.2213 21.7535 62.5574 20.7561L59.7784 19.0904L62.7499 14.1327L65.5976 15.8396ZM66.5715 25.5172C65.0189 28.1076 65.7816 31.0364 68.3033 32.5479C70.8079 34.0491 73.7505 33.3412 75.3031 30.7509C76.8557 28.1606 76.093 25.2317 73.5884 23.7305C71.0667 22.219 68.1241 22.9269 66.5715 25.5172ZM68.2012 26.4941C69.25 24.7443 71.0951 24.1947 72.7247 25.1715C74.3372 26.138 74.7394 28.0346 73.6906 29.7844C72.6418 31.5341 70.7796 32.0735 69.1671 31.1069C67.5374 30.1301 67.1524 28.2438 68.2012 26.4941Z" fill="#181818" />
          </svg>
          <span className={styles.result}>
            {result}
          </span>
        </div>
      </div>
      <div className={styles.right_column}>
        <p className={styles.result}><span>{resultTitle}</span> {result}</p>
        <div className={styles.problems}>
          <p>Z czym się zmagałam?</p>
          <p><CursorFinger /> Kliknij, aby dowiedzieć się więcej</p>
        </div>
        <IllnesGrid active={active} setActive={setActive} problems={problems} />
      </div>
      <div onClick={() => { setActive(null) }} className={`${styles.text_part} ${active !== null ? styles.blurred : ''} `}>
        <h1 dangerouslySetInnerHTML={{ __html: htmlDelete(title) }} />
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <h2 className={styles.bold} dangerouslySetInnerHTML={{ __html: removeWrap(comment) }} />
    </div>
  )
}