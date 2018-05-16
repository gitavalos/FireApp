import React from 'react';
import { Button, View, Text, FlatList, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { ListItem, Card } from 'react-native-elements'
import Grafica from './Grafica';

class HumedadScreen extends React.Component {

  constructor(){
    super();
    this.state = {
      lista_temperatura : []
    };
  }

  componentDidMount(){ 

    const rootRef = firebase.database().ref().child('wachter');
    rootRef.on('value', data => {
      var lista_temperatura =[];
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
        lista_temperatura.push(temp);
      }
      this.setState({lista_temperatura : lista_temperatura.reverse()});    
    });      
  }


  static navigationOptions = {
    title: 'Humedad (°)',
  };

  render() {
    var list = <FlatList       
    data={this.state.lista_temperatura} 
    renderItem={({item, i}) => 
    <ListItem key={i} title={item.temperatura} subtitle={`${item.fecha} ${item.hora}`} />      
    }/>;

    var datos_graf = this.state.lista_temperatura.map(item => parseInt(item.temperatura));
    datos_graf.reverse();

  return (      
    <View style={styles.container}>
    <Grafica data={datos_graf}/>
    <Card>             
      {list}  
    </Card>     
    </View>    
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})    



export default HumedadScreen;