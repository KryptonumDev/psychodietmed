
import Content from "@/components/sections/checkout-content";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoyMTY=', '/zamowienie', GET_SEO_PAGE)
}

export default async function Checkout() {
  return (
    <main>
      <Content/>
    </main>
  )
}