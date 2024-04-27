// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeDoctor({ navigation }) {
  return (
    <View>
      <Text></Text>
      <Button title="Atender Citas" onPress={() => navigation.navigate('Atender Citas')} />
      <Text></Text>
      <Button title="Historial Citas" onPress={() => navigation.navigate('Historial Citas')} />
      
    </View>
  );
}

export default HomeDoctor;