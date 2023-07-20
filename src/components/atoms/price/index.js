import { isEmpty } from "lodash";

export default function Price({ quantity = 1, regularPrice = 0, salesPrice }) {

  if (isEmpty(salesPrice)) {
    return null;
  }

  const discountPercent = (regularPrice, salesPrice) => {
    if (isEmpty(regularPrice) || isEmpty(salesPrice)) {
      return null;
    }

    const formattedRegularPrice = parseInt(regularPrice?.substring(1));
    const formattedSalesPrice = parseInt(salesPrice?.substring(1));

    const discountPercent = ((formattedRegularPrice - formattedSalesPrice) / formattedRegularPrice) * 100;

    return {
      discountPercent: formattedSalesPrice !== formattedRegularPrice ? `(${discountPercent.toFixed(2)}%) OFF` : null,
      strikeThroughClass: formattedSalesPrice < formattedRegularPrice ? 'product-regular-price mr-2 line-through text-sm text-gray-600 font-normal' : ''
    }
  }

  const productMeta = discountPercent(regularPrice, salesPrice);

  return (
    <p>
      {/* Regular price */}
      {/* {productMeta?.discountPercent ? <span dangerouslySetInnerHTML={{ __html: salesPrice }} /> : null} */}

      {/* Discounted price */}
      <span dangerouslySetInnerHTML={{ __html: (parseInt(regularPrice) * quantity) + regularPrice.replace(/[0-9]/g, '') }}></span>
      {/* Discount percent */}
      {/* <span dangerouslySetInnerHTML={{ __html: productMeta?.discountPercent }} /> */}
    </p>
  )
}