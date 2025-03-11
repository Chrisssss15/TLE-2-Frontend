function Difficult() {
    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-9xl font-semibold mb-2 text-center">Opnieuw</h2>
                <h4 className="text-2xl w-52 font-semibold border border-black rounded-2xl p-2 inline-block">Kies Je
                    les:</h4>
            </div>

            <div className="flex justify-left gap-8">
                <div className="w-52 h-52 bg-[#FF7B7B] flex items-center justify-center text-3xl font-bold rounded-3xl text-[#FFFFFF] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    Spelling
                </div>
                <div className="w-52 h-52 bg-[#FF5959] flex items-center justify-center text-3xl font-bold rounded-3xl text-[#FFFFFF] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    Flashcards
                </div>
                <div className="w-52 h-52 bg-[#FFAA17] flex items-center justify-center text-3xl font-bold rounded-3xl text-[#FFFFFF] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    Grammatica
                </div>
                <div className="w-52 h-52 bg-[#FF3333] flex items-center justify-center text-3xl font-bold rounded-3xl text-[#FFFFFF] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    4
                </div>
            </div>
            <h2 className="text-[#5D0000]">bekijk hier lastige woorden</h2>

        </div>
    );
}

export default Difficult;
