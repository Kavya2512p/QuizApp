import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import Play from "./Play"
import ResultPage from "./ResultPage"
import NotFound from "./NotFound"


function App() {
  const routes= createBrowserRouter(
    [
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/login",
        element:<Login />
      },
      {
        path:"/signup",
        element:<Signup />
      },
      {
        path:"/play",
        element:<Play />
      },
      {
        path:"*",
        element:<NotFound/>
      },
      {
        path:"/result",
        element:<ResultPage />
      },
    
    ]
  )

  return (
    <>
      <RouterProvider router={routes}/>
    </>


  )
}

export default App
