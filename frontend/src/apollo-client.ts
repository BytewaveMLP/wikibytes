import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const client = new ApolloClient({
  uri: typeof window === 'undefined' ? 'http://localhost:3000/graphql' : '/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          articles: relayStylePagination(),
        },
      },
    },
  }),
});

export default client;
