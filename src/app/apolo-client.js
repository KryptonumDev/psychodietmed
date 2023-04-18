import { ApolloClient, InMemoryCache } from "@apollo/client";

// const defaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'ignore',
//   },
//   query: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'all',
//   },
// }

const client = new ApolloClient({
  uri: "https://psychodietmed.headlesshub.com/graphql",
  cache: new InMemoryCache({ resultCaching: false }),
  // defaultOptions: defaultOptions,
});

export default client