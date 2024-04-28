// HomeScreen.js
import React from 'react';
import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeDoctor({ navigation }) {
  const handleDeleteUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      Alert.alert('Éxito', 'Sesion cerrada con exito');
      navigation.navigate('Login')
    } catch (error) {
      console.error('Error al eliminar los datos de usuario:', error);
      Alert.alert('Error', 'Hubo un problema al cerrar sesion');
    }
  };

  return (
    <View>
      <Text></Text>
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil paciente')} color="#007bff" />
      <Text></Text>
      <Button title="Atender Citas" onPress={() => navigation.navigate('Atender Citas')} />
      <Text></Text>
      <Button title="Historial Citas" onPress={() => navigation.navigate('Historial Citas')} />
      <TouchableOpacity
        style={{
          backgroundColor: '#DC2C2C',
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={handleDeleteUserData}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Cerrar Sesion</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeDoctor;