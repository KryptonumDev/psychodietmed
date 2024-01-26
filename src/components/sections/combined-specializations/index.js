import React from "react";
import styles from "./styles.module.scss";
import { removeWrap } from "../../../utils/title-modification";
import { Image } from "@/components/atoms/image";

export default function CombinedSpecializations({
  data: { title, pinkContent, pinkIcons, blueContent, blueIcons },
}) {
  return (
    <section className={styles.wrapper}>
      <div
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className={styles.grid}>
        <div className={styles.pink}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: pinkContent }}
          />
          {pinkIcons.map((icon, index) => (
            <Image
              key={index}
              aspectRatio={true}
              quality="100"
              src={icon.mediaItemUrl}
              alt={icon.altText}
              width={icon.mediaDetails.width}
              height={icon.mediaDetails.height}
              className={`${styles[`image-${index}`]} ${styles.image}`}
            />
          ))}
        </div>
        <div className={styles.blue}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: blueContent }}
          />
          {blueIcons.map((icon, index) => (
            <Image
              key={index}
              aspectRatio={true}
              quality="100"
              src={icon.mediaItemUrl}
              alt={icon.altText}
              width={icon.mediaDetails.width}
              height={icon.mediaDetails.height}
              className={`${styles[`image-${index}`]} ${styles.image}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
