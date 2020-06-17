import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Item,
  Constants,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Card,
  AppRegistry,
  AsyncStorage,Alert,
  TouchableHighlight
} from 'react-native';

import {Header, Title, Body} from 'native-base';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state:0,
      latitude:0,
      longitude:0,
      DropLat:"",
      DropLong:""
    };
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
         this.fetchData();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
  }

  async fetchData() {}

  CheckTextInput = () => {
    if (this.state.DropLat == '' || this.state.DropLong == '') {
        alert('Please Enter the Fields');
      } else {
        this.props.navigation.navigate("Map", {DropLong:this.state.DropLong, DropLat:this.state.DropLat});
      }
  };

  render() {
    return (
      <View style={styles.Container}>
        <Image
          style={{width: 250, height: 219.5,resizeMode:'cover', alignSelf:"center"}}
          source={require('../assets/Logo.jpeg')}/>
        <Text style={{alignSelf:"center",fontStyle: 'italic',fontWeight:"bold", fontSize:17}}>Enter The Drop Location</Text>
        <TextInput placeholder="Latitude of the Drop" style={styles.textInput}  returnKeyType="done"
          keyboardType="numeric" onChangeText={(text) => this.setState({DropLat: text}) }/>
        <TextInput placeholder="Longitude of the Drop" style={styles.textInput}  returnKeyType="done"
          keyboardType="numeric" onChangeText={(text) => this.setState({DropLong: text}) }/>    
        <TouchableOpacity
          onPress={this.CheckTextInput}
          style={{height:50,width:"90%", borderRadius:8, borderWidth:2, alignSelf:"center", justifyContent: 'center',marginTop:40}}
          underlayColor=''>
          <Text style={{alignSelf:"center",fontStyle: 'italic'}}>Request a Drone</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  Container:{
    flex:1,
    backgroundColor:"#fff",
    height:"100%",
    width:"100%"  
  },
  header:{
    width: "100%",
    backgroundColor:"#98D9B7",
    alignSelf:"center",
    flexDirection:"column",
  },
  box:{
    width:"94%",
    alignSelf:"center",
    backgroundColor:"#fff",
    marginTop:10,
    borderRadius:5,
    shadowOffset:{height:1, width:1},
    shadowOpacity:0.5,
  },
  textInput: {
    width: "90%",
    height: 50,
    color: "#a9a9a9",
    borderRadius: 15,
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
    marginTop: 20,
    alignSelf: "center",
    backgroundColor:"#ffffff",
  },
});
        // <Header style={styles.header}><Text style={{alignSelf:"center",fontSize:20,color:"#fff"}}>MindHug®</Text></Header>
