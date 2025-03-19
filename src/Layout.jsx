import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import back from "/back.png";
import logo from "/logo.png"; // Zorg dat het pad klopt

function Layout() {
    const location = useLocation();
    const navigate = useNavigate(); // Gebruik de useNavigate hook

    const goBack = () => {
        navigate(-1); // Dit navigeert naar de vorige pagina
    };

    return (
        <>
            {/* Header */}
            <header className="flex justify-between items-center py-4 px-6 border-b border-gray-600 relative">

                {/* Back-knop (alleen tonen als NIET op de homepage) */}
                {location.pathname !== "/" && (
                    <div
                        className="absolute left-4 top-4 h-20 transform transition-transform duration-200 hover:scale-110"
                        onClick={goBack}
                    >
                        <img src={back} alt="Back" className="h-full w-auto"/>
                    </div>

                )}

                {/* Logo */}
                <Link to="/" className="flex justify-center items-center h-20 mx-auto transform transition-transform duration-200 hover:scale-110">
                    <div className="h-full">
                        <img src={logo} alt="Logo" className="h-full w-auto"/>
                    </div>
                </Link>

            </header>

            {/* Pagina-inhoud */}
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="flex justify-center py-4 gap-5">
                <Link to="/privacy">Privacy</Link>
                <Link to="/contact">Contact</Link>
            </footer>
        </>
    );
}

export default Layout;
