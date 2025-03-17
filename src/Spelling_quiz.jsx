// import React, { useEffect, useState, useRef } from "react";
// import Webcam from "react-webcam";
// import * as handpose from "@tensorflow-models/handpose";
// import "@tensorflow/tfjs";
// import { useAIModel } from "./hooks/useAIModel";
// import kNear from "./utils/kNear.js";
//
// const SpellingQuiz = () => {
//     const webcamRef = useRef(null);
//     const canvasRef = useRef(null);
//     const { model, loading } = useAIModel();
//     const [prediction, setPrediction] = useState(null);
//
//     useEffect(() => {
//         if (!loading && model) {
//             const runHandpose = async () => {
//                 const net = await handpose.load();
//                 let knn = new kNear(3);
//
//                 // Load trained model data into KNN
//                 for (let handData of model.staticModel.training) {
//                     knn.learn(handData.v, handData.lab);
//                 }
//
//                 setInterval(async () => {
//                     if (
//                         webcamRef.current &&
//                         webcamRef.current.video.readyState === 4
//                     ) {
//                         const video = webcamRef.current.video;
//                         const predictions = await net.estimateHands(video);
//
//                         if (predictions.length > 0) {
//                             const handFeatures = extractHandFeatures(predictions[0]);
//                             const predictedSign = knn.classify(handFeatures);
//                             setPrediction(predictedSign);
//                         }
//                     }
//                 }, 500); // Runs every 500ms
//             };
//
//             runHandpose();
//         }
//     }, [model, loading]);
//
//     // Apply the same scaling function used in training
//     const extractHandFeatures = (handPrediction) => {
//         return scaleHandpose(handPrediction.landmarks);
//     };
//
//     function scaleHandpose(landmarks) {
//         const wrist = landmarks[0];
//         const indexFingerTip = landmarks[8]; // Stable reference point
//
//         const handSize = Math.sqrt(
//             Math.pow(indexFingerTip[0] - wrist[0], 2) +
//             Math.pow(indexFingerTip[1] - wrist[1], 2) +
//             Math.pow(indexFingerTip[2] - wrist[2], 2)
//         );
//
//         return landmarks.map(point => [
//             (point[0] - wrist[0]) / handSize,
//             (point[1] - wrist[1]) / handSize,
//             (point[2] - wrist[2]) / handSize
//         ]).flat();
//     }
//
//     return (
//         <div style={{ textAlign: "center" }}>
//             <h2>Sign Recognition</h2>
//             <Webcam ref={webcamRef} style={{ width: 640, height: 480 }} />
//             <canvas ref={canvasRef} style={{ position: "absolute" }} />
//             <h3>Predicted Sign: {prediction || "Waiting for input..."}</h3>
//         </div>
//     );
// };
//
// export default SpellingQuiz;







// import React, { useEffect, useState, useRef } from "react";
// import Webcam from "react-webcam";
// import * as handpose from "@tensorflow-models/handpose";
// import "@tensorflow/tfjs";
// import { useAIModel } from "./hooks/useAIModel";
// import kNear from "./utils/kNear.js";
//
// const SpellingQuiz = () => {
//     const webcamRef = useRef(null);
//     const canvasRef = useRef(null);
//     const { model, loading } = useAIModel();
//     const [prediction, setPrediction] = useState(null);
//
//     const [questions, setQuestions] = useState([
//         {
//             id: 1,
//             title: 'wie',
//             letters: ["w", "i", "e"],
//         },
//         {
//             id: 2,
//             title: 'hoe',
//             letters: ["h", "o", "e"],
//         },
//         {
//             id: 3,
//             title: 'alfabet',
//             letter: ["a", "b", "c", "d", "e", "f", "g", "i", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "v", "w", "y"]
//         }
//     ])
//
//     // Initialize each letter as an object with a status.
//     // Only the first letter is active at the start.
//     const [letterStatuses, setLetterStatuses] = useState([
//         { letter: "w", status: "active" },
//         { letter: "i", status: "inactive" },
//         { letter: "e", status: "inactive" },
//     ]);
//
//     useEffect(() => {
//         if (!loading && model) {
//             const runHandpose = async () => {
//                 const net = await handpose.load();
//                 let knn = new kNear(3);
//
//                 // Load trained model data into KNN
//                 for (let handData of model.staticModel.training) {
//                     knn.learn(handData.v, handData.lab);
//                 }
//
//                 setInterval(async () => {
//                     if (
//                         webcamRef.current &&
//                         webcamRef.current.video.readyState === 4
//                     ) {
//                         const video = webcamRef.current.video;
//                         const predictions = await net.estimateHands(video);
//
//                         if (predictions.length > 0) {
//                             const handFeatures = extractHandFeatures(predictions[0]);
//                             const predictedSign = knn.classify(handFeatures);
//                             setPrediction(predictedSign);
//
//                             // Update the letter statuses based on the predicted sign.
//                             setLetterStatuses((prevStatuses) => {
//                                 // Find the active letter index
//                                 const activeIndex = prevStatuses.findIndex(
//                                     (item) => item.status === "active"
//                                 );
//                                 if (activeIndex === -1) return prevStatuses;
//
//                                 // Check if the predicted letter matches the active letter.
//                                 if (
//                                     predictedSign.toLowerCase() ===
//                                     prevStatuses[activeIndex].letter
//                                 ) {
//                                     const newStatuses = prevStatuses.map((item, idx) => {
//                                         if (idx === activeIndex) {
//                                             // Mark the current active letter as correct.
//                                             return { ...item, status: "correct" };
//                                         } else if (idx === activeIndex + 1) {
//                                             // Make the next letter active.
//                                             return { ...item, status: "active" };
//                                         }
//                                         return item;
//                                     });
//                                     return newStatuses;
//                                 }
//                                 return prevStatuses;
//                             });
//                         }
//                     }
//                 }, 500); // Check every 500ms
//             };
//
//             runHandpose();
//         }
//     }, [model, loading]);
//
//     // Extract features using the same scaling function as during training.
//     const extractHandFeatures = (handPrediction) => {
//         return scaleHandpose(handPrediction.landmarks);
//     };
//
//     function scaleHandpose(landmarks) {
//         const wrist = landmarks[0];
//         const indexFingerTip = landmarks[8]; // Use this as a reference
//         const handSize = Math.sqrt(
//             Math.pow(indexFingerTip[0] - wrist[0], 2) +
//             Math.pow(indexFingerTip[1] - wrist[1], 2) +
//             Math.pow(indexFingerTip[2] - wrist[2], 2)
//         );
//
//         return landmarks
//             .map((point) => [
//                 (point[0] - wrist[0]) / handSize,
//                 (point[1] - wrist[1]) / handSize,
//                 (point[2] - wrist[2]) / handSize,
//             ])
//             .flat();
//     }
//
//     return (
//         <div style={{ textAlign: "center", position: "relative" }}>
//             <h2>Sign Recognition</h2>
//             <Webcam ref={webcamRef} style={{ width: 640, height: 480 }} />
//             <canvas ref={canvasRef} style={{ position: "absolute" }} />
//             <div style={{ margin: "20px", fontSize: "2rem" }}>
//                 {letterStatuses.map((item, index) => {
//                     // Set color based on status: correct (green), active (blue), inactive (black)
//                     let color = "black";
//                     if (item.status === "correct") color = "green";
//                     else if (item.status === "active") color = "blue";
//
//                     return (
//                         <span key={index} style={{ color, marginRight: "10px" }}>
//               {item.letter}
//             </span>
//                     );
//                 })}
//             </div>
//             {letterStatuses.every((item) => item.status === "correct") && (
//                 <h3>Word spelled correctly!</h3>
//             )}
//             <h3>Predicted Sign: {prediction || "Waiting for input..."}</h3>
//         </div>
//     );
// };
//
// export default SpellingQuiz;







// import React, { useEffect, useState, useRef } from "react";
// import Webcam from "react-webcam";
// import * as handpose from "@tensorflow-models/handpose";
// import "@tensorflow/tfjs";
// import { useAIModel } from "./hooks/useAIModel";
// import kNear from "./utils/kNear.js";
//
// // Helper to initialize letter statuses for a given question.
// // Only the first letter is marked as "active"; the rest are "inactive".
// const initialStatusesForQuestion = (question) => {
//     return question.letters.map((letter, index) => ({
//         letter,
//         status: index === 0 ? "active" : "inactive",
//     }));
// };
//
// const SpellingQuiz = () => {
//     const webcamRef = useRef(null);
//     const canvasRef = useRef(null);
//     const { model, loading } = useAIModel();
//     const [prediction, setPrediction] = useState(null);
//
//     // Questions array; note the third object now uses the key "letters" for consistency.
//     const [questions] = useState([
//         {
//             id: 1,
//             title: "wie",
//             letters: ["w", "i", "e"],
//         },
//         {
//             id: 2,
//             title: "hoe",
//             letters: ["v", "o", "s"],
//         },
//         {
//             id: 3,
//             title: "alfabet",
//             letters: [
//                 "a",
//                 "b",
//                 "c",
//                 "d",
//                 "e",
//                 "f",
//                 "g",
//                 "i",
//                 "k",
//                 "l",
//                 "m",
//                 "n",
//                 "o",
//                 "p",
//                 "q",
//                 "r",
//                 "s",
//                 "t",
//                 "v",
//                 "w",
//                 "y",
//             ],
//         },
//     ]);
//
//     // Track which question we're on.
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     // Initialize letter statuses based on the current question.
//     const [letterStatuses, setLetterStatuses] = useState(
//         initialStatusesForQuestion(questions[currentQuestionIndex])
//     );
//
//     // Function to advance to the next question.
//     const handleNextQuestion = () => {
//         const nextIndex = currentQuestionIndex + 1;
//         if (nextIndex < questions.length) {
//             setCurrentQuestionIndex(nextIndex);
//             setLetterStatuses(initialStatusesForQuestion(questions[nextIndex]));
//         }
//     };
//
//     useEffect(() => {
//         if (!loading && model) {
//             const runHandpose = async () => {
//                 const net = await handpose.load();
//                 let knn = new kNear(3);
//
//                 // Load trained model data into KNN
//                 for (let handData of model.staticModel.training) {
//                     knn.learn(handData.v, handData.lab);
//                 }
//
//                 setInterval(async () => {
//                     if (
//                         webcamRef.current &&
//                         webcamRef.current.video.readyState === 4
//                     ) {
//                         const video = webcamRef.current.video;
//                         const predictions = await net.estimateHands(video);
//
//                         if (predictions.length > 0) {
//                             const handFeatures = extractHandFeatures(predictions[0]);
//                             const predictedSign = knn.classify(handFeatures);
//                             setPrediction(predictedSign);
//
//                             // Only update if the current question isn't already completed.
//                             if (!letterStatuses.every((item) => item.status === "correct")) {
//                                 setLetterStatuses((prevStatuses) => {
//                                     // Find the active letter index
//                                     const activeIndex = prevStatuses.findIndex(
//                                         (item) => item.status === "active"
//                                     );
//                                     if (activeIndex === -1) return prevStatuses;
//
//                                     // Check if the predicted letter matches the active letter.
//                                     if (
//                                         predictedSign.toLowerCase() ===
//                                         prevStatuses[activeIndex].letter
//                                     ) {
//                                         return prevStatuses.map((item, idx) => {
//                                             if (idx === activeIndex) {
//                                                 return { ...item, status: "correct" };
//                                             } else if (idx === activeIndex + 1) {
//                                                 return { ...item, status: "active" };
//                                             }
//                                             return item;
//                                         });
//                                     }
//                                     return prevStatuses;
//                                 });
//                             }
//                         }
//                     }
//                 }, 500); // Check every 500ms
//             };
//
//             runHandpose();
//         }
//     }, [model, loading, letterStatuses]);
//
//     // Extract features using the same scaling function as during training.
//     const extractHandFeatures = (handPrediction) => {
//         return scaleHandpose(handPrediction.landmarks);
//     };
//
//     function scaleHandpose(landmarks) {
//         const wrist = landmarks[0];
//         const indexFingerTip = landmarks[8]; // Use this as a reference
//         const handSize = Math.sqrt(
//             Math.pow(indexFingerTip[0] - wrist[0], 2) +
//             Math.pow(indexFingerTip[1] - wrist[1], 2) +
//             Math.pow(indexFingerTip[2] - wrist[2], 2)
//         );
//
//         return landmarks
//             .map((point) => [
//                 (point[0] - wrist[0]) / handSize,
//                 (point[1] - wrist[1]) / handSize,
//                 (point[2] - wrist[2]) / handSize,
//             ])
//             .flat();
//     }
//
//     // Get the current question object.
//     const currentQuestion = questions[currentQuestionIndex];
//
//     return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
//                 {/* Titel */}
//                 <h2 className="text-3xl font-bold text-gray-900 mb-6">Gebarenherkenning</h2>
//
//                 {/* Flex container voor Webcam/Canvas en Vraag+Letters */}
//                 <div className="flex flex-row items-center gap-24">
//                     {/* Webcam en Canvas */}
//                     <div className="relative">
//                         <Webcam ref={webcamRef} className="w-[640px] h-[480px] rounded-lg shadow-lg" />
//                         <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
//                     </div>
//
//                     {/* Vraag en Letters */}
//                     <div className="text-left self-center">
//                         <h3 className="text-3xl font-semibold text-gray-800">Spell: {currentQuestion.title}</h3>
//                         <div className="mt-4 text-4xl space-x-3">
//                             {letterStatuses.map((item, index) => {
//                                 let colorClass = "text-black"; // Default kleur
//                                 if (item.status === "correct") colorClass = "text-green-500";
//                                 else if (item.status === "active") colorClass = "text-blue-500";
//
//                                 return (
//                                     <span key={index} className={`${colorClass} font-bold`}>
//                                 {item.letter}
//                             </span>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Volgende vraag-knop */}
//                 {letterStatuses.every((item) => item.status === "correct") && (
//                     <>
//                         {currentQuestionIndex < questions.length - 1 ? (
//                             <button
//                                 onClick={handleNextQuestion}
//                                 className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
//                             >
//                                 Next
//                             </button>
//                         ) : (
//                             <h3 className="mt-6 text-xl text-gray-700 font-semibold">All questions completed!</h3>
//                         )}
//                     </>
//                 )}
//
//                 {/*/!* Voorspelde letter *!/*/}
//                 {/*<h3 className="mt-6 text-lg font-medium text-gray-800">*/}
//                 {/*    Predicted Sign: <span className="font-bold text-blue-600">{prediction || "Waiting for input..."}</span>*/}
//                 {/*</h3>*/}
//             </div>
//
//     );
// };
//
// export default SpellingQuiz;


















// import React, { useEffect, useState, useRef } from "react";
// import Webcam from "react-webcam";
// import * as handpose from "@tensorflow-models/handpose";
// import "@tensorflow/tfjs";
// import { useAIModel } from "./hooks/useAIModel";
// import kNear from "./utils/kNear.js";
//
// const SpellingQuiz = () => {
//     const webcamRef = useRef(null);
//     const canvasRef = useRef(null);
//     const { model, loading } = useAIModel();
//     const [prediction, setPrediction] = useState(null);
//
//     // Define the arrays based on the link.
//     const spellingLes1 = [
//         {
//             theme: "VRAAGWOORDEN",
//             words: ["ALGEMEEN VRAAGGEBAAR", "HOE", "HOELANG", "HOEVEEL", "WAAROM", "WANNEER", "WAT", "WELKE", "WIE", "WAAR"],
//         },
//         {
//             theme: "TIJDENS DE LES",
//             words: [
//                 "AANWEGIG",
//                 "BEDOELING",
//                 "BEGINNEN",
//                 "BOEK",
//                 "DOCENT",
//                 "STUDENT",
//                 "HUISWERK",
//                 "KLAAR",
//                 "KOFFIE",
//                 "LES",
//                 "LOKAAL",
//                 "MAKKELIJK",
//                 "MEENEMEN",
//                 "MOEILIJK",
//                 "NU",
//                 "OEFENING",
//                 "OOK",
//                 "OPDRACHT",
//                 "PAUZE",
//                 "THEE",
//                 "THUIS",
//                 "UITLEGGEN",
//                 "VOLGENDE",
//                 "VOORBEELD",
//                 "VOORBEREIDEN",
//                 "VORIGE",
//                 "WC",
//             ],
//         },
//         {
//             theme: "KENNISMAKEN",
//             words: ["ACHTERNAAM", "VOORNAAMNAAM", "NAAM", "VOORSTELLEN", "WELKOM"],
//         },
//         {
//             theme: "BEGROETINGEN",
//             words: ["GAAT HET GOED", "GOED", "HALLO", "OKE", "PRIMA", "TOT ZIENS", "GOEDEMORGEN", "GOEDEMIDDAG", "GOEDEAVOND"],
//         },
//     ];
//
//     const spellingLes2 = [
//         {
//             theme: "WERKWOORDEN",
//             words: [
//                 "ANTWOORDEN",
//                 "DOEN",
//                 "GEVEN",
//                 "HEBBEN",
//                 "HELPEN",
//                 "KIJKEN",
//                 "KUNNEN",
//                 "LEREN",
//                 "LEZEN",
//                 "VERGETEN",
//                 "OEFENEN",
//                 "ONTHOUDEN",
//                 "OPRUIMEN",
//                 "VERSTELLEN",
//                 "PROBEREN",
//                 "SCHRIJVEN",
//                 "WILLEN",
//                 "ZEGGEN",
//                 "ZITTEN",
//                 "VRAGEN",
//             ],
//         },
//         {
//             theme: "LUISTERHOUDING",
//             words: ["ALSJEBLIEFT", "BEDANKT", "IK BEGRIJP HET NIET", "JAMMER", "KLOPT NIET", "LEUK", "OPNIEUW", "SORRY", "SPANNEND", "VERVELEND", "VRESELIJK"],
//         },
//         {
//             theme: "GEVOELENS",
//             words: ["BANG", "BLIJ", "BOOS", "OPGELUCHT", "VERDRIETIG", "ZENUWACHTIG"],
//         },
//     ];
//
//     // Determine which array to use based on the link.
//     const [questions] = useState(() => {
//         const currentPath = window.location.pathname;
//         if (currentPath === "/spelling-quiz") return spellingLes1;
//
//         // if (currentPath === "/spelling-les-2") return spellingLes2;
//         return []; // Default to an empty array if the link doesn't match.
//     });
//
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [letterStatuses, setLetterStatuses] = useState(
//         initialStatusesForQuestion(questions[currentQuestionIndex]?.words || [])
//     );
//
//     const handleNextQuestion = () => {
//         const nextIndex = currentQuestionIndex + 1;
//         if (nextIndex < questions.length) {
//             setCurrentQuestionIndex(nextIndex);
//             setLetterStatuses(
//                 initialStatusesForQuestion(questions[nextIndex]?.words || [])
//             );
//         }
//     };
//
//     useEffect(() => {
//         if (!loading && model) {
//             const runHandpose = async () => {
//                 const net = await handpose.load();
//                 let knn = new kNear(3);
//
//                 for (let handData of model.staticModel.training) {
//                     knn.learn(handData.v, handData.lab);
//                 }
//
//                 setInterval(async () => {
//                     if (
//                         webcamRef.current &&
//                         webcamRef.current.video.readyState === 4
//                     ) {
//                         const video = webcamRef.current.video;
//                         const predictions = await net.estimateHands(video);
//
//                         if (predictions.length > 0) {
//                             const handFeatures = extractHandFeatures(predictions[0]);
//                             const predictedSign = knn.classify(handFeatures);
//                             setPrediction(predictedSign);
//
//                             if (!letterStatuses.every((item) => item.status === "correct")) {
//                                 setLetterStatuses((prevStatuses) => {
//                                     const activeIndex = prevStatuses.findIndex(
//                                         (item) => item.status === "active"
//                                     );
//                                     if (activeIndex === -1) return prevStatuses;
//
//                                     if (
//                                         predictedSign.toLowerCase() ===
//                                         prevStatuses[activeIndex].letter
//                                     ) {
//                                         return prevStatuses.map((item, idx) => {
//                                             if (idx === activeIndex) {
//                                                 return { ...item, status: "correct" };
//                                             } else if (idx === activeIndex + 1) {
//                                                 return { ...item, status: "active" };
//                                             }
//                                             return item;
//                                         });
//                                     }
//                                     return prevStatuses;
//                                 });
//                             }
//                         }
//                     }
//                 }, 500);
//             };
//
//             runHandpose();
//         }
//     }, [model, loading, letterStatuses]);
//
//     const extractHandFeatures = (handPrediction) => {
//         return scaleHandpose(handPrediction.landmarks);
//     };
//
//     function scaleHandpose(landmarks) {
//         const wrist = landmarks[0];
//         const indexFingerTip = landmarks[8];
//         const handSize = Math.sqrt(
//             Math.pow(indexFingerTip[0] - wrist[0], 2) +
//             Math.pow(indexFingerTip[1] - wrist[1], 2) +
//             Math.pow(indexFingerTip[2] - wrist[2], 2)
//         );
//
//         return landmarks
//             .map((point) => [
//                 (point[0] - wrist[0]) / handSize,
//                 (point[1] - wrist[1]) / handSize,
//                 (point[2] - wrist[2]) / handSize,
//             ])
//             .flat();
//     }
//
//     const currentQuestion = questions[currentQuestionIndex];
//
//     return (
//         <div style={{ textAlign: "center", position: "relative" }}>
//             <h2>Sign Recognition</h2>
//             <Webcam ref={webcamRef} style={{ width: 640, height: 480 }} />
//             <canvas ref={canvasRef} style={{ position: "absolute" }} />
//
//             {currentQuestion && (
//                 <>
//                     <h3>Thema: {currentQuestion.theme}</h3>
//                     <h3>Spell: {currentQuestion.words.join(", ")}</h3>
//                 </>
//             )}
//             <div style={{ margin: "20px", fontSize: "2rem" }}>
//                 {letterStatuses.map((item, index) => {
//                     let color = "black";
//                     if (item.status === "correct") color = "green";
//                     else if (item.status === "active") color = "blue";
//
//                     return (
//                         <span key={index} style={{ color, marginRight: "10px" }}>
//               {item.letter}
//             </span>
//                     );
//                 })}
//             </div>
//
//             {letterStatuses.every((item) => item.status === "correct") && (
//                 <>
//                     {currentQuestionIndex < questions.length - 1 ? (
//                         <button onClick={handleNextQuestion}>Next</button>
//                     ) : (
//                         <h3>All questions completed!</h3>
//                     )}
//                 </>
//             )}
//
//             <h3>Predicted Sign: {prediction || "Waiting for input..."}</h3>
//         </div>
//     );
// };
//
// function initialStatusesForQuestion(words) {
//     return words.map((letter, index) => ({
//         letter,
//         status: index === 0 ? "active" : "inactive",
//     }));
// }
//
// export default SpellingQuiz;








import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs";
import { useAIModel } from "./hooks/useAIModel";
import kNear from "./utils/kNear.js";
import { useNavigate } from "react-router-dom";

const initialStatusesForWord = (word) => {
    return word.split("").map((letter, index) => ({
        letter,
        status: index === 0 ? "active" : "inactive",
    }));
};

const SpellingQuiz = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const { model, loading } = useAIModel();
    const [prediction, setPrediction] = useState(null);
    const navigate = useNavigate();

    const spellingLes1 = [
        {
            theme: "VRAAGWOORDEN",
            words: ["ALGEMEENVRAAGGEBAAR", "HOE", "HOELANG", "HOEVEEL", "WAAROM", "WANNEER", "WAT", "WELKE", "WIE", "WAAR"],
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
            words: ["VOORNAAM", "NAAM"],
            // words: ["ACTERNAAM", "VOORNAAM", "NAAM", "VOORSTELLEN", "WELKOM"],

        },



        {
            theme: "BEGROETINGEN",
            words: ["GAAT HET GOED", "GOED", "HALLO", "OKE", "PRIMA", "TOT ZIENS", "GOEDEMORGEN", "GOEDEMIDDAG", "GOEDEAVOND"],
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
        if (!loading && model) {
            const runHandpose = async () => {
                const net = await handpose.load();
                let knn = new kNear(3);

                for (let handData of model.staticModel.training) {
                    knn.learn(handData.v, handData.lab);
                }

                setInterval(async () => {
                    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
                        const video = webcamRef.current.video;
                        const predictions = await net.estimateHands(video);

                        if (predictions.length > 0) {
                            const handFeatures = extractHandFeatures(predictions[0]);
                            const predictedSign = knn.classify(handFeatures);
                            setPrediction(predictedSign);

                            // Check if predicted sign matches the active letter
                            if (!letterStatuses.every((item) => item.status === "correct")) {
                                setLetterStatuses((prevStatuses) => {
                                    const activeIndex = prevStatuses.findIndex((item) => item.status === "active");
                                    if (activeIndex === -1) return prevStatuses;

                                    const predictedLetter = predictedSign.toLowerCase();
                                    const currentLetter = prevStatuses[activeIndex].letter.toLowerCase();

                                    // Ensure case-insensitive comparison for spelling
                                    if (predictedLetter === currentLetter) {
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
                    }
                }, 500);
            };

            runHandpose();
        }
    }, [model, loading, letterStatuses]);

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
        navigate('/spelling');
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
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
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
            <h2 className="text-3xl font-bold mb-6">Oefen Thema: {selectedTheme.theme}</h2>

            <div className="flex flex-row items-center gap-24">
                <div className="relative">
                    <Webcam ref={webcamRef} className="w-[640px] h-[480px] rounded-lg shadow-lg" />
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
                </div>

                <div className="text-left self-center">
                    <h3 className="text-3xl font-semibold">Spell: {selectedTheme.words[currentWordIndex]}</h3>
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

            {letterStatuses.every((item) => item.status === "correct") && (
                <>
                    {currentWordIndex < selectedTheme.words.length - 1 ? (
                        <button
                            onClick={handleNextWord}
                            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
                        >
                            Volgend Woord
                        </button>
                    ) : (
                        <div className="mt-6">
                            <p className="text-xl font-semibold text-green-600">Gefeliciteerd! Je hebt alle woorden voltooid!</p>
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
    );
};

export default SpellingQuiz;
