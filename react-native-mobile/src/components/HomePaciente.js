import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomePaciente({ navigation }) {
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
