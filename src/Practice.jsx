

function Practice() {
    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-9xl font-semibold mb-2 text-center">Toets versie</h2>
                <h4 className="text-2xl w-52 font-semibold border border-black rounded-2xl p-2 inline-block">Kies Je
                    les:</h4>
            </div>

            <div className="flex justify-left gap-8">
                <div className="w-52 h-52 bg-[#F7BAFF] flex items-center justify-center text-9xl font-bold rounded-3xl text-[#873496] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    1
                </div>
                <div className="w-52 h-52 bg-[#E7A7F0] flex items-center justify-center text-9xl font-bold rounded-3xl text-[#873496] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    2
                </div>
                <div className="w-52 h-52 bg-[#D793E1] flex items-center justify-center text-9xl font-bold rounded-3xl text-[#873496] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    3
                </div>
                <div className="w-52 h-52 bg-[#C783D2] flex items-center justify-center text-9xl font-bold rounded-3xl text-[#873496] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    4
                </div>
            </div>


        </div>
    );
}

export default Practice;
