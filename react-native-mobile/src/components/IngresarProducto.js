import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import config from '../../config';

function IngresarProducto() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    const [imagenBase64, setImagenBase64] = useState(null);
    const apiIp = config.apiIp;

    const handlePost = () => {
        const data = {
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            stock: stock,
            image: imagenBase64
        };
        fetch(`${apiIp}:5000/ingresarProducto`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((res) => {
                alert(res.message)
                setNombre("");
                setDescripcion("");
                setPrecio("");
                setImagenBase64("");
                setStock("");
            })
            .catch((error) => console.error(error));
    };


    const handleImagePick = async () => {
        // Permite al usuario seleccionar una imagen de la galería
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            
        });
        
        convertImageToBase64(result.assets[0].uri).then((base64) => {
            //console.log("IMAGEN EN BASE64: " + base64);
            setImagenBase64(base64);
        });
    };


    const convertImageToBase64 = async (imageUri) => {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const base64String = await blobToBase64(blob);
        return base64String;
    };

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
            <Text>Nombre:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Agrega el nombre del producto"
                value={nombre}
                onChangeText={text => setNombre(text)}
            />

            <Text>Descripción:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Agrega la descripción del producto"
                value={descripcion}
                onChangeText={text => setDescripcion(text)}
            />

            <Text>Precio:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Agrega el precio del producto"
                value={precio}
                onChangeText={text => setPrecio(text)}
            />

            <Text>Stock:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Agrega el stock del producto"
                value={stock}
                onChangeText={text => setStock(text)}
            />

            <TouchableOpacity onPress={handleImagePick} style={{ backgroundColor: 'lightgray', padding: 10, marginBottom: 10 }}>
                <Text>Seleccionar Imagen</Text>
            </TouchableOpacity>




            {imagenBase64 && <Image source={{ uri: imagenBase64 }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
            
            <Button title="Agregar" onPress={handlePost} />
        </View>
    );
}

export default IngresarProducto;