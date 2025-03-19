

function DifficultWords() {

    const difficultWords = [
        "Hallo", "Bedankt", "Sorry", "Ja",
        "Nee", "Goed", "Slecht", "Eten",
        "Drinken", "Slapen", "Spelen", "Begrijpen",
        "Herhalen", "Stop", "Langzaam", "Nogmaals"
    ];

    return (
        <div className="container mx-auto px-[10vw] mb-6">
            <div className="mb-6">
                <h2 className="text-[18rem] leading-none text-left font-Slickybohem tracking-wide">OPNIEUW</h2>
                <h4 className="text-2xl w-[69vw] font-semibold border border-black rounded-2xl p-2 my-2 inline-block font-Strawford">
                    Overzicht moeilijke woorden:
                </h4>
            </div>
            <div className="flex flex-wrap gap-[1vw] my-10 justify-center">
                {difficultWords.map((word, index) => (
                    <div
                        key={index}
                        className="w-[15vw] h-[12vw] bg-red1 flex items-center justify-center text-[2.8rem] rounded-3xl text-white shadow-lg
      transition-transform duration-800 ease-in-out font-Slickybohem tracking-wide hover:-translate-y-2 hover:shadow-2xl"
                    >
                        {word}
                    </div>
                ))}
            </div>


        </div>
    );
}

export default DifficultWords;
