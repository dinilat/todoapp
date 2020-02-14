import React, {Component} from 'react';
import {Text, View, Button,TextInput, TouchableOpacity, FlatList,KeyboardAvoidingView,ScrollView} from 'react-native';
import { Icon } from 'react-native-elements'
import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
import {baseurl} from '../constants/Apiconstants'

class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      tododata:[],
    }
  }
  componentDidMount(){
    axios.get(baseurl + '/getalltodo').then(res=>{
      this.setState({tododata: res.data,tododatarender:res.data})

    }).catch(error=>{
      console.log("error",error)
    })
  }
 

  onChangeText(text,field){
    this.setState({[field]:text})
  }

  tododetail(id){

    let selectedtodo={}
    this.state.tododata.filter(val=>{
      if(val._id==id)
      this.setState({tododatarender:this.state.tododata})
       this.props.navigation.navigate('TodoDetails',{ data: val})


    })
  }

addtodo(){
    
    let tododata={}
    tododata.todoid=this.state.tododata.length+1
    tododata.todotitle=this.state.todotitle
    tododata.todobody= this.state.todobody
      axios.post(baseurl + '/addtodo',{data:tododata})
      .then(res=>{
        let newdata=this.state.tododata
        newdata.push(res.data)
       this.setState({tododata:newdata, tododatarender:newdata,
        todotitle:'',todobody:''
      })
      })
  }

  deletetodo(id){
    let newtododata=this.state.tododata
    axios.post(baseurl + '/deletetodo',{id:id}).then(res=>{
      if(res.status){
        this.state.tododata.map((val,i)=>{
          if(val._id==id)
          {
            console.log(i)
           newtododata.splice(i,1)
          }
        })
        this.setState({tododata: newtododata,tododatarender:newtododata})
      }
      
  }).catch(error=>{

  })
  }


  setsearchtodo(){
    let newtododata=[]
    if (this.state.searchtext)
    {
      
      newtododata=  this.state.tododata.filter(data=>
    // this.state.tododata.filter(data=>
      
         Object.values(data).some(val=>
              
          val.toString().includes(this.state.searchtext)
          // console.log('val',val)
          
          )


       
      )
      console.log("data", newtododata)
     
    }
    if(newtododata.length==0) newtododata=this.state.tododata
    this.setState({tododatarender:newtododata,searchtext:''})
  }

  
  render() {
    return (
      <KeyboardAvoidingView 
      style={{ flex: 1 , backgroundColor:'white'}}>
      <ScrollView >
      {/* <View style={{backgroundColor: 'red',flex:1, height:'100%'}}> */}
      <Text 
        style={{
          fontWeight: '100',
          fontSize:45,
          margin:10,
          marginLeft:20
        }}>
          Todo List
        </Text>
      <View style={{ 
        flexDirection: "row",
        }}>
        
        <TextInput
        placeholder="Enter Todos Id,Title,Body"
        onChangeText={text => this.onChangeText(text,'searchtext')}
        value={this.state.searchtext}
        style={{
        backgroundColor: 'white',
        borderBottomColor: '#673bb7',
        borderBottomWidth: 3,
        width:'75%',
        margin:10,
        marginTop:0,
        paddingLeft:5,
        paddingBottom:2, marginLeft:20
      }}    
      />


      <Icon
        name='search'
        type='font-awesome'
        color='#673bb7' 
        size={30}
        allowFontScaling={true}
        onPress={() => this.setsearchtodo()}
         />
     
      </View>

      <View style={{
       margin:10,
       marginBottom:20,
       height:300,
      }}>
   {this.state.tododata.length!=0?
     
<FlatList 
 data={ this.state.tododatarender}
 renderItem={({item,index})=>
 <View style= {index==0?{ borderWidth:1,borderColor:'black',flexDirection: 'row',} :
 { borderWidth:1,borderColor:'black',flexDirection: 'row',borderTopWidth:0}}>
         <TouchableOpacity style={{ flexDirection:'row'}} onPress={()=>this.tododetail(item._id)}> 
          <View style={{ padding:10,width:'15%', justifyContent:'center'}} >
          <Text> {item.todoid}</Text>
          </View>
          <View style={{ padding:10,width:'70%',
          justifyContent:'center'}} >
          <Text> {item.todotitle}</Text>
          </View>
           </TouchableOpacity> 
          <View style={{padding:10,width:'15%', justifyContent:'center'}} >
          <Icon
        name='trash'
        type='font-awesome'
        color='#673bb7'
        size={30}
        allowFontScaling={true}
        onPress={() => this.deletetodo(item._id)}
         />
          </View>
        </View>

 }
 />
 :
 <View style={{
   alignItems:'center',
   justifyContent:'center'
 }}>
 <Text style={{
   fontWeight:'normal', 
   color:'##673bb7'}} >
   No Data Found</Text>
 </View>}
 
           
            </View>



        
        {/* <Button
        title="Go to Details"
        onPress={() =>this.props.navigation.navigate('TodoDetails',{ datas: "test data"})}
      /> */}
<View style={{
  alignItems:'center',

}}>
      <View style={{
           borderColor:'black',
           width:'85%',
           height: 'auto',
           borderWidth:1,
           justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        padding:15,
        margin:10
      }}>
        <TextInput
        placeholder="Title"
        onChangeText={text => this.onChangeText(text,'todotitle')}
        value={this.state.todotitle}
        style={{
        backgroundColor: 'white',
        borderBottomColor: '#673bb7',
        borderBottomWidth: 1,
        width:'100%',
        margin:10,
        marginTop:0,
        paddingLeft:5,
        paddingBottom:2
      }}    
      />
       <TextInput
        placeholder="Body"
        onChangeText={text => this.onChangeText(text,'todobody')}
        value={this.state.todobody}
        style={{
        backgroundColor: 'white',
        borderBottomColor: '#673bb7',
        borderBottomWidth: 2,
        width:'100%',
        margin:10,
        marginTop:0,
        paddingLeft:5,
        paddingBottom:2
      }}    
      />
      
      <View style={{alignItems:'flex-end',width:'100%'}}>
      <Icon
      name='plus-circle'
      type='font-awesome'
      color='#673bb7'
      size={50}
      allowFontScaling={true}
      onPress={() => this.addtodo()}
      
    iconRight={true}
       />
       </View>

      </View>
      </View>

      {/* </View> */}
      </ScrollView>
      </KeyboardAvoidingView>
      
    );
  }
}
export default Home;
