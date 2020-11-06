import Link from 'next/link';

import Layout from '../components/Layout';
import { authInitialProps } from '../lib/auth';

export default function Index(props) {
    return (
        <Layout title="Home" {...props}>
            <Link href="/profile">
                <a>Go to profile</a>
            </Link>
        </Layout> 
    );
};

export async function getServerSideProps(context) {
    console.log("[Index][getServerSideProps]");
    const auth = authInitialProps(context);
    return { props: auth };
};