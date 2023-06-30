import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import patientPhoto from './../assets/patientPhoto.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {
  set_patientid,
  set_doctorid,
  set_fullname,
  set_birthdate,
  set_gender,
  set_race,
  set_photo,
  set_ageinyears,
  set_markingdot,
  set_resultanalysis,
  set_detailresult,
  set_press_analysis,
  set_disable_pointer,
  set_opacity_pointer,
  set_bantuMarker,
  set_ans,
  set_endPoint,
  set_calibrationDistance,
  set_gnathion,
  set_gonion,
  set_iia,
  set_iii,
  set_isa,
  set_isi,
  set_li,
  set_ls,
  set_menton,
  set_ms,
  set_nasion,
  set_pog,
  set_pogs,
  set_pointa,
  set_pointb,
  set_sella,
  set_startingPoint,
  set_u4,
  set_u6,
  set_sna,
  set_snb,
  set_anb,
  set_pogNB,
  set_snop,
  set_snmp,
  set_uina_angular,
  set_uina_linear,
  set_linb_angular,
  set_linb_linear,
  set__iia,
  set_upper_lip,
  set_lower_lip,
  set_wendellwylie,
  set_tempgambar,
  set_imageuri,
  set_imagetype,
  set_imagefilename,
  set_enablesave,
  remove__iia,
  remove_anb,
  remove_ans,
  remove_endPoint,
  remove_gnathion,
  remove_gonion,
  remove_iia,
  remove_iii,
  remove_isa,
  remove_isi,
  remove_li,
  remove_linb_angular,
  remove_linb_linear,
  remove_lower_lip,
  remove_ls,
  remove_menton,
  remove_ms,
  remove_nasion,
  remove_pog,
  remove_pogNB,
  remove_pogs,
  remove_pointa,
  remove_pointb,
  remove_sella,
  remove_sna,
  remove_snb,
  remove_snmp,
  remove_snop,
  remove_startingPoint,
  remove_u4,
  remove_u6,
  remove_uina_angular,
  remove_uina_linear,
  remove_upper_lip,
  remove_wendellwylie,
  set_headerText,
  set_subHeaderText,
  set_loading,
} from './../component/actions/variabel';

const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
};

class FormPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: null,
      doctorId: null,
      fullName: null,
      gender: null,
      birthDate: null,
      photo: null,
      race: null,
      ageInYears: null,
    };
  }

  componentDidMount() {
    this.props.set_loading(true);
    this.props.set_bantuMarker(0);
    this.props.set_markingdot(true);
    this.props.set_resultanalysis(false);
    this.props.set_detailresult(false);
    this.props.set_enablesave(true);
    this.props.set_tempgambar(null);
    this.props.set_imageuri(null);
    this.props.set_imagetype(null);
    this.props.set_imagefilename(null);

    this.props.remove_startingPoint([]);
    this.props.remove_endPoint([]);
    this.props.set_calibrationDistance(null);
    this.props.remove_sella([]);
    this.props.remove_nasion([]);
    this.props.remove_pointa([]);
    this.props.remove_pointb([]);
    this.props.remove_u6([]);
    this.props.remove_u4([]);
    this.props.remove_gonion([]);
    this.props.remove_gnathion([]);
    this.props.remove_isa([]);
    this.props.remove_isi([]);
    this.props.remove_iia([]);
    this.props.remove_iii([]);
    this.props.remove_ms([]);
    this.props.remove_pogs([]);
    this.props.remove_li([]);
    this.props.remove_ls([]);
    this.props.remove_pog([]);
    this.props.remove_ans([]);
    this.props.remove_menton([]);

    this.props.remove_sna([]);
    this.props.remove_snb([]);
    this.props.remove_anb([]);
    this.props.remove_pogNB([]);
    this.props.remove_snop([]);
    this.props.remove_snmp([]);
    this.props.remove_uina_angular([]);
    this.props.remove_uina_linear([]);
    this.props.remove_linb_angular([]);
    this.props.remove_linb_linear([]);
    this.props.remove__iia([]);
    this.props.remove_upper_lip([]);
    this.props.remove_lower_lip([]);
    this.props.remove_wendellwylie([]);
    this.props.set_headerText('Cephalometric Analysis');
    this.props.set_subHeaderText('');

    const {
      patientId,
      doctorId,
      fullName,
      birthDate,
      ageInYears,
      gender,
      race,
      urlImage,
    } = this.props.route.params;
    if (fullName) {
      this.setState({
        doctorId: doctorId,
        patientId: patientId,
        fullName: fullName,
        birthDate: formatDate(birthDate),
        photo: urlImage,
        gender: gender,
        race: race,
        ageInYears: ageInYears,
      });
    }
  }

  componentWillUnmount() {}

  logout = () => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() =>
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'login'}],
          }),
        ),
      );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar animated={true} backgroundColor={'#637363'} hidden={false} barStyle='light-content' /> */}

        <Appbar.Header
          style={{
            backgroundColor: '#637363',
            borderRadius: 10,
            marginTop: 5,
            zIndex: 9999,
            height: 'auto',
          }}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />

          <Appbar.Content
            title="Patient Worksheet"
            subtitle=""
            color="white"
            titleStyle={{
              fontSize: wp(5),
              fontWeight: 'bold',
              textAlign: 'center',
              // marginLeft: Platform.OS == 'ios' ? 0 : -60,
            }}
          />

          <Appbar.Action />
        </Appbar.Header>

        <View style={styles.containerList}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: wp(2),
            }}>
            <Image
              source={this.state.photo}
              style={{
                resizeMode: 'cover',
                width: wp(20),
                height: wp(20),
                borderRadius: 50,
              }}></Image>
            <View style={{flexDirection: 'column', marginHorizontal: wp(3)}}>
              <Text
                style={{
                  fontSize: wp(3),
                  fontWeight: 'bold',
                  color: 'white',
                  paddingVertical: 2,
                }}>
                {this.state.fullName}
              </Text>
              <Text
                style={{
                  fontSize: wp(2.5),
                  fontWeight: '600',
                  color: '#FFD7A3',
                  paddingVertical: 2,
                  fontStyle: 'italic',
                }}>
                {this.state.gender != 'M'
                  ? 'Female'
                  : 'Male' + ' / ' + this.state.ageInYears + 'Y'}
              </Text>
              <Text
                style={{
                  fontSize: wp(2.5),
                  fontWeight: '600',
                  color: '#9C9C9C',
                  paddingVertical: 2,
                }}>
                {this.state.birthDate}
              </Text>
            </View>
          </View>

          {/* =============================================================================== */}
          {/* =============================================================================== */}

          <TouchableOpacity
            style={styles.containerItem}
            onPress={() =>
              this.props.navigation.navigate('FormCephalometric', {
                doctorId: this.state.doctorId,
                patientId: this.state.patientId,
                fullName: this.state.fullName,
                gender: this.state.gender,
                birthDate: this.state.birthDate,
                photo: this.state.photo,
                ageInYears: this.state.ageInYears,
                race: this.state.race,
              })
            }>
            <Text
              style={{
                color: 'white',
                fontSize: wp(5),
                marginLeft: 20,
                paddingTop: hp(5),
                fontWeight: 'bold',
              }}>
              Cephalometric
            </Text>

            <Text
              style={{
                color: 'white',
                fontSize: wp(4),
                marginLeft: 20,
                paddingTop: hp(1.5),
                paddingBottom: hp(5),
              }}>
              Analysis
            </Text>
          </TouchableOpacity>

          {/* =============================================================================== */}
          {/* =============================================================================== */}

          <TouchableOpacity style={styles.containerItem}>
            <Text
              style={{
                color: 'white',
                fontSize: wp(5),
                marginLeft: 20,
                paddingTop: hp(5),
                fontWeight: 'bold',
              }}>
              Discrepancy & Bolton
            </Text>

            <Text
              style={{
                color: 'white',
                fontSize: wp(4),
                marginLeft: 20,
                paddingTop: 10,
                paddingBottom: hp(5),
              }}>
              Analysis
            </Text>
          </TouchableOpacity>

          {/* =============================================================================== */}
          {/* =============================================================================== */}

          <TouchableOpacity style={styles.containerItem}>
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                marginLeft: 20,
                paddingTop: hp(5),
                fontWeight: 'bold',
              }}>
              Othodontic
            </Text>

            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginLeft: 20,
                paddingTop: 10,
                paddingBottom: hp(5),
              }}>
              Analysis
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pressAnalysis: state.variabelReducer.pressAnalysis,
    disablePointer: state.variabelReducer.disablePointer,
    opacityPointer: state.variabelReducer.opacityPointer,
    bantuMarker: state.variabelReducer.bantuMarker,
    startingPoint: state.variabelReducer.startingPoint,
    endPoint: state.variabelReducer.endPoint,
    calibrationDistance: state.variabelReducer.calibrationDistance,
    sella: state.variabelReducer.sella,
    nasion: state.variabelReducer.nasion,
    pointa: state.variabelReducer.pointa,
    pointb: state.variabelReducer.pointb,
    u6: state.variabelReducer.u6,
    u4: state.variabelReducer.u4,
    gonion: state.variabelReducer.gonion,
    gnathion: state.variabelReducer.gnathion,
    isa: state.variabelReducer.isa,
    isi: state.variabelReducer.isi,
    iia: state.variabelReducer.iia,
    iii: state.variabelReducer.iii,
    ms: state.variabelReducer.ms,
    pogs: state.variabelReducer.pogs,
    ls: state.variabelReducer.ls,
    li: state.variabelReducer.li,
    pog: state.variabelReducer.pog,
    ans: state.variabelReducer.ans,
    menton: state.variabelReducer.menton,
    sna: state.resultReducer.sna,
    snb: state.resultReducer.snb,
    anb: state.resultReducer.anb,
    pogNB: state.resultReducer.pogNB,
    snop: state.resultReducer.snop,
    snmp: state.resultReducer.snmp,
    uina_angular: state.resultReducer.uina_angular,
    uina_linear: state.resultReducer.uina_linear,
    linb_angular: state.resultReducer.linb_angular,
    linb_linear: state.resultReducer.linb_linear,
    _iia: state.resultReducer._iia,
    upper_lip: state.resultReducer.upper_lip,
    lower_lip: state.resultReducer.lower_lip,
    mid_face: state.resultReducer.mid_face,
    lower_face: state.resultReducer.lower_face,
    wendellWylie: state.resultReducer.wendellWylie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_patientid: (val) => dispatch(set_patientid(val)),
    set_doctorid: (val) => dispatch(set_doctorid(val)),
    set_fullname: (val) => dispatch(set_fullname(val)),
    set_gender: (val) => dispatch(set_gender(val)),
    set_birthdate: (val) => dispatch(set_birthdate(val)),
    set_race: (val) => dispatch(set_race(val)),
    set_photo: (val) => dispatch(set_photo(val)),
    set_ageinyears: (val) => dispatch(set_ageinyears(val)),
    set_press_analysis: (val) => dispatch(set_press_analysis(val)),
    set_disable_pointer: (val) => dispatch(set_disable_pointer(val)),
    set_opacity_pointer: (val) => dispatch(set_opacity_pointer(val)),
    set_bantuMarker: (val) => dispatch(set_bantuMarker(val)),
    set_markingdot: (val) => dispatch(set_markingdot(val)),
    set_resultanalysis: (val) => dispatch(set_resultanalysis(val)),
    set_detailresult: (val) => dispatch(set_detailresult(val)),
    set_startingPoint: (val) => dispatch(set_startingPoint(val)),
    set_endPoint: (val) => dispatch(set_endPoint(val)),
    set_calibrationDistance: (val) => dispatch(set_calibrationDistance(val)),
    set_sella: (val) => dispatch(set_sella(val)),
    set_nasion: (val) => dispatch(set_nasion(val)),
    set_pointa: (val) => dispatch(set_pointa(val)),
    set_pointb: (val) => dispatch(set_pointb(val)),
    set_u6: (val) => dispatch(set_u6(val)),
    set_u4: (val) => dispatch(set_u4(val)),
    set_gonion: (val) => dispatch(set_gonion(val)),
    set_gnathion: (val) => dispatch(set_gnathion(val)),
    set_isa: (val) => dispatch(set_isa(val)),
    set_isi: (val) => dispatch(set_isi(val)),
    set_iia: (val) => dispatch(set_iia(val)),
    set_iii: (val) => dispatch(set_iii(val)),
    set_ms: (val) => dispatch(set_ms(val)),
    set_pogs: (val) => dispatch(set_pogs(val)),
    set_ls: (val) => dispatch(set_ls(val)),
    set_li: (val) => dispatch(set_li(val)),
    set_pog: (val) => dispatch(set_pog(val)),
    set_ans: (val) => dispatch(set_ans(val)),
    set_menton: (val) => dispatch(set_menton(val)),
    set_sna: (val) => dispatch(set_sna(val)),
    set_snb: (val) => dispatch(set_snb(val)),
    set_anb: (val) => dispatch(set_anb(val)),
    set_pogNB: (val) => dispatch(set_pogNB(val)),
    set_snop: (val) => dispatch(set_snop(val)),
    set_snmp: (val) => dispatch(set_snmp(val)),
    set_uina_angular: (val) => dispatch(set_uina_angular(val)),
    set_uina_linear: (val) => dispatch(set_uina_linear(val)),
    set_linb_angular: (val) => dispatch(set_linb_angular(val)),
    set_linb_linear: (val) => dispatch(set_linb_linear(val)),
    set__iia: (val) => dispatch(set__iia(val)),
    set_upper_lip: (val) => dispatch(set_upper_lip(val)),
    set_lower_lip: (val) => dispatch(set_lower_lip(val)),
    set_wendellwylie: (val) => dispatch(set_wendellwylie(val)),
    remove_startingPoint: (val) => dispatch(remove_startingPoint(val)),
    remove_endPoint: (val) => dispatch(remove_endPoint(val)),
    remove_sella: (val) => dispatch(remove_sella(val)),
    remove_nasion: (val) => dispatch(remove_nasion(val)),
    remove_pointa: (val) => dispatch(remove_pointa(val)),
    remove_pointb: (val) => dispatch(remove_pointb(val)),
    remove_u6: (val) => dispatch(remove_u6(val)),
    remove_u4: (val) => dispatch(remove_u4(val)),
    remove_gonion: (val) => dispatch(remove_gonion(val)),
    remove_gnathion: (val) => dispatch(remove_gnathion(val)),
    remove_isa: (val) => dispatch(remove_isa(val)),
    remove_isi: (val) => dispatch(remove_isi(val)),
    remove_iia: (val) => dispatch(remove_iia(val)),
    remove_iii: (val) => dispatch(remove_iii(val)),
    remove_ms: (val) => dispatch(remove_ms(val)),
    remove_pogs: (val) => dispatch(remove_pogs(val)),
    remove_ls: (val) => dispatch(remove_ls(val)),
    remove_li: (val) => dispatch(remove_li(val)),
    remove_pog: (val) => dispatch(remove_pog(val)),
    remove_ans: (val) => dispatch(remove_ans(val)),
    remove_menton: (val) => dispatch(remove_menton(val)),
    remove_sna: (val) => dispatch(remove_sna(val)),
    remove_snb: (val) => dispatch(remove_snb(val)),
    remove_anb: (val) => dispatch(remove_anb(val)),
    remove_pogNB: (val) => dispatch(remove_pogNB(val)),
    remove_snop: (val) => dispatch(remove_snop(val)),
    remove_snmp: (val) => dispatch(remove_snmp(val)),
    remove_uina_angular: (val) => dispatch(remove_uina_angular(val)),
    remove_uina_linear: (val) => dispatch(remove_uina_linear(val)),
    remove_linb_angular: (val) => dispatch(remove_linb_angular(val)),
    remove_linb_linear: (val) => dispatch(remove_linb_linear(val)),
    remove__iia: (val) => dispatch(remove__iia(val)),
    remove_upper_lip: (val) => dispatch(remove_upper_lip(val)),
    remove_lower_lip: (val) => dispatch(remove_lower_lip(val)),
    remove_wendellwylie: (val) => dispatch(remove_wendellwylie(val)),
    set_patientid: (val) => dispatch(set_patientid(val)),
    set_doctorid: (val) => dispatch(set_doctorid(val)),
    set_fullname: (val) => dispatch(set_fullname(val)),
    set_gender: (val) => dispatch(set_gender(val)),
    set_birthdate: (val) => dispatch(set_birthdate(val)),
    set_race: (val) => dispatch(set_race(val)),
    set_photo: (val) => dispatch(set_photo(val)),
    set_tempgambar: (val) => dispatch(set_tempgambar(val)),
    set_imageuri: (val) => dispatch(set_imageuri(val)),
    set_imagetype: (val) => dispatch(set_imagetype(val)),
    set_imagefilename: (val) => dispatch(set_imagefilename(val)),
    set_enablesave: (val) => dispatch(set_enablesave(val)),
    set_headerText: (val) => dispatch(set_headerText(val)),
    set_subHeaderText: (val) => dispatch(set_subHeaderText(val)),
    set_loading: (val) => dispatch(set_loading(val)),
    set_markingdot: (val) => dispatch(set_markingdot(val)),
    set_resultanalysis: (val) => dispatch(set_resultanalysis(val)),
    set_detailresult: (val) => dispatch(set_detailresult(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPatient);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#093545',
  },
  containerList: {
    flex: 1,
    flexDirection: 'column',
  },
  containerItem: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: '#224957',
  },
});
