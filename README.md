This project implements 'instagram-like' app,
where you can load posts from remote server and upload your own posts with description

I use create-react-native-app as starter, redux as state container, redux-thunk for side-effect actions(fetch data for posts feed and upload data about created by user posts, Tabnavigation to navigate between app screens(i has 3 one in app) and Expo ImagePicker Component to get access to device camera and image library. MyImagePicker is used to change user`s Icon or create posts (is handled by pickerStatus in redux store). 

You can try this app with Expo on iOS on Android by this link: https://exp.host/@alexplaksa17/avacadotestplaksa

