'use client'
import React, { useEffect } from "react"
import styles from "./styles.module.scss"
import { Clock } from "../../../assets/clock"
import { FiveStars } from "../../../assets/five-stars"

const animationDuration = 5000;
const frameDuration = 1000 / 60;
const totalFrames = Math.round(animationDuration / frameDuration);
const easeCustom = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
let progressCircleDone = false;

export default function Metrics({ data: { terapyTime, happyPacientPercent, goopReviewsCount } }) {
  useEffect(() => {
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (el) => {
      let frame = 0;
      const countTo = parseInt(el.textContent.replace(/ /g,''), 10);
      const parentElement = el.parentElement;
      parentElement.style.width = `${parentElement.getBoundingClientRect().width}px`;
      const counter = setInterval(() => {
        frame++;
        var progress = easeCustom(frame / totalFrames);
        var currentCount = Math.round(countTo * progress);
        if(parseInt(el.textContent, 10) !== currentCount){
          el.textContent = currentCount.toLocaleString().replace(/,/g,' ');
        }
        if(frame === totalFrames){
          parentElement.style = null;
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

    const progressCircle = document.getElementById('progressCircle');
    const progressCircleAnim = () => {
      if(progressCircleDone) return

      const { top } = progressCircle.getBoundingClientRect();
      if (top < window.innerHeight) {
        progressCircleDone = true;
        const startTime = performance.now();
        const endDasharray = parseFloat(progressCircle.getAttribute("data-fill")); 
        function animate() {
          const currentTime = performance.now();
          const elapsedTime = currentTime - startTime;
          if (elapsedTime < animationDuration) {
            const progress = easeCustom(elapsedTime / animationDuration) * endDasharray;
            progressCircle.setAttribute("stroke-dasharray", `${progress} 729`);
            requestAnimationFrame(animate);
          } else {
            progressCircle.setAttribute("stroke-dasharray", `${endDasharray} 729`);
          }
        }
        animate();
      }
    }

    document.addEventListener('scroll', handleScrollCountup)
    document.addEventListener('scroll', progressCircleAnim)
    document.addEventListener('DOMContentLoaded', handleScrollCountup)
    document.addEventListener('DOMContentLoaded', progressCircleAnim)
    return () => {
      document.removeEventListener('scroll', handleScrollCountup);
      document.removeEventListener('scroll', progressCircleAnim);
      document.removeEventListener('DOMContentLoaded', handleScrollCountup)
      document.removeEventListener('DOMContentLoaded', progressCircleAnim)
    };
  }, [])

  return (
    <section className={styles.wrapper}>
      <div className={`${styles.item} ${styles.clock}`}>
        <p>Ponad</p>
        <Clock />
        <div>
          <p><strong dangerouslySetInnerHTML={{ __html: terapyTime.replace(/(\d[\d\s]*)/g, '<span class="counter">$1</span>')}}></strong></p>
          <p>godzin terapii</p>
        </div>
      </div>
      <div className={`${styles.item} ${styles.pie}`}>
        <div className={styles.graph}>
          <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" width="231" height="231" viewBox="0 0 231 231"><circle id="progressCircle" data-fill={happyPacientPercent.replace(/^(\d+)%$/, '$1') / 100 * 729} cx="115.5" cy="115.5" r="115.5" stroke="#DEAFB8" strokeWidth="18" strokeDasharray="0 729" fill="none"></circle></svg>
          <p>
            <strong dangerouslySetInnerHTML={{ __html: happyPacientPercent.replace(/(\d[\d\s]*)/g, '<span class="counter">$1</span>')}}></strong>
          </p>
        </div>
        <p>Zadowolonych pacjentów!</p>
      </div>
      <div className={`${styles.item} ${styles.stars}`}>
        <p>Mamy ponad</p>
        <FiveStars />
        <div>
          <p><strong dangerouslySetInnerHTML={{ __html: goopReviewsCount.replace(/(\d[\d\s]*)/g, '<span class="counter">$1</span>')}}></strong></p>
          <p>Zadowolonych pacjentów!</p>
        </div>
      </div>
    </section>
  )
}