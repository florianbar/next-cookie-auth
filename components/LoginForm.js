import { useState } from 'react';
import Router from 'next/router';

import { loginUser } from '../lib/auth';

export default function LoginForm() {
    const [email, setEmail] = useState("Sherwood@rosamond.me");
    const [password, setPassword] = useState("jacynthe.com");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = event => {
        if (event.target.name === "password") {
            setPassword(event.target.value);
        } 
        else if (event.target.name === "email") {
            setEmail(event.target.value);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        setIsLoading(true);
        setErrorMessage("");

        loginUser(email, password)
            .then(() => {
                setIsLoading(false);
                Router.push("/profile");
            })
            .catch(showError);
    };

    const showError = error => {
        console.log(error);
        const errorMessage = error.response && error.response.data || error.message;
        setErrorMessage(errorMessage);
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input 
                    type="password"
                    name="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={handleChange}
                />
            </div>
            <button disabled={isLoading} type="submit">
                {isLoading ? "Sending" : "Submit"}
            </button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
}