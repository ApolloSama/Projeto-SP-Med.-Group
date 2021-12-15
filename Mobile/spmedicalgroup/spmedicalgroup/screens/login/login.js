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
import api from '../Services/api'


export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: 'email6@gmail.com',
      senha: 'senha6123'
    };
  }

  fazerLogin = async () => {
    const resp = await api.post('/Login', {
      email: this.state.email,
      senha: this.state.senha,
    }) 

    const token = resp.data.token;
    await AsyncStorage.setItem('TokenU', token);

    if (resp.status == 200) {
      this.props.navigation.navigate('Main')
    }
  }
  
  
  
  render(){
    return (
     <View   style={styles.container}>
       <Text style={styles.tituloLogo}>Roman</Text>
       <Image source={require('../assets/img/logoLoginn.png')}
          style={styles.imgLogo}
       />
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
       onPress={this.fazerLogin}
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
    backgroundColor: 'rgba(39,198,250,0.66)'
 },
 inputLogin:{
   width: 240,
   height: 50,
   marginBottom: 20,
   color: 'black',
   borderBottomColor: 'black',
   borderBottomWidth: 2

 },
 imgLogo:{
   tintColor: 'black',
   width: 122,
   height: 99.25,
   marginBottom: 45,
   shadowColor:'black',
   shadowOffset:{width:0,height:4},
   shadowOpacity:0.25,
   
 },

 btnLogin:{
 width:180,
 height:27,
 backgroundColor: 'rgba(251,251,251,0.56)',
 borderRadius:50,
 alignItems:'center',
 justifyContent:'center',
 marginTop:50
 },

 btnText:{
  color:"#007EA7"
 },
 tituloLogo:{
   fontSize: 48,
   fontFamily: 'Rosarivo-Regular',
   marginBottom: 70
 }


});