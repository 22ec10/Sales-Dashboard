import Dashboard from "./routes/dashboard";
import {createBrowserRouter} from "react-router-dom"
import ProtectedRoute from "./protectedRoutes";
import Signin from "./components/signin";
import SignUp  from "./components/signup";
import About from "./routes/about";
import Header from "./components/header";
import Footer from "./components/footer"
export const router = createBrowserRouter([
    {
        path:"/",
        element:(
            <>
              <Header/>
              <About/>
              <Footer/>
            </>
        )
    },
    {
        path:"/signin",
         element:(
            <>
              <Header/>
              <Signin/>
              <Footer/>
            </>
        )
    },
      {
        path:"/signup",
         element:(
            <>
              <Header/>
              <SignUp/>
              <Footer/>
            </>
        )
    },
    {
        path:"/dashboard",
         element:(
            <>
            <ProtectedRoute>
              <Header/>
              <Dashboard/>
              <Footer/>
            </ProtectedRoute>
            </>
        )
    },
])
export default router;