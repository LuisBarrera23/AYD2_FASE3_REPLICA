import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import config from '../../config';
const Signup = ({ navigation }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState(new Date());
    const [gender, setGender] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imagenBase64, setImagenBase64] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const formattedDate = format(birthdate, 'dd/MM/yyyy');
    const apiIp = config.apiIp;


    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const handleSignup = () => {
        if (imagenBase64) {
            const data = {
                nombre: name,
                apellido: lastName,
                fecha_nac: birthdate,
                sexo: gender,
                username: username,
                correo: email,
                password: password,
                image: imagenBase64,
                rol: '2',
            };

            // console.log(data);

            // Aquí reemplaza 'apiIp' con la IP de tu API
            fetch(`${apiIp}:5000/adduser`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    // console.log(res);

                    if (res.success === true) {
                        Alert.alert('Registro exitoso', res.message);
                        setName('');
                        setLastName('');
                        setBirthdate(new Date());
                        setGender('');
                        setUserName('');
                        setEmail('');
                        setPassword('');
                        setImagenBase64(null);
                        navigation.navigate("Login")
                        // Navegar al inicio o a la pantalla que desees
                    } else {
                        Alert.alert('Error', res.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    Alert.alert('Error', 'Ha ocurrido un error al registrar el usuario.');
                });
        } else {
            Alert.alert('Error', 'Debes subir una imagen de perfil.');
        }
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
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>

                <View style={styles.formContainer}>
                    <Image source={require('../Images/Logo.png')} style={styles.logo} />

                    <View style={styles.form}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your last name"
                            value={lastName}
                            onChangeText={setLastName}
                        />

                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your username"
                            value={username}
                            onChangeText={setUserName}
                        />

                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter email"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={styles.label}>Gender</Text>
                        <Picker
                            selectedValue={gender}
                            style={styles.pickerSelect}
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                        >
                            <Picker.Item label="Select Gender" value="" />
                            <Picker.Item label="Male" value="M" />
                            <Picker.Item label="Female" value="F" />
                        </Picker>
                        <Text style={styles.label}>Birthdate</Text>
                        {isDatePickerVisible && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={birthdate}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || birthdate;
                                    setBirthdate(currentDate);
                                    setDatePickerVisibility(false);
                                }}
                            />
                        )}
                        <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.dateButton}>
                            <Text style={styles.input}>{birthdate ? formattedDate : 'Select Birthdate'}</Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <TouchableOpacity onPress={handleImagePick} style={{ backgroundColor: 'lightgray', padding: 10, marginBottom: 10 }}>
                            <Text>Seleccionar Imagen</Text>
                        </TouchableOpacity>




                        {imagenBase64 && <Image source={{ uri: imagenBase64 }} style={{ width: 200, height: 200, marginBottom: 10 }} />}


                        <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                            <Text style={styles.loginText}>You already have an account? Sign in <Text style={styles.loginLink}>here</Text>.</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        flex: 2,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    logo: {
        width: 250,
        height: 250,
    },
    form: {
        width: '80%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    uploadButton: {
        backgroundColor: '#f0ad4e',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
    selectedImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    signupButton: {
        backgroundColor: '#5bc0de',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButton: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    loginText: {
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center',
    },
    loginLink: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});

export default Signup;
