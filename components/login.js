import React, { Component } from 'react';
import axios from "axios";
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,    
    Dimensions,
    TextInput,
    NativeModules
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DeviceInfo from 'react-native-device-info';

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
        marginTop : 30
        },
    buttontext : {
        color : "white",
        fontSize : 20,
    },
    heading : {
        fontSize : 20,
        marginBottom : 20,

    },
    textinput:{
        borderRadius : 5,
        borderColor : "#0e92f0",
        borderWidth : 2,
        width : 300,
        margin : 20
    }
});
class login extends Component {
    constructor(){
        super();
        this.state ={
            uniqueId:DeviceInfo.getUniqueId(),
            name :"",
            password : "",
            battery : "",
            sincePurchase : "",
            distTravelled :"",
            sinceCharge :""
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount(){
        axios.post("http://192.168.1.16:5000/users/check",{uniqueId:this.state.uniqueId})
        .then( res =>{
            console.log(res.data)
            if(res.data !== "Doesn't exist"){
                
                this.props.navigation.navigate('Home',{user:res.data})
            }
        })
        .catch(e=>{
            console.log(e);
        })
    }

    onSubmit(){
        axios.post("http://192.168.1.16:5000/users/signin",this.state)
        .then(res => {
            this.props.navigation.navigate('Home',{user:res.data})
        })
        .catch(e => console.log(e));
    }
    render(){
        return(
            <>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            >
                <Text style ={styles.heading}>Enter the details</Text>
                <TextInput 
                    placeholder = "Enter Name"
                    style = {styles.textinput}
                    onChangeText = {(text) => {this.setState({name:text})}}
                />
                <TextInput 
                    placeholder = "Enter Password"
                    secureTextEntry = {true}
                    style = {styles.textinput}
                    onChangeText = {(text) => {this.setState({password:text})}}
                />
                <Picker
                    selectedValue ={this.state.battery}
                    style = {styles.textinput}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({battery: itemValue})
                    }
                    >
                    <Picker.Item label="Lithium Ion Batteries" value="Lion" />
                    <Picker.Item label="Lead Acid Batteries" value="Leadacid" />
                </Picker>
                <TextInput 
                    placeholder = "Months Since purchase of the battery"
                    style = {styles.textinput}
                    onChangeText = {(text) => {this.setState({sinceCharge:text})}}
                />
                <TextInput 
                    placeholder = "Distance travelled by the vehicle"
                    style = {styles.textinput}
                    onChangeText = {(text) => {this.setState({distTravelled:text})}}
                />
                <TextInput 
                    placeholder = "Time taken to discharge"
                    style = {styles.textinput}
                    onChangeText = {(text) => {this.setState({sinceCharge:text})}}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {this.onSubmit()}}
                >
                <Text style={styles.buttontext}>Log in</Text>
                </TouchableOpacity>
                
            </KeyboardAvoidingView>            
            </>
        );
    };
}

 
export default login;