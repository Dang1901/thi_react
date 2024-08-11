import { useRoutes } from "react-router-dom"
import ListProducts from "./Product/list"
import AddProduct from "./Product/add"
import EditProduct from "./Product/edit"
import PrivateRouter from "./privaterouter"
import Login from "./auth/login"
import Register from "./auth/register"


function App() {
  const route = useRoutes([
    {path: "/", element: <PrivateRouter><ListProducts/></PrivateRouter>},
    {path: "add", element: <PrivateRouter><AddProduct/></PrivateRouter>},
    {path: "edit/:id", element: <PrivateRouter><EditProduct/></PrivateRouter>},
    {path: "register", Component: Register},
    {path: "login", Component: Login},
  ])

  return route 
}

export default App
