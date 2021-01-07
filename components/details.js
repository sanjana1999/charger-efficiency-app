import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions
  } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        justifyContent : "center",
        alignItems : "center",
        width : Dimensions.get('window').width,
    },
    item: {
        padding: 5,
        fontSize: 30,
        height: 100,
        color : "#0e92f0"
    },
    button : {
        alignItems: "center",
        backgroundColor: "#0e92f0",
        width : 300,
        borderRadius : 15,
        padding: 10,
        marginBottom : 200,
    },
    buttontext : {
        color : "white",
        fontSize : 20,
    }
});
class details extends Component {
    render(){
        return(
            <>
            <View style={styles.container}>
            <FlatList
                data={[
                {key: 'Type : Lithium'},
                {key: 'Charger connected : N0'},
                {key: 'Distance : 5 kms'},
                {key: 'Efficiency : 96%'},
                {key: 'Durability : 15 yrs'},
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => { this.props.navigation.navigate('Stations')}}
            >
            <Text style={styles.buttontext}>Stations</Text>
            </TouchableOpacity>
            </View>
            </>
        );
    };
}
export default details;