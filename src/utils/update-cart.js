export const updateCart = (existingCart, product, qtyToBeAdded, newQty = false) => {

  const updatedProducts = getUpdatedProducts(existingCart.products, product, qtyToBeAdded, newQty);

  const addPrice = (total, item) => {
    total.totalPrice += item.totalPrice;
    total.qty += item.qty;

    return total;
  };

  // Loop through the updated product array and add the totalPrice of each item to get the totalPrice
  let total = updatedProducts.reduce(addPrice, { totalPrice: 0, qty: 0 });

  const updatedCart = {
    products: updatedProducts,
    totalProductsCount: parseInt(total.qty),
    totalProductsPrice: parseFloat(total.totalPrice)
  };

  localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));

  return updatedCart;
};