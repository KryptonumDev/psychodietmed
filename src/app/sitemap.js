import { Fetch } from "../utils/fetch-query"

export default async function sitemap() {

  const { posts, products, ebooks, courses, mediums, obszaryDzialania, specjalisci, narzedzia } = await getData()

  const newArr = (arr, prefix) => {
    let a = arr.map(el => {
      return {
        url: `https://www.psychodietmed.pl${prefix}/${el.slug}`,
        lastModified: new Date(),
      }
    })

    return a
  }

  return [
    ...newArr(posts, '/blog'),
    ...newArr(products, '/oferta'),
    ...newArr(ebooks, '/akademia'),
    ...newArr(courses, '/akademia/kurs'),
    ...newArr(mediums, '/media'),
    ...newArr(obszaryDzialania, '/wspolpraca'),
    ...newArr(specjalisci, '/specjalisci'),
    ...newArr(narzedzia, '/narzedzia'),
    {
      url: 'https://www.psychodietmed.pl/',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/o-nas',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/historia-marki',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/media',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/kontakt',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/wspolpraca',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/efekty-wspolpracy',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/narzedzia',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/oferta',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/akademia',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/blog',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/umow-wizyte',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/regulamin',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/polityka-prywatnosci',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/',
      lastModified: new Date(),
    },
    {
      url: 'https://www.psychodietmed.pl/',
      lastModified: new Date(),
    },
  ]
}


async function getData() {
  const { body: { data } } = await Fetch({
    query: `
    query Pages {
      posts(first: 100) {
        nodes {
          slug
        }
      }
      mediums(first: 100) {
        nodes {
          slug
        }
      }
      narzedzia(first: 100) {
        nodes {
          slug
        }
      }
      specjalisci(first: 100) {
        nodes {
          slug
        }
      }
      obszaryDzialania(first: 100) {
        nodes {
          slug
        }
      }
      ebooks :  products(where: {categoryIn: "ebook"}) {
        nodes{
          slug
        }
      }
      courses : products(where: {categoryIn: "kurs"}) {
        nodes{
          slug
        }
      }
      products(where: {categoryNotIn: ["ebook", "kurs"]}) {
        nodes {
          slug
        }
      }
    }
  `,
    revalidate: 0
  })

  return {
    posts: data.posts.nodes,
    mediums: data.mediums.nodes,
    narzedzia: data.narzedzia.nodes,
    specjalisci: data.specjalisci.nodes,
    obszaryDzialania: data.obszaryDzialania.nodes,
    ebooks: data.ebooks.nodes,
    courses: data.courses.nodes,
    products: data.products.nodes,
  }
}