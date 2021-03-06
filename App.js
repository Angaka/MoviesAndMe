import React from 'react';
import Navigation from './Navigation/Navigation'

import { Provider } from 'react-redux'
import Store from './Store/configureStore'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

import {
  StyleSheet,
  View,
} from 'react-native'

export default class App extends React.Component {
  render() {
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Navigation/>
        </PersistGate>
      </Provider>
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