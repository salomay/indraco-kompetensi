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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Fontisto from "react-native-vector-icons/Fontisto";
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "db_test",
});

const ListPatient = ({ item, navigation, index, _deletePatient }) => {
  var urlImage = { uri: item[index].photo };
  if (item[index].photo === null || item[index].photo === "") {
    urlImage = require("./../img/no_data.png");
  }

  return (
    <View style={styles.containerList}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginVertical: 10,
          marginHorizontal: 15,
          flexShrink: 1,
        }}
      >
        <Image
          source={urlImage}
          style={{
            resizeMode: "cover",
            width: wp(25),
            height: wp(25),
            borderRadius: 50,
          }}
        ></Image>
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: wp(4),
            flexShrink: 1,
          }}
        >
          <Text
            style={{
              fontSize: hp(2.5),
              fontWeight: "bold",
              color: "white",
              paddingVertical: 2,
              flexWrap: "wrap",
            }}
          >
            {item[index].fullname}
          </Text>
          <Text
            style={{
              fontSize: hp(2),
              fontWeight: "600",
              color: "#FFD7A3",
              paddingVertical: 2,
              fontStyle: "italic",
            }}
          >
            {item[index].gender != "M" ? "Female" : "Male"}
          </Text>
          <Text
            style={{
              fontSize: hp(2),
              fontWeight: "600",
              color: "grey",
              paddingVertical: 2,
              fontStyle: "italic",
            }}
          >
            {item[index].race}
          </Text>
          <Text
            style={{
              fontSize: hp(2),
              fontWeight: "600",
              color: "grey",
              paddingVertical: 2,
              fontStyle: "italic",
            }}
          >
            {"longitude : " + item[index].longitude}
          </Text>
          <Text
            style={{
              fontSize: hp(2),
              fontWeight: "600",
              color: "grey",
              paddingVertical: 2,
              fontStyle: "italic",
            }}
          >
            {"latitude : " + item[index].latitude}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{ position: "absolute", right: 10, top: 10 }}
        onPress={() => _deletePatient(item[index].id)}
      >
        <Fontisto name="close" size={wp(5)} color={"white"}></Fontisto>
      </TouchableOpacity>
    </View>
  );
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit + 1 : 0;

  return { limit, offset };
};

class FormPatientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataPatient: [],
      isRefreshing: false,
      page: 0,
      txtSearch: "",
      enableSearch: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.setState(
      {
        page: 0,
        DataPatient: [],
      },
      () => {
        this._refreshData();
      }
    );
  }

  componentDidMount() {
    const subscribe = this.props.navigation.addListener("focus", () => {
      this.setState(
        {
          page: 0,
          DataPatient: [],
        },
        () => {
          this._refreshData();
        }
      );
    });
  }

  _refreshDataPagination = () => {
    var offset = getPagination(this.state.page, 30).offset;
    var limit = getPagination(this.state.page, 30).limit;
    var search = this.state.txtSearch;

    var querySearch = "";

    if (search !== "") {
      querySearch = " where fullname like '%" + search + "%'";
    } else {
      querySearch = "";
    }

    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM patient  ` + querySearch + ` limit ?,? `,
        [offset, limit],
        (sqlTxn, res) => {
          console.log("Patient retrieved successfully");
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);

              results.push({
                id: item.id,
                fullname: item.fullname,
                gender: item.gender,
                race: item.race,
                photo: item.photo,
                longitude: item.longitude,
                latitude: item.latitude,
              });
            }

            this.setState({
              DataPatient: this.state.DataPatient.concat(results),
              page: this.state.page + 1,
            });
          } else {
            this.setState({ page: this.state.page + 1 });
          }
        },
        (error) => {
          console.log("error on getting patient " + error.message);
          this.setState({ DataPatient: [] });
        }
      );
    });
  };

  _refreshData = () => {
    var offset = getPagination(this.state.page, 30).offset;
    var limit = getPagination(this.state.page, 30).limit;
    var search = this.state.txtSearch;

    var querySearch = "";

    if (search !== "") {
      querySearch = " where fullname like '%" + search + "%'";
    } else {
      querySearch = "";
    }

    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM patient  ` +
          querySearch +
          ` limit ` +
          offset +
          `,` +
          limit +
          ` `,
        [],
        (sqlTxn, res) => {
          console.log("Patient retrieved successfully");
          let len = res.rows.length;

          console.log(len);

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);

              results.push({
                id: item.id,
                fullname: item.fullname,
                gender: item.gender,
                race: item.race,
                photo: item.photo,
                longitude: item.longitude,
                latitude: item.latitude,
              });
            }

            console.log(results);

            this.setState({
              DataPatient: this.state.DataPatient.concat(results),
              page: this.state.page + 1,
            });
          } else {
            this.setState({ page: this.state.page + 1 });
          }
        },
        (error) => {
          console.log("error on getting patient " + error.message);
          this.setState({ DataPatient: [] });
        }
      );
    });
  };

  _deletePatient = (patientid) => {
    Alert.alert("Warning", "Are you sure want to delete?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          db.transaction((txn) => {
            txn.executeSql(
              `DELETE FROM patient where id = ?`,
              [patientid],
              (sqlTxn, res) => {
                ToastAndroid.show("Delete Patient Success", ToastAndroid.SHORT);
                this.setState({
                  DataPatient: [],
                  page: 0,
                });
                this._refreshDataPagination();
              },
              (error) => {
                ToastAndroid.show("Failed Delete Patient", ToastAndroid.SHORT);
              }
            );
          });
        },
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar animated={true} backgroundColor={'#637363'} hidden={false} barStyle='light-content' /> */}

        <Appbar.Header
          style={{
            backgroundColor: "#637363",
            borderRadius: 10,
            justifyContent: "center",
            alignContent: "center",
            marginTop: 5,
          }}
        >
          <Appbar.Action
            icon="cloud-outline"
            onPress={() => {
              this.props.navigation.navigate("FormWheather");
            }}
          />
          <Appbar.Content
            title="My Patient"
            subtitle=""
            color="white"
            titleStyle={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          />

          <Appbar.Action
            icon="plus-box-multiple"
            onPress={() => {
              this.props.navigation.navigate("FormAddPatient");
            }}
          />
        </Appbar.Header>

        {this.state.DataPatient.length > 0 ? (
          <VirtualizedList
            onEndReachedThreshold={1}
            onEndReached={({ distanceFromEnd }) => {
              this._refreshDataPagination();
              //console.log('on end reached ', distanceFromEnd)
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshData}
              />
            }
            contentContainerStyle={{ paddingBottom: "80%" }}
            data={this.state.DataPatient}
            getItemCount={(item) => item.length}
            getItem={(item, index) => item}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ListPatient
                navigation={this.props.navigation}
                item={item}
                index={index}
                _deletePatient={this._deletePatient}
              />
            )}
          />
        ) : null}
      </View>
    );
  }
}

export default FormPatientList;

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
