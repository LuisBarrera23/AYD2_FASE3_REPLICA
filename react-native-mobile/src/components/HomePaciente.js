import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomePaciente({ navigation }) {
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
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Perfil" onPress={() => navigation.navigate('Perfil paciente')} color="#007bff" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Programar cita" onPress={() => navigation.navigate('Programar cita')} color="#007bff" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ver productos" onPress={() => navigation.navigate('Ver productos')} color="#007bff" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Historial de citas" onPress={() => navigation.navigate('Historial citas paciente')} color="#007bff" />
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    marginBottom: 10,
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default HomePaciente;
