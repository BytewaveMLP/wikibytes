import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import type { NextPage } from 'next';
import Link from 'next/link';
import { ArticlesQuery } from '../../src/graphql/types';

const ARTICLES_QUERY = gql`
query Articles($cursor: String) {
  articles(after: $cursor, first: 10) {
    nodes {
      id
      title
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
`;

const Articles: NextPage = () => {
  const { loading, data, fetchMore } = useQuery<ArticlesQuery>(ARTICLES_QUERY);
  const articles = data?.articles?.nodes;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Articles</h1>

      <ul>
        {articles?.map(article =>
           <li key={article?.id}>
             <Link href={`/articles/${article?.id}`}>
              <a>{article?.title}</a>
             </Link>
           </li>
        )}
      </ul>

      {data?.articles?.pageInfo?.hasNextPage && (
        <button type="button" onClick={() => { fetchMore({ variables: { cursor: data.articles.pageInfo.endCursor } }) }}>Next Page</button>
      )}

      <br />

      <Link href="/articles/new">
        <a>New Article</a>
      </Link>
    </>
  );
};

export default Articles;
