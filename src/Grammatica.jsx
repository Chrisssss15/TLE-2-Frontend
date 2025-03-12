import {Link} from "react-router-dom";


function Grammatica() {
    return (
        <div className="container mx-auto px-[10vw]">
            <div className="mb-6">
                <h2 className="text-[18rem] leading-none text-left font-Slickybohem tracking-wide">LES</h2>
                <h4 className="text-2xl w-[69vw] font-semibold border border-black rounded-2xl p-2 my-2 inline-block font-Strawford">Kies
                    je
                    les:</h4>
            </div>


            <div className="flex justify-left gap-[3vw] my-10">

                <Link to="/grammar-quiz">
                    <div className="w-[15vw] h-[15vw] bg-orange1 flex items-center justify-center text-[15rem] rounded-3xl text-orangeLetter shadow-lg
        transition-transform duration-800 ease-in-out font-Slickybohem hover:-translate-y-2 hover:shadow-2xl">
                        1
                    </div>
                </Link>

                <Link to="/grammar-quiz">
                    <div className="w-[15vw] h-[15vw] bg-orange2 flex items-center justify-center text-[15rem] rounded-3xl text-orangeLetter shadow-lg
        transition-transform duration-800 ease-in-out font-Slickybohem hover:-translate-y-2 hover:shadow-2xl">
                        2
                    </div>
                </Link>

                <Link to="/grammar-quiz">
                    <div className="w-[15vw] h-[15vw] bg-orange3 flex items-center justify-center text-[15rem] rounded-3xl text-orangeLetter shadow-lg
        transition-transform duration-800 ease-in-out font-Slickybohem hover:-translate-y-2 hover:shadow-2xl">
                        3
                    </div>
                </Link>


                <Link to="/grammar-quiz">
                    <div className="w-[15vw] h-[15vw] bg-orange4 flex items-center justify-center text-[15rem] rounded-3xl text-orangeLetter shadow-lg
        transition-transform duration-800 ease-in-out font-Slickybohem hover:-translate-y-2 hover:shadow-2xl">
                        4
                    </div>
                </Link>
            </div>


        </div>
    );
}

export default Grammatica;
