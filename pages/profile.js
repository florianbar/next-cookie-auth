import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { getUserProfile } from '../lib/auth';

export default function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => { 
        getUserProfile().then(user => {
            console.log(user);
            setUser(user);
        });
    }, [getUserProfile]);

    return (
        <Layout title="Profile">
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </Layout>
    );
};