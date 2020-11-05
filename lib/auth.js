import axios from 'axios';

// pass cookie data to axios
axios.defaults.withCredentials = true;

export const getServerSideToken = req => {
    if (!req.signedCookies) {
        return {};
    } else if (!req.signedCookies.token) {
        return {};
    }

    return { user: req.signedCookies.token };
};

const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";

export const getClientSideToken = () => {
    if (typeof window !== "undefined") {
        const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {};
        return { user };
    }
    return { user: {} };
};

export const getUserScript = user => {
    return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`;
};

export const authInitialProps = () => ({ req }) => {
    //console.log("[authInitialProps]", req);
    const auth = req ? getServerSideToken(req) : getClientSideToken();
    return { auth };
};

export const loginUser = async (email, password) => {
    const { data } = await axios.post('/api/login', { email, password });
    if (typeof window !== "undefined") {
        // console.log("[loginUser]", data);
        window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
    }
};

export const getUserProfile = async () => {
    const { data } = await axios.get('/api/profile');
    return data;
};