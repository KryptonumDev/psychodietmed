'use client'
import React from "react"
import styles from './styles.module.scss'
import { RightArrow } from "../../../assets/small-right-arrow";
import Link from "next/link";

const Button = ({ theme="primary", href, children }) => {
  return (
    theme === 'primary' ? (
      <Link className={`link ${styles.link}`} href={href}>
        <span>{children}</span>
      </Link>
    ) : (
      <Link className={`link-secondary ${styles.link}`} href={href}>
        <span>{children}</span>
        <RightArrow />
      </Link>
    )
  );
};

export default Button;