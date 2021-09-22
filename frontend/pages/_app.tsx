import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../src/apollo-client';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default MyApp
