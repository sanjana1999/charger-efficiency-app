/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import SwipeUpDown from "react-native-swipe-up-down";
import Details from "./details";
import Menu from "./menu"
import bluetoothSerial from "react-native-bluetooth-serial";
import * as All  from '../assets/images';

class home extends Component {
  constructor(){
    super();
    this.state={
      bluetooth : false,
      battery : "",
      distance : "",
      durability :""
    }
  }
  
  componentDidMount(){
    bluetoothSerial.withDelimiter('\r').then(() => {
    bluetoothSerial.enable().then(()=>{
    bluetoothSerial.connect("00:19:06:34:ED:40")
    .then(res=>{
      console.log(res);
      var battery = this.props.route.params.user.battery === "Leadacid" ? "1" : "2";
      var sendDetail = this.props.route.params.user.sincePurchase + " " + battery;
      bluetoothSerial.write(sendDetail).then(wri1 =>{
        bluetoothSerial.write('d').then(wri2 =>{
            console.log(wri2);
            bluetoothSerial.on('read', data => {
            console.log("DATA FROM BLUETOOTH:" +data.data)
            var details = data.data.split(" ");
            this.setState({
              battery : details[0],
              distance : details[1],
              durability : details[2],
              bluetooth : true
            })
          });
      })
      .catch(wrierr2 => console.log(wrierr2))
    })
    .catch(wrierr1 => console.log(wrierr1))
    })
    .catch(e => console.log(e))
  });
  });
  }

  render(){
  return (
    <>      
      <View style= {styles.container}>
          <Image source={All[`battery`+ Math.round(this.state.battery * (1/5)) / (1/5)]} />
          <Text style={styles.value}>{this.state.bluetooth ? Battery = Math.round(this.state.battery)  : "Connect bluetooth"} %</Text> 
          <SwipeUpDown        
              itemMini={<Menu />} // Pass props component when collapsed
              itemFull={<Details navigation ={this.props.navigation} user={this.props.route.params.user} details={this.state}/>} // Pass props component when show full
              onShowMini={() => console.log('mini')}
              onShowFull={() => console.log('full')}
              onMoveDown={() => console.log('down')}
              onMoveUp={() => console.log('up')}
              disablePressToShow={false} // Press item mini to show full
              style={{ backgroundColor: '#a2cef5' }} // style for swipe
          />
      </View>
    </>
  );
};
}
const styles = StyleSheet.create({
  container : {
    width : Dimensions.get('window').width,
    height : Dimensions.get('window').height,
    justifyContent : 'center',
    alignItems : "center"
  },
  value :{
    width: 100,
    fontWeight : "bold",
  },
});

export default home;
