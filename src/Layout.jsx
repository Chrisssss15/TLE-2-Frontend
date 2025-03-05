import { Link, Outlet } from "react-router-dom";
import logo from "/logo.png"; // Ensure the logo is in the `public` folder

function Layout() {
    return (
        <>

            <header className="flex justify-between items-center py-4 px-6">

                <div className="h-16">
                    <img src={logo} alt="Logo" className="h-full w-auto"/>
                </div>


                <nav className="flex gap-5">
                    <Link to="/">Home</Link>
                    <Link to="alphabet">Alphabet</Link>
                    <Link to="profiel">Profiel</Link>
                </nav>
            </header>

            <Outlet/>


            <footer className="flex justify-center py-4 gap-5 ">
                <Link to="privacy" >Privacy</Link>
                <Link to="contact" >Contact</Link>
            </footer>
        </>
    );
}

export default Layout;
