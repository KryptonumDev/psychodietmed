import React from "react"
import styles from "./styles.module.scss"

export default function Process({ needsShippingAddress, step = 2 }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.desctop}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
          <CheckMark />
          <div>
            <span>01</span>
            <p>Twój koszyk</p>
          </div>
        </div>
        <span className={styles.line} />
        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
          <CheckMark />
          <div>
            <span>02</span>
            <p>Dane osobowe</p>
          </div>
        </div>
        <span className={styles.line} />
        {needsShippingAddress && (
          <>
            <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
              <CheckMark />
              <div>
                <span>03</span>
                <p>Dostawa</p>
              </div>
            </div>
            <span className={styles.line} />
          </>
        )}
        <div className={`${styles.step} ${((step >= 4 && needsShippingAddress) || (step >= 3 && !needsShippingAddress)) ? styles.active : ''}`}>
          <CheckMark />
          <div>
            <span>{needsShippingAddress ? '04' : '03'}</span>
            <p>Podsumowanie</p>
          </div>
        </div>
      </div>

      <div className={styles.mobile}>
        <div class={styles.pie} style={{ '--p': 100 * (step / (needsShippingAddress ? 4 : 3)) }}>
          <strong>0{step}</strong>
          <span>/</span>
          <small>{needsShippingAddress ? '04' : '03'}</small>
        </div>
        <div>
          {step === 1 && <p>Twój koszyk</p>}
          {step === 2 && <p>Dane osobowe</p>}
          {(step === 3 && needsShippingAddress) && <p>Dostawa</p>}
          {((step === 4 && needsShippingAddress) || (step === 3 && !needsShippingAddress)) && <p>Podsumowanie</p>}
        </div>
      </div>
    </div>
  )
}

const CheckMark = () => (
  <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" width="35" height="35" rx="17.5" fill="#F1F6FB" />
    <g clip-path="url(#clip0_1159_5303)">
      <path d="M26.1707 11.5079L15.2307 22.4472C15.1571 22.521 15.0697 22.5796 14.9735 22.6196C14.8772 22.6596 14.774 22.6801 14.6698 22.6801C14.5655 22.6801 14.4623 22.6596 14.3661 22.6196C14.2698 22.5796 14.1824 22.521 14.1089 22.4472L9.87821 18.2125C9.80465 18.1387 9.71724 18.0801 9.62099 18.0401C9.52474 18.0001 9.42154 17.9796 9.31731 17.9796C9.21309 17.9796 9.10989 18.0001 9.01363 18.0401C8.91738 18.0801 8.82997 18.1387 8.75642 18.2125C8.68257 18.2861 8.62398 18.3735 8.584 18.4698C8.54402 18.566 8.52344 18.6692 8.52344 18.7734C8.52344 18.8777 8.54402 18.9809 8.584 19.0771C8.62398 19.1734 8.68257 19.2608 8.75642 19.3343L12.9887 23.5658C13.4351 24.0114 14.0402 24.2617 14.671 24.2617C15.3018 24.2617 15.9068 24.0114 16.3533 23.5658L27.2925 12.6289C27.3662 12.5554 27.4247 12.468 27.4646 12.3718C27.5045 12.2757 27.5251 12.1725 27.5251 12.0684C27.5251 11.9643 27.5045 11.8612 27.4646 11.765C27.4247 11.6688 27.3662 11.5815 27.2925 11.5079C27.2189 11.4341 27.1315 11.3755 27.0353 11.3355C26.939 11.2955 26.8358 11.2749 26.7316 11.2749C26.6274 11.2749 26.5242 11.2955 26.4279 11.3355C26.3317 11.3755 26.2443 11.4341 26.1707 11.5079Z" fill="#194574" />
    </g>
    <defs>
      <clipPath id="clip0_1159_5303">
        <rect width="19" height="19" fill="white" transform="translate(8.5 8)" />
      </clipPath>
    </defs>
  </svg>
)