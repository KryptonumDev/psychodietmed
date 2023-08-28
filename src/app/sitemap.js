import { Fetch } from "../utils/fetch-query"

export default async function sitemap() {

  const { posts, products, ebooks, courses, mediums, obszaryDzialania, specjalisci, narzedzia } = await getData()

  const newArr = (arr, prefix) => {
    let a = arr.map(el => {
      return {
        url: `https://psychodietmed-git-develop-kryptonum.vercel.app${prefix}/${el.slug}`,
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
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/o-nas',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/historia-marki',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/media',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/kontakt',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/wspolpraca',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/efekty-wspolpracy',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/narzedzia',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/oferta',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/akademia',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/blog',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/umow-wizyte',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/regulamin',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/polityka-prywatnosci',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/',
      lastModified: new Date(),
    },
    {
      url: 'https://psychodietmed-git-develop-kryptonum.vercel.app/',
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