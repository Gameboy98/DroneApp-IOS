import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity } from "react-native";
import { Container, Text } from "native-base";

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Polyline from '@mapbox/polyline';

const GOOGLE_API_KEY = 'AIzaSyB5_EFzgBJFcggmEzW37mmjN7rV1rtzKH8';

export default class MapScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      concat: null,
      coords:[],
      x: 'false',
      cordLatitude:props.navigation.getParam('DropLat', ''),
      cordLongitude:props.navigation.getParam('DropLong', ''),
    };

    this.mergeLot = this.mergeLot.bind(this);

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
         this.mergeLot();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );

   }

  mergeLot(){
    if (this.state.latitude != null && this.state.longitude!=null)
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       this.setState({
         concat: concatLot
       }, () => {
         this.getDirections(concatLot, "-6.270565,106.759550");
       });
     }
   }

   async getDirections(startLoc, destinationLoc) {

         try {
             let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
             let respJson = await resp.json();
             let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
             let coords = points.map((point, index) => {
                 return  {
                     latitude : point[0],
                     longitude : point[1]
                 }
             })
             this.setState({coords: coords})
             this.setState({x: "true"})
             return coords
         } catch(error) {
             this.setState({x: "error"})
             return error
         }
     }

  Update() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 10 },
     );

   }

  render() {
    const origin = {latitude: this.state.latitude, longitude: this.state.longitude};
    const destination = {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude};
    return (
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={{
       latitude:28.6139,
       longitude:77.2090,
       latitudeDelta: 1,
       longitudeDelta: 1
      }}>

      {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
       />}

       {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
          coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
          title={"Your Destination"} 
        />}

       {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={1}
            strokeColor="yellow"/>
        }

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
          coordinates={[
              {latitude: this.state.latitude, longitude: this.state.longitude},
              {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
          ]}
          strokeWidth={1.5}
          strokeColor="hotpink"/>
         }
      {this.Update()}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

// AIzaSyB5_EFzgBJFcggmEzW37mmjN7rV1rtzKH8