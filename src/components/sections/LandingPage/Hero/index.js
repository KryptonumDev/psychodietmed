import Form from '@/components/moleculas/landing-page-form';
import styles from './styles.module.scss';
import { Image } from '@/components/atoms/image';

const Hero = ({
  data: {
    title,
    blueText,
    text,
    phone,
    image,
    formId
  }
}) => {
  return (
    <section className={styles.wrapper}>
      <header dangerouslySetInnerHTML={{ __html: title }} />
      <div className={styles.column}>
        <div className={styles.info}>
          <Image
            width={image.mediaDetails.width}
            height={image.mediaDetails.height}
            src={image.mediaItemUrl}
            alt={image.altText}
            aspectRatio={true}
            className={styles.image}
          />
          <div>
            <p className={styles.author}>{blueText}</p>
            <p className={styles.text}>{text}</p>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className={styles.phone}>
              <Phone />
              <span>{phone}</span>
            </a>
          </div>
        </div>
        <Form />
      </div>
    </section>
  );
};

export default Hero;

const Phone = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='27' height='28' viewBox='0 0 27 28' fill='none'>
    <path
      fill='#194574'
      d='M14.624 1.625A1.125 1.125 0 0115.749.5a11.262 11.262 0 0111.25 11.25 1.125 1.125 0 01-2.25 0 9.01 9.01 0 00-9-9 1.125 1.125 0 01-1.125-1.125zm1.125 5.625a4.5 4.5 0 014.5 4.5 1.125 1.125 0 102.25 0A6.757 6.757 0 0015.749 5a1.125 1.125 0 100 2.25zm10.23 12.081a3.488 3.488 0 010 4.925l-1.024 1.18C15.74 34.259-6.68 11.843 2.005 2.6l1.294-1.125a3.466 3.466 0 014.867.045c.035.035 2.12 2.743 2.12 2.743a3.487 3.487 0 01-.008 4.817l-1.303 1.638a14.38 14.38 0 007.798 7.813l1.648-1.31a3.488 3.488 0 014.816-.007s2.707 2.083 2.742 2.118zm-1.548 1.636s-2.693-2.071-2.727-2.106a1.238 1.238 0 00-1.743 0c-.03.031-2.3 1.84-2.3 1.84a1.124 1.124 0 01-1.1.17 16.885 16.885 0 01-9.925-9.909A1.125 1.125 0 016.8 9.837s1.808-2.27 1.838-2.3a1.237 1.237 0 000-1.742 571.403 571.403 0 01-2.106-2.728 1.237 1.237 0 00-1.699.044L3.54 4.236C-2.808 11.868 16.622 30.22 23.31 23.9l1.025-1.181a1.261 1.261 0 00.096-1.752z'
    ></path>
  </svg>
)