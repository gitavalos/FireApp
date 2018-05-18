import React, { Component } from 'react';
import { ScrollView, Alert, Button, FlatList, View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Card, Divider,ListItem } from 'react-native-elements';
import Grafica from './Grafica';
import { Constants, Audio } from 'expo';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Wachter',
  };
  
  recargar=()=>{
	var contador = (Math.floor(Math.random() * 4 )).toString();

    firebase.database().ref('Tip').child(contador)
      .on('value', data => {
        var value = data.val().toString();
        this.setState({Tip_Dia : value});
      });
  }

  constructor(){
    super();
    this.state = {
        Tip_Dia : "[!TIP DEL DIA!]"
    };
  }

  componentDidMount(){
    var contador = (Math.floor(Math.random() * 4 )).toString();

    firebase.database().ref('Tip').child(contador)
      .on('value', data => {
        var value = data.val().toString();
        this.setState({Tip_Dia : value});
      });
  }



  render() {  
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'steelblue'
          }}>	
		  <Button
          title="ver otro tip"
          onPress={() => this.recargar()}
          /> 		  
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 50, textAlign: 'center' }}>{this.state.Tip_Dia}</Text>
          <Button
          title="Pantalla Principal"
          onPress={() => this.props.navigation.navigate('Home')}
           />  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    width: 50, 
    height: 50, 
    backgroundColor: 'steelblue'
  },
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeScreen;