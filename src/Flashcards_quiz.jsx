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

    function nextCard(){
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setFlipped(false);
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




                <div className="flex items-center justify-center h-screen w-full text-center">


                    <button onClick={nextCard} className="w-12 h-12 bg-red-600">Fout</button>
                    <div className="flex flex-col items-center justify-center h-screen w-80 text-center">
                    {flipped === false ? (


                    <h2 className="font-bold text-3xl mb-16">{[questions[currentQuestionIndex].question]}</h2>
                ) : (
                    <h2 className="font-bold text-3xl mb-16">{[questions[currentQuestionIndex].answer]}</h2>
                    )}
                    <button
                        onClick={() => setFlipped(!flipped)}
                        className="bg-blue-700 text-white"
                    >Draai Kaartje</button>
                    </div>
                    <button onClick={nextCard} className="w-12 h-12 bg-green-500">Goed</button>
                </div>




            )}


        </>
    )
}
export default Flashcards_quiz;


