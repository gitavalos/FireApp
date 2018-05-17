import React, { Component } from 'react';
import { ScrollView, Alert, Button, FlatList, View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Card, Divider,ListItem } from 'react-native-elements';
import Grafica from './Grafica';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Wachter',
  };

  constructor(){
    super();
    this.state = {
      Temperatura : "0",
      Humedad : "0",
      Tip : "No descuides la cocina mientras tengas las ornillas encendidas!", 
      Color_Temperatura : "green",
      Color_Humedad: "green",
      lista_humedad : [],
      lista_temperatura : []
    };
  }

  componentDidMount(){
    var contador = (Math.floor(Math.random() * 4 )).toString();

    firebase.database().ref('Tip').child(contador)
      .on('value', data => {
        var value = data.val().toString();
        Alert.alert(
          'Tip del dia:',
          value
        );
      });



    firebase.database().ref().child('wachter')
    .limitToLast(1)
    .on('child_added', data => {
         var temp = data.child('temp').val();
         var hum = data.child('hum').val();         
         this.setState({Temperatura : temp });
         this.setState({Humedad : hum });

          var color = "green";
          var valor = temp;
          if (valor > 25 ){
            color = "red";
          }else if(valor > 22){
            color = "yellow";
          }  
          this.setState({Color_Temperatura : color});

          color = "red";
          valor = parseInt(hum);
          if (valor > 29 && valor < 51 ){
            color = "green";
          }else if(valor > 20 && valor < 60 ){
            color = "yellow"
          }

          this.setState({Color_Humedad : color});

    });   
    
    firebase.database().ref().child('wachter')
    .limitToFirst(5).on('value', data => {
      var lista_humedad =[];
      var snap = data.val();
      var keys = Object.keys(snap);
      for (var i = 0; i < keys.length; i++){        
        var k = keys[i];
        var humedad = snap[k].hum;
        var fecha = snap[k].fecha;
        var hora = snap[k].hora;
        var temp = [];
        temp['key'] = k;
        temp['fecha'] = fecha;
        temp['hora'] = hora;
        temp['temperatura'] = humedad;
        lista_humedad.push(temp);
      }
      this.setState({lista_humedad : lista_humedad.reverse()});    
    });  

    firebase.database().ref().child('wachter')
    .limitToFirst(5).on('value', data => {
      var lista_temperatura =[];
      var snap = data.val();
      var keys = Object.keys(snap);
      for (var i = 0; i < keys.length; i++){        
        var k = keys[i];
        var temperatura = snap[k].temp;
        var fecha = snap[k].fecha;
        var hora = snap[k].hora;
        var temp = [];
        temp['key'] = k;
        temp['fecha'] = fecha;
        temp['hora'] = hora;
        temp['temperatura'] = temperatura;
        lista_temperatura.push(temp);
      }
      this.setState({lista_temperatura : lista_temperatura.reverse()});    
    }); 
   
  }



  render() {  
    
    var list_temperatura = <FlatList       
    data={this.state.lista_temperatura} 
    renderItem={({item, i}) => 
    <ListItem roundAvatar key={i} title={item.temperatura} subtitle={`${item.fecha} ${item.hora}`} />      
    }/>;
    
    var datos_graf = this.state.lista_temperatura.map(item => parseInt(item.temperatura));
    datos_graf.reverse();
    
    var list_humedad = <FlatList       
    data={this.state.lista_humedad} 
    renderItem={({item, i}) => 
    <ListItem key={i} title={item.temperatura} subtitle={`${item.fecha} ${item.hora}`} />      
    }/>;

    var datos_graf = this.state.lista_humedad.map(item => parseInt(item.temperatura));
    datos_graf.reverse();

    return (
      <ScrollView >
      <Card title="TEMPERATURA">
        <View style={{paddingBottom: 10, backgroundColor: this.state.Color_Temperatura}}>
        <Text>Temperatura Actual en el Ambiente:</Text>
        <Text style={{textAlign: 'center'}}>{this.state.Temperatura} °C</Text>
        </View>
        <Button
          title="Ver Historial Temperatura"
          onPress={() => this.props.navigation.navigate('Temperatura')}
        />      
      </Card>
      <Card title ="HUMEDAD">
        <View style={{paddingBottom: 10, backgroundColor: this.state.Color_Humedad}}>
        <Text>Humedad Actual en el Amiente:</Text>
        <Text style={{textAlign: 'center'}}>{this.state.Humedad} %</Text>
        </View>
        <Button
          title="Ver Historial Humedad"
          onPress={() => this.props.navigation.navigate('Humedad')}
        />              
      </Card>      
      <Card title = "Ultimas 5 lecturas de temperatura">  
      <View> 
      <Grafica data={datos_graf}/>                
      {list_temperatura}  
      </View>
      </Card>  
      <Card title = "Ultimas 5 lecturas de humedad">  
      <View> 
      <Grafica data={datos_graf}/>                
      {list_humedad}  
      </View>
      </Card>
      </ScrollView>
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