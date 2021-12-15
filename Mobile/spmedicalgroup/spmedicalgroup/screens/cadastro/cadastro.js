import axios from 'axios';
// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    Image,
    TextInput,
    FlatList,
    View,
    ScrollView,
    SectionList,
    TouchableOpacity
} from 'react-native';
import api from '../Services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
          nome: '',
          idTema:0,
        //   listaTema:[1, 2, 3, 4,5,6,7],
        itemValue: 0,
          descricao: ''
        };
      }


      cadastrar = async ()  =>
      {
        try{


            const projeto = {
                    nome: this.state.nome,
                    idTema: this.state.itemValue,
                    descricao: this.state.descricao
            }


            const token = await AsyncStorage.getItem('TokenU');

            

            const resp = await api.post('/Projetos', projeto,{
                headers: {
                  Authorization: 'Bearer ' + token,
                }
            })

            if (resp.status === 201) {
                this.props.navigation.navigate('Projeto')
                this.setState({nome:''})
            }

        }catch (error){
            throw error
        }
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
            <TouchableOpacity
           style={styles.btnSair}
            onPress={this.realizarLogout}>
            <Text  >sair</Text>
          </TouchableOpacity>

                <Text style={styles.TextoC}>Cadastro</Text>
                <View style={styles.tudo}>
                    <TextInput style={styles.inputnome}
                        placeholder="Nome Projeto"
                        placeholderTextColor="rgba(0,0,0,0.65)"
                        keyboardType="default"
                        onChangeText={nome => this.setState({ nome })}
                        value={this.state.nome}

                    ></TextInput>

                    <Picker
                            style={styles.select}
                            selectedValue={this.state.itemValue}
                            style={{ height: 60, width: 327}}
                            onValueChange={(itemValue) => this.setState({itemValue})}
                        >
                            <Picker.Item label="Selecione um Tema" value={null} />
                            <Picker.Item label="Banco de dados" value={1} />
                            <Picker.Item label="ReactJS" value={2} />
                            <Picker.Item label="React Native" value={3} />
                            <Picker.Item label="Front-End" value={4} />
                            <Picker.Item label="Back-End" value={5} />
                            <Picker.Item label="Design" value={6} />
                            <Picker.Item label="Ux/Ui" value={7} />
                        </Picker>



                    <TextInput  style={styles.inputnome}
                        placeholder="Descrição"
                        placeholderTextColor="rgba(0,0,0,0.65)"
                        keyboardType="default"
                        onChangeText={descricao => this.setState({ descricao })}

                    ></TextInput>

                    <TouchableOpacity
                        style={styles.btnCadastro}
                        onPress={this.cadastrar}
                    >
                        <Text style={styles.btnText}>
                            Cadastrar
                        </Text>

                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main: {
      flex: 1
   
    },

    tudo: { 
        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(39,198,250,0.27)',
        borderRadius:20,
        width:'90%',
        height:'50%',
        marginLeft:20,
        flexDirection:'column'

     },
    

    TextoC:{
        fontSize:36,
        marginTop:80,
        marginBottom:80,
        alignItems:'center',
        marginLeft:130,
        fontFamily: 'Rosarivo-Regular',
        
        },

    inputnome:{
     width:300,
     borderBottomColor: 'rgba(39,198,250,0.66)',
     borderBottomWidth: 2

    },
    btnCadastro:{
        width:80,
        height:30,
        backgroundColor: 'rgba(39,198,250,0.66)',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
        },
       
        btnText:{
         color:"black"
        },

        select:{
            borderBottomColor: 'rgba(39,198,250,0.66)',
            borderBottomWidth: 2  
        },

        btnSair:{
            width:71,
            height:22,
            backgroundColor: 'rgba(39,198,250,0.66)',
            borderRadius:50,
            alignItems:'center',
            justifyContent:'center',
            marginTop:20,
            marginLeft:24
            
            },

  });