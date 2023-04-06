'use client'
import React, { useRef, useState } from "react"
import styles from './styles.module.scss';
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Specialists({ data }) {
  const constraintsRef = useRef(null)

  return (
    <section ref={constraintsRef} className={styles.wrapper}>
      <h2>Wybierz specjalistę</h2>
      <div className={styles.control}>
        <button aria-label='strzałka w lewo' >
          <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45.625 30.1666H26.875L33.0437 24.135C33.2195 23.9646 33.359 23.7618 33.4542 23.5384C33.5494 23.315 33.5984 23.0753 33.5984 22.8333C33.5984 22.5913 33.5494 22.3517 33.4542 22.1283C33.359 21.9049 33.2195 21.7021 33.0437 21.5317C32.6924 21.1902 32.2172 20.9985 31.7219 20.9985C31.2265 20.9985 30.7513 21.1902 30.4 21.5317L22.3563 29.415C21.652 30.0995 21.2542 31.0291 21.25 32C21.2591 32.9645 21.6566 33.8867 22.3563 34.5666L30.4 42.45C30.5748 42.6197 30.7821 42.7541 31.0101 42.8455C31.238 42.9369 31.4821 42.9835 31.7285 42.9826C31.9749 42.9818 32.2187 42.9335 32.4459 42.8405C32.6732 42.7476 32.8795 42.6117 33.0531 42.4408C33.2267 42.2699 33.3642 42.0672 33.4576 41.8443C33.5511 41.6214 33.5988 41.3827 33.5979 41.1418C33.597 40.9009 33.5477 40.6626 33.4526 40.4403C33.3575 40.2181 33.2186 40.0164 33.0437 39.8466L26.875 33.8333H45.625C46.1223 33.8333 46.5992 33.6402 46.9508 33.2963C47.3025 32.9525 47.5 32.4862 47.5 32C47.5 31.5137 47.3025 31.0474 46.9508 30.7036C46.5992 30.3598 46.1223 30.1666 45.625 30.1666Z" fill="#194574" />
          </svg>
        </button>
        <button aria-label='strzałka w prawo' >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.9997 32C42.9908 31.0354 42.6021 30.1133 41.918 29.4333L34.053 21.55C33.7095 21.2085 33.2448 21.0168 32.7605 21.0168C32.2762 21.0168 31.8115 21.2085 31.468 21.55C31.2962 21.7204 31.1598 21.9232 31.0667 22.1466C30.9736 22.37 30.9257 22.6096 30.9257 22.8516C30.9257 23.0937 30.9736 23.3333 31.0667 23.5567C31.1598 23.7801 31.2962 23.9829 31.468 24.1533L37.4997 30.1666H19.1663C18.6801 30.1666 18.2138 30.3598 17.87 30.7036C17.5262 31.0474 17.333 31.5137 17.333 32C17.333 32.4862 17.5262 32.9525 17.87 33.2963C18.2138 33.6401 18.6801 33.8333 19.1663 33.8333H37.4997L31.468 39.8649C31.1228 40.2077 30.9279 40.6736 30.9262 41.1601C30.9244 41.6466 31.116 42.1139 31.4588 42.4591C31.8016 42.8043 32.2675 42.9992 32.754 43.001C33.2405 43.0027 33.7078 42.8111 34.053 42.4683L41.918 34.5849C42.6066 33.9005 42.9956 32.9708 42.9997 32Z" fill="#194574" />
          </svg>
        </button>
      </div>
      <motion.div transition={{ type: "spring", stiffness: 30 }} dragConstraints={constraintsRef} drag="x" className={styles.grid}>
        {data?.map(({ title, profesje, proffesional }, index) => (
          <div id={index ? '' : 'ref-item'} key={index} className={styles.item}>
            <div>
              <Image src={proffesional?.personImage?.mediaItemUrl} alt={proffesional?.personImage?.altText} width={proffesional?.personImage.mediaDetails.width} height={proffesional?.personImage.mediaDetails.height} />
              <h3>{title}</h3>
              <p>{proffesional?.proffesion}</p>
              <ul>
                {profesje?.nodes?.map(({ name }, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
            <div className={styles.bottom_inform}>
              <div className={styles.flex}>
                <p>Najbliższy termin:</p>
                <p>Wt., 9 Mar 9:30</p>
              </div>
              <div className={styles.flex}>
                <Link className="link" href="#kontakt">Umów wizytę</Link>
                {/* <button href='/'>Więcej terminów</button> */}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}