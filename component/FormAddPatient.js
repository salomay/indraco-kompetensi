import AsyncStorage from "@react-native-community/async-storage";
import { CommonActions } from "@react-navigation/native";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  PermissionsAndroid,
} from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import DropDownPicker from "react-native-dropdown-picker";

import { launchImageLibrary } from "react-native-image-picker";
import { openDatabase } from "react-native-sqlite-storage";
import Geolocation from "@react-native-community/geolocation";

const db = openDatabase({
  name: "db_test",
});

class FormAddPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: null,
      fullName: null,
      gender: null,
      race: null,
      email: null,
      loading: false,
      openGender: false,
      valueGender: null,
      dataGender: [],
      openRace: false,
      valueRace: null,
      dataRace: [],
      tempGambar: null,
      imageUri: null,
      imageType: null,
      imageFilename: null,
      latitude: null,
      longitude: null,
      address: "",
    };
  }

  async componentDidMount() {
    if (Platform.OS === "android") {
      let permition = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      console.log("permission :" + permition);
      if (permition == "granted") {
        Geolocation.getCurrentPosition((info) => {
          this.setState(
            {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            },
            async () => {
              await fetch(
                "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                  this.state.latitude +
                  "," +
                  this.state.longitude +
                  "&key=AIzaSyDeGUzsJoi2ZfqJ94UboxdFgG0KIxg8hcs"
              )
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log(
                    "ADDRESS  => " +
                      JSON.stringify(responseJson.results[0].formatted_address)
                  );
                  this.setState({
                    address: responseJson.results[0].formatted_address,
                  });
                });
            }
          );
        });
      }
    }
  }

  setGender = (e) => {
    this.setState({
      valueGender: e.value,
      gender: e.value,
      openGender: false,
    });
  };

  setRace = (e) => {
    this.setState({
      valueRace: e.value,
      race: e.value,
      openRace: false,
    });
  };

  uploadPhoto = () => {
    const options = {
      title: "Foto Menu",
      takePhotoButtonTitle: "Take photo with your camera",
      chooseFromLibraryButtonTitle: "Choose photo from library",
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
      mediaType: "photo",
    };

    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("Image Picker Error: ", response.errorMessage);
      } else {
        let source = { uri: response.assets[0].uri };

        this.setState({
          tempGambar: source,
          imageUri: response.assets[0].uri,
          imageType: response.assets[0].type,
          imageFilename: response.assets[0].fileName,
        });

        // console.log(response.data)
      }
    });
  };

  validationInput = () => {
    if (this.state.fullName == "" || this.state.fullName == null) {
      ToastAndroid.show("Require Full Name", ToastAndroid.SHORT);
      return false;
    } else if (this.state.gender == "" || this.state.gender == null) {
      ToastAndroid.show("Require Gender", ToastAndroid.SHORT);
      return false;
    } else if (this.state.race == "" || this.state.race == null) {
      ToastAndroid.show("Require Race", ToastAndroid.SHORT);
      return false;
    } else {
      return true;
    }
  };

  savePatient = () => {
    this.setState({
      loading: true,
    });

    if (this.state.imageUri !== null && this.validationInput()) {
      db.transaction((txn) => {
        txn.executeSql(
          `INSERT INTO patient (fullname,race,gender,photo,latitude,longitude,address) VALUES (?,?,?,?,?,?,?)`,
          [
            this.state.fullName,
            this.state.race,
            this.state.gender,
            this.state.imageUri,
            this.state.latitude,
            this.state.longitude,
            this.state.address,
          ],
          (sqlTxn, res) => {
            ToastAndroid.show("Registration Successfully", ToastAndroid.SHORT);

            this.props.navigation.navigate("FormPatientList");

            this.setState({
              loading: false,
              fullName: null,
              race: null,
              gender: null,
              latitude: null,
              longitude: null,
              address: null,
            });
          },
          (error) => {
            console.log("error on adding patient " + error.message);
          }
        );
      });
    } else {
      db.transaction((txn) => {
        txn.executeSql(
          `INSERT INTO patient (fullname,race,gender,latitude,longitude,address) VALUES (?,?,?,?,?,?)`,
          [
            this.state.fullName,
            this.state.race,
            this.state.gender,
            this.state.latitude,
            this.state.longitude,
            this.state.address,
          ],
          (sqlTxn, res) => {
            ToastAndroid.show("Registration Successfully", ToastAndroid.SHORT);

            this.props.navigation.navigate("FormPatientList");

            this.setState({
              loading: false,
              fullName: null,
              race: null,
              gender: null,
              latitude: null,
              longitude: null,
              address: null,
            });
          },
          (error) => {
            console.log("error on adding patient " + error.message);
          }
        );
      });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Appbar.Header
              style={{
                backgroundColor: "#637363",
                borderRadius: 10,
                justifyContent: "center",
                alignContent: "center",
                marginTop: 5,
              }}
            >
              <Appbar.BackAction
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />

              <Appbar.Content
                title="Input new Patient"
                subtitle=""
                color="white"
                titleStyle={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              />
              <Appbar.Action />
            </Appbar.Header>

            <View style={styles.containerList}>
              <TouchableOpacity
                onPress={this.uploadPhoto}
                style={{ alignSelf: "center", marginLeft: 10 }}
              >
                {this.state.tempGambar ? (
                  <Image
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                    source={this.state.tempGambar}
                  />
                ) : (
                  <Image
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                    source={require("./../img/iconUpload.png")}
                  />
                )}
              </TouchableOpacity>

              <View style={{ margin: hp(1) }} />

              <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                <TextInput
                  value={this.state.fullName}
                  style={{
                    height: hp(7),
                    backgroundColor: "#224957",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                  theme={{ colors: { text: "white" } }}
                  activeUnderlineColor="transparent"
                  placeholder="Full Name"
                  placeholderTextColor={"white"}
                  selectionColor="white"
                  maxLength={100}
                  onChangeText={(e) => this.setState({ fullName: e })}
                />

                <View style={{ margin: hp(1) }} />

                <DropDownPicker
                  containerStyle={{
                    height: 50,
                    borderRadius: 15,
                    backgroundColor: "#224957",
                    zIndex: 999,
                  }}
                  style={{
                    backgroundColor: "#224957",
                    minHeight: 50,
                  }}
                  listItemContainerStyle={{
                    backgroundColor: "#088A85",
                  }}
                  textStyle={{
                    color: "white",
                    fontSize: wp(3.5),
                  }}
                  placeholder="Gender"
                  modalProps={{
                    animationType: "fade",
                  }}
                  open={this.state.openGender}
                  value={this.state.valueGender}
                  items={[
                    {
                      label: "Male",
                      value: "M",
                    },
                    {
                      label: "Female",
                      value: "F",
                    },
                  ]}
                  onPress={() =>
                    this.state.openGender
                      ? this.setState({ openGender: false })
                      : this.setState({ openGender: true })
                  }
                  setItems={(e) => this.setState({ dataGender: e })}
                  onSelectItem={(e) => {
                    this.setGender(e);
                  }}
                />

                <View style={{ margin: hp(1) }} />

                <DropDownPicker
                  containerStyle={{
                    height: 50,
                    borderRadius: 15,
                    backgroundColor: "#224957",
                    zIndex: 99,
                  }}
                  style={{
                    backgroundColor: "#224957",
                    minHeight: 50,
                  }}
                  listItemContainerStyle={{
                    backgroundColor: "#088A85",
                  }}
                  textStyle={{
                    color: "white",
                    fontSize: wp(3.5),
                  }}
                  placeholder="Race"
                  modalProps={{
                    animationType: "fade",
                  }}
                  open={this.state.openRace}
                  value={this.state.valueRace}
                  items={[
                    {
                      label: "American Indian or Alaska Native",
                      value: "American Indian or Alaska Native",
                    },
                    { label: "Asian", value: "Asian" },
                    {
                      label: "Black or African American",
                      value: "Black or African American",
                    },
                    {
                      label: "Hispanic or Latino",
                      value: "Hispanic or Latino",
                    },
                    {
                      label: "Native Hawaiian or Other Pacific Islander",
                      value: "Native Hawaiian or Other Pacific Islander",
                    },
                    { label: "White", value: "White" },
                  ]}
                  onPress={() =>
                    this.state.openRace
                      ? this.setState({ openRace: false })
                      : this.setState({ openRace: true })
                  }
                  setItems={(e) => this.setState({ dataRace: e })}
                  onSelectItem={(e) => {
                    this.setRace(e);
                  }}
                />
              </View>
            </View>

            {this.state.loading === true ? (
              <View
                style={{
                  margin: 15,
                  backgroundColor: "#34A853",
                  borderRadius: 10,
                }}
              >
                <ActivityIndicator
                  animating={this.state.loading}
                  style={{ alignSelf: "center", paddingVertical: 10 }}
                  size="small"
                  color="white"
                />
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  margin: 15,
                  backgroundColor: "#34A853",
                  borderRadius: 10,
                }}
                onPress={() => this.savePatient()}
              >
                <Text
                  style={{
                    padding: 10,
                    color: "white",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Save Patient
                </Text>
              </TouchableOpacity>
            )}
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default FormAddPatient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#093545",
  },
  containerList: {
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
  },
});
