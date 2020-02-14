import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Home from './src/components/Home'
import NavigationStack from './src/navigation/NavigationStack'
export default class App extends Component {
  render() {
    return (
     <NavigationStack/>

    )
  }
}
