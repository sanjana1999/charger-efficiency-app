import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Alert,
    Platform,
    PermissionsAndroid,
    ScrollView,
    Animated,
    Image,
    Dimensions,
    Text,
    TouchableOpacity
  } from 'react-native';

import MapView , { PROVIDER_GOOGLE , Marker, Circle} from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import axios from 'axios';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
const batteryImage = require("../assets/images/battery.png")
class stations extends Component {
    constructor(props) {
        super(props);
         this.state = {
            latitude: 0,
            longitude: 0,
            coordinates: [],
            markers : []
         };
         this.index =0;
         this.animation = new Animated.Value(0);
         this.neareststations = this.neareststations.bind(this);
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
                axios.post("http://192.168.1.8:5000/stations/showallstations")
                  .then( res =>{
                      console.log(res.data)
                      this.setState({
                        markers : res.data
                      })
                  })
                  .catch(e=>{
                      console.log(e);
                  })
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

    neareststations(){
      console.log(this.props.route.params.distance* 10)
      axios.post("http://192.168.1.8:5000/stations/neareststations",{coordinates:this.state.coordinates,radius:this.props.route.params.distance* 1})
        .then( res =>{
            console.log(res.data)
            this.setState({
              markers : res.data
            })
        })
        .catch(e=>{
            console.log(e);
        })
    }
    render(){
        return(
            <>
            <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{flex: 1}}
                //ref={(map) => (this.map = map)}
                region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}>
                {/* {this.state.markers.length ===0 ? */}
                <Marker draggable
                    coordinate={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    }}
                    onDragEnd={(e) => this.setState({ coordinates: e.nativeEvent.coordinate })}
                    >
                </Marker>
                {this.state.markers.map((marker, index) => {
                  return (
                    <MapView.Marker key={index} coordinate={marker.coordinates}>
                      <Animated.View style={[styles.markerWrap]}>
                        <Animated.View style={[styles.ring]} />
                        <View style={styles.marker} />
                      </Animated.View>
                    </MapView.Marker>
                  );
                })}
                <Circle 
                    center = {{
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                      }}
                    radius = {this.props.route.params.distance* 40}
                    strokeWidth ={2}
                    strokeColor ={'#a2cef5'}
                />
            </MapView>
            <Animated.ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH}
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: {
                          x: this.animation,
                        },
                      },
                    },
                  ],
                  { useNativeDriver: true }
                )}
                style={styles.scrollView}
                contentContainerStyle={styles.endPadding}
              >
                {this.state.markers.map((marker, index) => (
                  <View style={styles.card} key={index}>
                    <Image
                      source={batteryImage}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {marker.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </Animated.ScrollView>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {this.neareststations()}}
            >
            <Text style={styles.buttontext}>Nearest Stations</Text>
            </TouchableOpacity>
            </View>
            </>
        );
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
  button : {
    position : 'absolute',
    alignItems: "center",
    backgroundColor: "#0e92f0",
    width : 300,
    borderRadius : 15,
    padding: 10,
    top : 820,
    left : 40
  },
  buttontext : {
      color : "white",
      fontSize : 20,
  }
});

export default stations;