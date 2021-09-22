import type { NextPage } from 'next';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { ArticleQuery, ArticleQueryVariables } from '../../src/graphql/types';
import { useRouter } from 'next/dist/client/router';

const ARTICLE_QUERY = gql`
query Article($id: ID!) {
  article(id: $id) {
    title
    body
  }
}
`;

const Article: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery<ArticleQuery, ArticleQueryVariables>(ARTICLE_QUERY, { variables: { id: id as string } });

  if (loading) return ( <p>Loading...</p> );

  const article = data?.article;

  return (
    <article>
      <h1>{article?.title}</h1>
      {article?.body}
    </article>
  );
};

export default Article;
