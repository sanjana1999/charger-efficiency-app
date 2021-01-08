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

class home extends Component {
  constructor(){
    super();
    this.state={
      bluetooth : false,
      battery : 70
    }
  }
  
  render(){
  return (
    <>      
      <View style= {styles.container}>
          <Image source={require('../assets/images/battery70.jpg')} />
          <Text style={styles.value}>{this.state.bluetooth ? Battery = this.state.battery : "Connect bluetooth"} </Text> 
          <SwipeUpDown        
              itemMini={<Menu />} // Pass props component when collapsed
              itemFull={<Details navigation ={this.props.navigation} user={this.props.route.params.user}/>} // Pass props component when show full
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
