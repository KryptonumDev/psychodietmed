'use client'
import React, { useEffect } from "react"
import styles from './styles.module.scss';
import { removeWrap } from "../../../utils/title-modification";
import { Image } from "@/components/atoms/image";

const animationDuration = 5000;
const frameDuration = 1000 / 60;
const totalFrames = Math.round(animationDuration / frameDuration);
const easeCustom = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

export default function StatisticsFlex({ data }) {
  useEffect(() => {
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (el) => {
      let frame = 0;
      const countTo = parseInt(el.textContent.replace(/ /g,''), 10);
      el.parentElement.style.width = `${el.parentElement.getBoundingClientRect().width}px`;
      const counter = setInterval(() =>{
        frame++;
        var progress = easeCustom(frame / totalFrames);
        var currentCount = Math.round(countTo * progress);
        if(parseInt(el.textContent, 10) !== currentCount){
          el.textContent = currentCount.toLocaleString();
        }
        if(frame === totalFrames){
          el.parentElement.style = null;
          clearInterval(counter);
        }
      }, frameDuration);
    };

    const handleScrollCountup = () => {
      counters.forEach(counter => {
        const { top } = counter.getBoundingClientRect();
        if (top < window.innerHeight && counter.classList.contains('counter')) {
          animateCounter(counter);
          counter.classList.remove('counter');
        }
      });
    };

    document.addEventListener('scroll', handleScrollCountup)
    return () => {
      document.removeEventListener('scroll', handleScrollCountup);
    };
  }, [])

  const { title, textTop, pinkList, blueList, textBot, counters, image } = data
  return (
    <section className={styles.wrapper}>
      <div className={styles.grid}>
        <div>
          <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
          <div className={styles.topText} dangerouslySetInnerHTML={{ __html: textTop }} />
          <p className={styles.pinkListTitle} dangerouslySetInnerHTML={{ __html: pinkList.title }} />
          <ul className={styles.pinkList}>
            {pinkList.listItems.map((item, index) => (
              <li className={styles.pinkItem} key={index}>
                <Image src={item.icon.mediaItemUrl} alt={item.icon.altText} width={item.icon.mediaDetails.width} height={item.icon.mediaDetails.height} />
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.counters}>
            {counters.map((counter, index) => (
              <div className={styles.counterItem} key={index}>
                <span dangerouslySetInnerHTML={{ __html: counter.number.replace(/(\d[\d\s]*)/g, '<span class="counter">$1</span>')}}>
                </span>
                <p>{counter.text}</p>
              </div>
            ))}
          </div>
          <Image className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
        </div>
      </div>
      <div className={styles.cta}>
        <p className={styles.blueListTitle} dangerouslySetInnerHTML={{ __html: blueList.title }} />
        <ul className={styles.blueList}>
          {blueList.listItems.map((item, index) => (
            <li className={styles.blueItem} key={index}>
              <Image src={item.icon.mediaItemUrl} alt={item.icon.altText} width={item.icon.mediaDetails.width} height={item.icon.mediaDetails.height} />
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
        <div className={styles.botText} dangerouslySetInnerHTML={{ __html: textBot }} />
      </div>
    </section>
  )
}