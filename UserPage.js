import React, { Component } from 'react'
import { View, Text,Image, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from './Input'

import { connect } from 'react-redux'
import { actionCreators,types } from './reduxData'
import ImagePick from './ImagePicker'


const mapStateToProps = (state) => (
  {
  userIcon: state.userInfo.userIcon,
  userName: state.userInfo.userName,
  }
)

class UserPage extends Component{
  constructor(props){
    super(props);
  }
  changePhoto = ()=>{
    const {dispatch} = this.props
    dispatch({type: types.USE_PICKER_TO_NEW_USERICON})
    this.props.navigation.navigate('TakePhoto');
  }


  onUserNameChange = (newName) => {
    const {dispatch} = this.props

    dispatch({type: types.CHANGE_NAME, payload: newName})
  }
  render()
  {
    const {userIcon,userName} = this.props;
    return(
      <View style={styles.userPage}>

        <View style={styles.userIcon}>
          <Image style={styles.userIconImage} source={{uri:userIcon}}/>
          <Button title="Change user photo" style={styles.userIconChange} onPress={this.changePhoto}/>
        </View>

        <View style={styles.userSett}>
          <View style={styles.userSettRow}>
            <Text style={styles.userSettRowKey}>UserName</Text>
            <View style={styles.userSettRowValue}>
              <Input placeholder={userName} onSubmitEditing={this.onUserNameChange}/>
            </View>
          </View>
        </View>

      </View>
    )
  }


}




const styles = StyleSheet.create({
  userPage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    marginTop:20,

  },
  userIcon:{
    flex: 1,
    flexDirection: 'column',
    justifyContent:'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomColor:'#e6e6e6',
    borderBottomWidth: 1,
  },
  userIconImage:{
    width:100,
    height:100,
    borderRadius:50,
    borderWidth: 1,
    borderColor: '#e6e6e6'
  },
  userIconChange:{
    color: '#66ccff',
  },
  userSett:{
    flex:2,
    flexDirection: 'column',
    justifyContent:'flex-start',

  },
  userSettRow:{
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  userSettRowKey:{
    flex:1,

  },
  userSettRowValue:{
    flex:3,
    height:20,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
})
export default connect(mapStateToProps)(UserPage)
