import React, { Component, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {

    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../Services/api';

export default class Medico extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaConsultas: [],
        };
    }

    Logout = async () => {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Login');
    }


    buscarConsultas = async () => {

        const token = await AsyncStorage.getItem('TokenU')

        const resposta = await api.get('/Usuarios/minhas', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });

        //console.warn(resposta);

        const dadosDaApi = resposta.data;
        this.setState({ listaConsultas: dadosDaApi });
    };



    componentDidMount() {
        this.buscarConsultas();
        //console.warn(listaConsultas);
    }


    render() {
        return (
            <ImageBackground style={styles.fundoMedico} source={require('../assets/img/background.png')}>
                <StatusBar animated={true}
                    backgroundColor="#61dafb"
                    //barStyle={statusBarStyle}
                    //showHideTransition={statusBarTransition}
                    hidden={false}
                />
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Listagem Médico</Text>
                    <TouchableOpacity style={styles.logout} onPress={this.Logout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>


                <FlatList
                    contentContainerStyle={styles.bodyConteudo}
                    data={this.state.listaConsultas}
                    keyExtractor={item => item.idConsulta}
                    renderItem={this.renderItem}
                />

            </ImageBackground>
        )
    }

    renderItem = ({ item }) => (
        <View style={styles.boxConteudo}>
            <View style={styles.conteudoItem}>
                <Text style={styles.conteudoTitulo}>Paciente: </Text>
                <Text style={styles.conteudoDados}>{item.idPacienteNavigation.nomePaciente}</Text>
            </View>
            <View style={styles.conteudoItem}>
                <Text style={styles.conteudoTitulo}>Médico: </Text>
                <Text style={styles.conteudoDados}>{item.idMedicoNavigation.nomePaciente}</Text>
            </View>
            <View style={styles.conteudoItem}>
                <Text style={styles.conteudoTitulo}>Data: </Text>
                <Text style={styles.conteudoDados}>
                    {Intl.DateTimeFormat("pt-BR", {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                        hour: 'numeric', minute: 'numeric', hour12: true
                    }).format(new Date(item.dataConsulta))}
                </Text>
            </View>
            <View style={styles.conteudoItem}>
                <Text style={styles.conteudoTitulo}>Situação: </Text>
                <Text style={styles.conteudoDados}>{item.idSituacaoNavigation.nomeSituacao}</Text>
            </View>
            <View style={styles.conteudoItem}>
                <Text style={styles.conteudoTitulo}>Descrição: </Text>
                <Text style={styles.conteudoDados}>{item.descricao}</Text>
            </View>



        </View>

    )


}

const styles = StyleSheet.create({

    fundoMedico: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        height: 50,
        width: '100%',
        alignItems: "center",
        backgroundColor: '#FFFFFF',
    },

    tituloPagina: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },

    bodyConteudo: {
        marginTop: 15,

    },

    boxConteudo: {
        backgroundColor: '#FFFFFF',
        //width: 350,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
    },

    conteudoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    conteudoTitulo: {
        width: '25%',
        color: '#000000',
        fontWeight: 'bold',
    },

    conteudoDados: {
        width: '75%',
        textAlign: 'right',
        color: '#000000',
    }

});

