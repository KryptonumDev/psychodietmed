import React from "react"
import styles from './styles.module.scss'
import AddToCart from "@/components/atoms/add-to-cart-button/index.js"
import Link from "next/link"
import { Image } from "@/components/atoms/image"
import Price from "@/components/atoms/price"

export const Card = ({ product }) => (
  <div className={styles.wrapper}>
    <Link href={`/product/${product?.slug}`} >
        <Image
          className="object-cover bg-gray-100"
          width="308"
          height="308"
          loading="lazy"
          src={product?.image?.sourceUrl ?? ''}
          alt={product?.image?.altText ?? product?.slug}
        />
    </Link>
    <div className="product-info">
      <h3 className="product-title mt-3 font-medium text-gray-800">
        {product.name ? product.name : ''}
      </h3>
      <div className="product-description text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: (product?.description) }} />
      <Price salesPrice={product?.price} regularPrice={product?.regularPrice} />
      <AddToCart product={product} />
    </div>
  </div>
)