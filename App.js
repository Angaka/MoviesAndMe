import React from 'react';
import Navigation from './Navigation/Navigation'

import {
  StyleSheet,
  View,
} from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <Navigation/>
/*      <View style={styles.container}>
        <View style={[styles.square, { backgroundColor: 'red' }]}/>
        <View style={[styles.square, { backgroundColor: 'green' }]}/>
        <View style={[styles.square, { backgroundColor: 'blue' }]}/>
      </View>
*/    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  square: {
    height: 50,
    width: 50
  }
})