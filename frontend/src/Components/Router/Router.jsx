import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Login';
import Signup from '../Signup';
import Home from '../Home';
import HomePaciente from '../HomePaciente';

import Admin from '../Admin';
import Doctor from '../Doctor';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />  
        <Route path="/signup" element={<Signup />} />  
        <Route path="/home" element={<Home />} />
        <Route path="/homepaciente" element={<HomePaciente />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/doctor" element={<Doctor />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default Router;