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
  onSubmit: (title: string, body: string) => void;
  loading: boolean;
  errors: string[];
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit, loading, errors, ...props }) => {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);

  useEffect(() => {
    setBody(props.body);
  }, [props.body]);

  return (
    <Form onSubmit={(event) => {
      event.preventDefault();
      onSubmit(title, body);
    }}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.currentTarget.value)} disabled={loading} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="body">Body</Form.Label>
        <Form.Control as="textarea" id="body" name="body" value={body} onChange={(event) => setBody(event.currentTarget.value)} disabled={loading} />
      </Form.Group>

      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>

      <Button type="submit" disabled={loading}>Submit</Button>
    </Form>
  );
};

export default ArticleForm;
