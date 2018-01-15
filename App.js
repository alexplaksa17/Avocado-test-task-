import React, { Component } from 'react'
import { View, Text,Image, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider,connect } from 'react-redux'
import { reducer,actionCreators } from './reduxData'

import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import PostsFeed from './PostsFeed'
import UserPage from './UserPage'
import TakePhoto from './ImagePicker'

const store = createStore(reducer, applyMiddleware(thunk))


const AppWithNavigationState  = TabNavigator({
  Home: {
    screen: PostsFeed,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name='home'
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  UserPage: {
    screen: UserPage,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name='user'
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  TakePhoto:{
    screen: TakePhoto,
    navigationOptions: {
      tabBarLabel: 'Photo',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name='camera'
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
});




const AppWithStore = () => (
  <Provider store={store}>
    <AppWithNavigationState/>
  </Provider>
)


export default AppWithStore
