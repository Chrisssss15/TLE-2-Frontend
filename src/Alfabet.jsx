import Letters from "./Letters.jsx";
import {useEffect, useState} from "react";


function Alfabet(){

    const [signs, setSigns] = useState([]);

    useEffect(() => {
        async function fetchSigns() {
            try {
                const response = await fetch('http://145.24.223.196:8008/v1/signs/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'x-api-key': '95937790-3a9d-4ee2-9ed6-ace5165167f2',
                    },
                });

                const data = await response.json();
                console.log('API Response:', data);  // Debugging log

                if (Array.isArray(data)) {
                    setSigns(data); //Directly use data since it's an array
                } else {
                    console.error('Unexpected API response structure:', data);
                    setSigns([]); // Prevent errors
                }
            } catch (error) {
                console.error('Error fetching signs:', error);
                setSigns([]); // Ensure signs is an array even if the fetch fails
            }
        }

        fetchSigns();
    }, []);





    const alphabetSigns = signs.filter(sign => sign.theme === "Alfabet");

    return (
        <div className="p-6">
            <h1 className="text-3xl text-center mb-6">Alfabet Gebaren</h1>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {alphabetSigns.map(sign => (
                    <Letters key={sign.id} sign={sign}/>
                ))}
            </ul>

        </div>
    );
}

export default Alfabet