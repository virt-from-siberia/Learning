import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="notifications"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
