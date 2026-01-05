import { v4 } from 'uuid';

// WordPress doesn't allow certain characters in usernames (like +)
// This function sanitizes the email to create a valid username
const sanitizeUsername = (email) => {
  if (!email) return email;
  // Replace + with _ and remove any other invalid characters
  return email.toLowerCase().replace(/\+/g, '_').replace(/[^a-z0-9_@.-]/g, '');
};

export const createCheckoutData = (order, registred) => {
  // Set the billing Data to shipping, if applicable.
  const billingData = order.billingDifferentThanShipping ? order.billing : order.shipping;

  const checkoutData = {
    clientMutationId: v4(),
    shipping: {
      firstName: order?.shipping?.firstName,
      lastName: order?.shipping?.lastName,
      address1: order?.shipping?.address1,
      address2: order?.shipping?.address2,
      city: order?.shipping?.city,
      country: order?.shipping?.country,
      state: order?.shipping?.state,
      postcode: order?.shipping?.postcode,
      email: order?.shipping?.email,
      phone: order?.shipping?.phone,
      company: order?.shipping?.company,
    },
    billing: {
      firstName: billingData?.firstName,
      lastName: billingData?.lastName,
      address1: billingData?.address1,
      address2: billingData?.address2,
      city: billingData?.city,
      country: billingData?.country,
      state: billingData?.state,
      postcode: billingData?.postcode,
      email: billingData?.email,
      phone: billingData?.phone,
      company: billingData?.company,
    },
    customerNote: order.comment,
    shipToDifferentAddress: order.billingDifferentThanShipping,
    paymentMethod: 'przelewy24',
    shippingMethod: null,
    transactionId: order.transactionId,
    isPaid: order.isPaid,
    metaData: []
  };

  if (order.firmOrder) {
    checkoutData.metaData.push(...order.metaData)
  }

  if (order.shippingMethod) {
    checkoutData.shippingMethod = order.shippingMethod.methodId;
  }

  if (order?.inpostNumber?.name) {
    checkoutData.metaData.push({ key: 'parcel_machine_id', value: order?.inpostNumber?.name })
  }

  if (order.needAccount && !registred) {
    checkoutData.account = {
      username: sanitizeUsername(billingData?.email),
      password: v4(),
    }
  }

  return checkoutData;
};