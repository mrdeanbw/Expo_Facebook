import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Toast} from 'react-native';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import firebaseConfig from './src/config/firebaseConfig';

firebase.initializeApp(firebaseConfig);

// export default function App() {
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount(){
   
  }

  onHandleFBLogin(){
    console.log("FB clicked");
    this.facebookLogin();
  };


async facebookLogin () {

  let appId = "205582280701221";
  await Facebook.initializeAsync(appId);

  const {type, token} = await Facebook.logInWithReadPermissionsAsync(
    // FacebookConfig.config.application_id,
    '205582280701221',
    { permissions: ['public_profile', 'email'] }
  );

  if(type === "success") {

    console.log(type);
    console.log("token");
    console.log(token);

    const credentials = firebase.auth.FacebookAuthProvider.credential(token);
    console.log("credentals");
    console.log(credentials);

    firebase.auth().signInWithCredential(credentials)
    .then(()=>{
      // Toast.show({ text: `${Strings.ST33}`, position: 'bottom', buttonText: `${Strings.ST33}` })
      console.log("facebook login success")
    })
    .catch(error => {
      Toast.show({ text: `${Strings.ST32}`, position: 'bottom', buttonText: `${Strings.ST33}` })
    })
  }
}

render() {
    return(
      <View style={styles.container}>
      {/* <Text>Open up App.js to start working on yo123ur app!</Text> */}
      <TouchableOpacity
        onPress={()=>this.onHandleFBLogin()}      
        style={{backgroundColor:'#EEE', }}
      >
        <Text>FB Login12</Text>
      </TouchableOpacity>
    </View>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
