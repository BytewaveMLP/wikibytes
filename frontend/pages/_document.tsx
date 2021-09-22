import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { Container } from 'react-bootstrap';

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Container>
            <Main />
          </Container>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
