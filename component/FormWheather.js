import AsyncStorage from "@react-native-community/async-storage";
import { CommonActions } from "@react-navigation/native";
import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
  RefreshControl,
  ToastAndroid,
  Alert,
} from "react-native";
import { Appbar } from "react-native-paper";

import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "db_test",
});

class FormWheather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
    };
  }

  async componentDidMount() {
    try {
      let respon = null;

      respon = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=fae453635d694b12b01120006232906&q=Indonesia&aqi=no",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: null,
        }
      );

      let responJson = await respon.json();

      this.setState({
        result: responJson,
      });
      return null;
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <>
        <Appbar.Header
          style={{
            backgroundColor: "#637363",
          }}
        >
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />

          <Appbar.Content
            title="Wheater API"
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
        <View style={styles.container}>
          <Text style={{ color: "white" }}>
            {JSON.stringify(this.state.result)}
          </Text>
        </View>
      </>
    );
  }
}

export default FormWheather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#093545",
  },
  containerList: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
  },
  containerItem: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "flex-start",
    marginHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: "#224957",
  },
});
