

function Spelling() {
    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-9xl font-semibold mb-2 text-left">Les</h2>
                <h4 className="text-2xl w-52 font-semibold border border-black rounded-2xl p-2 inline-block">Kies Je
                    les:</h4>
            </div>

            <div className="flex justify-left gap-8">
                <div className="w-52 h-52 bg-[#FCFF62] flex items-center justify-center text-9xl font-bold rounded-3xl text-[#B99F0D] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    1
                </div>
                <div className="w-52 h-52 bg-[#FCF554] flex items-center justify-center text-9xl font-bold rounded-3xl text-[#B99F0D] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    2
                </div>
                <div className="w-52 h-52 bg-[#FCF446] flex items-center justify-center text-9xl font-bold rounded-3xl text-[#B99F0D] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    3
                </div>
                <div className="w-52 h-52 bg-[#FCF238] flex items-center justify-center text-9xl font-bold rounded-3xl text-[#B99F0D] shadow-lg
        transition-transform duration-1000 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                    4
                </div>
            </div>


        </div>
    );
}

export default Spelling;
