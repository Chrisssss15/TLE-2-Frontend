import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs";
import { useAIModel } from "./hooks/useAIModel";
import kNear from "./utils/kNear.js";
import { useNavigate } from "react-router-dom";
import avatar from "./assets/images/yellow avatar sitting.png";

const motionLetters = ["z", "x", "h", "j", "u"]; // Lowercase for comparison

const initialStatusesForWord = (word) => {
    return word.split("").map((letter, index) => ({
        letter,
        status: index === 0 ? "active" : "inactive",
    }));
};

const SpellingQuiz = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const { models, loading } = useAIModel(); // models contains staticModel and motionModel
    const [prediction, setPrediction] = useState(null);
    const navigate = useNavigate();

    const spellingLes1 = [
        {
            theme: "VRAAGWOORDEN",
            words: [
                "ALGEMEENVRAAGGEBAAR",
                "HOE",
                "HOELANG",
                "HOEVEEL",
                "WAAROM",
                "WANNEER",
                "WAT",
                "WELKE",
                "WIE",
                "WAAR",
            ],
        },
        {
            theme: "TIJDENS DE LES",
            words: [
                "AANWEZIG",
                "BEDOELING",
                "BEGINNEN",
                "BOEK",
                "DOCENT",
                "STUDENT",
                "HUISWERK",
                "KLAAR",
                "KOFFIE",
                "LES",
                "LOKAAL",
                "MAKKELIJK",
                "MEENEMEN",
                "MOEILIJK",
                "NU",
                "OEFENING",
                "OOK",
                "OPDRACHT",
                "PAUZE",
                "THEE",
                "THUIS",
                "UITLEGGEN",
                "VOLGENDE",
                "VOORBEELD",
                "VOORBEREIDEN",
                "VORIGE",
                "WC",
            ],
        },
        {
            theme: "KENNISMAKEN",
            words: ["ACHTERNAAM", "VOORNAAM", "NAAM", "VOORSTELLEN", "WELKOM"],
        },
        {
            theme: "BEGROETINGEN",
            words: [
                "GAAT HET GOED",
                "GOED",
                "HALLO",
                "OKE",
                "PRIMA",
                "TOT ZIENS",
                "GOEDEMORGEN",
                "GOEDEMIDDAG",
                "GOEDEAVOND",
            ],
        },
    ];

    const [selectedTheme, setSelectedTheme] = useState(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [letterStatuses, setLetterStatuses] = useState([]);

    const handleThemeSelection = (theme) => {
        setSelectedTheme(theme);
        setLetterStatuses(initialStatusesForWord(theme.words[0]));
    };

    const handleNextWord = () => {
        const nextIndex = currentWordIndex + 1;
        if (nextIndex < selectedTheme.words.length) {
            setCurrentWordIndex(nextIndex);
            setLetterStatuses(initialStatusesForWord(selectedTheme.words[nextIndex]));
        }
    };

    useEffect(() => {
        if (!loading && models.staticModel && models.motionModel) {
            const runHandpose = async () => {
                const net = await handpose.load();
                // Create separate kNear instances
                const staticKNN = new kNear(3);
                const motionKNN = new kNear(3);

                // Learn with static model data
                models.staticModel.training.forEach((data) => {
                    staticKNN.learn(data.v, data.lab);
                });
                // Learn with motion model data
                models.motionModel.training.forEach((data) => {
                    motionKNN.learn(data.v, data.lab);
                });

                // Periodically capture frames and classify the hand gesture
                const captureFrame = async () => {
                    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
                        const video = webcamRef.current.video;
                        const predictions = await net.estimateHands(video);
                        if (predictions.length > 0) {
                            const handFeatures = extractHandFeatures(predictions[0]);

                            // Determine the active letter from letterStatuses
                            const activeLetterObj = letterStatuses.find((item) => item.status === "active");
                            if (!activeLetterObj) return;
                            const activeLetter = activeLetterObj.letter.toLowerCase();

                            // Use motion model for specific letters, static model otherwise
                            let predictedSign = "";
                            if (motionLetters.includes(activeLetter)) {
                                predictedSign = motionKNN.classify(handFeatures);
                            } else {
                                predictedSign = staticKNN.classify(handFeatures);
                            }
                            console.log("Predicted sign:", predictedSign);

                            setPrediction(predictedSign.toUpperCase());

                            // Update letterStatuses if prediction matches active letter
                            setLetterStatuses((prevStatuses) => {
                                const activeIndex = prevStatuses.findIndex((item) => item.status === "active");
                                if (activeIndex === -1) return prevStatuses;
                                const currentLetter = prevStatuses[activeIndex].letter.toLowerCase();
                                if (predictedSign.toLowerCase() === currentLetter) {
                                    return prevStatuses.map((item, idx) => {
                                        if (idx === activeIndex) {
                                            return { ...item, status: "correct" };
                                        } else if (idx === activeIndex + 1) {
                                            return { ...item, status: "active" };
                                        }
                                        return item;
                                    });
                                }
                                return prevStatuses;
                            });
                        }
                    }
                };

                const intervalId = setInterval(captureFrame, 500);
                return () => clearInterval(intervalId);
            };

            runHandpose();
        }
    }, [models, loading, letterStatuses]);

    const extractHandFeatures = (handPrediction) => {
        return scaleHandpose(handPrediction.landmarks);
    };

    function scaleHandpose(landmarks) {
        const wrist = landmarks[0];
        const indexFingerTip = landmarks[8];
        const handSize = Math.sqrt(
            Math.pow(indexFingerTip[0] - wrist[0], 2) +
            Math.pow(indexFingerTip[1] - wrist[1], 2) +
            Math.pow(indexFingerTip[2] - wrist[2], 2)
        );
        return landmarks
            .map((point) => [
                (point[0] - wrist[0]) / handSize,
                (point[1] - wrist[1]) / handSize,
                (point[2] - wrist[2]) / handSize,
            ])
            .flat();
    }

    const handleBackToSpelling = () => {
        navigate("/spelling");
    };

    if (!selectedTheme) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
                <h2 className="text-3xl font-bold mb-6">Kies een Thema</h2>
                <div className="grid grid-cols-2 gap-4">
                    {spellingLes1.map((theme, index) => (
                        <button
                            key={index}
                            onClick={() => handleThemeSelection(theme)}
                            className="bg-yellow8 hover:yellow7 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
                        >
                            {theme.theme}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
            <div className="w-[70vw] flex items-start pl-[1vw] text-yellowLetter">
                <h1 className="font-Slickybohem text-[8.5vw] leading-none tracking-wide">Spelling</h1>
            </div>
            <div className="bg-yellowHome border-2 rounded-t-2xl w-[70vw] border-black p-4 flex justify-between">
                <div className="flex flex-col items-start justify-center h-[8vw]">
                    <h1 className="text-4xl font-bold mb-4">
                        Opdracht {currentWordIndex + 1} / {selectedTheme.words.length}
                    </h1>
                    <h2 className="text-3xl font-bold mb-6">Oefen Thema: {selectedTheme.theme}</h2>
                </div>
                <img src={avatar} className="h-[17vw] w-auto mt-[-11.5vw]" />
            </div>
            <div className="bg-white border-2 rounded-b-2xl w-[70vw] border-black">
                <div className="flex flex-row items-center gap-24">
                    <div className="relative p-3">
                        <Webcam ref={webcamRef} className="w-[640px] h-[480px] rounded-lg shadow-lg" />
                        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
                    </div>
                    <div className="text-left self-center">
                        <h3 className="text-3xl font-semibold">Spel: {selectedTheme.words[currentWordIndex]}</h3>
                        <div className="mt-4 text-4xl space-x-3">
                            {letterStatuses.map((item, index) => {
                                let colorClass = "text-black";
                                if (item.status === "correct") colorClass = "text-green-500";
                                else if (item.status === "active") colorClass = "text-blue-500";
                                return (
                                    <span key={index} className={`${colorClass} font-bold`}>
                    {item.letter}
                  </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-2xl">
                    {prediction && <p>Prediction: {prediction}</p>}
                </div>
                {letterStatuses.every((item) => item.status === "correct") && (
                    <>
                        {currentWordIndex < selectedTheme.words.length - 1 ? (
                            <button
                                onClick={handleNextWord}
                                className="mt-6 px-6 py-3 bg-yellow8 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
                            >
                                Volgend Woord
                            </button>
                        ) : (
                            <div className="mt-6">
                                <p className="text-xl font-semibold text-green-600">
                                    Gefeliciteerd! Je hebt alle woorden voltooid!
                                </p>
                                <button
                                    onClick={() => handleBackToSpelling(null)}
                                    className="mt-4 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition"
                                >
                                    Terug naar Spelling
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SpellingQuiz;