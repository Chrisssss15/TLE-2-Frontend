import { useEffect, useState } from "react";







function Flashcards_quiz(){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [started, setStarted] = useState(false);
    const [flipped, setFlipped] = useState(false);




    const [signs, setSigns] = useState([]);

    useEffect(() => {
        async function fetchSigns() {
            try {
                const response = await fetch('http://145.24.223.196:8008/v1/signs/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'x-api-key': '95937790-3a9d-4ee2-9ed6-ace5165167f2',
                    },
                });

                const questions = await response.json();
                console.log(questions);
                console.log(questions[0].id);


                setSigns(questions);
                console.log(questions);

            } catch (error) {
                console.error('Error fetching signs:', error);
            }
        }

        fetchSigns();
    }, []);

    function startGrammar(questions){
        setStarted(true);


        console.log(currentQuestionIndex);
        console.log([questions[currentQuestionIndex].definition]);


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


                            <h2 className="font-bold text-3xl mb-16">{[signs[currentQuestionIndex].definition]}</h2>
                        ) : (
                            <h2 className="font-bold text-3xl mb-16">{[signs[currentQuestionIndex].theme]}</h2>
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


