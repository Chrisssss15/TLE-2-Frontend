import { useState } from "react";

const questions = [
    { question: "Ik ga nu uiteten met mijn familie",
        answer: "NUIKUITETENMETFAMILIE" },
    { question: "Morgen ga ik naar school",
        answer: "MORGENIKGASCHOOL" },
    { question: "Mijn huis is groot en mooi",
        answer: "MIJNHUISGROOTMOOI" },
    { question: "Wij gaan samen naar de winkel",
        answer: "WIJSAMENGAANWINKEL" },
    { question: "Ik hou van muziek luisteren",
        answer: "IKHOUDENMUZIEKLUISTEREN" }
];

function Grammar_quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [started, setStarted] = useState(false);
    const [feedback, setFeedback] = useState(""); // "correct" of "wrong"

    function startGrammar() {
        setStarted(true);
    }

    function checkAnswer() {
        let correctAnswer = questions[currentQuestionIndex].answer;
        let spacelessAnswer = userAnswer.replace(/\s+/g, '');

        // Als het antwoord correct is, geef dan een melding en ga naar de volgende vraag
        if (correctAnswer === userAnswer || correctAnswer === spacelessAnswer) { // Als het antwoord correct is
            setFeedback("correct");
            setTimeout(() => {
                setFeedback("");
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }, 1000); // Verwijdert de melding na 1 seconde
        } else { // Als het antwoord fout is
            setFeedback("wrong");
            setTimeout(() => setFeedback(""), 1000); // Verwijdert de melding na 1 seconde
        }

        setUserAnswer("");
    }

    return (
        <>
            {!started ? (
                <div id="canvas" className="flex flex-col items-center justify-center h-screen">
                    <button
                        onClick={startGrammar}
                        className="bg-orangeHome hover:bg-orange4 text-white font-bold py-8 px-16 rounded-lg shadow-lg transition duration-300 ease-in-out"
                    >
                        Start Quiz
                    </button>
                </div>
            ) : (
                <div className="relative h-screen w-full px-4 text-center bg-gray-100">
                    {/* H1 bovenaan */}
                    <h1 className="absolute top-4 left-0 right-0 text-xl sm:text-3xl font-semibold text-black">
                        Vertaal deze Nederlandse zin naar Nederlandse Gebarentaal
                    </h1>

                    {/* Feedback bericht */}
                    <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-lg text-white text-lg font-semibold 
                        ${feedback === 'correct' ? 'bg-green-500 opacity-100 transition-opacity duration-500' : ''}
                        ${feedback === 'wrong' ? 'bg-red-500 opacity-100 animate-shake' : 'opacity-0'}`}>
                        {feedback === 'correct' ? 'Correct!' : feedback === 'wrong' ? 'Fout, probeer opnieuw!' : ''}
                    </div>

                    {/* Midden-content */}
                    <div className="flex flex-col items-center justify-center h-full">
                        <h2 className="font-bold text-3xl sm:text-3xl text-gray-900 mb-12">
                            {questions[currentQuestionIndex].question}
                        </h2>

                        <input
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            type="text"
                            placeholder="Typ je antwoord hier..."
                            className={`border-2 p-3 rounded-lg w-full sm:w-1/2 text-lg focus:outline-none transition duration-200 shadow-sm
                                ${feedback === 'wrong' ? 'border-red-500' : 'border-gray-300 focus:border-orangeHome'}`}
                        />

                        <button
                            onClick={checkAnswer}
                            className="mt-6 bg-orange4  text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md"
                        >
                            Controleer antwoord
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Grammar_quiz;
