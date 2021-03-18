import React from "react";
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <p>
                <Link to="/login">Login</Link>
            </p>
            <p>
                <Link to="/signup">Signup</Link>
            </p>
            <p>
                <Link to="/main">Main</Link>
            </p>
        </div>
    )
}
