import { useEffect, useState } from 'react';
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
        <pre>{JSON.stringify(user, null, 2)}</pre>
    );
};