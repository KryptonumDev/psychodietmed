import { createNewProduct } from "./create-new-product";

export const addFirstProduct = ( product ) => {

	let productPrice = getFloatVal( product.price );

	let newCart = {
		products: [],
		totalProductsCount: 1,
		totalProductsPrice: productPrice
	};

	const newProduct = createNewProduct( product, productPrice, 1 );
	newCart.products.push( newProduct );

	localStorage.setItem( 'woo-next-cart', JSON.stringify( newCart ) );

	return newCart;
};