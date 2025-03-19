import React, { useState, useEffect } from 'react';
import { useAuth } from "./AuthContext.jsx";

function Words() {
    const [signs, setSigns] = useState([]);
    const [filteredSigns, setFilteredSigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        theme: '',
        lesson: '',
        searchQuery: ''
    });
    const [themes, setThemes] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSign, setSelectedSign] = useState(null);
    const { jwt } = useAuth();

    // Fetch data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://145.24.223.196:8008/v1/signs/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'x-api-key': '95937790-3a9d-4ee2-9ed6-ace5165167f2',
                        'Authorization': 'Bearer ' + jwt,
                    },
                });

                const data = await response.json();
                if (Array.isArray(data)) {
                    setSigns(data);
                    setFilteredSigns(data);
                    setThemes([...new Set(data.map(sign => sign.theme))]);
                    setLessons([...new Set(data.map(sign => sign.lesson))]);
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
    }, [jwt]);

    // Filter signs based on theme, lesson, or search query
    useEffect(() => {
        const filtered = signs.filter(sign =>
            (filter.theme ? sign.theme.toLowerCase().includes(filter.theme.toLowerCase()) : true) &&
            (filter.lesson ? sign.lesson === Number(filter.lesson) : true) &&
            (filter.searchQuery ? sign.definition.toLowerCase().includes(filter.searchQuery.toLowerCase()) : true)
        );
        setFilteredSigns(filtered);
    }, [filter, signs]);

    // Handle change in filter values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value
        }));
    };

    // Open modal for the selected sign
    const openModal = (sign) => {
        setSelectedSign(sign);
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedSign(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-6">

            {/* Header */}
            <div className="w-[70vw] pl-[1vw] text-[#01711D] text-center mb-8">
                <h1 className="font-Slickybohem text-[8.5vw] leading-none tracking-wide text-shadow-xl">Gebaren Woordenboek</h1>
            </div>

            {/* Filter component */}
            <div className="mb-6 w-full flex flex-col md:flex-row justify-center items-center gap-4">
                <select
                    name="theme"
                    value={filter.theme}
                    onChange={handleChange}
                    className="border-2 border-green-500 p-3 rounded-lg text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out duration-200"
                >
                    <option value="">Selecteer Thema</option>
                    {themes.map((theme, index) => (
                        <option key={index} value={theme}>{theme}</option>
                    ))}
                </select>

                <select
                    name="lesson"
                    value={filter.lesson}
                    onChange={handleChange}
                    className="border-2 border-green-500 p-3 rounded-lg text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out duration-200"
                >
                    <option value="">Selecteer Les</option>
                    {lessons.map((lesson, index) => (
                        <option key={index} value={lesson}>{`Les ${lesson}`}</option>
                    ))}
                </select>

                <input
                    type="text"
                    name="searchQuery"
                    value={filter.searchQuery}
                    onChange={handleChange}
                    placeholder="Zoek op definitie"
                    className="border-2 border-green-500 p-3 rounded-lg text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out duration-200"
                />
            </div>

            {/* Display signs in a grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {loading ? (
                    <p className="text-center text-gray-600">Gebaren laden...</p>
                ) : error ? (
                    <p className="text-center text-red-600">Er is een fout opgetreden bij het laden van de gebaren.</p>
                ) : filteredSigns.length > 0 ? (
                    filteredSigns.map((sign) => (
                        <div
                            key={sign.id}
                            className="bg-greenHome flex-1 hover:-translate-y-1 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer"
                            onClick={() => openModal(sign)}
                        >
                            <h3 className="bg-greenHome border-4 border-black shadow-xl rounded-[7.8rem] flex-1 text-xl font-semibold text-black mb-4">{sign.definition}</h3>
                            {sign.video_path && sign.video_path.match(/\.(mp4|webm|ogg)$/i) ? (
                                <video width="200" controls className="mx-auto rounded-lg shadow-lg">
                                    <source src={sign.video_path} type="video/mp4"/>
                                    Je browser ondersteunt geen video-element.
                                </video>
                            ) : (
                                <img src={sign.video_path} alt={sign.definition} width="200" className="mx-auto rounded-lg shadow-lg"/>
                            )}
                            <div className="mt-4">
                                <h4 className="text-sm text-gray-600">Thema: {sign.theme}</h4>
                                <span className="text-sm text-gray-500">Les: {sign.lesson}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">Geen gebaren gevonden...</p>
                )}
            </div>

            {/* Modal for showing the selected sign */}
            {showModal && selectedSign && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
                        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">{selectedSign.definition}</h2>
                        {selectedSign.video_path && selectedSign.video_path.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video width="100%" controls autoPlay className="rounded-lg">
                                <source src={selectedSign.video_path} type="video/mp4"/>
                                Je browser ondersteunt geen video-element.
                            </video>
                        ) : (
                            <img src={selectedSign.video_path} alt={selectedSign.definition}
                                 className="mx-auto rounded-lg shadow-lg"/>
                        )}
                        <div className="mt-6 text-center">
                            <button
                                onClick={closeModal}
                                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                            >
                                Sluiten
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Words;
