import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import config from '../../config';

function CargaMasivaDoctores() {
    const [csvFile, setCsvFile] = useState(null); 
    const apiIp = config.apiIp;

    const handleFilePick = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'text/csv', // Tipo de archivo permitido (en este caso, CSV)
            });


            if (!res.cancelled) {
                setCsvFile(res.assets[0]);
            } else {
                console.log('Cancelado por el usuario o error al seleccionar el archivo');
            }
        } catch (err) {
            console.error('Error picking file', err);
        }
    };

    const handlePost = async () => {
        if (!csvFile) {
            alert('No se ha seleccionado ningún archivo');
            return;
        }
    
        try {
            // Muestra el contenido del archivo
            const response = await fetch(csvFile.uri);
            const fileContent = await response.text();
            
            // Llama a tu API aquí para enviar el archivo
            const data = {
                name: csvFile.name,
                contenido: fileContent
            };
            
            console.log('Archivo seleccionado:', data.name);
            console.log('Contenido del archivo:', data.contenido);
    
            // Envía la data a la API utilizando fetch u otra función para realizar la solicitud
            const apiResponse = await fetch(`${apiIp}:5000/uploadv2CSV2`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            // Manejar la respuesta de la API
            if (apiResponse.ok) {
                const responseData = await apiResponse.json();
                console.log('Respuesta de la API:', responseData);
                alert(responseData.message)
            } else {
                console.error('Error al enviar archivo a la API:', apiResponse.statusText);
            }
        } catch (error) {
            console.error('Error al obtener el contenido del archivo o al enviarlo a la API:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Carga masiva de Doctores</Text>
            <Text></Text>
            <Button title="Seleccionar CSV" onPress={handleFilePick} />   
            <Text></Text>        
            {csvFile && <Text>{csvFile.name}</Text>}
            <Text></Text>
            <Button title="Cargar" onPress={handlePost} style={{ marginTop: 10 }} />
        </View>
    );
}

export default CargaMasivaDoctores;