import React from "react";
import styles from "./styles.module.scss";
import { Image } from "@/components/atoms/image";
import Link from "next/link";
import StarRating from "@/components/atoms/star-rating";

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1645_6693)">
      <path d="M29 3.08333H27.5V1.54167C27.5 1.13279 27.342 0.740662 27.0607 0.451544C26.7794 0.162425 26.3978 0 26 0C25.6022 0 25.2206 0.162425 24.9393 0.451544C24.658 0.740662 24.5 1.13279 24.5 1.54167V3.08333H12.5V1.54167C12.5 1.13279 12.342 0.740662 12.0607 0.451544C11.7794 0.162425 11.3978 0 11 0C10.6022 0 10.2206 0.162425 9.93934 0.451544C9.65804 0.740662 9.5 1.13279 9.5 1.54167V3.08333H8C6.01161 3.08578 4.10534 3.89869 2.69933 5.34376C1.29332 6.78882 0.502382 8.74804 0.5 10.7917L0.5 29.2917C0.502382 31.3353 1.29332 33.2945 2.69933 34.7396C4.10534 36.1846 6.01161 36.9976 8 37H29C30.9884 36.9976 32.8947 36.1846 34.3007 34.7396C35.7067 33.2945 36.4976 31.3353 36.5 29.2917V10.7917C36.4976 8.74804 35.7067 6.78882 34.3007 5.34376C32.8947 3.89869 30.9884 3.08578 29 3.08333ZM3.5 10.7917C3.5 9.56504 3.97411 8.38865 4.81802 7.5213C5.66193 6.65394 6.80653 6.16667 8 6.16667H29C30.1935 6.16667 31.3381 6.65394 32.182 7.5213C33.0259 8.38865 33.5 9.56504 33.5 10.7917V12.3333H3.5V10.7917ZM29 33.9167H8C6.80653 33.9167 5.66193 33.4294 4.81802 32.562C3.97411 31.6947 3.5 30.5183 3.5 29.2917V15.4167H33.5V29.2917C33.5 30.5183 33.0259 31.6947 32.182 32.562C31.3381 33.4294 30.1935 33.9167 29 33.9167Z" fill="#DEAFB8" />
    </g>
    <defs>
      <clipPath id="clip0_1645_6693">
        <rect width="36" height="37" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

const GoogleIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='55'
    viewBox='0 0 272 92'
  >
    <path
      fill='#EA4335'
      d='M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18m-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44'
    ></path>
    <path
      fill='#FBBC05'
      d='M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18m-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44'
    ></path>
    <path
      fill='#4285F4'
      d='M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36'
    ></path>
    <path fill='#34A853' d='M225 3v65h-9.5V3z'></path>
    <path
      fill='#EA4335'
      d='m262.02 54.48 7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14m-23.27-7.98 19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93'
    ></path>
    <path
      fill='#4285F4'
      d='M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91S16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03s10.84 25.03 24.7 25.03c8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65z'
    ></path>
  </svg>
);

const ZnanyLekarzIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='xMinYMid meet'
    viewBox='0 0 210 33.54'
    width='76'
  >
    <path
      fill='#03c3a5'
      d='M198.468 11.181v3.035h6.945l-7.368 10.732v2.207H210V24.12h-7.626l7.396-10.699v-2.24h-11.301zm-10.863 0v15.973h3.644v-7.992c0-2.005 1.53-4.215 4.862-4.866v-3.354c-2.288.126-4.253 1.634-5.059 2.811h-.033l-.258-2.572h-3.155zm-14.353-.309c1.583-.131 3.3-.17 4.958-.17 3.906 0 6.237 1.51 6.237 5.777v10.675h-3.276l-.163-1.598h-.043c-1.123 1.21-2.755 1.917-4.845 1.917-2.768 0-4.967-1.793-4.967-5.345 0-3.304 2.755-6.381 9.651-4.917v-.962c0-1.904-1.116-2.436-3.315-2.436-1.35 0-2.495.091-4.236.24zm7.551 8.867c-2.921-.743-5.843.17-5.843 2.428 0 1.498.994 2.378 2.476 2.312 1.168-.052 2.454-.57 3.367-1.379zm-19.878 1.652c.463-.296.991-.626 1.487-1.021l3.999 6.784h4.098l-5.387-9.123c1.983-1.943 3.602-4.216 4.957-6.85h-3.867c-1.355 2.404-3.272 4.644-5.288 6.356V4.791l-3.643.422v21.94h3.643v-5.764zm-20.426-2.174v-.065c0-4.912 2.391-8.449 7.336-8.449 4.585 0 6.714 2.653 6.714 8.22 0 .589-.041 1.403-.105 2.003h-10.123c.262 2.25 1.573 3.594 4.264 3.594 1.703 0 3.303-.159 4.786-.353v3.051c-1.666.261-3.08.417-4.882.417-5.24 0-7.991-2.62-7.991-8.417zm3.766-1.008h6.583c0-2.499-.655-4.472-3.111-4.472-2.554 0-3.406 2.105-3.471 4.472zM127.787 4.792v22.362h11.815v-3.616h-7.834V4.792zm-16.215 6.389c1.153 4.545 3.853 13.114 5.264 16.452-.912 2.063-2.387 3.106-5.165 2.951v2.865c5.997.804 7.628-3.66 8.76-6.295 1.132-2.636 4.018-11.428 5.204-15.973h-3.82c-.659 2.997-2.305 8.892-3.162 11.889h-.066c-.889-2.964-2.536-8.859-3.162-11.889zm-15.893 0v15.973h3.644v-8.401c0-2.543 1.985-4.577 3.765-4.702 1.964-.138 2.964.879 2.964 3.476v9.626h3.644V16.776c0-4.069-1.87-6.075-5.637-6.075-2.231 0-4.075 1.259-4.953 2.636h-.043a171 171 0 0 1-.212-2.156zm-14.353-.309c1.583-.131 3.3-.17 4.958-.17 3.906 0 6.237 1.51 6.237 5.777v10.675h-3.276l-.163-1.598h-.043c-1.123 1.21-2.755 1.917-4.845 1.917-2.768 0-4.967-1.793-4.967-5.345 0-3.304 2.755-6.381 9.65-4.917v-.962c0-1.904-1.116-2.436-3.315-2.436-1.35 0-2.495.091-4.236.24zm7.551 8.867c-2.921-.743-5.843.17-5.843 2.428 0 1.498.994 2.378 2.476 2.312 1.168-.052 2.454-.57 3.367-1.379zm-26.023-8.557v15.973h3.644v-8.401c0-2.543 1.985-4.577 3.765-4.702 1.964-.138 2.964.879 2.964 3.476v9.626h3.644V16.777c0-4.069-1.87-6.075-5.637-6.075-2.231 0-4.075 1.259-4.953 2.636h-.043a171 171 0 0 1-.212-2.156zM45.313 4.793v3.616h9.356l-9.945 15.657v3.089h15.121v-3.616H49.759l9.92-15.727V4.793zM18.603 25.82l5.272 6.127 5.255-3.818L24 19.641c-2.317 1.429-4.589 4.199-5.396 6.179zm-7.578 6.118c4.332-8.834 12.605-15.378 22.519-17.331l-2.015-6.206C19.501 9.759 9.268 17.049 3.792 27.285zm1.579-21.069L2.006 8.374 0 14.562l7.358 3.106a26.7 26.7 0 0 1 5.05-3.994c2.512-1.544 4.705-2.566 8.433-3.844L20.015.002h-6.498l-.914 10.868z'
    ></path>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6085B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const formatDate = (dateString) => {
  if (!dateString) return '';
  if (dateString.includes('/')) {
    const [day, month, year] = dateString.split('/');
    const monthNames = [
      'stycznia', 'lutego', 'marca', 'kwietnia',
      'maja', 'czerwca', 'lipca', 'sierpnia',
      'września', 'października', 'listopada', 'grudnia'
    ];
    const monthIndex = parseInt(month, 10) - 1;
    const formattedDay = parseInt(day, 10);
    return `${formattedDay} ${monthNames[monthIndex]} ${year}`;
  }
  return dateString;
};

const renderSourceIcon = (reviewSource) => {
  switch (reviewSource) {
    case 'google':
      return (
        <div className={styles.sourceWrapper}>
          <GoogleIcon />
        </div>
      );
    case 'znany-lekarz':
      return (
        <div className={styles.sourceWrapper}>
          <ZnanyLekarzIcon />
        </div>
      );
    default:
      return (
        <div className={styles.sourceWrapper}>
          <EmailIcon />
          <span>Inne źródło</span>
        </div>
      );
  }
};

export default function ReviewCard({ data }) {
  const {
    avatar,
    name,
    rating,
    content,
    specialistReference,
    date,
    reviewSource
  } = data;

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        {avatar && (
          <div className={styles.avatarWrapper}>
            <Image
              className={styles.avatar}
              src={avatar.mediaItemUrl}
              alt={avatar.altText || `Zdjęcie - ${name}`}
              width={avatar.mediaDetails.width}
              height={avatar.mediaDetails.height}
              aspectRatio={true}
            />
          </div>
        )}
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.rating}>
            <StarRating rating={rating} />
          </div>
        </div>
      </div>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
      <div className={styles.bottom}>
        {(specialistReference && specialistReference[0]) && (
          <div className={styles.specialist}>
            <p className={styles.specialistLabel}>Opinia o specjaliście:</p>
            <Link href={`/specjalisci/${specialistReference[0].slug}`}>
              <div className={styles.specialistInfo}>
                {specialistReference[0].proffesional?.personImage && (
                  <Image
                    className={styles.specialistAvatar}
                    src={specialistReference[0].proffesional.personImage.mediaItemUrl}
                    alt={specialistReference[0].proffesional.personImage.altText || `Zdjęcie - ${specialistReference[0].title}`}
                    width={specialistReference[0].proffesional.personImage.mediaDetails.width}
                    height={specialistReference[0].proffesional.personImage.mediaDetails.height}
                    aspectRatio={true}
                  />
                )}
                <span>{specialistReference[0].title}</span>
              </div>
            </Link>
          </div>
        )}

        <div className={styles.meta}>
          <div className={styles.date}>
            <CalendarIcon />
            <span>{formatDate(date)}</span>
          </div>
          {renderSourceIcon(reviewSource)}
        </div>
      </div>
    </div>
  );
}
