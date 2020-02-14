import React, {Component} from 'react';
import {Text, View} from 'react-native';

class TodoDetails extends Component {
   constructor(props) {
     super(props);
     
   }
   
  render() {
    return (
      <View>
      <Text 
        style={{
          fontWeight: '100',
          fontSize:45,
          margin:15
        }}>
          {this.props.route.params.data.todotitle}
        </Text>
        <Text
         style={{
          fontWeight:'normal',
          fontSize:25,
          margin:15,
         color:'#673bb7'
        }}> 
        {this.props.route.params.data.todobody}
         </Text>
      </View>
    );
  }
}

export default TodoDetails;
