'use client'
import React from "react"
import styles from './styles.module.scss'
import Grid from "@/components/organisms/blog-grid"
import Pagination from "@/components/organisms/blog-pagination"
import Category from "@/components/atoms/category-pill"

export default function Content({ categories, data, totalCount, page = '1' }) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Wszystkie artykuły <span>({totalCount})</span></h2>
      <div className={styles.categories}>
        <Category name='Wszystkie artykuy' href='/blog' />
        {categories?.map(el => (
          <Category key={el.id} name={el.name} href={`/blog/kategoria/${el.slug}`} />
        ))}
      </div>
      <Grid data={data} />
      <Pagination itemCount={totalCount} currentPage={Number(page)} urlBasis='/blog' />
    </section>
  )
}