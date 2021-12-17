import React, { Component } from 'react';
import {

  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,

  View,
  ColorPropType,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../Services/api';
import jwt_decode from "jwt-decode";


export default class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: 'email6@gmail.com',
      senha: 'senha6123'
    };
  }

  efetuarLogin = async () => {
    const resp = await api.post('/Login', {
      email: this.state.email,
      senha: this.state.senha,
    }) 

    const token = resp.data.token;
    await AsyncStorage.setItem('TokenU', token);

    let Role = jwt_decode(token).role;

    if (resp.status == 200 && Role === '2') {
        this.props.navigation.navigate('Medico');
      }
      else if (resp.status == 200 && Role === '3') {
        this.props.navigation.navigate('Paciente');
      }
  }
  
  
  
  render(){
    return (
     <View   style={styles.container}>
       <Image source={require('../assets/img/logoLoginn.png')}
          style={styles.imgLogo}
       />
       <Text style={styles.tituloLogo}>Sp. Med Group</Text>
       <TextInput style={styles.inputLogin}
       placeholder="Email" placeholderTextColor="rgba(0,0,0,0.65)"
       keyboardType="email-address"
       onChangeText={email => this.setState({email})}
       />
       <TextInput style={styles.inputLogin}
       placeholder="Senha"
       placeholderTextColor="rgba(0,0,0,0.65)"
       keyboardType="default"
       onChangeText={senha => this.setState({senha})}
       secureTextEntry={true} 
       ></TextInput>

       <TouchableOpacity
       style={styles.btnLogin}
       onPress={this.efetuarLogin}
       > 
       <Text  style={styles.btnText}>
       Login
       </Text>

       </TouchableOpacity>


     </View>
    );
  }
};

const styles = StyleSheet.create({
 container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,1)'
 },
 inputLogin:{
   width: 240,
   height: 40,
   marginBottom: 10,
   color: 'black',
   borderBottomColor: 'black',
   borderBottomWidth: 2

 },
 imgLogo:{
    marginBottom: 30,
   shadowColor:'black',
   shadowOffset:{width:0,height:4},
   shadowOpacity:0.25,

   
 },

 btnLogin:{
 width:180,
 height:27,
 backgroundColor: '#2C05EB',
 borderRadius:15,
 alignItems:'center',
 justifyContent:'center',
 marginTop:50
 },

 btnText:{
  color:"#FFFFFF"
 },

 tituloLogo:{
   fontSize: 48,
   fontFamily: 'Rosarivo-Regular',
   marginBottom: 20,
   marginTop: 40
 }


});