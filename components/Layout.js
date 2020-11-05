import Link from 'next/link';

export default function Layout({ children, title, auth }) {
    const { user = {} } = auth || {};

    // console.log("[Layout]", auth);

    return (
        <div className="root">
            <nav className="navbar">
                <span>Welcome, <strong>{user.name || "Guest"}</strong></span>
                <div>
                    <Link href="/">
                        <a>Home</a> 
                    </Link>

                    {user.email ? (
                        // Auth navigation
                        <>
                            <Link href="/profile">
                                <a>Profile</a>
                            </Link>
                            <button>Logout</button>
                        </>
                    ) : (
                        // Unauth navigation
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    )}
                </div>
            </nav>

            <h1>{title}</h1>
            {children}

            <style jsx>{`
                .root {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }
                .navbar {
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                }
                a {
                    margin-right: 0.5em;
                }
                button {
                    margin-right: 0.5em;
                    padding: 0;
                    text-decoration: underline;
                    font: inherit;
                    cursor: pointer;
                    border-style: none;
                    color: rgb(0,0,238);
                }
            `}</style>
        </div>
    );
};