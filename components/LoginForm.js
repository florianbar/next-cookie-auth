import { useState } from 'react';
import { loginUser } from '../lib/auth';

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    onChange={handleChange}
                />
            </div>
            <div>
                <input 
                    type="password"
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}