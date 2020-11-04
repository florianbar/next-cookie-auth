import { useState } from 'react';
import { loginUser } from '../lib/auth';

export default function LoginForm() {
    const [email, setEmail] = useState("Sherwood@rosamond.me");
    const [password, setPassword] = useState("jacynthe.com");

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
        loginUser(email, password);
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
            <button type="submit">Submit</button>
        </form>
    );
}