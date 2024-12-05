'use client'
import React, { useEffect, useState } from "react"
import styles from './styles.module.scss'
import Input from "@/components/atoms/input"
import { useForm } from "react-hook-form"
import { altPhonePattern, emailPattern, phonePattern } from "../../../constants/patterns"
import Button from "@/components/atoms/button"
import { AnimatePresence, motion } from "framer-motion"
import { v4 } from "uuid"
import { Image } from "@/components/atoms/image"
import { Cross } from "../../../assets/cross"
import Checkbox from "@/components/atoms/checkbox"
import axios from "axios"

function formatPhoneNumber(input) {
  const digitsOnly = input.replace(/\D/g, '');

  if (input.includes('+')) return `+${digitsOnly}`

  return `+48${digitsOnly}`
}

const calculatePrice = (price, discount) => {
  if (!price) return null
  if (!discount) return price

  if (discount.type === 'PERCENT')
    return (price / 100) * (100 - discount.amount)

  return price - (discount.amount * 100)
}

export const PopUp = ({ service, specialistId, serviceId, setPopupOpened, chosenDate, chosenTime, specialistData }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const [discount, setDiscount] = useState(null)
  const [couponStatus, setCouponStatus] = useState(null)
  const hasCoupon = watch('has_coupon')
  const coupon = watch('coupon')

  const validateCoupon = () => {
    axios.post('/api/get-coupon-data', { code: coupon })
      .then(({ data }) => {
        if (data?.coupon) {
          setDiscount({
            code: data.coupon.code,
            type: data.coupon.discountType === "PERCENT" ? 'PERCENT' : 'AMOUNT',
            amount: data.coupon.amount
          })
          setCouponStatus(null)
        } else {
          setCouponStatus('Nie znaleziono takiego kuponu')
          setDiscount(null)
        }
      }).catch(err => {
        debugger
        setDiscount(null)
      })
  }

  const removeDiscount = () => {
    setDiscount(null)
    setCouponStatus(null)
    setValue('has_coupon', false)
    setValue('coupon', '')
  }

  const onSubmit = (data) => {
    fetch("/api/create-booking", {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        surname: data.surname,
        phone: formatPhoneNumber(data.phone),
        employeId: specialistId,
        serviceId: serviceId,
        date: chosenDate.format('YYYY-MM-DD'),
        time: chosenTime,
        adres: data.adres,
        city: data.city,
        postalcode: data.postalcode,
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.errors) throw new Error(res.message)
        if (res.code === "FORBIDDEN") throw new Error('Ten termin jest już w trakcie rezerwacji przez kogoś innego. Wybierz inny termin.')
        if (!res[0]?.id) throw new Error('Nie udało się stworzyć rezerwacji, spróbuj ponownie później.')

        const session = v4()
        fetch("/api/create-transaction", {
          method: 'POST',
          body: JSON.stringify({
            "client": data.name + ' ' + data.surname,
            "address": data.adres,
            "zip": data.postalcode,
            "city": data.city,
            amount: calculatePrice(service.price, discount),
            sessionId: session,
            email: data.email,
            description: `Konsultacja online, ${specialistData.title}`,
            "urlReturn": `https://www.psychodietmed.pl/api/verify-transaction-status/?session=${session}`,
            "urlStatus": `https://www.psychodietmed.pl/api/complete-booking/?session=${session}&id=${res[0].id}&amount=${calculatePrice(service.price, discount)}`,
          })
        })
          .then(response => response.json())
          .then(res => {
            if (!res.link) throw new Error('Nie udało się stwozryć płatnośći')
            localStorage.setItem('payLink', res.link)
            window.location.href = res.link
          })
          .catch(err => {
            alert(err.message)
            console.log(err)
          })
      })
      .catch(err => {
        alert(err.message)
        console.log(err)
      })
  }

  useEffect(() => {
    const escFunction = (event) => {
      if (event.keyCode === 27) {
        setPopupOpened(false)
      }
    }
    document.addEventListener("keydown", escFunction, false)

    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [setPopupOpened])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.popup}>
      <div onClick={() => { setPopupOpened(false) }} className={styles.overlay} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <button className={styles.close} onClick={() => { setPopupOpened(false) }}>
          <Cross />
        </button>
        <h3>Uzupełnij dane w celu umówienia wizyty</h3>
        <div className={styles.flex}>
          <div className={styles.info}>
            <div>
              <div className={styles.specialist}>
                <Image
                  className={styles.image}
                  src={specialistData.proffesional?.personImage?.mediaItemUrl}
                  alt={specialistData.proffesional?.personImage?.altText}
                  width={specialistData.proffesional?.personImage.mediaDetails.width}
                  height={specialistData.proffesional?.personImage.mediaDetails.height}
                />
                <div>
                  <h3>{specialistData.title}</h3>
                  <p>{specialistData.proffesional?.proffesion}</p>
                </div>
              </div>
              <div className={styles.wrap}>
                <p><IconCalendar /> {chosenDate.format('DD MMMM YYYY')}, {chosenTime}</p>
                <Button theme='secondary' href={specialistData.slug ? `/specjalisci/${specialistData.slug}#kalendarz` : null} onClick={() => { setPopupOpened(false) }}>Zmień termin</Button>
              </div>
              <p><IconMark /> Konsultacja online</p>
              <p><IconMoney /> {(service.price / 100)}&nbsp;zł / <small>sesja 50&nbsp;min</small></p>
            </div>
            <div className={styles.relative}>
              <div className={styles.toast}>
                {couponStatus}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {discount ? (
                  <motion.div key='result' className={styles.discount} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p>Zastosowano kod rabatowy:</p>
                    <p className={styles.removeButton}>
                      <button type="button" onClick={() => { removeDiscount() }}><Cross /></button><span>{coupon}:</span> <b>-{discount.amount}{discount.type === 'PERCENT' ? '%' : ' zł'}</b>
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {hasCoupon ? (
                      <motion.div key='input' className={styles.coupon} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Input
                          register={register('coupon')}
                          errors={errors}
                          label="Kupon"
                          name='coupon'
                          placeholder={'Kod kuponu'}
                        />
                        <button onClick={() => { validateCoupon() }} type="button" className="link">
                          Aktywuj
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div key='box' className={styles.coupon} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Checkbox
                          register={register('has_coupon')}
                          errors={errors}
                          name={'has_coupon'}
                          text={'Mam kod rabatowy'}
                        />
                      </motion.div>
                    )}
                  </>
                )}
              </AnimatePresence>
            </div>
            {/* <AnimatePresence mode="wait">
              {couponError && (
                <motion.span className={styles.error} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{couponError}</motion.span>
              )}
            </AnimatePresence> */}
          </div>
          <div>
            <div className={styles.columns}>
              <Input
                register={register('name', { required: true, minLength: 3 })}
                errors={errors}
                label="Imię"
                name='name'
                placeholder="Imię"
              />
              <Input
                register={register('surname', { required: true, minLength: 3 })}
                errors={errors}
                label="Nazwisko"
                name='surname'
                placeholder="Nazwisko"
              />
            </div>
            <Input
              register={register('email', { required: true, pattern: emailPattern })}
              errors={errors}
              label="Twój adres E-mail"
              name='email'
              placeholder="Twój adres E-mail"
            />
            <Input
              className={styles.phone}
              register={register('phone', { required: true, pattern: altPhonePattern })}
              errors={errors}
              label="Telefon"
              name='phone'
              placeholder="Telefon"
              error="Proszę wpisać telefon w formacie +48 123 456 789"
            />
            <Input
              register={register('adres', { required: true })}
              errors={errors}
              label="Adres"
              name='adres'
              placeholder="Adres"
            />
            <div className={styles.columns}>
              <Input
                register={register('city', { required: true, minLength: 3 })}
                errors={errors}
                label="Miasto"
                name='city'
                placeholder="Miasto"
              />
              <Input
                register={register('postalcode', { required: true, pattern: /^[0-9]{2}-[0-9]{3}$/i })} // patter 00-000
                errors={errors}
                label="Kod pocztowy"
                name='postalcode'
                placeholder="Kod pocztowy"
                error="Proszę wpisać kod w formacie 00-000"
              />
            </div>
          </div>
        </div>
        <Button type="submit">Przechodzę do płatności</Button>
      </form>
    </motion.div>
  )
}

const IconCalendar = () => (
  <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_4695_16938)">
      <path d="M19 2.70833H18V1.66667C18 1.3904 17.8946 1.12545 17.7071 0.930097C17.5196 0.734747 17.2652 0.625 17 0.625C16.7348 0.625 16.4804 0.734747 16.2929 0.930097C16.1054 1.12545 16 1.3904 16 1.66667V2.70833H8V1.66667C8 1.3904 7.89464 1.12545 7.70711 0.930097C7.51957 0.734747 7.26522 0.625 7 0.625C6.73478 0.625 6.48043 0.734747 6.29289 0.930097C6.10536 1.12545 6 1.3904 6 1.66667V2.70833H5C3.67441 2.70999 2.40356 3.25925 1.46622 4.23565C0.528882 5.21204 0.00158786 6.53584 0 7.91667L0 20.4167C0.00158786 21.7975 0.528882 23.1213 1.46622 24.0977C2.40356 25.0741 3.67441 25.6233 5 25.625H19C20.3256 25.6233 21.5964 25.0741 22.5338 24.0977C23.4711 23.1213 23.9984 21.7975 24 20.4167V7.91667C23.9984 6.53584 23.4711 5.21204 22.5338 4.23565C21.5964 3.25925 20.3256 2.70999 19 2.70833ZM2 7.91667C2 7.08786 2.31607 6.29301 2.87868 5.70696C3.44129 5.12091 4.20435 4.79167 5 4.79167H19C19.7956 4.79167 20.5587 5.12091 21.1213 5.70696C21.6839 6.29301 22 7.08786 22 7.91667V8.95833H2V7.91667ZM19 23.5417H5C4.20435 23.5417 3.44129 23.2124 2.87868 22.6264C2.31607 22.0403 2 21.2455 2 20.4167V11.0417H22V20.4167C22 21.2455 21.6839 22.0403 21.1213 22.6264C20.5587 23.2124 19.7956 23.5417 19 23.5417Z" fill="#194574" />
      <path d="M12 17.8125C12.8284 17.8125 13.5 17.1129 13.5 16.25C13.5 15.3871 12.8284 14.6875 12 14.6875C11.1716 14.6875 10.5 15.3871 10.5 16.25C10.5 17.1129 11.1716 17.8125 12 17.8125Z" fill="#194574" />
      <path d="M7 17.8125C7.82843 17.8125 8.5 17.1129 8.5 16.25C8.5 15.3871 7.82843 14.6875 7 14.6875C6.17157 14.6875 5.5 15.3871 5.5 16.25C5.5 17.1129 6.17157 17.8125 7 17.8125Z" fill="#194574" />
      <path d="M17 17.8125C17.8284 17.8125 18.5 17.1129 18.5 16.25C18.5 15.3871 17.8284 14.6875 17 14.6875C16.1716 14.6875 15.5 15.3871 15.5 16.25C15.5 17.1129 16.1716 17.8125 17 17.8125Z" fill="#194574" />
    </g>
    <defs>
      <clipPath id="clip0_4695_16938">
        <rect width="24" height="25" fill="white" transform="translate(0 0.625)" />
      </clipPath>
    </defs>
  </svg>
)

const IconMark = () => (
  <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_4695_16944)">
      <path d="M13.5 6.875C12.61 6.875 11.74 7.11937 10.9999 7.57721C10.2599 8.03505 9.68314 8.68579 9.34254 9.44715C9.00195 10.2085 8.91283 11.0463 9.08647 11.8545C9.2601 12.6628 9.68869 13.4052 10.318 13.9879C10.9474 14.5707 11.7492 14.9675 12.6221 15.1283C13.495 15.289 14.3998 15.2065 15.2221 14.8912C16.0443 14.5758 16.7471 14.0417 17.2416 13.3565C17.7361 12.6713 18 11.8658 18 11.0417C18 9.9366 17.5259 8.87679 16.682 8.09539C15.8381 7.31399 14.6935 6.875 13.5 6.875ZM13.5 13.125C13.055 13.125 12.62 13.0028 12.25 12.7739C11.88 12.545 11.5916 12.2196 11.4213 11.8389C11.251 11.4582 11.2064 11.0394 11.2932 10.6352C11.3801 10.2311 11.5943 9.85989 11.909 9.56853C12.2237 9.27717 12.6246 9.07875 13.061 8.99836C13.4975 8.91798 13.9499 8.95923 14.361 9.11692C14.7722 9.2746 15.1236 9.54163 15.3708 9.88423C15.618 10.2268 15.75 10.6296 15.75 11.0417C15.75 11.5942 15.5129 12.1241 15.091 12.5148C14.669 12.9055 14.0967 13.125 13.5 13.125Z" fill="#194574" />
      <path d="M13.4994 25.6251C12.5521 25.6296 11.6174 25.4239 10.7736 25.0252C9.92977 24.6265 9.20142 24.0464 8.6495 23.3335C4.36213 17.8574 2.1875 13.7408 2.1875 11.097C2.1875 8.31914 3.37928 5.65505 5.50067 3.6908C7.62206 1.72655 10.4993 0.623047 13.4994 0.623047C16.4995 0.623047 19.3767 1.72655 21.4981 3.6908C23.6195 5.65505 24.8113 8.31914 24.8113 11.097C24.8113 13.7408 22.6366 17.8574 18.3493 23.3335C17.7973 24.0464 17.069 24.6265 16.2252 25.0252C15.3814 25.4239 14.4467 25.6296 13.4994 25.6251ZM13.4994 2.89701C11.1508 2.89949 8.89927 3.76443 7.23861 5.30208C5.57794 6.83973 4.6438 8.92452 4.64112 11.0991C4.64112 13.1928 6.77075 17.0647 10.6363 22.0012C10.9644 22.4197 11.3949 22.7603 11.8926 22.9952C12.3902 23.2301 12.9408 23.3525 13.4994 23.3525C14.0579 23.3525 14.6086 23.2301 15.1062 22.9952C15.6038 22.7603 16.0343 22.4197 16.3625 22.0012C20.228 17.0647 22.3576 13.1928 22.3576 11.0991C22.3549 8.92452 21.4208 6.83973 19.7601 5.30208C18.0995 3.76443 15.8479 2.89949 13.4994 2.89701Z" fill="#194574" />
    </g>
    <defs>
      <clipPath id="clip0_4695_16944">
        <rect width="27" height="25" fill="white" transform="translate(0 0.625)" />
      </clipPath>
    </defs>
  </svg>
)

const IconMoney = () => (
  <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_4695_16949)">
      <path d="M21.375 21.4587H5.625C4.13371 21.457 2.704 20.9077 1.6495 19.9313C0.594992 18.955 0.00178634 17.6312 0 16.2503L0 10.0003C0.00178634 8.6195 0.594992 7.2957 1.6495 6.3193C2.704 5.34291 4.13371 4.79365 5.625 4.79199H21.375C22.8663 4.79365 24.296 5.34291 25.3505 6.3193C26.405 7.2957 26.9982 8.6195 27 10.0003V16.2503C26.9982 17.6312 26.405 18.955 25.3505 19.9313C24.296 20.9077 22.8663 21.457 21.375 21.4587ZM5.625 6.87533C4.72989 6.87533 3.87145 7.20457 3.23851 7.79062C2.60558 8.37667 2.25 9.17152 2.25 10.0003V16.2503C2.25 17.0791 2.60558 17.874 3.23851 18.46C3.87145 19.0461 4.72989 19.3753 5.625 19.3753H21.375C22.2701 19.3753 23.1286 19.0461 23.7615 18.46C24.3944 17.874 24.75 17.0791 24.75 16.2503V10.0003C24.75 9.17152 24.3944 8.37667 23.7615 7.79062C23.1286 7.20457 22.2701 6.87533 21.375 6.87533H5.625ZM13.5 17.292C12.61 17.292 11.74 17.0476 10.9999 16.5898C10.2599 16.1319 9.68314 15.4812 9.34254 14.7198C9.00195 13.9585 8.91283 13.1207 9.08647 12.3124C9.2601 11.5042 9.68868 10.7618 10.318 10.179C10.9474 9.59633 11.7492 9.19949 12.6221 9.03872C13.495 8.87795 14.3998 8.96046 15.2221 9.27583C16.0443 9.59119 16.7471 10.1252 17.2416 10.8104C17.7361 11.4957 18 12.3012 18 13.1253C18 14.2304 17.5259 15.2902 16.682 16.0716C15.8381 16.853 14.6935 17.292 13.5 17.292ZM13.5 11.042C13.055 11.042 12.62 11.1642 12.25 11.3931C11.88 11.622 11.5916 11.9474 11.4213 12.3281C11.251 12.7087 11.2064 13.1276 11.2932 13.5318C11.38 13.9359 11.5943 14.3071 11.909 14.5985C12.2237 14.8898 12.6246 15.0882 13.061 15.1686C13.4975 15.249 13.9499 15.2078 14.361 15.0501C14.7722 14.8924 15.1236 14.6254 15.3708 14.2828C15.618 13.9402 15.75 13.5374 15.75 13.1253C15.75 12.5728 15.5129 12.0429 15.091 11.6522C14.669 11.2615 14.0967 11.042 13.5 11.042ZM5.625 8.95866C5.4025 8.95866 5.18499 9.01975 4.99998 9.13421C4.81498 9.24867 4.67078 9.41136 4.58564 9.6017C4.50049 9.79204 4.47821 10.0015 4.52162 10.2035C4.56502 10.4056 4.67217 10.5912 4.8295 10.7369C4.98684 10.8826 5.18729 10.9818 5.40552 11.022C5.62375 11.0622 5.84995 11.0415 6.05552 10.9627C6.26109 10.8839 6.43679 10.7503 6.5604 10.579C6.68402 10.4077 6.75 10.2063 6.75 10.0003C6.75 9.72406 6.63147 9.45911 6.4205 9.26376C6.20952 9.06841 5.92337 8.95866 5.625 8.95866ZM20.25 10.0003C20.25 10.2063 20.316 10.4077 20.4396 10.579C20.5632 10.7503 20.7389 10.8839 20.9445 10.9627C21.15 11.0415 21.3762 11.0622 21.5945 11.022C21.8127 10.9818 22.0132 10.8826 22.1705 10.7369C22.3278 10.5912 22.435 10.4056 22.4784 10.2035C22.5218 10.0015 22.4995 9.79204 22.4144 9.6017C22.3292 9.41136 22.185 9.24867 22 9.13421C21.815 9.01975 21.5975 8.95866 21.375 8.95866C21.0766 8.95866 20.7905 9.06841 20.5795 9.26376C20.3685 9.45911 20.25 9.72406 20.25 10.0003ZM5.625 15.2087C5.4025 15.2087 5.18499 15.2698 4.99998 15.3842C4.81498 15.4987 4.67078 15.6614 4.58564 15.8517C4.50049 16.042 4.47821 16.2515 4.52162 16.4535C4.56502 16.6556 4.67217 16.8412 4.8295 16.9869C4.98684 17.1326 5.18729 17.2318 5.40552 17.272C5.62375 17.3122 5.84995 17.2915 6.05552 17.2127C6.26109 17.1339 6.43679 17.0003 6.5604 16.829C6.68402 16.6577 6.75 16.4563 6.75 16.2503C6.75 15.9741 6.63147 15.7091 6.4205 15.5138C6.20952 15.3184 5.92337 15.2087 5.625 15.2087ZM20.25 16.2503C20.25 16.4563 20.316 16.6577 20.4396 16.829C20.5632 17.0003 20.7389 17.1339 20.9445 17.2127C21.15 17.2915 21.3762 17.3122 21.5945 17.272C21.8127 17.2318 22.0132 17.1326 22.1705 16.9869C22.3278 16.8412 22.435 16.6556 22.4784 16.4535C22.5218 16.2515 22.4995 16.042 22.4144 15.8517C22.3292 15.6614 22.185 15.4987 22 15.3842C21.815 15.2698 21.5975 15.2087 21.375 15.2087C21.0766 15.2087 20.7905 15.3184 20.5795 15.5138C20.3685 15.7091 20.25 15.9741 20.25 16.2503Z" fill="#194574" />
    </g>
    <defs>
      <clipPath id="clip0_4695_16949">
        <rect width="27" height="25" fill="white" transform="translate(0 0.625)" />
      </clipPath>
    </defs>
  </svg>
)