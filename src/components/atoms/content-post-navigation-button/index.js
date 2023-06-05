'use client'
import React from "react"
import { htmlDelete } from "../../../utils/delete-html";
import { slugTransform } from "../../../utils/slug-transform";

export const Button = ({ className, heading }) => {

  const scroll = (e) => {
    document.getElementById(slugTransform(e.target.textContent)).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button className={className} onClick={e => { scroll(e) }}>
      {htmlDelete(heading)}
    </button>
  )
} 