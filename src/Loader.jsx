import { useSearchParams } from "react-router";
import {useEffect, useState} from "react";

function Loader() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [token, setToken] = useState();
    const obscure = searchParams.get("token");
    const obscure2 = searchParams.get("name");


    const obscure3 = obscure2.match(/\((\d+)\)/);

    console.log(obscure, 'this is the token');
    console.log(obscure3[1], 'this is the student number');

    useEffect(() => {
        async function loaderFunction() {
            try {
                const response = await fetch('http://145.24.223.196:8008/v1/login', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json',
                        'x-api-key': '186036f7-2399-428f-aaa9-833711a05520',
                        'Authorization': 'Bearer',
                    },
                    body: JSON.stringify({
                        "ssoToken": obscure,
                        "code": obscure3[1],
                    })
                });

                const data = await response.json();
                console.log(data, 'this is where the response would be');
                console.log(data.jwt);
                setToken(data.jwt);

                if (data.success) {
                    localStorage.setItem('jwt', data.jwt);
                }

            } catch (error) {
                console.error('Error fetching signs:', error);
            }
        }

        loaderFunction();
    }, []);

    console.log(token, 'this is the token that has been set already');


    return (
        <>
            <div>
                <h1>Loading... <br /> Please hold on to your boter kees and eieren</h1>
            </div>
        </>
    );
}

export default Loader;