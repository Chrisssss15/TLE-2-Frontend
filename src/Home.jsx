import spelling from '/spelling-avatar.png'
import flashcards from '/flashcards-avatar.png'
import grammatica from '/grammatica-avatar.png'
import woordenboek from '/woordenboek-avatar.png'
import oefentoets from '/oefentoets-avatar.png'
import moeilijke from '/moeilijke-avatar.png'
import gebaren from '/gebaren.png'
import {Link} from "react-router-dom";

function Homepage() {
    return (

        <div className="m-1">
            <img
                src={gebaren}
                alt="gebaren"
                className="h-45 border-b-2 border-black mb-6"
            />

            <div className="flex flex-col md:flex-row gap-6 mb-6">
                <Link to="/spelling">

                    <div
                        className="bg-[#FFF399] border-2 border-black shadow-xl rounded-3xl flex-1 hover:-translate-y-1 transition-transform">


                        <h2 className="text-4xl font-semibold mb-2 text-center">Spelling</h2>
                        <img
                            src={spelling}
                            alt="Spelling"
                            className="h-45 mx-auto"
                        />

                    </div>
                </Link>


                <Link to="/flashcards">
                    <div
                        className="bg-[#C9DBE1] border-2 border-black shadow-xl rounded-3xl flex-1 hover:-translate-y-1 transition-transform">
                        <h2 className="text-4xl font-semibold mb-2 text-center">Flashcards</h2>

                        <img
                            src={flashcards}
                            alt="flashcards"
                            className="h-45 mx-auto"
                        />

                    </div>
                </Link>
            </div>


            <div className="flex flex-col md:flex-row gap-6 mb-6">
                <Link to="/grammatica">
                    <div
                        className="bg-[#FFC086] border-2 border-black shadow-xl rounded-3xl flex-1 hover:-translate-y-1 transition-transform">
                        <h2 className="text-4xl font-semibold mb-2 text-center">Grammatica</h2>

                        <img
                            src={grammatica}
                            alt="grammatica"
                            className="h-45 mx-auto"
                        />

                    </div>
                </Link>

                <Link to="/dictionary">
                    <div
                        className="bg-[#9FE3A4] border-2 border-black shadow-xl rounded-3xl flex-1 hover:-translate-y-1 transition-transform">
                        <h2 className="text-4xl font-semibold mb-2 text-center">Woordenboek</h2>

                        <img
                            src={woordenboek}
                            alt="woordenboek"
                            className="h-45 mx-auto"
                        />

                    </div>
                </Link>
            </div>

            <Link to="/practice">
                <div
                    className="bg-[#E2C0E8] border-2 border-black shadow-xl rounded-3xl p-6 mb-6 hover:-translate-y-1 transition-transform flex flex-row items-center gap-4">

                    <img
                        src={oefentoets}
                        alt="oefentoets"
                        className="h-50 w-auto rounded-lg"
                    />

                    <div className="flex-1">
                        <h2 className="text-4xl font-semibold mb-2 text-center">Oefen Intake Toets</h2>
                    </div>
                </div>
            </Link>


            <Link to="/difficult-words">
                <div
                    className="bg-[#FFF399] border-2 border-black shadow-xl rounded-3xl p-6 flex-1 hover:-translate-y-1 transition-transform flex flex-row items-center gap-4">
                    <img
                        src={moeilijke}
                        alt="moeilijke woorden"
                        className="h-50 w-auto rounded-lg"
                    />

                    <div className="flex-1">
                        <h2 className="text-4xl font-semibold mb-2 text-center">Moeilijke woorden</h2>
                    </div>
                </div>
            </Link>

        </div>
    );
}

export default Homepage;
