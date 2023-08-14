'use client'
import Flex from "@/components/organisms/flexible-content-flex"
import Grid from "@/components/organisms/flexible-content-grid"
import List from "@/components/organisms/flexible-content-list"
import React from "react"

export default function FlexibleContent({ productId, data }) {
  debugger
  return (
    <>
      {data?.map((el, index) => {
        switch (el.__typename) {
          case 'Product_Product_AdditionalSectionsProduct_TwoColumnFlex':
            return <Flex productId={productId} key={index} data={el} />
          case 'Product_Product_AdditionalSectionsProduct_TwoColumnGrid':
            return <Grid key={index} data={el} />
          case 'Product_Product_AdditionalSectionsProduct_TwoColumnList':
            return <List key={index} data={el} />
          default:
            return null
        }
      })}
    </>
  )
}