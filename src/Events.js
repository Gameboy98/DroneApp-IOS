import * as React from 'react';
import { Component } from "react";
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
  Card,
  TextInput,
  AppRegistry,
  AsyncStorage,Alert,
  Dimensions, StatusBar,
} from 'react-native';

import Modal from 'react-native-modal';
import {Header, Title, Body} from 'native-base';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

export default class BookingsScreen extends React.Component {
  state = {
    visibleModal: null,
    index: 0,
    routes: [
      { key: 'first', title: 'Past Orders' },
      { key: 'second', title: 'Live Orders' },
    ],
    pasts_data:[{"tittle":"Pizza Hut","time":"5:30 pm","date":"Apr 13, Fri","hash":"1 x Veggie Delite","location":"UCL BaseKx, London","price":"FREE","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRfjA-bQxTv3PC-YOHdn4PDJZMMJD97LYZxg1VB7M8GCRXhLQLQ&usqp=CAU"},
                {"tittle":"Dominos","time":"2:00 pm","date":"Apr 21","hash":"4 x Pizza Mania","location":"","price":"FREE","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUGRjpdpNbejpSXTlYkCUUC0cA29KilyMRmfsh07suTnDEYfTz&usqp=CAU"}],
    live_data:[{"tittle":"Papa John's","time":"6:00 pm","date":"May 2, Fri","hash":"","location":"","price":"","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzrDH7VGMgz9fFy41fzNmjNKBch9Nx2wzelbBUz6GhCGeA7WqW&usqp=CAU"}],
  };

  componentDidMount() {this.fetchData();}

  async fetchData() {}

  modal(){
    return(
      <Modal isVisible={this.state.visibleModal === 1}>
          <View style={styles.modalContent}>
          <TextInput placeholder="Full Name" style={{height:40, backgroundColor:"#fff",borderRadius:5, width:"90%", justifyContent:"center", margin:5, alignSelf:"center"}}  returnKeyType="done" keyboardType="email-address"/>
          <TextInput placeholder="Mobile Number" style={{height:40, backgroundColor:"#fff",borderRadius:5, width:"90%", justifyContent:"center", margin:5, alignSelf:"center"}}  returnKeyType="done" keyboardType="numeric"/>
          <TextInput placeholder="E-mail" style={{height:40, backgroundColor:"#fff",borderRadius:5, width:"90%", justifyContent:"center", margin:5, alignSelf:"center"}}  returnKeyType="done" keyboardType="email-address"/>
          <TouchableOpacity onPress={() => this.setState({ visibleModal: null })} style={{height:40, backgroundColor:"#4CDAE4",borderRadius:5, width:"90%", justifyContent:"center", margin:5}}><Text style={{color:"#fff", alignSelf:"center"}}>Register</Text></TouchableOpacity>
          </View>
        </Modal>
      );
  }

  render() {
    const FirstRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#000' }]}>
        <FlatList
          style={{height:"100%"}}
          horizontal={false}
          data={this.state.pasts_data}
          renderItem={({item}) =>  
            <View style={styles.box}>
              <Image
                  resizeMode="cover"
                  style={{alignSelf:"center",marginTop:10, height:150, width:"90%", borderRadius:5,borderColor:"#d3d3d3",borderWidth:0.5}}
                  source={{uri: item.image}}/>
              <Text style={{alignSelf:"center", width:"90%", margin:10,fontWeight:"bold",fontSize:14}}>{item.tittle}</Text>
               <Text style={{alignSelf:"center", width:"90%",fontSize:14,fontStyle: 'italic'}}>{item.hash}</Text>
              <Text style={{alignSelf:"center", width:"90%",fontSize:14,fontStyle: 'italic'}}>{item.date}</Text>
              <Text style={{alignSelf:"center", width:"90%", fontSize:14, fontStyle: 'italic', marginBottom:5,}}>{item.time}</Text>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}/>      
      </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#fff',}]}>
      {this.modal()}
      <FlatList
          style={{height:"100%"}}
          horizontal={false}
          data={this.state.live_data}
          renderItem={({item}) =>  
            <View style={styles.box}>
              <Image
                  resizeMode="cover"
                  style={{alignSelf:"center",marginTop:10, height:150, width:"90%", borderRadius:5,borderColor:"#d3d3d3",borderWidth:0.5}}
                  source={{uri: item.image}}/>
              <Text style={{alignSelf:"center", width:"90%", margin:10,fontWeight:"bold",fontSize:14}}>{item.tittle}</Text>
              <Text style={{alignSelf:"center", width:"90%",fontSize:14,fontStyle: 'italic'}}>{item.date}</Text>
              <Text style={{alignSelf:"center", width:"90%",marginBottom:10, fontSize:14, fontStyle: 'italic'}}>{item.time}</Text>
              <TouchableOpacity style={{height:40, backgroundColor:"#a9a9a9", justifyContent:"center", margin:5}} onPress={() => this.setState({ visibleModal: 1 })}><Text style={{color:"#fff", alignSelf:"center"}}>Track Now</Text></TouchableOpacity>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}/>     
    </View>
  );
  
    return (

      <View style={styles.container}>
        <View style={{flex:1}}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              first: FirstRoute,
              second: SecondRoute,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
            style={{ backgroundColor: '#d3d3d3',}}
            renderTabBar={(props) =>
                    <TabBar
                      {...props}
                      indicatorStyle={{ backgroundColor: '#fff' }}
                      style={{backgroundColor: "#000", height: 50,}}
                      indicatorStyle={{backgroundColor: "#fff"}}
                    />
                  }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height:"100%",
  },
  box:{
    width:"94%",
    alignSelf:"center",
    backgroundColor:"#fff",
    marginTop:10,
    marginBottom:5,
    borderRadius:5,
    shadowOffset:{height:1, width:1},
    shadowOpacity:0.5,
    borderWidth:0.2,
  },
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:"center",
    width:"95%",
    borderRadius:10,
  },
});