import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import ForgotPassword from './components/ForgotPassword';

import Signup from './components/Signup';
import HomePaciente from './components/HomePaciente';
import Profile from './components/Profile';
import HomeDoctor from './components/HomeDoctor';

import HomeAdmin from './components/HomeAdmin';
import CargaMasivaDoctores from './components/CargaMasivaDoctores';
import CargaMasivaProductos from './components/CargaMasivaProductos';
import IngresarProducto from './components/IngresarProducto';
import EliminarDoctor from './components/EliminarDoctor';
import EliminarUsuario from './components/EliminarUsuario';
import Reportes from './components/Reportes';
import ListaCitas from './components/DAtenderCita';
import HistorialCitas from './components/DHistorialCita';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="Home Paciente" component={HomePaciente} />
        <Stack.Screen name="Perfil paciente" component={Profile} />

        <Stack.Screen name="Panel Administrador" component={HomeAdmin} />
        <Stack.Screen name="Panel Doctor" component={HomeDoctor} />

        <Stack.Screen name="Atender Citas" component={ListaCitas} />
        <Stack.Screen name="Historial Citas" component={HistorialCitas} />



        <Stack.Screen name="Carga Masiva Doctores" component={CargaMasivaDoctores} />
        <Stack.Screen name="Eliminar Doctor" component={EliminarDoctor} />
        <Stack.Screen name="Eliminar Usuario" component={EliminarUsuario} />
        <Stack.Screen name="Carga Masiva Productos" component={CargaMasivaProductos} />
        <Stack.Screen name="Ingresar Producto" component={IngresarProducto} />
        <Stack.Screen name="Reportes" component={Reportes} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;