import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useState } from 'react';
import ArticleForm from "../../src/ArticleForm";
import { CreateArticleMutation, CreateArticleMutationVariables } from "../../src/graphql/types";

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
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [createArticle, { data, loading }] = useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CREATE_ARTICLE_MUTATION);

  const onSubmit = () => {
    createArticle({ variables: { title, body } }).then(() => {
      if (data?.createArticle?.article?.id) {
        router.push(`/articles/${data.createArticle.article.id}`);
      }
    });
  };

  return (
    <ArticleForm
      title={title}
      body={body}
      disabled={loading}
      errors={data?.createArticle?.errors}
      onTitleChange={setTitle}
      onBodyChange={setBody}
      onSubmit={onSubmit}
    />
  );
};

export default CreateArticle;
