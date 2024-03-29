import { useContext, useState } from 'react';
import { AppContext } from "../../context/AppContext";
import { getUpdatedItems } from '../../../functions';
import { v4 } from 'uuid';
import { useMutation } from '@apollo/client';
import UPDATE_CART from "../../../mutations/update-cart";
import GET_CART from "../../../queries/get-cart";
import CLEAR_CART_MUTATION from "../../../mutations/clear-cart";
import { isEmpty } from 'lodash'
import { getFormattedCart } from '../../../../utils/get-formatted-cart';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';


export default function CartItemsContainer() {
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart || null);
    }
  });

  const [updateCart, { data: updateCartResponse, loading: updateCartProcessing, error: updateCartError }] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message ? error.graphQLErrors[0].message : '';
        setRequestError(errorMessage);
      }
    }
  });

  const [clearCart, { data: clearCartRes, loading: clearCartProcessing, error: clearCartError }] = useMutation(CLEAR_CART_MUTATION, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = !isEmpty(error?.graphQLErrors?.[0]) ? error.graphQLErrors[0]?.message : '';
        setRequestError(errorMessage);
      }
    }
  });

  const handleRemoveProductClick = (event, cartKey, products) => {

    event.stopPropagation();
    if (products.length) {

      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems
          }
        },
      });
    }
  };

  return (
    <div>
      {cart ? (
        <div>
          <div>
            <h1>Cart</h1>
            {/*Clear entire cart*/}
            {/* <div className="clear-cart text-right">
              <button className="px-4 py-1 bg-gray-500 text-white rounded-sm w-auto" onClick={(event) => handleClearCart(event)} disabled={clearCartProcessing}>
                <span className="woo-next-cart">Clear Cart</span>
                <i className="fa fa-arrow-alt-right" />
              </button>
              {clearCartProcessing ? <p>Clearing...</p> : ''}
              {updateCartProcessing ? <p>Updating...</p> : null}
            </div> */}
          </div>
          {/* {cart.products.length && (
                  cart.products.map(item => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      updateCartProcessing={updateCartProcessing}
                      products={cart.products}
                      handleRemoveProductClick={handleRemoveProductClick}
                      updateCart={updateCart}
                    />
                  ))
                )} */}

          {/* Display Errors if any */}
          {requestError ? <div> {requestError} </div> : ''}
        </div>
      ) : (
        <h2>No items in the cart</h2>
      )}
    </div>

  );
};
