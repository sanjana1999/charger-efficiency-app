import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
  } from 'react-native';

class menu extends Component {
    render(){
        return(
            <>
            <View style={styles.container}>
                <Image source = {require('../assets/images/menu.png')} style={styles.icons}/>
            </View>
            </>
        );
    };
}

const styles = StyleSheet.create({
    container:{
        alignItems :"center",
        justifyContent : "center"
    },
    icons :{
      width : 50,
      height: 50,
      marginTop : -20
    },
  });
 
export default menu;