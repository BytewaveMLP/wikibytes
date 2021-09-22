import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import client from "../../../src/apollo-client";
import ArticleForm, { ARTICLE_FORM_FRAGMENT } from "../../../src/ArticleForm";
import { ArticleFormQuery, ArticleFormQueryVariables, EditArticleMutation, EditArticleMutationVariables } from "../../../src/graphql/types";

const ARTICLE_FORM_QUERY = gql`
  query ArticleForm($id: ID!) {
    article(id: $id) {
      id
      ...ArticleForm
    }
  }
  ${ARTICLE_FORM_FRAGMENT}
`;

const EDIT_ARTICLE_MUTATION = gql`
  mutation EditArticle($id: ID!, $title: String!, $body: String!) {
    editArticle(input: {id: $id, title: $title, body: $body}) {
      article {
        id
        ...ArticleForm
      }
      errors
    }
  }
  ${ARTICLE_FORM_FRAGMENT}
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { data } = await client.query<ArticleFormQuery, ArticleFormQueryVariables>({
    query: ARTICLE_FORM_QUERY,
    variables: { id: id as string },
  });
  return { props: { article: data.article } };
};

const EditArticle: NextPage<{ article: ArticleFormQuery['article'] }> = ({ article }) => {
  const router = useRouter();
  const id = router.query.id as string;
  const [title, setTitle] = useState(article.title);
  const [body, setBody] = useState(article.body);
  const [editArticle, { data: mutationData, loading: mutationLoading }] = useMutation<EditArticleMutation, EditArticleMutationVariables>(EDIT_ARTICLE_MUTATION);

  const onSubmit = () => {
    editArticle({ variables: { id, title, body } }).then(() => {
      if (mutationData?.editArticle?.article) {
        router.push(`/articles/${mutationData.editArticle.article.id}`);
      }
    });
  };

  return (
    <>
      <h1>Editing {title}</h1>

      <ArticleForm
        title={title}
        body={body}
        disabled={mutationLoading}
        errors={mutationData?.editArticle?.errors}
        onTitleChange={setTitle}
        onBodyChange={setBody}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default EditArticle;
