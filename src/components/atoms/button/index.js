'use client'
import React from "react"
import { RightArrow } from "../../../assets/small-right-arrow";
import Link from "next/link";

const Button = ({ theme="primary", href, className, children, ...props }) => {
  return (
    href ? (
      theme === 'primary' ? (
        <Link
          className={`link ${className || ''}`}
          href={href}
          {...props}
        >
          {children}
        </Link>
      ) : (
        <Link
          className={`link-secondary ${className || ''}`}
          href={href}
          {...props}
        >
          <span>{children}</span>
          <RightArrow />
        </Link>
      )
    ) : (
      theme === 'primary' ? (
        <button
          className={`link ${className || ''}`}
          {...props}
        >
          {children}
        </button>
      ) : (
        <button
          className={`link-secondary ${className || ''}`}
          {...props}
        >
          <span>{children}</span>
          <RightArrow />
        </button>
      )
    )
  )
};

export default Button;