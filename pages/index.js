import Link from 'next/link';

import Layout from '../components/Layout';

export default function Index() {
    return (
        <Layout title="Home">
            <Link href="/profile">
                <a>Go to profile</a>
            </Link>
        </Layout> 
    );
};