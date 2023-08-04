'use client'
import React from "react"
import { RightArrow } from "../../../assets/small-right-arrow";
import Link from "next/link";

const Button = ({ theme="primary", href, className, children }) => {
  return (
    theme === 'primary' ? (
      <Link className={`link ${className || ''}`} href={href}>
        <span>{children}</span>
      </Link>
    ) : (
      <Link className={`link-secondary ${className || ''}`} href={href}>
        <span>{children}</span>
        <RightArrow />
      </Link>
    )
  );
};

export default Button;