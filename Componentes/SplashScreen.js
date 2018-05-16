import React, { Component } from 'react';
import { Alert, Text, AppRegistry, Button, StyleSheet, View } from 'react-native';
//import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Card, Divider } from 'react-native-elements'

class SplashScreen extends React.Component {

    _onPressButton() {
        Alert.alert('You tapped the button!')
    }


  componentDidMount(){ 
  }

  /*
<View style={{width: 350, height: 150, backgroundColor: 'steelblue'}}>
                <View style={styles.center}> 
                    <Text style={{textAlign: 'center'}}>Hola Mundo Pendejo!</Text>                    
                </View>
            </View>

  <Button
  onPress={() => {
    Alert.alert('You tapped the button!');
  }}
  title="Press Me"
/>
  */


  render() {
    return (
        <View style={styles.center}> 
            <Button onPress={this._onPressButton} 
            style={{width: 350, height: 150, backgroundColor: 'steelblue'}}
            title="Hola mundo"
            />    
        </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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

export default SplashScreen;