import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import config from '../../config';

function EliminarUsuario() {
    const [doctors, setDoctors] = useState([{ id_user: 0, nombre: 'Juan', username: 'juanito' },{ id_user: 1, nombre: 'Juan2', username: 'juanito' }]);
    const apiIp = config.apiIp;

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = () => {
        fetch(`${apiIp}:5000/getUsuarios/2`)
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data);
            })
            .catch((error) => console.error(error));
    };

    const handleDelete = (id) => {
        alert("Eliminando usuario con ID: " + id);
        fetch(`${apiIp}:5000/deleteUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user: id })
        })
            .then((response) => response.json())
            .then((res) => {
                fetchUsuarios();
                alert(res.message);
            })
            .catch((error) => console.error(error));
    };

    //<Text style={styles.itemText}>Nombre: {item.nombre}, </Text>
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            
            <Text style={styles.itemText}>ID: {item.id_user}, </Text>
            <Text style={styles.itemText}>Username: {item.username} </Text>
            <Button title="Eliminar" onPress={() => handleDelete(item.id_user)} color="red" />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Usuarios</Text>
            <FlatList
                data={doctors}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_user.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    itemText: {
        fontSize: 16
    },
    separator: {
        height: 1,
        backgroundColor: 'darkgray',
        width: '100%'
    }
});


export default EliminarUsuario;