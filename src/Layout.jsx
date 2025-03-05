import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <nav className="flex justify-end py-4 gap-5 p-3">
                <Link to="/">Home</Link>
                <Link to="alphabet">Alphabet</Link>
                <Link to="profiel">Profiel</Link>
            </nav>
            <Outlet/>
            <footer className="flex justify-center py-4 gap-5 p-3">
                <Link to="privacy">Privacy</Link>
                <Link to="contact">Contact</Link>
            </footer>
        </>
    );
}

export default Layout;
