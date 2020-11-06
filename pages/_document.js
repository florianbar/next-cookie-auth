import Document, { Html, Head, Main, NextScript } from 'next/document';

import { getServerSideToken, getUserScript } from '../lib/auth';

export default class MyDocument extends Document {
    static async getInitialProps(context) {
        const props = await Document.getInitialProps(context);
        const userData = await getServerSideToken(context.req);
    
        return { 
            ...props, 
            ...userData 
        };
    }

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