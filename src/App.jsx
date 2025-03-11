import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Alfabet from "./Alfabet.jsx";
import Profiel from "./Profiel.jsx";
import Privacy from "./Privacy.jsx";
import Contact from "./Contact.jsx";
import Grammar from "./Grammar.jsx";
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
            path:"/grammar",
            element: <Grammar/>
        },
        {
            path:"/flashcards",
            element: <Flashcards/>
        },



    ]

}]);
function App() {
    return <RouterProvider router={router} />;
}
export default App
