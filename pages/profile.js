import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { getUserProfile, authInitialProps } from '../lib/auth';

export default function Profile(props) {
    const [user, setUser] = useState(null);

    useEffect(() => { 
        getUserProfile().then(user => {
            setUser(user);
        });
    }, [getUserProfile]);

    return (
        <Layout title="Profile" {...props}>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    console.log("[Profile][getServerSideProps]");
    const auth = authInitialProps(context);
    return { props: auth };
};