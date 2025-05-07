'use client'
import React, { useEffect } from "react"
import styles from './styles.module.scss'
import { removeWrap } from "../../../utils/title-modification"
import Link from "next/link"
import { Image } from "@/components/atoms/image"

const animationDuration = 5000;
const frameDuration = 1000 / 60;
const totalFrames = Math.round(animationDuration / frameDuration);
const easeCustom = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

export default function Statistics({ data: { title, text, link, counters, image } }) {
  // useEffect(() => {
  //   const counters = document.querySelectorAll('.counter');
  //   const animateCounter = (el) => {
  //     let frame = 0;
  //     const countTo = parseInt(el.textContent.replace(/ /g, ''), 10);
  //     el.parentElement.style.width = `${el.parentElement.getBoundingClientRect().width}px`;
  //     const counter = setInterval(() => {
  //       frame++;
  //       var progress = easeCustom(frame / totalFrames);
  //       var currentCount = Math.round(countTo * progress);
  //       if (parseInt(el.textContent, 10) !== currentCount) {
  //         el.textContent = currentCount.toLocaleString();
  //       }
  //       if (frame === totalFrames) {
  //         el.parentElement.style = null;
  //         clearInterval(counter);
  //       }
  //     }, frameDuration);
  //   };

  //   const handleScrollCountup = () => {
  //     counters.forEach(counter => {
  //       const { top } = counter.getBoundingClientRect();
  //       if (top < window.innerHeight && counter.classList.contains('counter') && counter.parentElement) {
  //         animateCounter(counter);
  //         counter.classList.remove('counter');
  //       }
  //     });
  //   };

  //   document.addEventListener('scroll', handleScrollCountup)
  //   return () => {
  //     document.removeEventListener('scroll', handleScrollCountup);
  //   };
  // }, [])
  return (
    <section className={styles.wrapper}>
      <div className={styles.counters}>
        {counters.map((counter, index) => (
          <div className={styles.counterItem} key={index}>
            <span dangerouslySetInnerHTML={{ __html: counter.number.replace(/(\d[\d\s]*)/g, '<span class="counter">$1</span>') }}></span>
            <p>{counter.text}</p>
          </div>
        ))}
      </div>
      <Image aspectRatio={true} className={styles.image} src={image.mediaItemUrl} alt={image.altText} width={image.mediaDetails.width} height={image.mediaDetails.height} />
      <div className={styles.content}>
        <h2 dangerouslySetInnerHTML={{ __html: removeWrap(title) }} />
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
        <Link className="link" href={link.url}>{link.title}</Link>
      </div>
    </section>
  )
}