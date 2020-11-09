import { useEffect, useState } from 'react';
import Router from 'next/router';

import Layout from '../components/Layout';
import { getUserProfile, authInitialProps, isAnonymousUser } from '../lib/auth';

export default function Profile(props) {
    const [user, setUser] = useState(null);
    const isAnonymous = isAnonymousUser(props.auth.user)

    useEffect(() => {
        if (isAnonymous) {
            Router.replace("/login");
        } else {
            getUserProfile().then(user => {
                setUser(user);
            });
        }
    }, [getUserProfile, isAnonymous, setUser]);

    return isAnonymous && (
        <Layout title="Profile" {...props}>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const auth = authInitialProps(true)(context);
    return { props: auth };
};