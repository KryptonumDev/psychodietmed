
export default function Price({ quantity = 1, regularPrice = 0, salesPrice }) {

  return (
    <p>
      {/* Regular price */}
      {/* {productMeta?.discountPercent ? <span dangerouslySetInnerHTML={{ __html: salesPrice }} /> : null} */}

      {/* Discounted price */}
      <span dangerouslySetInnerHTML={{ __html: (parseInt(regularPrice) * quantity) + '&nbsp;zł'}}></span>
      {/* Discount percent */}
      {/* <span dangerouslySetInnerHTML={{ __html: productMeta?.discountPercent }} /> */}
    </p>
  )
}