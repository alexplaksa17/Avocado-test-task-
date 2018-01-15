import React, { Component } from 'react'
import { View, Text,Image, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Post extends Component{
  constructor(props){
    super(props);
  }
  render()
  {
    const {id,username,userIcon,photoUrl,text}=this.props;
    return(
      <View style={styles.post} height={600}>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderInfo}>
            <Image style={styles.postUserIcon} source={{uri:userIcon}}/>
            <Text style={styles.postUserName}>{username}</Text>
          </View>
          <View style={styles.postButton}>
            <Icon size={15} name="ellipsis-h"/>
          </View>
        </View>

        <View style={styles.postImageBlock}>

            <Image style={styles.postImage} resizeMode='cover' source={{uri:photoUrl}}/>

        </View>

        <View style={styles.postFooter}>
          <View style={styles.postFooterButtonsRow}>
              <View style={styles.postButton}>
                <Icon size={25} name="heart-o"/>
              </View>
              <View style={styles.postButton}>
                <Icon size={25} name="comment-o"/>
              </View>
              <View style={styles.postButton}>
                <Icon size={25} name="send-o"/>
              </View>
          </View>
          <View style={styles.postFooterText}>
            <Text>
              <Text style={{fontWeight:'bold'}}>{username} </Text>
              {text}
            </Text>
          </View>

        </View>
      </View>
    )
  }


}




const styles = StyleSheet.create({
  post: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20, //to parent element

  },
  postHeader:{

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,

  },
  postUserIcon:{
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e6e6e6'
  },
  postHeaderInfo:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  postUserName:{
    marginHorizontal: 3,
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  postImageBlock:{
    flex:4,
    backgroundColor: '#e6e6e6',
  },
  postImage:{
    flex:1,
    height: undefined,
    width: undefined,
  },
  postFooter:{
    paddingHorizontal:15,
    paddingVertical: 20,

  },
  postFooterButtonsRow:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom:10,
  },
  postButton:{
    marginRight: 15,
  },


})
