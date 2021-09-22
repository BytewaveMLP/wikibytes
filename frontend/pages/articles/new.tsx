import type { NextPage } from "next";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { CreateArticleMutation, CreateArticleMutationVariables } from "../../src/graphql/types";
import ArticleForm from "../../src/ArticleForm";

const CREATE_ARTICLE_MUTATION = gql`
mutation CreateArticle($title: String!, $body: String!) {
  createArticle(input: { title: $title, body: $body }) {
    article {
      id
    }
    errors
  }
}
`;

const CreateArticle: NextPage = () => {
  const [createArticle, { data, loading }] = useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CREATE_ARTICLE_MUTATION);

  const router = useRouter();

  const onSubmit = async (title: string, body: string) => {
    createArticle({ variables: { title, body } }).then(() => {
      if (data?.createArticle?.article?.id) {
        router.push(`/articles/${data.createArticle.article.id}`);
      }
    });
  };

  return (
    <ArticleForm title="" body="" onSubmit={onSubmit} errors={data?.createArticle?.errors || []} loading={loading} />
  );
};

export default CreateArticle;
