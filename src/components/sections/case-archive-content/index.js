import Card from "@/components/moleculas/case-card-extended"
import Pagination from "@/components/organisms/pagination-case"
import React from "react"
import styles from './styles.module.scss'

export default function Content({ currentPage, podopieczni }) {
  return (
    <section id='content'>
      <div className={styles.grid}>
        {podopieczni.nodes.map(el => (
          <Card
            key={el.id}
            slug={el.slug}
            name={el.histori.caseStudyCard.name}
            avatar={el.histori.caseStudyCard.avatar}
            comment={el.histori.caseStudyCard.comment}
            linkText={el.histori.caseStudyCard.linkText}
            differences={el.histori.caseStudyCard.differences}
            before={el.histori.information.beforeImage}
            after={el.histori.information.afterImage}
            resultTitle={el.histori.information.resultTitle}
            result={el.histori.information.result}
            problems={el.histori.information.problems}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} itemCount={podopieczni.pageInfo.offsetPagination.total} urlBasis={'/efekty-wspolpracy'} />
    </section>
  )
}

