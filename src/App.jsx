import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Alfabet from "./Alfabet.jsx";
import Profiel from "./Profiel.jsx";
import Privacy from "./Privacy.jsx";
import Contact from "./Contact.jsx";
import Grammar_quiz from "./Grammar_quiz.jsx";
import Flashcards_quiz from "./Flashcards_quiz.jsx";
import Spelling from "./Spelling.jsx";
import Grammatica from "./Grammatica.jsx";
import Dictionary from "./Dictionary.jsx";

import './style.css'
import './fonts.css'
import Practice from "./Practice.jsx";
import Difficult from "./Difficult-words.jsx";
import Words from "./Words.jsx";
import Flashcards from "./Flashcards.jsx";



const router = createBrowserRouter([{
    element:<Layout/>,
    children:[
        {
            path:"/",
            element: <Home/>
        },
        {
            path:"/alfabet",
            element: <Alfabet/>
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
            path:"/grammar-quiz",
            element: <Grammar_quiz/>
        },

        {
            path:"/spelling",
            element: <Spelling/>
        },

        {
            path:"/flashcards",
            element: <Flashcards/>
        },

        {
            path:"/flashcards-quiz",
            element: <Flashcards_quiz/>
        },

        {
            path:"/grammar",
            element: <Grammatica/>
        },

        {
            path:"/dictionary",
            element: <Dictionary/>
        },

        {
            path:"/practice",
            element: <Practice/>
        },

        {
            path:"/difficult-words",
            element: <Difficult/>
        },

        {
            path:"/words",
            element: <Words/>
        },


    ]

}]);
function App() {
    return <RouterProvider router={router} />;
}
export default App
