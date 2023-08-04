'use client'
import React, { useMemo } from "react"
import styles from './styles.module.scss'
import { RightArrow } from "../../../assets/right-arrow"
import ArrowLeft from "@/components/atoms/ArrowLeft"
import ArrowRight from "@/components/atoms/ArrowRight"

export default function Pagination({ changePage, currentPage, itemCount, PAGE_ITEM_COUNT }) {

  const pagesCount = useMemo(() => {
    return (Math.ceil(itemCount / PAGE_ITEM_COUNT))
  }, [itemCount, PAGE_ITEM_COUNT])

  const buttons = (() => {
    let arr = []
    for (let i = 0; i < pagesCount; i++) {
      arr.push(i + 1)
    }
    return arr
  })()

  if (itemCount < PAGE_ITEM_COUNT + 1) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <ArrowLeft
        onClick={() => {
          changePage(currentPage >= 3
            ? currentPage - 1
            : 1)
        }}
        className={`${styles.left} ${styles.arrow}`}
      />
      <div className={styles.center}>
        {pagesCount < 6 ? (
          <>
            {buttons.map(el => (
              <button
                className={currentPage === el ? styles.active : ''}
                key={el}
                onClick={() => { changePage(el) }}
              >
                {el}
              </button>
            ))}
          </>
        ) : (
          <>
            {currentPage > 3
              && <button className={currentPage === 1 ? styles.active : ''} onClick={() => { changePage(1) }} >
                {1}
              </button>
            }
            {currentPage > 4
              && <div className={styles.not}>
                ...
              </div>
            }

            {buttons.map((el, index) => {
              if (currentPage < 4 && (index < 6)) { // first 4 pages
                return (
                  <button className={currentPage === el ? styles.active : ''} key={el} onClick={() => { changePage(el) }} >
                    {el}
                  </button>
                )
              }
              if (currentPage > pagesCount - 3 && (index > pagesCount - 7)) { // last 4 pages
                return (
                  <button className={currentPage === el ? styles.active : ''} key={el} onClick={() => { changePage(el) }} >
                    {el}
                  </button>
                )
              }
              if (index >= currentPage - 3 && index <= currentPage + 1) { // all othher pages
                return (
                  <button className={currentPage === el ? styles.active : ''} key={el} onClick={() => { changePage(el) }} >
                    {el}
                  </button>
                )
              }
              return null
            })}

            {(currentPage === 1 || pagesCount - currentPage > 3)
              && <div className={styles.not}>
                ...
              </div>
            }
            {(currentPage === 1 || pagesCount - currentPage > 2)
              && (
                <button className={currentPage === pagesCount ? styles.active : ''} onClick={() => { changePage(pagesCount) }}>
                  {pagesCount}
                </button>
              )}
          </>
        )}
      </div>
      <ArrowRight
        onClick={() => {
          changePage(currentPage < pagesCount
            ? currentPage + 1
            : pagesCount)
        }}
        className={`${styles.right} ${styles.arrow}`}
      />
    </div>
  )
}