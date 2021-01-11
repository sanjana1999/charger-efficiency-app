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
                {key: 'Type : '+this.props.user.battery},
                {key: 'Charger connected : No'},
                {key: 'Distance : '+ this.props.details.distance + " kms"},
                {key: 'Efficiency : '+ ((this.props.user.dischargeTime/ this.props.user.chargeTime)*30).toFixed(2) + " %"},
                {key: 'Durability : '+ this.props.details.durability +" %"},
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => { this.props.navigation.navigate('Stations',{distance :this.props.details.distance})}}
            >
            <Text style={styles.buttontext}>Stations</Text>
            </TouchableOpacity>
            </View>
            </>
        );
    };
}
export default details;