import axios from 'axios';
import Router from 'next/router';

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

export const getUserScript = user => {
    return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`;
};

export const authInitialProps = (isProtectedRoute) => ({ req, res }) => {
    const auth = getServerSideToken(req);
    const { user } = auth;
    const { url } = req;
    const isAnonymous = isAnonymousUser(user);
    const isServer = !req.headers.referer;

    // On server redirect can only happen on initial load
    if (isProtectedRoute && isAnonymous && isServer && url !== "/login") {
        return serverRedirectUser(res, "/login");
    }

    return { auth };
};

const serverRedirectUser = (res, path) => {
    res.setHeader('Location', path);
    res.statusCode = 302;
    res.end();
    return { props: {} };
};

export const isAnonymousUser = user => {
    return !user || user.type !== "authenticated";
};

export const loginUser = async (email, password) => {
    const { data } = await axios.post('/api/login', { email, password });
    if (typeof window !== "undefined") {
        window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
    }
};

export const logoutUser = async () => {
    if (typeof window !== "undefined") {
        window[WINDOW_USER_SCRIPT_VARIABLE] = {};
    }
    await axios.post("/api/logout");
    Router.push('/login');
};

export const getUserProfile = async () => {
    const { data } = await axios.get('/api/profile');
    return data;
};