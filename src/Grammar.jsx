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




let currentQuestionIndex = -1;
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed || THIS IS GRAMMAR.jsx CODE");
    currentQuestionIndex = -1;
    let startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () =>setupQuestion(startButton));

});

function setupQuestion(startButton){

    // skrt || indicator for what question you are, later for what question inside quiz
    currentQuestionIndex++;

    console.log("set up questions function reached");
    startButton.remove();

    let question = document.createElement("h2");
    question.innerHTML = questions[currentQuestionIndex].question;
    question.className = "text-3xl font-bold text-gray-800 text-center mt-4 mb-20";
    document.getElementById("canvas").appendChild(question);


    let answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.className = "border-2 border-gray-300 p-2 rounded-lg w-1/2";
    document.getElementById("canvas").appendChild(answerInput);

    let submitButton = document.createElement("button");
    submitButton.innerHTML = "Controleer antwoord";
    document.getElementById("canvas").appendChild(submitButton);
    submitButton.addEventListener("click", () =>checkAnswer(answerInput));
}

function checkAnswer(answerInput) {
    let answer = answerInput.value;
    let spacelessAnswer = answer.split(" ").join("");
    let correctAnswer = questions[currentQuestionIndex].answer;

    if (spacelessAnswer === correctAnswer || spacelessAnswer.toUpperCase() === correctAnswer) {
        alert("Correct!");
        nextQuestion();
    } else {
        alert("Incorrect!");
    }
}

function nextQuestion() {
    let input = document.querySelector("input");
   input.value = ' ';
    console.log('next question function reached');
    currentQuestionIndex++;

    let question = document.querySelector('h2');
    question.innerHTML = questions[currentQuestionIndex].question;


}









function Grammar(){
    return(
        <>


            <p>Hier komt de contact informatie</p>

            <div id="canvas" className="flex flex-col items-center justify-center h-screen">
                <button id="startButton" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-8 px-16 rounded-lg shadow-lg transition duration-300 ease-in-out">
                    Start Quiz
                </button>
            </div>



        </>
    )
}
export default Grammar


