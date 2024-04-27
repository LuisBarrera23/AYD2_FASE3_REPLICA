// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeAdmin({ navigation }) {
  return (
    <View>
      <Text></Text>
      <Button title="Carga Masiva Doctores" onPress={() => navigation.navigate('Carga Masiva Doctores')} />
      <Text></Text>
      <Button title="Eliminar Doctor" onPress={() => navigation.navigate('Eliminar Doctor')} />
      <Text></Text>
      <Button title="Eliminar Usuario" onPress={() => navigation.navigate('Eliminar Usuario')} />
      <Text></Text>
      <Button title="Carga Masiva Productos" onPress={() => navigation.navigate('Carga Masiva Productos')} />
      <Text></Text>
      <Button title="Ingresar Producto" onPress={() => navigation.navigate('Ingresar Producto')} />
      <Text></Text>
      <Button title="Reportes" onPress={() => navigation.navigate('Reportes')} />
    </View>
  );
}

export default HomeAdmin;