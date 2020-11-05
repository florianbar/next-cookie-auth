import Document, { Html, Head, Main, NextScript } from 'next/document';

import { getServerSideToken, getUserScript } from '../lib/auth';

export default class MyDocument extends Document {
    render() {
        const { user = {} } = this.props;

        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
                    <NextScript />
                </body>
            </Html>
        );
    }
};

MyDocument.getInitialProps = async (context) => {
    const props = await Document.getInitialProps(context);
    const userData = await getServerSideToken(context.req);

    console.log("[_document]", userData);
  
    return { 
        ...props, 
        ...userData 
    };
};