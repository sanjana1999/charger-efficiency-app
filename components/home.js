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
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import SwipeUpDown from 'react-native-swipe-up-down';
import Details from "./details";
import Menu from "./menu"

class home extends Component {
  render(){
  return (
    <>
      
      <View style= {styles.container}>
          <Image source={require('../assets/images/battery.png')} style={styles.battery}/>
          <Text style={styles.value}>Battery = 10% </Text>
          <SwipeUpDown        
              itemMini={<Menu />} // Pass props component when collapsed
              itemFull={<Details navigation ={this.props.navigation} />} // Pass props component when show full
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
  battery :{
    width : 200,
    height: 200
  },
  value :{
    width: 100,
    fontWeight : "bold",
  },
});

export default home;
