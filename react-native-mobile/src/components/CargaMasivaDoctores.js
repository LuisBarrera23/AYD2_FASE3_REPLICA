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

    const handlePost = () => {
        if (!csvFile) {
            alert('No se ha seleccionado ningún archivo');
            return;
        }

        // Muestra el contenido del archivo
            fetch(csvFile.uri)
            .then(response => response.text())
            .then(text => {
                // Almacena el contenido del archivo en una variable
                const fileContent = text;
                
                // Llama a tu API aquí para enviar el archivo
                const data = {
                    name: csvFile.name,
                    contenido: fileContent
                };
                
                //console.log('Archivo seleccionado:', data.name);
                //console.log('Contenido del archivo:', data.contenido);

                // Envía la data a la API utilizando fetch u otra función para realizar la solicitud
                fetch(`${apiIp}:5000/uploadCSV`, {
                    method: 'POST',
                    body: data
                })
                .then(response => response.json())
                .then(responseData => {
                    setCsvFile(null);
                    alert(responseData.message);
                })
                .catch(error => {
                    console.error('Error al enviar archivo a la API:', error);
                });
            })
            .catch(error => {
                console.error('Error al obtener el contenido del archivo:', error);
            });
        
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