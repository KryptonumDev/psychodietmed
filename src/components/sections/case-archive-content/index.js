'use client'
import Card from "@/components/moleculas/case-card-extended"
import Pagination from "@/components/organisms/pagination-client-side"
import React, { useCallback, useEffect, useState } from "react"
import styles from './styles.module.scss'
import { PAGE_ITEM_COUNT } from "../../../constants/case"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"

export default function Content({ podopieczni }) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [cases, setCases] = useState(podopieczni)
  const [initialLoad, setInitialLoad] = useState(true)
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("strona");
    if (!page) return 1;

    return +page;
  })

  const { refetch } = useQuery(
    gql`query Specialists($count: Int, $offset: Int) {
      podopieczni(
        where: {
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
              resultTitle
              result
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
      document.getElementById('content').scrollIntoView({ behavior: 'smooth' })
      setCases(data?.podopieczni)
    },
    onError: (error) => {
      throw new Error(error)
    }
  })

  const changePage = useCallback((page) => {
    setCurrentPage(+page)
    setInitialLoad(false)
  }, [setCurrentPage, setInitialLoad])

  useEffect(() => {
    if (!initialLoad) {
      refetch()
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (currentPage === 1) current.delete("strona");
      else current.set("strona", currentPage);

      const search = current.toString();
      const query = search ? `?${search}` : "";
      // router.push(`${pathname}${query}`, { shallow: true });  Currently not working. TODO: after next update, rework - https://github.com/vercel/next.js/discussions/48110#discussioncomment-6481618
      history.replaceState(null, null, `${pathname}${query}`)
    }
  }, [currentPage])

  return (
    <section id='content'>
      <div className={styles.grid}>
        {cases.nodes.map(el => (
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
            boldText={el.histori.information.boldText}
          />
        ))}
      </div>
      <Pagination changePage={changePage} currentPage={currentPage} itemCount={podopieczni.pageInfo.offsetPagination.total} PAGE_ITEM_COUNT={PAGE_ITEM_COUNT} />
    </section>
  )
}

