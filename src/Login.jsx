import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://jouw-backend-url/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("jwt", data.jwt);
                console.log("Login success, JWT opgeslagen:", data.jwt);
                navigate("/woordenboek");
            } else {
                alert("Login mislukt: " + data.message);
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Er ging iets mis met inloggen");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-3xl mb-4">Inloggen</h1>
            <input
                type="text"
                placeholder="Gebruikersnaam"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <input
                type="password"
                placeholder="Wachtwoord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white p-2 rounded w-full"
            >
                Login
            </button>
        </div>
    );
}

export default Login;
