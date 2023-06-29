import React from "react"
import Grid from "@/components/organisms/post-grid"
import Pagination from "@/components/organisms/pagination"
import Card from "@/components/moleculas/media-card"

export default function Content({ data, totalCount, page = '1' }) {
  return (
    <section>
      <Grid>
        {data.map((el, index) => (
          <Card key={index} data={el} />
        ))}
      </Grid>
      <Pagination itemCount={totalCount} currentPage={Number(page)} urlBasis='/media' />
    </section>
  )
}