import fetch from 'node-fetch';

import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";


import { ApolloLink, createHttpLink } from "@apollo/client";
// import { getCookie } from '@/app/actions';

/**
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const middleware = new ApolloLink(async (operation, forward) => {
  // If session data exist in local storage, set value as session header.
  const session = (typeof window !== 'undefined') ? localStorage.getItem("woo-session") : null;
  if (session) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        "woocommerce-session": `Session ${session}`,
      }
    }));
  }

  return forward(operation);

});

/*
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
export const afterware = new ApolloLink((operation, forward) => {

  return forward(operation).map(response => {

    if (typeof window === 'undefined') {
      return response;
    }

    // Check for session header and update session in local storage accordingly.
    const context = operation.getContext();
    const { response: { headers } } = context;
    const session = headers.get("woocommerce-session");

    if (session) {

      // Remove session data if session destroyed.
      if ("false" === session) {

        localStorage.removeItem("woo-session");

        // Update session new data if changed.
      } else if (localStorage.getItem("woo-session") !== session) {

        localStorage.setItem("woo-session", headers.get("woocommerce-session"));

      }
    }

    return response;

  });
});

const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    link: middleware.concat(afterware.concat(createHttpLink({
      uri: `https://psychodietmed.headlesshub.com/graphql`,
      fetch: fetch
    }))),
    cache: new NextSSRInMemoryCache(),
  });
})

export default getClient;