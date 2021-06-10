import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity,FlatList,TextInput } from 'react-native';
import db from '../config.js'

export default class Sscreen extends React.Component {
constructor(){
  super();
  this.state={
    search:'',
    allTransaction:[],
    lastVisibleTransaction:null
  }
}
  
searchTransactions=async(text)=>{
 var enterText=text.split("");
 if(enterText[0].toLowerCase()==="b"){
   const transaction=await db.collection("transaction").where("bookid","==",text).get();
   transaction.docs.map((doc)=>{
       this.setState({
      allTransaction:[...this.state.allTransaction,doc.data()],
      lastVisibleTransaction:doc.data()
    })
  })
 }
 else if(enterText[0].toLowerCase()==="s"){
  const transaction=await db.collection("transaction").where("studentid","==",text).get();
  transaction.docs.map((doc)=>{
      this.setState({
     allTransaction:[...this.state.allTransaction,doc.data()],
     lastVisibleTransaction:doc.data()
   })
 })
 }

console.log(this.state.lastVisibleTransaction);
}

fetchMoreTransactions=async()=>{
  var text=this.state.search.toLowerCase()
  var enterText=text.split("");

  
  if(enterText[0].toLowerCase()==="b"){
    const transaction=await db.collection("transaction").where("bookid","==",text).startAfter(this.this.state.lastVisibleTransaction).limit(10).get();
    transaction.docs.map((doc)=>{
        this.setState({
       allTransaction:[...this.state.allTransaction,doc.data()],
       lastVisibleTransaction:doc.data()
     })
   })
  }
  else if(enterText[0].toLowerCase()==="s"){
   const transaction=await db.collection("transaction").where("studentid","==",text).startAfter(this.this.state.lastVisibleTransaction).limit(10).get();
   transaction.docs.map((doc)=>{
       this.setState({
      allTransaction:[...this.state.allTransaction,doc.data()],
      lastVisibleTransaction:doc.data()
    })
  })
  }
 

}

    render() {
      return (
          <View style={styles.container}>
      
          <View style={styles.container}>
          <TextInput
          style={styles.bar}
          placeholder="Enter Book ID OR Student ID"
          onChangeText={(text=>{this.setState({search:text})})}
        />
           <TouchableOpacity
            style = {styles.searchButton}
            onPress={()=>{this.searchTransactions(this.state.search)}}
          >
            <Text>🔎</Text>
          </TouchableOpacity>
          </View> 
          
          <FlatList
          data={this.state.allTransaction}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={({item})=>(
            <View style={{borderBottomWidth:3}}>
              <TouchableOpacity>
              <Text style={{marginTop:60,backgroundColor:"red",fontFamily:"FF Clan",fontSize:20}} >{" Book ID :"+ item.bookid}</Text>
              <Text style={{marginTop:10,backgroundColor:"#11bb99",fontFamily:"FF Clan",fontSize:20}}>{" Student ID :"+ item.studentid}</Text>
              <Text style={{marginTop:10,backgroundColor:"black",color:"white",fontFamily:"FF Clan",fontSize:20}} >{"Date "+item.date.toDate()}</Text>
            </TouchableOpacity>

            </View>
          )} 
          onEndReached={()=>{this.fetchMoreTransactions}}
          onEndReachedThreshold={0.7}
                  
          />
        </View>
         
      );
    }
    }



  const styles=StyleSheet.create({
    container:{
      flex:1,
      marginTop:40
    },
    searchBar:{
      marginTop:-30,
      flexDirection:'row',
      height:40,
      width:'auto',
     
      alignItems:'center',
      backgroundColor:'grey',
    },
    bar:{
      borderWidth:2,
      marginTop:-40,
      height:30,
      width:300,
    marginLeft:550,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      marginTop:-30,
      marginLeft:850,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#0000d',
      
    }
  })