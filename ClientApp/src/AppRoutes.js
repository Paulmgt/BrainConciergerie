import { Counter } from "./components/Counter";
import Home from "./components/Home";
import DetailsAppart from "./components/Apparts/DetailsAppart";
import PrivateRoute from "./Config/PrivateRoute";
import Apparts from "./components/Apparts/Apparts";
import LoginForm from "./components/LoginForm";
import EditAppart from "./components/Apparts/EditAppart"
import Register from "./components/Register";


export const AppRoutes = [
    {
        path: '/login',
        element: <LoginForm />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <PrivateRoute element={<Home />} />
    },
    {
        path: '/counter',
        element: <PrivateRoute element={<Counter />} />
    },
    {
        path: '/appart',
        element: <PrivateRoute element={<Apparts />} />
    },
    {
        path: '/details/:id',
        element: <PrivateRoute element={<DetailsAppart />} />
    },
    {
        path: '/edit_appart/:id',
        element: <PrivateRoute element={<EditAppart />} />
    },
   
];


export default AppRoutes;
