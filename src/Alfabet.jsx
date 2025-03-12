import Letters from "./Letters.jsx";
import {useEffect, useState} from "react";


function Alfabet(){

    const [signs, setSigns] = useState([]);

    useEffect(() => {
        async function fetchSigns() {
            try {
                const response = await fetch('http://145.24.223.169:8008/v1/signs/', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });

                const data = await response.json();
                console.log(data);
                setSigns(data.items);
            } catch (error) {
                console.error('Error fetching signs:', error);
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