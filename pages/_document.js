import Document, { Html, Head, Main, NextScript } from 'next/document';

import { getServerSideToken, getUserScript } from '../lib/auth';

export async function getStaticProps(context) {
    const props = await Document.getInitialProps(context);
    const userData = await getServerSideToken(context.req);
  
    return { 
        ...props, 
        ...userData 
    };
};

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
    };
};