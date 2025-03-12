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







import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs";
import { useAIModel } from "./hooks/useAIModel";
import kNear from "./utils/kNear.js";

// Helper to initialize letter statuses for a given question.
// Only the first letter is marked as "active"; the rest are "inactive".
const initialStatusesForQuestion = (question) => {
    return question.letters.map((letter, index) => ({
        letter,
        status: index === 0 ? "active" : "inactive",
    }));
};

const SpellingQuiz = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const { model, loading } = useAIModel();
    const [prediction, setPrediction] = useState(null);

    // Questions array; note the third object now uses the key "letters" for consistency.
    const [questions] = useState([
        {
            id: 1,
            title: "wie",
            letters: ["w", "i", "e"],
        },
        {
            id: 2,
            title: "hoe",
            letters: ["v", "o", "s"],
        },
        {
            id: 3,
            title: "alfabet",
            letters: [
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "i",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "v",
                "w",
                "y",
            ],
        },
    ]);

    // Track which question we're on.
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // Initialize letter statuses based on the current question.
    const [letterStatuses, setLetterStatuses] = useState(
        initialStatusesForQuestion(questions[currentQuestionIndex])
    );

    // Function to advance to the next question.
    const handleNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
            setLetterStatuses(initialStatusesForQuestion(questions[nextIndex]));
        }
    };

    useEffect(() => {
        if (!loading && model) {
            const runHandpose = async () => {
                const net = await handpose.load();
                let knn = new kNear(3);

                // Load trained model data into KNN
                for (let handData of model.staticModel.training) {
                    knn.learn(handData.v, handData.lab);
                }

                setInterval(async () => {
                    if (
                        webcamRef.current &&
                        webcamRef.current.video.readyState === 4
                    ) {
                        const video = webcamRef.current.video;
                        const predictions = await net.estimateHands(video);

                        if (predictions.length > 0) {
                            const handFeatures = extractHandFeatures(predictions[0]);
                            const predictedSign = knn.classify(handFeatures);
                            setPrediction(predictedSign);

                            // Only update if the current question isn't already completed.
                            if (!letterStatuses.every((item) => item.status === "correct")) {
                                setLetterStatuses((prevStatuses) => {
                                    // Find the active letter index
                                    const activeIndex = prevStatuses.findIndex(
                                        (item) => item.status === "active"
                                    );
                                    if (activeIndex === -1) return prevStatuses;

                                    // Check if the predicted letter matches the active letter.
                                    if (
                                        predictedSign.toLowerCase() ===
                                        prevStatuses[activeIndex].letter
                                    ) {
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
                }, 500); // Check every 500ms
            };

            runHandpose();
        }
    }, [model, loading, letterStatuses]);

    // Extract features using the same scaling function as during training.
    const extractHandFeatures = (handPrediction) => {
        return scaleHandpose(handPrediction.landmarks);
    };

    function scaleHandpose(landmarks) {
        const wrist = landmarks[0];
        const indexFingerTip = landmarks[8]; // Use this as a reference
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

    // Get the current question object.
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div style={{ textAlign: "center", position: "relative" }}>
            <h2>Sign Recognition</h2>
            <Webcam ref={webcamRef} style={{ width: 640, height: 480 }} />
            <canvas ref={canvasRef} style={{ position: "absolute" }} />

            <h3>Spell: {currentQuestion.title}</h3>
            <div style={{ margin: "20px", fontSize: "2rem" }}>
                {letterStatuses.map((item, index) => {
                    // Colors: correct=green, active=blue, inactive=black.
                    let color = "black";
                    if (item.status === "correct") color = "green";
                    else if (item.status === "active") color = "blue";

                    return (
                        <span key={index} style={{ color, marginRight: "10px" }}>
              {item.letter}
            </span>
                    );
                })}
            </div>

            {/* Show the Next button only when the current question is completed */}
            {letterStatuses.every((item) => item.status === "correct") && (
                <>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button onClick={handleNextQuestion}>Next</button>
                    ) : (
                        <h3>All questions completed!</h3>
                    )}
                </>
            )}

            <h3>Predicted Sign: {prediction || "Waiting for input..."}</h3>
        </div>
    );
};

export default SpellingQuiz;

