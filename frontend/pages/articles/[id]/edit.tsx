import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { ArticleFormQuery, ArticleFormQueryVariables, EditArticleMutation, EditArticleMutationVariables } from "../../../src/graphql/types";
import ArticleForm, { ARTICLE_FORM_FRAGMENT } from "../../../src/ArticleForm";

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

const EditArticle: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: queryData, loading: queryLoading } = useQuery<ArticleFormQuery, ArticleFormQueryVariables>(ARTICLE_FORM_QUERY, { variables: { id } });
  const [editArticle, { data: mutationData, loading: mutationLoading }] = useMutation<EditArticleMutation, EditArticleMutationVariables>(EDIT_ARTICLE_MUTATION);
  const { title, body } = queryData?.article || { title: "", body: "" };

  const onSubmit = (title: string, body: string) => {
    editArticle({ variables: { id, title, body } }).then(() => {
      if (mutationData?.editArticle?.article) {
        router.push(`/articles/${mutationData.editArticle.article.id}`);
      }
    });
  };

  if (queryLoading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <>
      <h1>Editing {queryData?.article?.title}</h1>

      <ArticleForm title={title} body={body} loading={mutationLoading} errors={mutationData?.editArticle?.errors || []} onSubmit={onSubmit} />
    </>
  );
};

export default EditArticle;
