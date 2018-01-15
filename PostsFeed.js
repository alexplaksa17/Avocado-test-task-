import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet,ActivityIndicator } from 'react-native'
import Post from './Post'
import { connect } from 'react-redux'
import { actionCreators } from './reduxData'

const mapStateToProps = (state) => ({
  loading: state.feedPosts.loading,
  error: state.feedPosts.error,
  posts: state.feedPosts.posts,
})

const extractKey = ({id}) => id

class PostsFeed extends Component {


  constructor(props){
    super(props);
  }
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(actionCreators.loadPosts())
  }


  renderItem = ({item}) => {
    const{id,user,userIcon,photoUrl,text}=item;
    return (
      <Post
        id={id}
        username={user}
        userIcon={userIcon}
        photoUrl={photoUrl}
        text={text}
      />
    );
  }

  render() {

    const {loading, error, posts} = this.props

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }
    if(error){
      <View style={styles.center}>
        <Text>Error loading data</Text>
      </View>
    }

    return (
      <FlatList
        style={styles.container}
        data={posts}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
  center:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default connect(mapStateToProps)(PostsFeed)
