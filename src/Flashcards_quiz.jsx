import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import avatar from "./assets/images/blue avatar sitting.png"

function Flashcards_quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [goodAnswers, setGoodAnswers] = useState(0);
    const [badAnswers, setBadAnswers] = useState(0);
    const [started, setStarted] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedSigns, setSelectedSigns] = useState([]);
    const { jwt } = useAuth();

    const [signs, setSigns] = useState([]);

    useEffect(() => {
        async function fetchSigns() {
            try {
                const response = await fetch('http://145.24.223.196:8008/v2/signs/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'x-api-key': '95937790-3a9d-4ee2-9ed6-ace5165167f2',
                        'Authorization': 'Bearer ' + jwt,
                    },
                });

                const questions = await response.json();
                setSigns(questions);
            } catch (error) {
                console.error('Error fetching signs:', error);
            }
        }

        fetchSigns();
    }, [jwt]);

    function startQuiz() {
        const shuffled = signs.sort(() => 0.5 - Math.random());
        setSelectedSigns(shuffled.slice(0, 10));
        setGoodAnswers(0);
        setBadAnswers(0);
        setStarted(true);
        setQuizCompleted(false);
        setCurrentQuestionIndex(0);
    }

    function handleAnswer(isCorrect) {
        if (isCorrect) {
            setGoodAnswers((prev) => prev + 1);
        } else {
            setBadAnswers((prev) => prev + 1);
        }

        if (currentQuestionIndex + 1 === selectedSigns.length) {
            setQuizCompleted(true);
            setStarted(false);
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
            setFlipped(false);
        }
    }

    if (quizCompleted) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">Quiz Result</h1>
                <p className="text-xl mt-4">Correct Answers: {goodAnswers}</p>
                <p className="text-xl mt-2">Incorrect Answers: {badAnswers}</p>
                <button
                    onClick={() => (window.location.href = '/flashcards')}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
                >
                    Back to Flashcards
                </button>
            </div>
        );
    }

    return (
        <>
            {!started ? (
                <div id="canvas" className="flex flex-col items-center justify-center h-screen">
                    <button
                        onClick={startQuiz}
                        id="startButton"
                        className="bg-blue8 hover:bg-blue6 text-white font-bold py-8 px-16 rounded-lg shadow-lg transition duration-300 ease-in-out"
                    >
                        Start Quiz
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100">
                    <div className="w-[70vw] flex items-start pl-[1vw] text-blueLetter">
                        <h1 className="font-Slickybohem text-[8.5vw] leading-none tracking-wide">FLASHCARDS</h1>
                    </div>

                    <div
                        className="bg-blueHome border-2 rounded-t-2xl w-[70vw] border-black pl-4 pt-1 flex justify-between h-[7vw]">
                        <div className="flex flex-col items-start justify-center h-[7vw]">
                            <h1 className="text-4xl font-bold mb-4">
                                Opdracht {currentQuestionIndex + 1} / {selectedSigns.length}
                            </h1>
                        </div>
                        <img src={avatar} className="h-[17vw] w-auto mt-[-11vw] z-50"/>
                    </div>

                    <div
                        className="w-[70vw] h-auto flex items-center justify-center bg-white border-2 rounded-b-2xl border-black mb-[3vw]">
                        <button
                            onClick={() => handleAnswer(false)}
                            className="w-20 h-20 p-5 bg-red-600 text-white text-3xl font-bold rounded-full shadow-md hover:bg-red-700 transition"
                        >
                            ✗
                        </button>

                        <div className="relative w-[800px] h-[500px] mx-6 perspective">
                            <div
                                className={`w-full h-full relative transition-transform duration-500 transform-style preserve-3d ${
                                    flipped ? 'rotate-y-180' : ''
                                }`}
                            >
                                <div
                                    className="absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center text-center text-xl font-semibold backface-hidden">
                                    <h2 className="font-bold text-3xl mb-16">{selectedSigns[currentQuestionIndex]?.definition}</h2>
                                </div>

                                <div
                                    className="absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center backface-hidden rotate-y-180">
                                    <video
                                        key={currentQuestionIndex}
                                        controls
                                        className="w-full h-full rounded-lg"
                                    >
                                        <source
                                            src={selectedSigns[currentQuestionIndex]?.video_path}
                                            type="video/mp4"
                                        />
                                        Your browser does not support this video.
                                    </video>
                                </div>
                            </div>

                            <button
                                onClick={() => setFlipped(!flipped)}
                                className="mt-4 bg-blue3 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue8 transition w-full"
                            >
                                Flip Card
                            </button>
                        </div>

                        <button
                            onClick={() => handleAnswer(true)}
                            className="w-20 h-20 bg-green-500 text-3xl text-white font-bold rounded-full shadow-md hover:bg-green-600 transition"
                        >
                            ✓
                        </button>
                    </div>

                </div>
            )}
        </>
    );
}

export default Flashcards_quiz;
