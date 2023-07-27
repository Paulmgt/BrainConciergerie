import Home from "./components/Home";
import DetailsAppart from "./components/DetailsVues/DetailsAppart";
import PrivateRoute from "./Config/PrivateRoute";
import AppartForm from "./components/Apparts/AppartForm";
import AuthForm from "./components/Auth/LoginForm";
import EquipmentVue from './components/DetailsVues/EquipementVue'
import AutresActivites from './components/DetailsVues/AutreActiviteVue'
import Bars from './components/DetailsVues/BarVue'
import Cinema from './components/DetailsVues/CinemaVue'
import NotationForm from "./components/DetailsVues/RatingVue";


export const AppRoutes = [
    {
        path: '/authform',
        element: <AuthForm />
    },
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/appart',
        element: <PrivateRoute element={<AppartForm />} />
    },
    {
        path: '/details/:id',
        element: <DetailsAppart />
    },
    {
        path: '/equipment/:id',
        element: <EquipmentVue />
    }, 
    {
        path: '/shopping/:id',
        element: <AutresActivites />
    }, 
    {
        path: '/cinema/:id',
        element: <Cinema />
    }, 
    {
        path: '/bar/:id',
        element: <Bars />
    }, 
    {
        path: '/rating/:id',
        element: <NotationForm />
    }, 

   
];


export default AppRoutes;
