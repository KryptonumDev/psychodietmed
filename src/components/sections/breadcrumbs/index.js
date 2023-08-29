import React from "react"
import Link from "next/link"
import styles from './styles.module.scss'

const createBreadcrumbs = (breadCrumbs) => {
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": 'PsychoDietMed',
      "item": 'https://www.psychodietmed.pl/'
    }
  ]
  breadCrumbs.forEach((el, index) => {
    items.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": el.name,
      "item": `https://www.psychodietmed.pl/${el.url}`
    })
  });

  return items
}

export default function Breadcrumbs({ data }) {
  if (!data) return null

  const breadCrumbsItems = createBreadcrumbs(data);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadCrumbsItems
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <script
          key={`breadcrumbs`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <div className={styles.ul}>
        <Link className={styles.item} href="/">Strona główna</Link>
        <Arrow />
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <Link key={index} tabIndex={index === data.length - 1 ? '-1' : '0'} className={`${styles.item} ${index === data.length - 1 ? styles.last : ''}`} href={item.url}>{item.page}</Link>
            <Arrow />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const Arrow = () => (
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.8324 8.73334L9.00744 4.90834C8.8513 4.75313 8.64009 4.66602 8.41994 4.66602C8.19978 4.66602 7.98857 4.75313 7.83244 4.90834C7.75433 4.98581 7.69233 5.07798 7.65003 5.17953C7.60772 5.28108 7.58594 5.39 7.58594 5.50001C7.58594 5.61002 7.60772 5.71894 7.65003 5.82049C7.69233 5.92204 7.75433 6.01421 7.83244 6.09168L11.6658 9.90834C11.7439 9.98581 11.8059 10.078 11.8482 10.1795C11.8905 10.2811 11.9123 10.39 11.9123 10.5C11.9123 10.61 11.8905 10.7189 11.8482 10.8205C11.8059 10.922 11.7439 11.0142 11.6658 11.0917L7.83244 14.9083C7.67552 15.0642 7.58692 15.2759 7.58614 15.4971C7.58536 15.7182 7.67246 15.9306 7.82827 16.0875C7.98408 16.2444 8.19585 16.333 8.41699 16.3338C8.63813 16.3346 8.85052 16.2475 9.00744 16.0917L12.8324 12.2667C13.3006 11.7979 13.5636 11.1625 13.5636 10.5C13.5636 9.83751 13.3006 9.2021 12.8324 8.73334Z" fill="#606060" />
  </svg>
)