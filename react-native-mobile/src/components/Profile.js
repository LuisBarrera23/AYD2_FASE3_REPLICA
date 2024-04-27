import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [genre, setGenre] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [foto, setFoto] = useState("");
    const [selectedImage, setSelectedImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
    const [base64Image, setBase64Image] = useState('');
    const apiIp = config.apiIp;

    useEffect(() => {
        AsyncStorage.getItem('userData')
            .then(userData => {
                if (userData) {
                    const dataUser = JSON.parse(userData);
                    // console.log(dataUser?.nombre)
                    setFirstName(dataUser?.nombre);
                    setLastName(dataUser?.apellido);
                    setUsername(dataUser?.username);
                    setEmail(dataUser?.correo);
                    setFoto(dataUser?.image);
                    if (dataUser.image !== null) {
                        setSelectedImage(dataUser?.image);
                    }

                    const fecha = new Date(dataUser?.fecha_nac);
                    const formattedDate = fecha.toISOString().split('T')[0];
                    setBirthDate(formattedDate);

                    if (dataUser?.sexo === 'M') {
                        setGenre("Masculino");
                    } else {
                        setGenre("Femenino");
                    }
                }
            })
            .catch(error => {
                console.error('Error al recuperar datos del usuario:', error);
            });
    }, []);

    const handleUpdate = () => {
        AsyncStorage.getItem('userData')
            .then(userData => {
                if (userData) {
                    const dataUser = JSON.parse(userData);
                    let imagen = "";
                    let cambio = false;
                    if (base64Image === '') {
                        imagen = foto;
                    } else {
                        imagen = base64Image;
                        cambio = true
                    }
                    const data = {
                        id_user: dataUser.id_user,
                        nombre: firstName,
                        apellido: lastName,
                        username: username,
                        correo: email,
                        fecha_nac: birthDate,
                        sexo: dataUser.sexo,
                        newPassword: newPassword,
                        currentPassword: currentPassword,
                        image: imagen,
                        imageBool: cambio
                    }
                    // console.log(newPassword)
                    // console.log(currentPassword)

                    fetch(`${apiIp}:5000/updateUser`, {
                        method: "PUT",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => response.json())
                        .then((res) => {
                            // console.log(res)
                            if (res.success === true) {
                                const newDataUser = res.user;
                                AsyncStorage.setItem('userData', JSON.stringify(newDataUser));
                                setNewPassword("");
                                setCurrentPassword("");
                                setFoto(res.user.image);
                                setSelectedImage(res.user.image);
                                setBase64Image('');
                                Alert.alert('Update data', res.message);
                            } else {
                                Alert.alert('Update data', res.message);
                                setFirstName(dataUser.nombre);
                                setLastName(dataUser.apellido);
                                setUsername(dataUser.username);

                                const fecha = new Date(dataUser.fecha_nac);
                                const formattedDate = fecha.toISOString().split('T')[0];
                                setBirthDate(formattedDate);
                                setNewPassword("");
                                setCurrentPassword("");
                                // Imagen que se obtiene de dataUser.image
                                // const image = localStorage.getItem("image");
                                // setFoto(image);
                                setSelectedImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
                                setBase64Image('');
                            }
                        })
                        .catch((error) => console.error(error));
                }
            })
            .catch(error => {
                console.error('Error al recuperar datos del usuario:', error);
            });
    };

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        convertImageToBase64(result.assets[0].uri).then((base64) => {
            setSelectedImage(base64);
            setBase64Image(base64);
            return;
        });
        setSelectedImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
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
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.profileImage} />
                <View style={styles.buttonContainer}>
                    <Button title="Choose Image" onPress={handleImagePick} />
                </View>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Birthdate"
                    value={birthDate}
                    onChangeText={setBirthDate}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Genre"
                    value={genre}
                    onChangeText={setGenre}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Current Password"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry={true}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Update" onPress={handleUpdate} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    formContainer: {
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        color: "#007bff",
    },
});

export default Profile;