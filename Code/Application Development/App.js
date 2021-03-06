import 'react-native-gesture-handler';
import React from "react";
import { Button } from "react-native";

import LoginView from "./LoginView";
import SignupView from "./SignupView";
import ProfileView from "./ProfileView";
import ExercisesView from "./ExercisesView";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTab from './BottomTab';

// Review the navigators from React Native 2 lecture.
const Stack = createStackNavigator(); // Stack Navigator (https://reactnavigation.org/docs/stack-navigator)
const Tab = createBottomTabNavigator(); // Bottom Tabs Navigator (https://reactnavigation.org/docs/tab-based-navigation)

class App extends React.Component {
  constructor() {
    super();

    // Feel free to add more states here
    this.state = {
      accessToken: undefined,
      username: undefined,
    };
  }

  // Set the access token
  setAccessToken = (newAccessToken) => {
    this.setState({ accessToken: newAccessToken });
  };

  getAccessToken = () => {
    return this.state.accessToken;
  }

  setUsername = (newUsername) => {
    this.setState({ username: newUsername })
  }

  getUsername = () => {
    return this.state.username;
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* We only want to show Login and Signup View when the user is not logged in.
              When the user is logged in, we want to show the Profile View and the Exercises View.
              
              How do we do this? See https://reactnavigation.org/docs/auth-flow
            */}

          {this.state.accessToken == null ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen name="Login">
                {/* This is how you pass props (e.g. setAccessToken) to another component */}
                {(props) => (
                  <LoginView {...props} setAccessToken={this.setAccessToken} setUsername={this.setUsername} token={this.accessToken} />
                )}
              </Stack.Screen>

              <Stack.Screen name="SignUp">
                {(props) => (
                  <SignupView {...props} setAccessToken={this.setAccessToken} />
                )}
              </Stack.Screen>
            </>

          ) : (
            // User is signed in
            // We can also nest another navigator (e.g. Bottom Tabs, Drawer, etc.) inside a stack navigator.
            //  See https://reactnavigation.org/docs/nesting-navigators on how to nest navigators.
            <>
              <Stack.Screen name={"Hello, " + this.getUsername()} options={{headerRight: () => (<Button title = "Logout"  onPress={()=>this.setAccessToken(null)}></Button>)}}>
                {(props) => (
                  <BottomTab {...props} setAccessToken={this.setAccessToken} getAccessToken={this.getAccessToken} getUsername={this.getUsername} token = {this.state.accessToken} username = {this.state.username}/>
                )}
              </Stack.Screen>
            </>


          )}

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
