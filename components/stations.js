import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Alert,
    Platform,
    PermissionsAndroid,
    NativeModules

  } from 'react-native';

import MapView , { PROVIDER_GOOGLE , Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from "react-native-geolocation-service";
class stations extends Component {
    constructor(props) {
        super(props);
         this.state = {
            latitude: 0,
            longitude: 0,
            coordinates: [],
         };
       }
    componentDidMount(){
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            Geolocation.setRNConfiguration({
              skipPermissionRequests: false,
             authorizationLevel: 'whenInUse',
           });
        }
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
        }
        Geolocation.getCurrentPosition(
            position => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                coordinates: this.state.coordinates.concat({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                })
              },()=>{
                console.log(this.state.coordinates)
              });
            },
            error => {
              Alert.alert(error.message.toString());
            },
            {
              showLocationDialog: true,
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 0
            }
          );
    }
    render(){
        return(
            <>
            <View style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{flex: 1}}
                region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}>
                <Marker
                    coordinate={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    }}>
                </Marker>
                <MapViewDirections
              origin={{
                'latitude': this.state.latitude,
                'longitude': this.state.longitude
              }}
              destination={{
                'latitude': 12.909477,
                'longitude': 77.566833
              }}
              strokeWidth={5}
              strokeColor={"#2d8cea"}
              apikey={'AIzaSyDYNN6QNgewlmliHGBQotG76fy0--tRtsM'}
            />
            </MapView>
            </View>
            </>
        );
    };
}

export default stations;