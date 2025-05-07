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

export default function Card({ specialist, slug, name, avatar, comment, linkText, before, after, differences, problems, result, resultTitle, boldText }) {
  return (
    <div className={styles.slide} >
      <div className={styles.content}>
        <div className={styles.flex}>
          <div className={styles.slideAuthor}>
            <Image aspectRatio={true} quality='90' src={avatar.mediaItemUrl} alt={avatar.altText} width={avatar.mediaDetails.width} height={avatar.mediaDetails.height} className={styles.slideAuthorImage} />
            <div className={styles.slideAuthorName}>{name}</div>
          </div>
          <Quote />
        </div>
        <div className={styles.middle}>
          <div className={styles.info}>
            <p><strong>{resultTitle}</strong>{result}</p>
            <p><strong>Z czym się zmagałam?</strong></p>
            <div className={styles.illnes}>
              {problems.map(el => (
                <Category key={el?.title} name={el?.title} />
              ))}
            </div>
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
          </div>
        </div>
        <div className={styles.bottom}>
          {after?.mediaItemUrl && before?.mediaItemUrl ? (
            <div className={styles.slideImages}>
              <div className={styles.before}>
                <Image aspectRatio={true} quality='90' src={before.mediaItemUrl} alt={before.altText} width={before.mediaDetails.width} height={before.mediaDetails.height} className={`${styles.image}`} />
                <svg width="61" height="97" viewBox="0 0 61 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.996092 49.8349L0.996094 0L60.9961 97L30.5549 97L0.996092 49.8349Z" fill="#DEAFB8" />
                  <path d="M16.3241 52.5709L14.7867 50.0789L11.2572 52.2199L10.4339 50.8853L20.3247 44.8857L22.6854 48.7122C23.8783 50.6459 23.3705 52.6568 21.469 53.8103C19.6222 54.9305 17.5086 54.491 16.3241 52.5709ZM21.3387 49.2109L19.9442 46.9504L15.9906 49.3486L17.3515 51.5547C18.1664 52.8756 19.3998 53.1379 20.6174 52.3994C21.8623 51.6442 22.1116 50.4637 21.3387 49.2109ZM24.6467 58.9002L23.4702 59.6139L23.1174 59.0419C22.3697 57.83 21.1689 57.5291 19.883 58.3092L16.3398 60.4584L15.5501 59.1784L22.226 55.1288L22.9653 56.3271L22.0034 57.0229C22.8691 56.8721 23.7459 57.2572 24.3087 58.1695C24.4516 58.401 24.5418 58.6083 24.6467 58.9002ZM21.6984 69.1444L18.4976 63.9562L19.5373 63.3255L26.3244 64.1489L24.1065 60.5539L25.1873 59.8983L28.388 65.0866L27.3346 65.7255L20.5445 64.8666L22.7791 68.4889L21.6984 69.1444ZM24.1073 73.4149C22.8976 71.454 23.4886 69.2428 25.568 67.9815C27.6611 66.7118 29.9261 67.1531 31.119 69.0868C32.2868 70.9796 31.738 73.0154 29.7543 74.2187L29.2755 74.5091L26.0863 69.37C24.736 70.3201 24.4099 71.5284 25.1912 72.7949C25.8045 73.7889 26.6181 74.1936 27.5186 73.9468L28.2579 75.1451C26.6198 75.6896 25.1238 75.0626 24.1073 73.4149ZM30.0383 69.7424C29.3494 68.6257 28.2422 68.3242 26.9649 68.8745L29.334 72.7146C30.4421 72.0424 30.7356 70.8726 30.0383 69.7424ZM28.5345 80.5912C27.3416 78.6575 28.0692 76.6068 30.1076 75.3703C32.1596 74.1256 34.3953 74.3975 35.6135 76.372C36.2435 77.3933 36.3213 78.5251 35.7778 79.4723L40.2375 76.7671L41.0188 78.0335L30.9502 84.1411L30.2445 82.9972L31.3948 82.1497C30.2094 82.2699 29.1898 81.6533 28.5345 80.5912ZM29.857 80.1445C30.6635 81.4518 32.1304 81.6661 33.5258 80.8196C34.8938 79.9898 35.3832 78.5889 34.5767 77.2816C33.7702 75.9744 32.3147 75.8093 30.9467 76.6391C29.565 77.4772 29.0505 78.8373 29.857 80.1445Z" fill="#181818" />
                </svg>
              </div>
              <div className={styles.after}>
                <Image aspectRatio={true} quality='90' src={after.mediaItemUrl} alt={after.altText} width={after.mediaDetails.width} height={after.mediaDetails.height} className={`${styles.image}`} />
                <svg width="61" height="97" viewBox="0 0 61 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.996092 49.8349L0.996094 0L60.9961 97L30.5549 97L0.996092 49.8349Z" fill="#DEAFB8" />
                  <path d="M22.3784 62.3847L20.8411 59.8927L17.3116 62.0336L16.4883 60.6991L26.3791 54.6995L28.7397 58.526C29.9327 60.4596 29.4249 62.4706 27.5233 63.624C25.6765 64.7443 23.563 64.3047 22.3784 62.3847ZM27.3931 59.0247L25.9985 56.7642L22.0449 59.1624L23.4059 61.3684C24.2208 62.6893 25.4542 62.9517 26.6717 62.2131C27.9166 61.458 28.1659 60.2775 27.3931 59.0247ZM24.4986 66.2174C26.5643 64.9644 28.9217 65.5555 30.1566 67.5572C31.3832 69.5454 30.8404 71.8957 28.7746 73.1487C26.7089 74.4018 24.3515 73.8107 23.125 71.8226C21.89 69.8208 22.4329 67.4705 24.4986 66.2174ZM25.2967 67.5111C23.9013 68.3575 23.476 69.8318 24.2741 71.1255C25.0638 72.4055 26.5896 72.7151 27.985 71.8687C29.3803 71.0223 29.7972 69.5343 29.0075 68.2543C28.2094 66.9606 26.692 66.6647 25.2967 67.5111Z" fill="#181818" />
                </svg>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      {after?.mediaItemUrl && before?.mediaItemUrl && (
        <Button theme="secondary" href={`/efekty-wspolpracy/${slug}`} className={styles.slideLink}>{linkText}</Button>
      )}
    </div>
  )
}
