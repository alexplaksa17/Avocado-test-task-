import React from 'react';
import { Button, Image, View, StyleSheet,Text,KeyboardAvoidingView} from 'react-native';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux'
import { actionCreators,types } from './reduxData'
import Input from './Input'


const mapStateToProps = (state) => (
  {
  addText: state.addPost.text,
  pickerStatus:state.pickerStatus,
  pickerImage:state.pickerImage,

  }
)


class MyImagePicker extends React.Component {
  state = {
    image: null,
    postText: '',
    placeholder: 'add your post text here!',
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };


  makePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  submitImage = () => {
    const {dispatch} = this.props
    if (this.props.pickerStatus==="newUserIcon"){
      dispatch( { type: types.CHANGE_ICON, payload: this.state.image } );
      dispatch( { type: types.USE_PICKER_TO_NEW_PHOTO } );
    }
    if (this.props.pickerStatus==="newPhoto"){
      dispatch( { type: types.ADD_POST_IMAGE, payload: this.state.image } );
      dispatch( { type: types.ADD_POST_TEXT, payload: this.state.postText } );
      dispatch(actionCreators.uploadPost());
    }

    this.setState(
      {
        image:null,
        postText:' '
      }
    )
    console.log("after upload "+this.state.postText)
    this.props.navigation.goBack();
  };

  onAddTextChange = (newPostText)=>{
      this.setState({
            postText:newPostText,
        });
  }




  render() {

    const {userIcon,userName,pickerStatus,addText} = this.props;
    const  {image,postText}  = this.state;
    return (
      <KeyboardAvoidingView  behavior="padding" style={styles.imagePicker}>
        {image &&
          <View style={styles.submitButtomRow}>
              <Button title="Next>" onPress={this.submitImage} style={styles.submitButtom} />
          </View>}
        <View style={styles.imagePreviewBlock}>
            <Image source={ image? { uri: image }: require('./no-img.gif')} resizeMode='cover' style={styles.imagePreview} />

        </View>
        <View style={styles.buttonRow}>
          <Button
            title="Library"
            onPress={this.pickImage}
          />
          <Button
            title="Photo"
            onPress={this.makePhoto}
          />
        </View>
        {
          pickerStatus==="newPhoto" &&
          <View style={styles.addTextRow}>
            <View style={styles.addTextRowInput}>
              <Input placeholder={this.state.placeholder} onSubmitEditing={this.onAddTextChange}/>
            </View>
          </View>
        }

      </KeyboardAvoidingView>
    );
  }

}


const styles = StyleSheet.create({
  imagePicker:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  buttonRow:{
    flex:2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,

  },
  imagePreviewBlock:{
    flex:6,
    backgroundColor: '#e6e6e6',
  },
  imagePreview:{
    flex:1,
    height: undefined,
    width: undefined,
  },
  submitButtomRow:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addTextRow:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 10,
  },
  addTextRowInput:{
    flex:1,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',

  }
})
export default connect(mapStateToProps)(MyImagePicker)
