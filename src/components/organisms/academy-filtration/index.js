import React from "react"
import styles from './styles.module.scss'
import Select, { components } from 'react-select'

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.5642 12.6572C28.4248 12.5127 28.2589 12.398 28.0761 12.3197C27.8933 12.2415 27.6973 12.2012 27.4992 12.2012C27.3012 12.2012 27.1052 12.2415 26.9224 12.3197C26.7396 12.398 26.5737 12.5127 26.4342 12.6572L19.5642 19.718C19.4248 19.8625 19.2589 19.9772 19.0761 20.0555C18.8933 20.1337 18.6973 20.174 18.4992 20.174C18.3012 20.174 18.1052 20.1337 17.9224 20.0555C17.7396 19.9772 17.5737 19.8625 17.4342 19.718L10.5642 12.6572C10.4248 12.5127 10.2589 12.398 10.0761 12.3197C9.89331 12.2415 9.69725 12.2012 9.49924 12.2012C9.30122 12.2012 9.10516 12.2415 8.92237 12.3197C8.73958 12.398 8.57368 12.5127 8.43424 12.6572C8.15486 12.946 7.99805 13.3368 7.99805 13.7441C7.99805 14.1514 8.15486 14.5421 8.43424 14.8309L15.3192 21.9072C16.163 22.7733 17.3067 23.2598 18.4992 23.2598C19.6917 23.2598 20.8355 22.7733 21.6792 21.9072L28.5642 14.8309C28.8436 14.5421 29.0004 14.1514 29.0004 13.7441C29.0004 13.3368 28.8436 12.946 28.5642 12.6572Z" fill="#194574" />
      </svg>
    </components.DropdownIndicator>
  )
}

const NoOptionsMessage = props => {
  return (
    <components.NoOptionsMessage {...props}>
      <div>Brak wyników</div>
    </components.NoOptionsMessage>
  );
};

export default function Filtration({ prices, orders, clearFilters, chosenOrder, chosenPrice, chosenCategory, changePrice, changeOrder, changeCategory, productCategories }) {
  return (
    <div className={styles.wrapper}>
      {/* <button className={styles.dropdown}>Filtry i sortowanie</button> */}

      <div className={styles.filters}>
        <label>
          <p>Kategorie</p>
          <Select
            components={{ DropdownIndicator, NoOptionsMessage }}
            classNamePrefix="react-select"
            value={chosenCategory || { value: ' ', label: 'Wszystkie' }}
            className="filter input"
            onChange={(e) => { changeCategory(e.value, e.label) }}
            options={(() => {
              const arr = [{ value: ' ', label: 'Wszystkie' }]
              productCategories?.forEach(el => {
                if (el.count > 0)
                  arr.push({ value: el.value, label: el.label })
              })
              return arr
            })()}
          />
        </label>
        <label>
          <p>Cena</p>
          <Select
            components={{ DropdownIndicator, NoOptionsMessage }}
            classNamePrefix="react-select"
            value={chosenPrice || { value: ' ', label: 'Wszystkie' }}
            className="filter input"
            onChange={(e) => { changePrice(e.value, e.label) }}
            options={(() => {
              const arr = [{ value: ' ', label: 'Wszystkie' }]
              prices?.forEach(el => {
                arr.push({ value: el.value, label: el.label })
              })
              return arr
            })()}
          />
        </label>
        <label>
          <p>Sortuj według</p>
          <Select
            components={{ DropdownIndicator, NoOptionsMessage }}
            classNamePrefix="react-select"
            value={chosenOrder || { value: ' ', label: 'Popularności' }}
            className="filter input"
            onChange={(e) => { changeOrder(e.value, e.label) }}
            options={(() => {
              const arr = [{ value: ' ', label: 'Popularności' }]
              orders?.forEach(el => {
                arr.push({ value: el.value, label: el.label })
              })
              return arr
            })()}
          />
        </label>
      </div>

      {(chosenCategory || chosenPrice || chosenOrder) && (
        <div className={styles.active}>
          <div className={styles.active__item}>
            <p>Aktywne filtry:</p>
            <div className={styles.buttons}>
              {chosenCategory && <button onClick={() => { changeCategory(' ') }}>{chosenCategory.label}</button>}
              {chosenPrice && <button onClick={() => { changePrice(' ') }}>{chosenPrice.label}</button>}
              {chosenOrder && <button onClick={() => { changeOrder(' ') }}>{chosenOrder.label}</button>}
            </div>
          </div>
          <button className={styles.clear} onClick={clearFilters}>
            Usuń filtry
          </button>
        </div>
      )}
    </div>
  )
} 