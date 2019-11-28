import React, { Component } from 'react';
import { StyleSheet, I18nManager, Text, View, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import combineStore from './store';
import MainNavigator from './MainNavigator';

I18nManager.allowRTL(false); 

const { store, persistor } = combineStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 24 : 0,
    backgroundColor: '#fff',
  },
});
