import { Card } from "@/components/moleculas/product-card.js";
import client from "../../apollo/apolo-client";
import PRODUCTS_AND_CATEGORIES_QUERY from "../../queries/product-and-categories";

// export async function generateMetadata(props) {
//   console.log(props)
//   return {
//     title: '...',
//   };
// }

export default async function Shop() {
  const { products, productCategories, heroCarousel } = await getData()

  return (
    <main>
      {products?.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </main>
  )
}

// async function getSeo() {
//   const { data } = await client.query({
//     query: gql`
//       query Seo {
//       }
//     `,
//   }, { pollInterval: 500 })

//   return {
//     ''
//   }
// }

async function getData() {
  const { data } = await client.query({
    query: PRODUCTS_AND_CATEGORIES_QUERY,
  }, { pollInterval: 500 });

  return {
    productCategories: data?.productCategories?.nodes,
    products: data?.products?.nodes,
    heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes
  }
}