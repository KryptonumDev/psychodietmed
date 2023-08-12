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
    throw new Error(error)
  }
}

async function getSeo(id, query) {
  const result = await fetch('https://psychodietmed.headlesshub.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        id: id
      }
    }),
    cache: 'force-cache',
    next: {
      revalidate: 3600
    }
  });

  const { data } = await result.json()

  return data.page.seo
}