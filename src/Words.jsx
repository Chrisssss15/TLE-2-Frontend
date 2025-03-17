import { useState, useEffect } from 'react';

function Woordenboek() {
    const [signs, setSigns] = useState([]);
    const [filteredSigns, setFilteredSigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        theme: '',
        lesson: '',  // Added lesson filter
        searchQuery: ''
    });
    const [themes, setThemes] = useState([]);
    const [lessons, setLessons] = useState([]);  // New state for unique lessons

    // Haal gebaren op van de server
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://145.24.223.196:8008/v1/signs/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'x-api-key': '95937790-3a9d-4ee2-9ed6-ace5165167f2',
                    },
                });

                const data = await response.json();
                console.log("API Response:", data);

                if (Array.isArray(data)) {
                    // Haal het video_path op per gebaar
                    const updatedSigns = await Promise.all(
                        data.map(async (sign) => {
                            const videoResponse = await fetch(`http://145.24.223.196:8008/v1/signs/${sign.id}`, {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'x-api-key': '95937790-3a9d-4ee2-9ed6-ace5165167f2',
                                },
                            });

                            const videoData = await videoResponse.json();
                            console.log(videoData.video_path)
                            return { ...sign, video_path: videoData.video_path };
                        })
                    );

                    setSigns(updatedSigns);  // Zet de bijgewerkte lijst in de state
                    setFilteredSigns(updatedSigns);  // Filter de lijst op basis van de bijgewerkte data

                    // Haal unieke thema's uit de gebaren en zet ze in de thema state
                    const uniqueThemes = [...new Set(updatedSigns.map(sign => sign.theme))];
                    setThemes(uniqueThemes);

                    // Haal unieke lessen uit de gebaren en zet ze in de lessen state
                    const uniqueLessons = [...new Set(updatedSigns.map(sign => sign.lesson))];
                    setLessons(uniqueLessons);
                } else {
                    console.error("Unexpected API response structure:", data);
                    setSigns([]);
                    setFilteredSigns([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Filter de gebaren op basis van thema, lesnummer of zoekopdracht
    const handleFilter = () => {
        const filtered = signs.filter((sign) => (
            (filter.theme ? sign.theme.toLowerCase().includes(filter.theme.toLowerCase()) : true) &&
            (filter.lesson ? sign.lesson === Number(filter.lesson) : true) &&  // Convert to number
            (filter.searchQuery ? sign.definition.toLowerCase().includes(filter.searchQuery.toLowerCase()) : true)
        ));
        setFilteredSigns(filtered);
    };


    // Handle change in filter values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value
        }));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Gebaren Woordenboek</h1>

            {/* Filter component */}
            <div className="mb-4 flex items-center space-x-4">
                {/* Theme Dropdown */}
                <select
                    name="theme"
                    value={filter.theme}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Selecteer Thema</option>
                    {themes.map((theme, index) => (
                        <option key={index} value={theme}>{theme}</option>
                    ))}
                </select>

                {/* Lesson Dropdown */}
                <select
                    name="lesson"
                    value={filter.lesson}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Selecteer Les</option>
                    {lessons.map((lesson, index) => (
                        <option key={index} value={lesson}>{`Les ${lesson}`}</option>
                    ))}
                </select>

                {/* Search Bar */}
                <input
                    type="text"
                    name="searchQuery"
                    value={filter.searchQuery}
                    onChange={handleChange}
                    placeholder="Zoek op definitie"
                    className="border p-2 rounded"
                />

                {/* Filter Button */}
                <button
                    onClick={handleFilter}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Filter
                </button>
            </div>

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
