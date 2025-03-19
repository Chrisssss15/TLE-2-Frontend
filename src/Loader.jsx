import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

function Loader() {
    const [searchParams] = useSearchParams();
    const { setJwt } = useAuth();

    const ssoToken = searchParams.get("token");
    const nameParam = searchParams.get("name");
    const studentNrMatch = nameParam?.match(/\((\d+)\)/);
    const studentNr = studentNrMatch ? studentNrMatch[1] : null;

    useEffect(() => {
        async function authenticate() {
            try {
                const response = await fetch('http://145.24.223.196:8008/v1/login', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json',
                        'x-api-key': '186036f7-2399-428f-aaa9-833711a05520',
                    },
                    body: JSON.stringify({
                        ssoToken: ssoToken,
                        code: studentNr,
                    }),
                });

                const data = await response.json();
                console.log(data, "Login response");

                if (data.success) {
                    localStorage.setItem('jwt', data.jwt);
                    setJwt(data.jwt); // zet het ook in de context
                    window.location.href = "/";
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        }

        if (ssoToken && studentNr) {
            authenticate();
        }
    }, [ssoToken, studentNr, setJwt]);

    return (
        <div>
            <h1>Loading... <br /> Houd je boter, kaas en eieren vast 🍳</h1>
        </div>
    );
}

export default Loader;
