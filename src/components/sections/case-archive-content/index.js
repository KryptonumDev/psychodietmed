'use client'
import Card from "@/components/moleculas/case-card-extended"
import React, { useCallback, useEffect, useState } from "react"
import styles from './styles.module.scss'
import { PAGE_ITEM_COUNT } from "../../../constants/case"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import Loader from "../loader"

export default function Content({ podopieczni }) {
  const [cases, setCases] = useState(podopieczni.nodes)
  const [initialLoad, setInitialLoad] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const { loading, fetchMore } = useQuery(
    gql`query Specialists($count: Int, $offset: Int) {
      podopieczni(
        where: 
        {
          search: "historia",
          offsetPagination: {
            size: $count, 
            offset: $offset
          }
        }
      ) {
        pageInfo {
          offsetPagination {
            total
          }
        }
        nodes {
          id
          slug
          histori {
            information {
              specialist {
                ... on Specjalista {
                  title
                  slug
                  proffesional {
                    avatar {
                      altText
                      mediaItemUrl
                      mediaDetails{
                        width
                        height
                      }
                    }
                  }
                }
              }
              resultTitle
              result
              text
              problems {
                id
                title : name
                slug
              }
              boldText
              beforeImage {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              afterImage {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            caseStudyCard {
              name
              linkText
              comment
              avatar {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
              differences {
                difference
              }
            }
          }
        }
      }
    }
  `, {
    skip: initialLoad,
    variables: {
      count: PAGE_ITEM_COUNT,
      offset: PAGE_ITEM_COUNT * (currentPage - 1)
    },
    onCompleted: (data) => {
      // add only unique cases
      const newCases = data?.podopieczni.nodes.filter(el => !cases.find(el2 => el2.id === el.id))
      setCases([...cases, ...newCases])
    }, 
    onError: (error) => {
      console.log(error)
    }
  })

  const changePage = useCallback((page) => {
    setCurrentPage(+page)
    setInitialLoad(false)
  }, [setCurrentPage, setInitialLoad])

  useEffect(() => {
    if (!initialLoad) {
      fetchMore({
        variables: {
          count: PAGE_ITEM_COUNT,
          offset: PAGE_ITEM_COUNT * (currentPage)
        },
      })
    }
  }, [currentPage])

  return (
    <section className={styles.wrapper} id='content'>
      <Loader show={loading} />
      <div className={styles.grid}>
        {cases.map(el => (
          <Card
            key={el.id}
            slug={el.slug}
            name={el.histori.caseStudyCard.name}
            avatar={el.histori.caseStudyCard.avatar}
            // comment={el.histori.information.text}
            linkText={el.histori.caseStudyCard.linkText}
            differences={el.histori.caseStudyCard.differences}
            before={el.histori.information.beforeImage}
            after={el.histori.information.afterImage}
            resultTitle={el.histori.information.resultTitle}
            result={el.histori.information.result}
            problems={el.histori.information.problems}
            // boldText={el.histori.information.boldText}
            specialist={el.histori.information.specialist}
          />
        ))}
      </div>
      <div className={styles.loadMore}>
        <p>{cases.length} z {podopieczni.pageInfo.offsetPagination.total} opinii</p>
        <span>
          <span style={{ width: (100 / podopieczni.pageInfo.offsetPagination.total) * cases.length + '%' }} />
        </span>
        {cases.length < podopieczni.pageInfo.offsetPagination.total && (
          <button className="link" onClick={() => { changePage(currentPage + 1) }}>Pokaż więcej</button>
        )}
      </div>
    </section>
  )
}

