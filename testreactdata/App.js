/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyC7O3h7Fm9dgGwd3BhbTqgCsx1uCpWfdQ8",
  authDomain: "reactdatabase-a561b.firebaseapp.com",
  databaseURL: "https://reactdatabase-a561b.firebaseio.com",
  projectId: "reactdatabase-a561b",
  storageBucket: "",
  messagingSenderId: "540599873880"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
var database = firebase.database();
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(props)
  {
    super(props);
    this.state = { text: '', result:'' ,listenstart:false};
    this._listenForItems=this._listenForItems.bind(this);
//    this.setState=this.setState.bind(this);
  }

  _listenForItems() {
    var starCountRef = firebase.database().ref('username');
      starCountRef.on('value',(snapshot)=> {
    //  updateStarCount(postElement, snapshot.val());
      console.log(snapshot.val());
      this.setState({result:snapshot.val()});
    });
  }
  componentDidMount()
  {
        this._listenForItems();
  }

  render() {


    return (
      <View style={styles.container}>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableHighlight
          onPress={()=>{firebase.database().ref().set({username: this.state.text});}}>
          <Text>
            Change data in database
          </Text>


        </TouchableHighlight>
        <Text>
          data in database:{this.state.result}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
