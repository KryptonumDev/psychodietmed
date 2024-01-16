"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
// import { getCookie } from '@/app/actions';

/**
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const middleware = new ApolloLink(async (operation, forward) => {
  // If session data exist in local storage, set value as session header.
  const session = (typeof window !== 'undefined') ? localStorage.getItem("woo-session") : null;
  const authToken = (typeof window !== 'undefined') ? localStorage.getItem("authToken") : null;

  const newHeaders = {}
  if (session) {
    newHeaders['woocommerce-session'] = `Session ${session}`
  }
  if (authToken) {
    newHeaders['Authorization'] = `Bearer ${authToken}`
  }
  if (session) {
    operation.setContext(({ headers = {} }) => ({
      headers: newHeaders
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

        localStorage.setItem("woo-session", session);

      }
    }

    return response;

  });
});

function makeClient() {
  const httpLink = middleware.concat(afterware.concat(new HttpLink({
    uri: "https://wp.psychodietmed.pl/graphql",
  })));

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}