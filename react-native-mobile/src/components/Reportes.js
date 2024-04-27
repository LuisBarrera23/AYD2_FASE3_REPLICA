import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import config from '../../config';


function Reportes() {
    const [reporte1, setReporte1] = useState([{email:'prueba',name:'prueba',username:'prueba'}]);
    const [reporte2, setReporte2] = useState([{citas:5,email:'prueba',name:'prueba',username:'prueba'}]);
    const [reporte3, setReporte3] = useState([{name:'prueba',stock:5},{name:'prueba',stock:25},{name:'prueba',stock:50},]);
    const [reporte4, setReporte4] = useState([{name:'prueba',stock:0},{name:'prueba',stock:74},{name:'prueba',stock:100}]);
    const [reporte5, setReporte5] = useState([{name:'prueba',price:10}, {name:'prueba',price:40}, {name:'prueba',price:100}]);
    const [refreshKey, setRefreshKey] = useState(0);
    const apiIp = config.apiIp;

    useEffect(() => {
        fetch(`${apiIp}:5000/getReportes/2`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((res) => {
                setReporte1(res.reporte1);
                setReporte2(res.reporte2);
                setReporte3(res.reporte3);
                setReporte4(res.reporte4);
                setReporte5(res.reporte5);
            })
            .catch((error) => console.error(error));
    }, [refreshKey]);

    const handleRefresh = () => {
        setRefreshKey((refreshKey) => refreshKey + 1);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.reportContainer}>
                <Text style={styles.title}>Últimos 5 usuarios registrados:</Text>
                {reporte1.map((user, index) => (
                    <View key={index} style={styles.userContainer}>
                        <Text>{index + 1}.</Text>
                        <Text>Name: {user.name}</Text>
                        <Text>Email: {user.email}</Text>
                        <Text>Username: {user.username}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.reportContainer}>
                <Text style={styles.title}>Doctores con mayor cantidad de citas atendidas:</Text>
                {reporte2.map((user, index) => (
                    <View key={index} style={styles.userContainer}>
                        <Text>{index + 1}.</Text>
                        <Text>Name: {user.name}</Text>
                        <Text>Email: {user.email}</Text>
                        <Text>Username: {user.username}</Text>
                        <Text>Citas atendidas: {user.citas}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.reportContainer}>
                <Text style={styles.title}>Top 3 productos con mayor stock:</Text>
                <BarChart
                    data={{
                        labels: reporte3.map((producto) => producto.name),
                        datasets: [
                            {
                                data: reporte3.map((producto) => producto.stock)
                            }
                        ]
                    }}
                    width={300}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#0d0c1b',
                        backgroundGradientFrom: '#0d0c1b',
                        backgroundGradientTo: '#0d0c1b',
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>

            <View style={styles.reportContainer}>
                <Text style={styles.title}>Top 3 productos con menor stock:</Text>
                <BarChart
                    data={{
                        labels: reporte4.map((producto) => producto.name),
                        datasets: [
                            {
                                data: reporte4.map((producto) => producto.stock)
                            }
                        ]
                    }}
                    width={300}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#0d0c1b',
                        backgroundGradientFrom: '#0d0c1b',
                        backgroundGradientTo: '#0d0c1b',
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                />
            </View>

            <View style={styles.reportContainer}>
                <Text style={styles.title}>Top 3 productos con mayor precio:</Text>
                <BarChart
                    data={{
                        labels: reporte5.map((producto) => producto.name),
                        datasets: [
                            {
                                data: reporte5.map((producto) => producto.price)
                            }
                        ]
                    }}
                    width={300}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#0d0c1b',
                        backgroundGradientFrom: '#0d0c1b',
                        backgroundGradientTo: '#0d0c1b',
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20
    },
    reportContainer: {
        backgroundColor: '#0d0c1b',
        borderRadius: 25,
        marginBottom: 20,
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10
    },
    userContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    }
});

export default Reportes;
