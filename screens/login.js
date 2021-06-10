import React from 'react';
import { StyleSheet, Text, View, Image,TextInput,TouchableOpacity,KeyboardAvoidingView,Alert} from 'react-native';
import firebase from 'firebase';
import TransactionScreen from './tscreen'
export default class login extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
        }
    }

    login=async(email,password)=>{
        if (email && password){
          try{
            const response = await firebase.auth().signInWithEmailAndPassword(email,password)
            if(response){
              this.props.navigation.navigate('Transaction')
            }
          }
          catch(error){
            switch (error.code) {
              case 'auth/user-not-found':
                alert("user dosen't exists")
                console.log("doesn't exist")
                break
              case 'auth/invalid-email':
                alert('incorrect email or password')
                console.log('invaild')
                break
            }
          }
        }
        else if(emailId && password){
            alert("wrong email id or password")
        }
        else{
          alert("enter email id and password")
        }
      }

    render(){
        return(
            <KeyboardAvoidingView>
             <View style={styles.header}>
   <Image style={styles.headerimg}source={{
     

            uri:
          'https://static.tumblr.com/51270c2e067ce9931adbae39ac43e70c/juj61fk/jjznftl2q/tumblr_static_hkn0ah1u74g88soow4kgs888_2048_v2.jpg'
          
      }}
      
      />
        <Image
source={require('../header.jpeg')}
style={styles.nameimg}

      />
    
    <Text style={styles.text1}>Sign In</Text>
    <Text style={styles.text2}>Email</Text>
  
    
       <TextInput
            placeholder="abc@example.com"
            keyboardType='email-address'
            onChangeText={(text)=>this.setState({emailId:text})}
            style={styles.inputBox}
            
            />
            <TextInput
            placeholder="Enter Password"
            onChangeText={(text)=>this.setState({password:text})}
             style={styles.inputBox}
             />

                <TouchableOpacity style={styles.loginButton}
                onPress={()=>{this.login(this.state.emailId,this.state.password)}}
                >
                <Text style={styles.loginText}>Login                                    →
                </Text></TouchableOpacity>
</View>
</KeyboardAvoidingView>
    
        )
    }
}
const styles=StyleSheet.create({
  header:{
    flex:8,
    backgroundColor:"white"
  },
  headerimg:{
    width:430,
    height:50,
  
  },
  nameimg:{
    width:90,
    height:80,
    marginLeft:120,
    marginTop:-20
  },
  text1:{
    fontFamily:"FF Clan",
    fontSize:20,
    marginTop:20,
    marginLeft:50

  },
  text2:{
     fontFamily:"FF Clan",
      marginTop:20,
       marginLeft:50
  },
  inputBox:{
    marginLeft:30,
   border :"solid",
   backgroundColor:"white",
   marginTop:20,
   width:290
 
  },
  loginButton:{
    backgroundColor:'#009999',
      marginLeft:30,
  
  
   marginTop:20,
   width:290,
   height:40
  },
  loginText:{
  marginLeft:20,
    marginTop:10,
    fontFamily:"FF Clan",
    color:"white",
    fontSize:20
  }

})
