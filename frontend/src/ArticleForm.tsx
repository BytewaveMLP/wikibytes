import gql from "graphql-tag";
import { useEffect, useState } from "react";
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
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setTitle(props.title);
    setBody(props.body);
  }, [props.title, props.body]);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      onSubmit(title, body);
    }}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.currentTarget.value)} disabled={loading} />
      </div>

      <div>
        <label htmlFor="body">Body</label>
        <textarea id="body" name="body" value={body} onChange={(event) => setBody(event.currentTarget.value)} disabled={loading} />
      </div>

      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>

      <button type="submit" disabled={loading}>Submit</button>
    </form>
  );
};

export default ArticleForm;
