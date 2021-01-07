import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,    
    Dimensions
} from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
  type: t.enums({
    Lion: 'Lithium Ion Batteries',
    Leadacid: 'Lead Acid Batteries',
    SLI : 'SLI Batteries'
  }),
  duration: t.String,
  distance : t.String,
  charge : t.String,
});
var options = {
    fields: {
        username:{
            label:'Name: '
        },
        password :{
            label :'Password: '
        },
        type: {
          label: 'Battery Type: ',
          placeholder : 'Select type'
        },
        duration :{
            label : 'Months since purchase of the battery:'
        },
        distance : {
            label : 'Distance travelled by the vehicle:'
        },
        charge : {
            label : 'Days since last charge: '
        }
      }
  };
  
const value ={
    type : 'SLI Batteries'
}
// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Form type={User} /> {/* Notice the addition of the Form component */}
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
    container: {
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems : 'center',
    },
    button : {
        alignItems: "center",
        backgroundColor: "#0e92f0",
        width : 300,
        borderRadius : 15,
        padding: 10,
        },
    buttontext : {
        color : "white",
        fontSize : 20,
    },
    heading : {
        fontSize : 20,
        marginBottom : 20,

    }
});
class login extends Component {
    render(){
        return(
            <>
            <View style={styles.container}>
                <Text style ={styles.heading}>Enter the details</Text>
                <Form type={User} options={options}/> 
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { this.props.navigation.navigate('Home')}}
                >
                <Text style={styles.buttontext}>Log in</Text>
                </TouchableOpacity>
            </View>            
            </>
        );
    };
}

 
export default login;