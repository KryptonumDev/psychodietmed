import React from "react"
import './styles.scss'
import { slugTransform } from "../../../utils/slug-transform"
import ContentPostNavigation from "@/components/organisms/content-post-navigation"
import Contact from "@/components/organisms/post-contact"
import Other from "@/components/organisms/post-quick-other"

export default function Content({ title, excerpt, next, prev, author, data }) {

  const headings = createHeadings(data)
  const modifiedContent = modificateContent(data)

  return (
    <section className='content-wrapper'>
      <ContentPostNavigation headings={headings} author={author} />
      <div className='content-wrap'>
        <div className='content' dangerouslySetInnerHTML={{ __html: modifiedContent }} />
        <Contact title={title} excerpt={excerpt} />
        <Other prev={prev} next={next} />
      </div>
    </section>
  )
}

const createHeadings = (content) => {
  if (!content) return []

  const regex = /<h2\b[^>]*>(.*?)<\/h2>/gi
  const matches = content.match(regex)

  return matches
}

const modificateContent = (content) => {
  return content.replace(/<h2\b[^>]*>(.*?)<\/h2>/gi, (match, group) => {
    const slug = slugTransform(group)
    return `<h2 id="${slug}">${group}</h2>`;
  });
}