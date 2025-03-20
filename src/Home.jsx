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

        <div className="m-0 w-[100vw] flex flex-col ">

            <div id="loginbutton" className="flex justify-center my-2">
                <a
                    href="https://cmgt.hr.nl/chat-login/handle/tle2-1?redirect=http://145.24.223.67/loading"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
                >
                    Login
                </a>
            </div>

            <header className="relative w-full h-[80vh] border-b-2 border-black mb-[5vh]">
                <img
                    src={gebaren}
                    alt="gebaren"
                    className="w-full absolute max-h-full object-center"
                />
            </header>


            <div className="flex flex-col justify-center gap-[5vw] px-[10vw] b-[10vh] mb-[10vh] md:flex-row">
                <Link to="/spelling">

                    <div
                        className="bg-yellowHome border-4 border-black shadow-xl rounded-[7.8rem] flex-1 hover:-translate-y-1 transition-transform">
                        <h2 className="text-[4vw] font-Strawford mt-16 p-3 mb-14 text-center text-black">SPELLING</h2>
                        <img
                            src={spelling}
                            alt="Spelling"
                            className="h-1/2 w-auto mx-auto m-[-0.2vh]"
                        />

                    </div>
                </Link>


                <Link to="/flashcards">
                    <div
                        className="bg-blueHome border-4 border-black shadow-xl rounded-[7.8rem] flex-1 hover:-translate-y-1 transition-transform">
                        <h2 className="text-[4vw] font-Strawford mt-16 p-3 mb-14 text-center text-black">FLASHCARDS</h2>

                        <img
                            src={flashcards}
                            alt="flashcards"
                            className="h-1/2 w-auto mx-auto m-[-0.2vh]"
                        />

                    </div>
                </Link>
            </div>

            <div className="flex flex-col justify-center gap-[5vw] px-[10vw] b-[10vh] mb-[10vh] md:flex-row">
                <Link to="/grammar">

                    <div
                        className="bg-orangeHome border-4 border-black shadow-xl rounded-[7.8rem] flex-1 hover:-translate-y-1 transition-transform">
                        <h2 className="text-[4vw] font-Strawford mt-16 p-3 mb-14 text-center text-black">GRAMMATICA</h2>
                        <img
                            src={grammatica}
                            alt="Grammatica"
                            className="h-1/2 w-auto mx-auto m-[-0.2vh]"
                        />

                    </div>
                </Link>

                <Link to="/dictionary">
                    <div
                        className="bg-greenHome border-4 border-black shadow-xl rounded-[7.8rem] flex-1 hover:-translate-y-1 transition-transform">
                        <h2 className="text-[4vw] font-Strawford mt-16 p-3 mb-14 text-center text-black">WOORDENBOEK</h2>

                        <img
                            src={woordenboek}
                            alt="Woordenboek"
                            className="h-1/2 w-auto mx-auto m-[-0.2vh]"
                        />
                    </div>
                </Link>
            </div>

            <Link to="/practice">
                <div
                    className="bg-purpleHome border-4 border-black rounded-[7.8rem] shadow-xl mb-[10vh] mx-[11.5vw] hover:-translate-y-1 transition-transform flex flex-row items-center gap-4">

                    <img
                        src={oefentoets}
                        alt="oefentoets"
                        className="w-1/2 h-auto m-[-0.2vh] mt-[-1vh]"
                    />

                    <div className="flex-1">
                        <h2 className="text-[4vw] font-Strawford p-3 text-center text-black">OEFEN INTAKE
                            TOETS</h2>
                    </div>
                </div>
            </Link>


            <Link to="/difficult-words">
                <div
                    className="bg-redHome border-4 border-black rounded-[7.8rem] shadow-xl mb-[10vh] mx-[11.5vw] hover:-translate-y-1 transition-transform flex flex-row items-center gap-4">
                    <img
                        src={moeilijke}
                        alt="moeilijke woorden"
                        className="w-1/2 h-auto m-[-0.2vh] mt-[-1vh]"
                    />

                    <div className="flex-1">
                        <h2 className="text-[4vw] font-Strawford p-3 text-center text-black">MOEILIJKE WOORDEN</h2>
                    </div>
                </div>
            </Link>

        </div>
    );
}

export default Homepage;
