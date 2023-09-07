import { Image } from '@/components/atoms/image';
import styles from './styles.module.scss';
import Button from '@/components/atoms/button';

const Benefits = ({
  data: {
    title,
    plates,
    contentCta,
    linkCta,
  }
}) => {
  return (
    <section className={styles.wrapper}>
      <header dangerouslySetInnerHTML={{ __html: title }} />
      <ul className={styles.list}>
        {plates.map(({ icon, text }, i) => (
          <li key={i}>
            <Image
              width={icon.mediaDetails.width}
              height={icon.mediaDetails.height}
              src={icon.mediaItemUrl}
              alt={icon.altText}
              aspectRatio={true}
              className={styles.icon}
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <div className={styles.contentCta}>
        <div dangerouslySetInnerHTML={{ __html: contentCta }} />
        <Button href={linkCta.url}>{linkCta.title}</Button>
      </div>
    </section>
  );
};

export default Benefits;