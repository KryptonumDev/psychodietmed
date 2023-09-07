'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './styles.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

const SelectTime = ({ placeholder, registerTime, registerDate, errors, watch, selectTimeWatch }) => {
  const selectRef = useRef(null);

  const [ label, setLabel ] = useState({ 'preferencedDate': null, 'preferencedTime': null });
  useEffect(() => {
    setLabel({ "preferencedDate": selectTimeWatch[0], "preferencedTime": selectTimeWatch[1] })
  }, [watch, selectTimeWatch]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, []);
  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      (document.activeElement === selectRef.current || selectRef.current.contains(document.activeElement)) && document.activeElement.blur();
    }
  }

  return (
    <div className={`${styles.wrapper} selectPreferedDate`} tabIndex={0} ref={selectRef}>
      <div className={styles.placeholder}>
        <span className={label.preferencedDate || label.preferencedTime ? styles.isValue : ''}>
          {label.preferencedDate || label.preferencedTime ? `${label.preferencedDate || ''}${label.preferencedDate ? ', ' : ''}${label.preferencedTime || ''}` : placeholder}
        </span>
        <ChevronDown />
      </div>
      <div className={styles.dropdown}>
        <div className={styles.preferencedDate}>
          <AnimatePresence mode="wait">
            {errors[registerDate.name] && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.error}>Uzupełnij termin</motion.span>}
          </AnimatePresence>
          <p>Wskaż jaki termin Cię interesuje</p>
          <input
            type="radio"
            id='day1'
            value="Poniedziałek"
            name={registerDate.name}
            {...registerDate}
          />
          <label htmlFor='day1'>Poniedziałek</label>
          <input
            type="radio"
            id='day2'
            value="Wtorek"
            name={registerDate.name}
            {...registerDate}
          />
          <label htmlFor='day2'>Wtorek</label>
          <input
            type="radio"
            id='day3'
            value="Środa"
            name={registerDate.name}
            {...registerDate}
          />
          <label htmlFor='day3'>Środa</label>
          <input
            type="radio"
            id='day4'
            value="Czwartek"
            name={registerDate.name}
            {...registerDate}
          />
          <label htmlFor='day4'>Czwartek</label>
          <input
            type="radio"
            id='day5'
            value="Piątek"
            name={registerDate.name}
            {...registerDate}
          />
          <label htmlFor='day5'>Piątek</label>
          <input
            type="radio"
            id='day6'
            value="Sobota"
            name={registerDate.name}
            {...registerDate}
          />
          <label htmlFor='day6'>Sobota</label>
          <input
            type="radio"
            id='day7'
            value="Niedziela"
            name={registerDate.name}
            {...registerDate}
          />
          <label htmlFor='day7'>Niedziela</label>
        </div>
        <div className={styles.preferencedTime}>
          {errors[registerTime.name] && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.error}>Uzupełnij godzinę</motion.span>}
          <p>Która godzina pasuje Ci najbardziej?</p>
          <input
            type="radio"
            id='time1'
            value="8:00 - 10:00"
            name={registerTime.name}
            {...registerTime}
          />
          <label htmlFor='time1'>8:00 - 10:00</label>
          <input
            type="radio"
            id='time2'
            value="11:00 - 15:00"
            name={registerTime.name}
            {...registerTime}
          />
          <label htmlFor='time2'>11:00 - 15:00</label>
          <input
            type="radio"
            id='time3'
            value="16:00 - 20:00"
            name={registerTime.name}
            {...registerTime}
          />
          <label htmlFor='time3'>16:00 - 20:00</label>
        </div>
      </div>
    </div>
  );
};

export default SelectTime;

const ChevronDown = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 37 37' fill='none'>
    <g clipPath='url(#a)'>
      <path
        fill='#194574'
        d='M18.748 26.47a7.324 7.324 0 01-2.873-.582 7.488 7.488 0 01-2.437-1.669L1.183 11.624a1.57 1.57 0 01-.44-1.095c0-.41.158-.804.44-1.094.283-.29.666-.453 1.065-.453.4 0 .783.163 1.065.453L15.568 22.03a4.44 4.44 0 003.18 1.353 4.44 4.44 0 003.18-1.353L34.183 9.435c.283-.29.666-.453 1.065-.453.4 0 .783.163 1.065.453.283.29.441.684.441 1.095 0 .41-.158.804-.44 1.094L24.057 24.22a7.489 7.489 0 01-2.437 1.67 7.324 7.324 0 01-2.873.581z'
      ></path>
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M.75 0h36v37h-36z'></path>
      </clipPath>
    </defs>
  </svg>
)