import {Link} from "react-router-dom";

function Difficult() {
    return (
        <div className="container mx-auto px-[10vw] mb-6">
            <div className="mb-6">
                <h2 className="text-[18rem] leading-none text-left font-Slickybohem tracking-wide">OPNIEUW</h2>
                <h4 className="text-2xl w-[69vw] font-semibold border border-black rounded-2xl p-2 my-2 inline-block font-Strawford">Kies je
                    les:</h4>
            </div>

            <div className="flex justify-left gap-[3vw] my-10">
                <div className="w-[21vw] h-[15vw] bg-red1 flex items-center justify-center text-[4rem] rounded-3xl text-white shadow-lg
        transition-transform duration-800 ease-in-out font-Slickybohem tracking-wide hover:-translate-y-2 hover:shadow-2xl">
                    Spelling
                </div>
                <div className="w-[21vw] h-[15vw] bg-red2 flex items-center justify-center text-[4rem] rounded-3xl text-white shadow-lg
        transition-transform duration-800 ease-in-out font-Slickybohem tracking-wide hover:-translate-y-2 hover:shadow-2xl">
                    Flashcards
                </div>
                <div className="w-[21vw] h-[15vw] bg-red3 flex items-center justify-center text-[4rem] rounded-3xl text-white shadow-lg
        transition-transform duration-800 ease-in-out font-Slickybohem tracking-wide hover:-translate-y-2 hover:shadow-2xl">
                    Grammatica
                </div>
            </div>

            <Link to="/difficult-words-view">
            <div>
            <h2 className="text-redLink underline font-Strawford text-2xl">Bekijk hier lastige woorden</h2>
            </div>
            </Link>
        </div>
    );
}

export default Difficult;
