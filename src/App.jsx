import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Alphabet from "./Alphabet.jsx";
import Profiel from "./Profiel.jsx";
import Privacy from "./Privacy.jsx";
import Contact from "./Contact.jsx";
import Grammar from "./Grammar.jsx";
import Flashcards from "./Flashcards.jsx";
import Spelling from "./Spelling.jsx";

import './style.css'
import './fonts.css'
const router = createBrowserRouter([{
    element:<Layout/>,
    children:[
        {
            path:"/",
            element: <Home/>
        },
        {
            path:"/alphabet",
            element: <Alphabet/>
        },
        {
            path:"/profiel",
            element: <Profiel/>
        },
        {
            path:"/privacy",
            element: <Privacy/>
        },
        {
            path:"/contact",
            element: <Contact/>
        },
        {
            path:"/grammar",
            element: <Grammar/>
        },
        {
            path:"/flashcards",
            element: <Flashcards/>
        },

        {
            path:"/spelling",
            element: <Spelling/>
        },



    ]

}]);
function App() {
    return <RouterProvider router={router} />;
}
export default App
