import { useEffect, useState } from "react";

const questions = [
    {
        question: "Wat is de juiste zinsopbouw voor: 'Ik ga nu uiteten met mijn familie' in Nederlandse Gebarentaal?",
        answer: "NUIKUITETENMETFAMILIE"
    },
    {
        question: "Wat is de juiste zinsopbouw voor: 'Morgen ga ik naar school' in Nederlandse Gebarentaal?",
        answer: "MORGENIKGASCHOOL"
    },
    {
        question: "Wat is de juiste zinsopbouw voor: 'Mijn huis is groot en mooi' in Nederlandse Gebarentaal?",
        answer: "MIJNHUISGROOTMOOI"
    },
    {
        question: "Wat is de juiste zinsopbouw voor: 'Wij gaan samen naar de winkel' in Nederlandse Gebarentaal?",
        answer: "WIJSAMENGAANWINKEL"
    },
    {
        question: "Wat is de juiste zinsopbouw voor: 'Ik hou van muziek luisteren' in Nederlandse Gebarentaal?",
        answer: "IKHOUDENMUZIEKLUISTEREN"
    }
];



function Grammar_quiz(){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [started, setStarted] = useState(false);



    function startGrammar(){
        setStarted(true);
        console.log(currentQuestionIndex);
        console.log([questions[currentQuestionIndex].question]);


    }

    function checkAnswer(){


        let correctAnswer = questions[currentQuestionIndex].answer;
        console.log(correctAnswer);
        console.log(userAnswer);
        //str = str.replace(/\s+/g, '');
        let spacelessAnswer = userAnswer.replace(/\s+/g, '');
        console.log(userAnswer);

        if (correctAnswer === userAnswer || correctAnswer === spacelessAnswer){
            console.log("Correct");

            setCurrentQuestionIndex(currentQuestionIndex + 1);
        };
        setUserAnswer("");
    }
    return(
        <>


            <p>Hier komt de contact informatie</p>
            {started === false ? (
            <div id="canvas" className="flex flex-col items-center justify-center h-screen">
                <button
                    onClick={startGrammar}
                    id="startButton" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-8 px-16 rounded-lg shadow-lg transition duration-300 ease-in-out">
                    Start Quiz
                </button>
            </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen w-full text-center">

                    <h2 className="font-bold text-3xl mb-16">{[questions[currentQuestionIndex].question]}</h2>
                    <input
                        value={userAnswer}
                        onChange={
                        (e) => setUserAnswer(e.target.value)
                    }
                        type="text"

                        className="border-2 border-gray-300 p-2 rounded-lg w-1/2" />
                    <button
                        onClick={checkAnswer}
                        className="bg-blue-700 text-white">Controleer antwoord</button>

                </div>
            )}


        </>
    )
}
export default Grammar_quiz;


