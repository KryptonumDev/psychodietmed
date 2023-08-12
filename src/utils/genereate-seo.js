import { Fetch } from "./fetch-query"

export const generetaSeo = async (id, url, query, type = 'page') => {
  try {
    const { title, metaDesc, opengraphImage } = await getSeo(id, query)
    const canonical = url + (type !== 'page' ? `/${id}` : '')

    return {
      metadataBase: new URL('https://www.psychodietmed.pl'),
      title: title,
      description: metaDesc,
      alternates: {
        canonical: canonical,
      },
      openGraph: {
        title: title,
        description: metaDesc,
        url: canonical,
        images: opengraphImage?.mediaItemUrl || null,
      },
      robots: {
        index: false,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function getSeo(id, query) {
  const { body: { data } } = await Fetch({
    query: query,
    variables: {
      id: id
    },
    revalidate: 3600
  })

  return data.page.seo
}