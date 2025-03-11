import { useState, useEffect } from 'react';

function Woordenboek() {
    const [signs, setSigns] = useState([]);
    const [filteredSigns, setFilteredSigns] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state voor de gebruiker
    const [error, setError] = useState(null);  // Error state voor eventuele problemen

    // Haal gebaren op van de server
    useEffect(() => {
        async function fetchSigns() {
            try {
                // De fetch-logica is nu uitgecommentarieerd.
                /*
                const response = await fetch('http://145.24.223.196:8008/signs', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer 95937790-3a9d-4ee2-9ed6-ace5165167f2',  // Voeg hier je API-sleutel toe
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setSigns(data);  // Update de signs state met de opgehaalde data
                setFilteredSigns(data);  // Standaard ook alle gebaren gefilterd weergeven
                setLoading(false);  // Zet de loading state op false nadat de data geladen is
                */

                // Hardcoded gebaren voor nu
                const hardcodedSigns = [
                    { id: 1, definition: "Hallo", lesson: 1, theme: "Begroetingen", video_path: "/videos/hallo.mp4" },
                    { id: 2, definition: "Dankjewel", lesson: 1, theme: "Beleefdheid", video_path: "/videos/dankjewel.mp4" },
                    { id: 3, definition: "Sorry", lesson: 2, theme: "Beleefdheid", video_path: "/videos/sorry.mp4" },
                    { id: 4, definition: "Ja", lesson: 2, theme: "Basisantwoorden", video_path: "/videos/ja.mp4" },
                    { id: 5, definition: "Nee", lesson: 2, theme: "Basisantwoorden", video_path: "/videos/nee.mp4" },
                    { id: 6, definition: "A", lesson: 3, theme: "Alfabet", video_path: "/videos/A.mp4" },
                    { id: 7, definition: "B", lesson: 3, theme: "Alfabet", video_path: "/videos/B.mp4" },
                    { id: 8, definition: "C", lesson: 3, theme: "Alfabet", video_path: "/videos/C.mp4" },
                    { id: 9, definition: "D", lesson: 3, theme: "Alfabet", video_path: "/videos/D.mp4" },
                    { id: 10, definition: "E", lesson: 3, theme: "Alfabet", video_path: "/videos/E.mp4" },
                ];

                setSigns(hardcodedSigns);  // Zet de hardcoded gebaren in de state
                setFilteredSigns(hardcodedSigns);  // Zet de hardcoded gebaren ook als gefilterde lijst
                setLoading(false);  // Zet loading op false zodra de data is ingesteld
            } catch (error) {
                setError(error);  // Sla de fout op bij een netwerk- of andere fout
                setLoading(false);
            }
        }

        fetchSigns();  // Haal de gebaren op
    }, []);

    // Filter de gebaren op basis van thema of lesnummer
    // const handleFilter = (filter) => {
    //     const filtered = signs.filter((sign) => {
    //         return (
    //             (filter.theme ? sign.theme.toLowerCase().includes(filter.theme.toLowerCase()) : true) &&
    //             (filter.lesson ? sign.lesson === filter.lesson : true)
    //         );
    //     });
    //     setFilteredSigns(filtered);  // Update de filteredSigns state met de gefilterde data
    // };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Gebaren Woordenboek</h1>

            {/* Filter component (je zou dit later kunnen maken voor filters) */}
            {/* <PlayerFilter onFilter={handleFilter} /> */}

            {/* Weergeven van gebaren in een grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p className="text-center text-gray-600">Gebaren laden...</p>
                ) : error ? (
                    <p className="text-center text-red-600">Er is een fout opgetreden bij het laden van de gebaren.</p>
                ) : filteredSigns.length > 0 ? (
                    filteredSigns.map((sign) => (
                        <div key={sign.id} className="bg-white p-4 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-500">
                            <h3 className="text-lg font-semibold mb-2">{sign.definition}</h3>
                            {sign.video_path && sign.video_path.match(/\.(mp4|webm|ogg)$/i) ? (
                                <video width="200" controls className="mx-auto">
                                    <source src={sign.video_path} type="video/mp4"/>
                                    Je browser ondersteunt geen video-element.
                                </video>
                            ) : (
                                <img src={sign.video_path} alt={sign.definition} width="200" className="mx-auto"/>
                            )}
                            <div className="mt-2">
                                <h4 className="text-sm text-gray-500">{sign.theme}</h4>
                                <span className="text-sm text-gray-400">Les {sign.lesson}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">Geen gebaren gevonden...</p>
                )}
            </div>
        </div>
    );
}

export default Woordenboek;
