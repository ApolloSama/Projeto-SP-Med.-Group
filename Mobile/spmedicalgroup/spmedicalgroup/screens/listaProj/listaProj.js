import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    Image,
    TextInput,
    FlatList,
    View,
    ScrollView,
    SectionList
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../Services/api';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

export default class Projetos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaProjetos: []
        }
    }

    buscarProj = async () => {
        const token = await AsyncStorage.getItem('TokenU');


        const resp = await api.get('/Projetos', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }
        );
        this.setState({ listaProjetos: resp.data })
    };

    componentDidMount() {
        this.buscarProj();

    }

    realizarLogout = async () => {
        try {
            await AsyncStorage.removeItem('TokenU');
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.warn(error);
        }
    };

    render() {
        return (

            <View >



                <FlatList


                    ListHeaderComponent={
                        <>
                        <View  style={styles.container_btn}>
                            <TouchableOpacity
                                style={styles.btnSair}
                                onPress={this.realizarLogout}>
                                <Text style={styles.btnLogoutText}>sair</Text>
                            </TouchableOpacity>
                        </View>
                            <TouchableOpacity
                                style={styles.btnCadastro}
                                onPress={this.buscarProj}
                            >
                                <View style={styles.b}>

                                    <Text style={styles.btnText}>
                                        Atualizar
                                    </Text>
                                    <Image style={styles.refreshIcon} source={require('../assets/img/refreshIcon.png')} />
                                </View>


                            </TouchableOpacity>
                            <Text style={styles.textoP}>Projetos</Text>
                            <Image source={require('../assets/img/menina.png')}
                                style={styles.imgmenina} />
                        </>
                    }
                    ListFooterComponent={
                        <>
                        
                        </>

                    }
                    contentContainerStyle={styles.container}
                    data={this.state.listaProjetos}
                    keyExtractor={item => item.idProjeto}
                    renderItem={this.renderItem}

                />

            </View>
            // </ScrollView>
        )
    }

    renderItem = ({ item }) => (

        <View style={styles.quadrado}>
            <Text style={styles.nomeP}>{item.nome}</Text>
            <Text style={styles.nomeTema}>{item.idTemaNavigation.nomeTema}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        backgroundColor: 'rgba(39,198,250,0.05)',
        
    },

    textoP: {
        fontSize: 36,
        marginTop: 40,
        marginBottom: 40,
        marginLeft: 45,
        fontFamily: 'Rosarivo-Regular',
    },

    imgmenina: {
        marginBottom: 50,
        marginLeft: 20

    },

    quadrado: {
        borderColor: 'rgba(39,198,250,100)',
        borderWidth: 1,
        width: 319,
        height: 200,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 55

    },
    nomeP: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(39,198,250,100)",
        paddingTop: 13,
        paddingBottom: 8,
        fontFamily: 'Rosarivo-Regular',

    },

    nomeTema: {
        fontSize: 16,
        paddingTop: 20
    },

    descricao: {
        width: 270,
        paddingTop: 20
    },
    b: {
        width: 90,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        backgroundColor: 'rgba(39,198,250,0.32)',
        marginLeft: 70,
        borderRadius: 20

    },
    refreshIcon: {
        marginTop: 3,
        marginLeft: 5
    },
    btnSair: {
        width: 71,
        height: 22,
        backgroundColor: 'rgba(39,198,250,0.66)',
        borderRadius: 50,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 20,
    },
    container_btn:{
       
    }




});