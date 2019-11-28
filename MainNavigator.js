import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import AuthScreen from './src/screens/AuthScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const MainNavigator = createBottomTabNavigator({
  welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  auth: {
    screen: AuthScreen,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  main: {
  	screen: createMaterialTopTabNavigator({
  		map: {
        screen:MapScreen,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                const iconName = `map${focused ? '' : '-outline'}`;
                return <Icon type="material-community" name={iconName} size={24} color={tintColor} />;
            }
        }
      },
  		jobs: {
        screen: DeckScreen,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                const iconName = `cards${focused ? '' : '-outline'}`;
                return <Icon type="material-community" name={iconName} size={24} color={tintColor} />;
            }
        }
      },
  		saved: {
  			screen: ReviewScreen,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                const iconName = `heart${focused ? '' : 'o'}`;
                return <Icon type="antdesign" name={iconName} size={24} color={tintColor} />;
            }
        }
  		},
      profile: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                const iconName = `user-circle${focused ? '' : '-o'}`;
                return <Icon type="font-awesome" name={iconName} size={24} color={tintColor} />;
            }
        }
      }
  	},{
      tabBarOptions: {
        activeTintColor: '#03A9F4',
        inactiveTintColor: '#b0b0b0',
        showIcon: true,
        indicatorStyle: {
          height: null
        },
        pressColor: '#d6e6ff',
        labelStyle: {
          fontSize: 12,
          marginBottom: 5,
          fontFamily: 'google-sans',
          textTransform:'uppercase'
        },
        style: {
          backgroundColor: '#fff',
          height: 60
        },
      },
      tabBarPosition: 'bottom',
      swipeEnabled: true
    }),
    navigationOptions: {
      tabBarVisible: false
    },
  }
});

export default createAppContainer(MainNavigator);