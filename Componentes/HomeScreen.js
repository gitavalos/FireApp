import React, { Component } from 'react';
import { Alert, Button, View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Card, Divider } from 'react-native-elements'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Wachter',
  };

  constructor(){
    super();
    this.state = {
      Temperatura : "0",
      Humedad : "0",
      Tip : "No descuides la cocina mientras tengas las ornillas encendidas!"
    };
  }

  componentDidMount(){
    var contador = (Math.floor(Math.random() * 4 )).toString();

    firebase.database().ref('Tip').child(contador)
      .on('value', data => {
        var value = data.val().toString();
        console.log(value);
        Alert.alert(
          'Tip del dia:',
          value
        );
      });



    const rootRef = firebase.database().ref().child('wachter');
    rootRef.limitToLast(1).on('child_added', data => {
         var temp = data.child('temp').val();
         //temp = temp.replace("\n","");
         var hum = data.child('hum').val();         
         this.setState({Temperatura : temp });
         this.setState({Humedad : hum });
    });      
  }


  render() {     
     
    return (
      <View style={{justifyContent: 'space-between'}}>
      <Card title="TEMPERATURA">
        <View style={{paddingBottom: 10}}>
        <Text>Temperatura Actual:</Text>
        <Text style={{textAlign: 'center'}}>{this.state.Temperatura} °C</Text>
        </View>
        <Button
          title="Ver Historial Temperatura"
          onPress={() => this.props.navigation.navigate('Temperatura')}
        />      
        </Card>
        <Card title ="HUMEDAD">
        <View style={{paddingBottom: 10}}>
        <Text>Humedad Actual:</Text>
        <Text style={{textAlign: 'center'}}>{this.state.Humedad} °</Text>
        </View>
        <Button
          title="Ver Historial Humedad"
          onPress={() => this.props.navigation.navigate('Humedad')}
        />              
      </Card>
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
})

export default HomeScreen;