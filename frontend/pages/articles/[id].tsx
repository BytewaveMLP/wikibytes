import gql from 'graphql-tag';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import client from '../../src/apollo-client';
import { ArticleQuery, ArticleQueryVariables } from '../../src/graphql/types';

const ARTICLE_QUERY = gql`
query Article($id: ID!) {
  article(id: $id) {
    title
    body
  }
}
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { data } = await client.query<ArticleQuery, ArticleQueryVariables>({
    query: ARTICLE_QUERY,
    variables: { id: id as string },
  });
  return { props: { article: data.article } };
};

const Article: NextPage<{ article: ArticleQuery['article'] }> = ({ article }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <article>
        <h1>{article?.title}</h1>
        {article?.body}
      </article>
      <Link href={`/articles/${id}/edit`}>
        <a>Edit</a>
      </Link>
    </>
  );
};

export default Article;
