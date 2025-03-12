import { useEffect, useState } from "react";

const questions = [
    {
        question: "Doel",
        answer: "VIDEO"
    },
    {
        question: "Ervaring",
        answer: "VIDEO"
    },
    {
        question: "Motivatie",
        answer: "VIDEO"
    },
    {
        question: "Achtergrond",
        answer: "VIDEO"
    },
    {
        question: "Verwachtingen",
        answer: "VIDEO"
    }
];





function Flashcards_quiz(){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [started, setStarted] = useState(false);
    const [flipped, setFlipped] = useState(false);



    function startGrammar(){
        setStarted(true);


        console.log(currentQuestionIndex);
        console.log([questions[currentQuestionIndex].question]);


    }

    // function checkAnswer(){
    //
    //
    //     let correctAnswer = questions[currentQuestionIndex].answer;
    //     console.log(correctAnswer);
    //     console.log(userAnswer);
    //     //str = str.replace(/\s+/g, '');
    //     let spacelessAnswer = userAnswer.replace(/\s+/g, '');
    //     console.log(userAnswer);
    //
    //     if (correctAnswer === userAnswer || correctAnswer === spacelessAnswer){
    //         console.log("Correct");
    //
    //         setCurrentQuestionIndex(currentQuestionIndex + 1);
    //     };
    //     setUserAnswer("");
    // }

    function nextCard(){
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setFlipped(false);
    }
    return(
        <>

            <div className="flex items-center justify-center h-screen w-full bg-gray-100">
                {/* Fout-knop (links) */}
                <button onClick={nextCard} className="w-20 h-20 p-5 bg-red-600 text-white text-3xl font-bold rounded-full shadow-md hover:bg-red-700 transition">
                    ✗
                </button>

                {/* Flashcard-container met flip effect */}
                <div className="relative w-[800px] h-[500px] mx-6 perspective">
                    <div
                        className={`w-full h-full relative transition-transform duration-500 transform-style preserve-3d ${
                            flipped ? 'rotate-y-180' : ''
                        }`}
                    >
                        {/* Voorkant - toont de vraag */}
                        <div className="absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center text-center text-xl font-semibold backface-hidden">
                            {questions[currentQuestionIndex].question}
                        </div>

                        {/* Achterkant - toont de video */}
                        <div className="absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center backface-hidden rotate-y-180">
                            <video controls className="w-full h-full rounded-lg">
                                <source src={questions[currentQuestionIndex].video} type="video/mp4" />
                                Je browser ondersteunt deze video niet.
                            </video>
                        </div>
                    </div>

                    {/* "Draai Kaartje"-knop */}
                    <button
                        onClick={() => setFlipped(!flipped)}
                        className="mt-4 bg-blue3 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue8 transition w-full"
                    >
                        Bekijk Antwoord
                    </button>
                </div>

                {/* Goed-knop (rechts) */}
                <button onClick={nextCard} className="w-20 h-20 bg-green-500 text-3xl text-white font-bold rounded-full shadow-md hover:bg-green-600 transition">
                    ✓
                </button>
            </div>
            )


        </>
    )
}
export default Flashcards_quiz;


