import fetch from 'node-fetch';

import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

import { ApolloLink, createHttpLink } from "@apollo/client";
import { getCookie } from '@/app/actions';

export const middleware = new ApolloLink(async (operation, forward) => {
  // If session data exist in local storage, set value as session header.
  const session = await getCookie("woo-session");
  const authToken = await getCookie('authToken');

  operation.setContext(({ headers = {} }) => ({
    headers: {
      "woocommerce-session": `Session ${session?.value}`,
      "Authorization": `Bearer ${authToken?.value}`,
    }
  }));

  return forward(operation);

});

const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    link: middleware.concat(createHttpLink({
      uri: `https://psychodietmed.headlesshub.com/graphql`,
      fetch: fetch
    })),
    cache: new NextSSRInMemoryCache(),
  });
})

export default getClient;