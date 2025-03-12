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
                // console.log(questions[0].id);


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
            {started === false ? (
                <div id="canvas" className="flex flex-col items-center justify-center h-screen">
                    <button
                        onClick={startGrammar}
                        id="startButton" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-8 px-16 rounded-lg shadow-lg transition duration-300 ease-in-out">
                        Start Quiz
                    </button>
                </div>
            ) : (


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
                                <h2 className="font-bold text-3xl mb-16">{[signs[currentQuestionIndex].definition]}</h2>
                            </div>

                            {/* Achterkant - toont de video */}
                            <div className="absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center backface-hidden rotate-y-180">
                                {/*<video controls className="w-full h-full rounded-lg">*/}
                                {/*    <source src={questions[currentQuestionIndex].video} type="video/mp4" />*/}
                                {/*    Je browser ondersteunt deze video niet.*/}
                                {/*</video>*/}

                                <h2 className="font-bold text-3xl mb-16">{[signs[currentQuestionIndex].theme]}</h2>

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






            )}


        </>
    )
}
export default Flashcards_quiz;
