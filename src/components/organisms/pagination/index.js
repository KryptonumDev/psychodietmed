'use client'
import Link from "next/link"
import React, { useMemo } from "react"
import { PAGE_ITEM_COUNT } from "../../../constants/blog"
import styles from './styles.module.scss'

import { RightArrow } from "../../../assets/right-arrow"
import ArrowLeft from "@/components/atoms/ArrowLeft"
import ArrowRight from "@/components/atoms/ArrowRight"

export default function Pagination({ currentPage, itemCount, urlBasis }) {
  const pagesCount = useMemo(() => {
    return (Math.ceil(itemCount / PAGE_ITEM_COUNT))
  }, [itemCount])

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
        href={
          currentPage >= 3
          ? `${urlBasis}/strona/${currentPage - 1}`
          : `${urlBasis}`
        }
        className={`${styles.left} ${styles.arrow}`}
        as="Link"
      />
      <div className={styles.center}>
        {pagesCount < 6 ? (
          <>
            {buttons.map(el => (
              <Link
                className={currentPage === el ? styles.active : ''}
                key={el}
                href={
                  el !== 1
                    ? `${urlBasis}/strona/${el}`
                    : `${urlBasis}`}
              >
                {el}
              </Link>
            ))}
          </>
        ) : (
          <>
            {currentPage > 3
              && <Link className={currentPage === 1 ? styles.active : ''} href={`${urlBasis}`} >
                {1}
              </Link>
            }
            {currentPage > 4
              && <div className={styles.not}>
                ...
              </div>
            }

            {buttons.map((el, index) => {
              if (currentPage < 4 && (index < 6)) { // first 4 pages
                return (
                  <Link className={currentPage === el ? styles.active : ''} key={el} href={`${urlBasis}/strona/${el}`}>
                    {el}
                  </Link>
                )
              }
              if (currentPage > pagesCount - 3 && (index > pagesCount - 7)) { // last 4 pages
                return (
                  <Link className={currentPage === el ? styles.active : ''} key={el} href={`${urlBasis}/strona/${el}`}>
                    {el}
                  </Link>
                )
              }
              if (index >= currentPage - 3 && index <= currentPage + 1) { // all othher pages
                return (
                  <Link className={currentPage === el ? styles.active : ''} key={el} href={`${urlBasis}/strona/${el}`}>
                    {el}
                  </Link>
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
                <Link className={currentPage === pagesCount ? styles.active : ''} href={`${urlBasis}/strona/${pagesCount}`}>
                  {pagesCount}
                </Link>
              )}
          </>
        )}
      </div>
      <ArrowRight
        href={
          currentPage < pagesCount
            ? `${urlBasis}/strona/${currentPage + 1}`
            : `${urlBasis}/strona/${pagesCount}`
        }
        className={`${styles.right} ${styles.arrow}`}
        as="Link"
      />
    </div>
  )
}