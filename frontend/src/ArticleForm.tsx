import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ArticleFormFragment } from "./graphql/types";

export const ARTICLE_FORM_FRAGMENT = gql`
  fragment ArticleForm on Article {
    title
    body
  }
`;

interface ArticleFormProps extends ArticleFormFragment {
  title: string;
  body: string;
  disabled: boolean;
  errors?: string[] | null;
  onTitleChange: (title: string) => void;
  onBodyChange: (body: string) => void;
  onSubmit: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ title, body, disabled, errors, onTitleChange, onBodyChange, onSubmit }) => {
  return (
    <Form onSubmit={(event) => {
      event.preventDefault();
      onSubmit();
    }}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control type="text" id="title" name="title" value={title} onChange={(event) => onTitleChange(event.currentTarget.value)} disabled={disabled} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="body">Body</Form.Label>
        <Form.Control as="textarea" id="body" name="body" value={body} onChange={(event) => onBodyChange(event.currentTarget.value)} disabled={disabled} />
      </Form.Group>

      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>

      <Button type="submit" disabled={disabled}>Submit</Button>
    </Form>
  );
};

export default ArticleForm;
