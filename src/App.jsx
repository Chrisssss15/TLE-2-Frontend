import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Alphabet from "./Alphabet.jsx";
import Profiel from "./Profiel.jsx";
import Privacy from "./Privacy.jsx";
import Contact from "./Contact.jsx";

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


    ]

}]);
function App() {
    return <RouterProvider router={router} />;
}
export default App
