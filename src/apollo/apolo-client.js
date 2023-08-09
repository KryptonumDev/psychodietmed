import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { createHttpLink } from "@apollo/client";

const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    link: createHttpLink({
      uri: `https://psychodietmed.headlesshub.com/graphql`,
      fetch: fetch
    }),
    cache: new NextSSRInMemoryCache(),
  });
})

export default getClient;