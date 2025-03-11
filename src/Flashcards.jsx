
const words = [
    {
        question: "Naam",
        answer: "image here"
    },
    {
        question: "Leeftijd",
        answer: "image here"
    },
    {
        question: "Werk",
        answer: "image here"
    },
    {
        question: "Hobby",
        answer: "image here"
    },
    {
        question: "Gezin",
        answer: "image here"
    },
    {
        question: "Woonplaats",
        answer: "image here"
    },
    {
        question: "Taal",
        answer: "image here"
    },
    {
        question: "Gezondheid",
        answer: "image here"
    }
];

let currentQuestionIndex = -1;
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
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
    console.log('question', question, words[currentQuestionIndex]);
    question.className = "text-3xl font-bold text-gray-800 text-center mt-4 mb-19";
    document.getElementById("canvas").appendChild(question);


}

function Flashcards(){

    return(
        <>


            <p>Hier komt de contact informatie</p>

            <div id="canvas" className="flex flex-col items-center justify-center h-screen">
                <button id="startButton" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-8 px-16 rounded-lg shadow-lg transition duration-300 ease-in-out">
                    Start Flashcards Oefening
                </button>
            </div>



        </>
    )
}
export default Flashcards