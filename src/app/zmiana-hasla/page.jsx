// import { generetaSeo } from "../../utils/genereate-seo";
// import { GET_SEO_PAGE } from "../../queries/page-seo";
import { notFound } from "next/navigation";
import Reset from "@/components/sections/reset-password";

// export async function generateMetadata() {
//   return await generetaSeo('cG9zdDoxOTAz', '/moje-kursy', GET_SEO_PAGE)
// }

export default async function Courses({ searchParams }) {
  const { action, key, login } = searchParams
  if (!action || !key || !login) notFound()

  return (
    <main className="overflow">
      <Reset resetkey={key} login={login} />
    </main>
  )
}