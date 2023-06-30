/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as React from "react";
import {
  ActivityIndicator,
  View,
  Button,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from "react-native";
import "react-native-gesture-handler";
import Geolocation from "@react-native-community/geolocation";
import Permissions, {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
import FormPatientList from "./component/FormPatientList";
import FormAddPatient from "./component/FormAddPatient";
import FormWheather from "./component/FormWheather";
// import LocationEnabler from 'react-native-location-enabler';
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "db_test",
});

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      timePassed: false,
      visible: false,
    };
  }

  async componentDidMount() {
    db.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS patient (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname TEXT , gender TEXT, race TEXT, photo TEXT, longitude TEXT, latitude TEXT, address TEXT)`,
        [],
        (sqlTxn, res) => {
          console.log("table created successfully");
        },
        (error) => {
          console.log("error on creating table " + error.message);
        }
      );
    });

    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: "always",
      });
    }

    if (Platform.OS === "android") {
      const akses_lokasi = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
    }
  }

  getPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
      console.log("##Request : " + result);
    });
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"FormPatientList"}
          screenOptions={{
            gestureEnabled: false,
            gestureDirection: "horizontal",
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen
            name="FormPatientList"
            component={FormPatientList}
            options={{
              gestureDirection: "horizontal",
              ...TransitionPresets.RevealFromBottomAndroid,
              headerStyle: {
                elevation: 0,
              },
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="FormAddPatient"
            component={FormAddPatient}
            options={{
              gestureDirection: "horizontal",
              ...TransitionPresets.RevealFromBottomAndroid,
              headerStyle: {
                elevation: 0,
              },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FormWheather"
            component={FormWheather}
            options={{
              gestureDirection: "horizontal",
              ...TransitionPresets.RevealFromBottomAndroid,
              headerStyle: {
                elevation: 0,
              },
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
