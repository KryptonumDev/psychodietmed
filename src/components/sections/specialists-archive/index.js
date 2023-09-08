'use client'
import React, { useCallback, useEffect, useState } from "react"
import styles from './styles.module.scss'
import Card from "@/components/moleculas/specialist-card-long"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { gql } from "@apollo/client"
// import { PAGE_ITEM_COUNT } from "../../../constants/blog"
// import Pagination from "@/components/organisms/pagination-client-side"
// import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import Loader from "../loader"
import { AnimatePresence } from "framer-motion";
import { PopUp } from "@/components/organisms/custom-calendar/pop-up";

export default function Content({ data }) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState(data)
  const [initialLoad, setInitialLoad] = useState(true)
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("strona");
    if (!page) return 1;

    return +page;
  })

  // const { refetch, loading } = useQuery(
  //   gql`query ClientSidePosts($offset: Int!, $size: Int!, $category: String) {
  //     posts(where: {offsetPagination: {size: $size, offset: $offset}, categoryName: $category}) {
  //       pageInfo {
  //         offsetPagination {
  //           total
  //         }
  //       }
  //       nodes {
  //         id
  //         dateGmt
  //         featuredImage {
  //           node {
  //             altText
  //             mediaItemUrl
  //             mediaDetails {
  //               height
  //               width
  //             }
  //           }
  //         }
  //         slug
  //         title
  //         excerpt
  //         categories {
  //           nodes {
  //             name
  //             slug
  //             id
  //           }
  //         }
  //       }
  //     }
  //   }
  // `, {
  //   skip: initialLoad,
  //   variables: {
  //     size: PAGE_ITEM_COUNT,
  //     offset: PAGE_ITEM_COUNT * (currentPage - 1)
  //   },
  //   onCompleted: (data) => {
  //     document.getElementById('posts').scrollIntoView({ behavior: 'smooth' })
  //     setPosts(data?.posts)
  //   },
  //   onError: (error) => {
  //     throw new Error(error)
  //   }
  // })

  // const changePage = useCallback((page) => {
  //   setCurrentPage(+page)
  //   setInitialLoad(false)
  // }, [setCurrentPage, setInitialLoad])

  // useEffect(() => {
  //   if (!initialLoad) {
  //     refetch()
  //     const current = new URLSearchParams(Array.from(searchParams.entries()));

  //     if (currentPage === 1) current.delete("strona");
  //     else current.set("strona", currentPage);

  //     const search = current.toString();
  //     const query = search ? `?${search}` : "";
  //     // router.push(`${pathname}${query}`, { shallow: true });  Currently not working. TODO: after next update, rework - https://github.com/vercel/next.js/discussions/48110#discussioncomment-6481618
  //     history.replaceState(null, null, `${pathname}${query}`)
  //   }
  // }, [currentPage])

  const [popupOpened, setPopupOpened] = useState(false)
  const [chosenTime, setChosenTime] = useState(null)

  const clickDate = useCallback((date, hour, data, service) => {
    setChosenTime({ service: service, person: data, date: date, time: hour })
    setPopupOpened(true)
  }, [])

  return (
    <section id='posts' className={styles.wrapper}>
      <AnimatePresence mode="wait">
        {popupOpened && (
          <PopUp
            service={chosenTime.service}
            specialistId={chosenTime.person.proffesional.specialistId}
            serviceId={chosenTime.person.proffesional.serviceId}
            setPopupOpened={setPopupOpened}
            chosenDate={chosenTime.date}
            chosenTime={chosenTime.time}
            specialistData={chosenTime.person}
          />
        )}
      </AnimatePresence>
      {/* <Loader show={loading} /> */}
      <h2 className={styles.title}>Nasi specjaliści</h2>
      <div className={styles.grid}>
        {posts.nodes.map((el, index) => (
          <Card clickDate={clickDate} data={el} key={index + el.title} />
        ))}
      </div>
      {/* <Pagination changePage={changePage} PAGE_ITEM_COUNT={PAGE_ITEM_COUNT} itemCount={posts.pageInfo.offsetPagination.total} currentPage={currentPage} /> */}
    </section>
  )
}