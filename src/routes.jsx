import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Index from './pages/index';
import Login from './pages/login';
import Register from './pages/register';
import Favorites from './pages/favorites';
import { useAuth } from './hooks/useAuth';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children, redirectTo }) => {
  const { token } =  useAuth();
  useEffect(() => {    
    if(!token) toast.warn('É necessário estar logado para acessar esta página')
  }, [])
  return token ? children : <Navigate to={redirectTo} />;
};

const LoggedRoute = ({children, redirectTo}) => {
  const { token } = useAuth();
  return token ? <Navigate to={redirectTo} /> : children;
};
  
export default function AllRoutes() {

  return (
      <Router>
        <Fragment>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/favorites' element={<PrivateRoute redirectTo='/login'><Favorites /></PrivateRoute>}/>
            {
              /**
               * ROTAS PRIVADAS
            <Route path='/perfil' element={<PrivateRoute redirectTo='/login'><Perfil /></PrivateRoute>}/>
                */
            }
            {
              /**
               * ROTAS PÚBLICAS
               */
            }
            {/* <Route path='*' element={<Template404 />}/> */}
          </Routes>
        </Fragment>
      </Router>
  )
}