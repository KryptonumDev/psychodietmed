import Content from "@/components/sections/checkout-content";
import { generetaSeo } from "../../utils/genereate-seo";
import { GET_SEO_PAGE } from "../../queries/page-seo";
// import axios from "axios";

export async function generateMetadata() {
  return await generetaSeo('cG9zdDoxODY2', '/zamowienie', GET_SEO_PAGE)
}

export default async function Checkout() {
  // axios.post('/api/create-transaction', {
  //   "amount": 100,
  //   "sessionId": "c837e1a3-c5a3-4e89-adf1-05faffd8913b",
  //   "email": "shevabogdan16@gmail.com"
  // }).then((response) => {
  //   debugger
  // })
  return (
    <main id="main">
      <Content/>
    </main>
  )
}