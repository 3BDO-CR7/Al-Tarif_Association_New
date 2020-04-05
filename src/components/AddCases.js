import React, { Component } from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Icon,
    Title,
    Body,
    Form,
    Item,
    Input,
    Picker,
    CheckBox,
    Toast,
    ActionSheet
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import axios from 'axios';
import Spinner from "react-native-loading-spinner-overlay";
import CONST from "../consts";
import {connect} from "react-redux";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import {chooseLang, profile, userLogin} from "../actions";
import {NavigationEvents} from "react-navigation";

let BUTTONS = [
    { text: i18n.translate('gallery_photo'),
        i      : 0,
        textStyle: {
            color           : "white",
            fontFamily      : 'cairo',
            textAlign       : 'center',
        }
    },
    { text: i18n.translate('camera_photo'),
        i       : 1,
        textStyle: {
            color           : "white",
            fontFamily      : 'cairo',
            textAlign       : 'center',
        }
    },
    { text: i18n.translate('cancel'),
        textStyle: {
            color           : "#ff5b49",
            fontFamily      : 'cairo',
            textAlign       : 'center',
        }
    }
];

let DESTRUCTIVE_INDEX   = 2;
let CANCEL_INDEX        = 2;

class AddCases extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName                   : '',
            secondName                  : '',
            thirdName                   : '',
            familyName                  : '',
            phone                       : '',
            email                       : '',
			recordCivilian              : '',
            date                        : '',
            income                      : '',
            handicapped                 : '',
            numhandicapped              : '',
            numservant                  : '',
            numwork                     : '',
            numcommercial               : '',
            nummembers                  : '',
            selectedCity                : '',
            selectedQuarter             : '',
            user_handicapped            : '',
            nationalites                : [],
            socialStatuses              : [],
            livingTypes                 : [],
            healthStatus                : [],
            cities                      : [],
            needType                    : [],
            caseTypes                   : [],
            quarters                    : [],
            checked_Handicapped         : 0,
            checked_Servant             : 0,
            checked_Workers             : 0,
            checked_Commercial          : 0,
            isDatePickerVisible         : 0,
            show_country                : 0,
            spinner                     : false,
            checked_Country             : false,
			selectedLivingType          : null,
			// selectedCity                : null,
			// selectedQuarter             : null,
            selectedNationality         : null,
            selectedSocial              : null,
            selectedHealth              : null,
            idImage                     : null,
            case_type_id                : null,
            idBase64                    : null,
            familyBookImage             : null,
            familyBookBase64            : null,
            handicappedProof            : null,
            handicappedProofBase64      : null,
			electricityBillImage        : null,
			electricityBillBase64       : null,
			leaseImage                  : null,
			leaseBase64                 : null,
			debtProofImage              : null,
			debtProofBase64             : null,
            selected                    : undefined,
            checked                     : false,
            years                       : [],
            months                      : [],
            days                        : [],
            year                        : null,
            month                       : null,
            need_type_id                : null,
            day                         : null,
        }
    }

	componentWillMount() {

            if(this.props.navigation.state.params.type){
                if (this.props.navigation.state.params.type === 'id') {
                    this.setState({
                        idImage                 : this.props.navigation.state.params.image ,
                        idBase64                : this.props.navigation.state.params.photo
                    });
                }else if(this.props.navigation.state.params.type === 'book'){
                    this.setState({
                        familyBookImage         : this.props.navigation.state.params.image ,
                        familyBookBase64        : this.props.navigation.state.params.photo
                    });
                }else if(this.props.navigation.state.params.type === 'bill'){
                    this.setState({
                        electricityBillImage    : this.props.navigation.state.params.image ,
                        electricityBillBase64   : this.props.navigation.state.params.photo
                    });
                }else if(this.props.navigation.state.params.type === 'lease'){
                    this.setState({
                        leaseImage              : this.props.navigation.state.params.image ,
                        leaseBase64             : this.props.navigation.state.params.photo
                    });
                }else if(this.props.navigation.state.params.type === 'debtProof'){
                    this.setState({
                        debtProofImage          : this.props.navigation.state.params.image ,
                        debtProofBase64         : this.props.navigation.state.params.photo
                    });
                }else if(this.props.navigation.state.params.type === 'handicappedProof'){
                    this.setState({
                        handicappedProof        : this.props.navigation.state.params.image ,
                        handicappedProofBase64  : this.props.navigation.state.params.photo
                    });
                }
            }else {
                this.setState({
                    idBase64                : null,
                    familyBookBase64        : null,
                    electricityBillBase64   : null,
                    leaseBase64             : null,
                    debtProofBase64         : null,
                    handicappedProofBase64  : null,
                });
            }


        for(let i = 1450; i > 1340 ; i--){
           this.state.years.push(JSON.stringify(i));
        }

        for(let x = 12; x > 1 ; x--){
            this.state.months.push(JSON.stringify(x));
        }

        for(let m = 30; m > 1 ; m--){
            this.state.days.push(JSON.stringify(m));
        }


		this.setState({spinner: true});

		axios({
			url         : CONST.url + 'addCaseFormRecords',
			method      : 'POST',
			data : {
				lang            : this.props.lang,
                token           : this.props.auth.data.token,
			}
		}).then(response => {

			this.setState({
				nationalites            : response.data.data.nationalites,
                needType                : response.data.data.needType,
				socialStatuses          : response.data.data.socialStatuses,
				livingTypes             : response.data.data.livingTypes,
                cities                  : response.data.data.cities,
                caseTypes               : response.data.data.caseTypes,
				healthStatus            : response.data.data.healthStatus,
				spinner                 : false
			});

		}).catch(err => {
            Toast.show({
                text        : i18n.translate('tryagain'),
                duration    : 2000,
                type        : "danger",
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center'
                }
            });
			console.log(err);
			this.setState({spinner : false});
		})
	}

    onValueNational (value) {this.setState({selectedNationality: value});}

    onValueSocial   (value) {this.setState({selectedSocial: value});}

    onValueHealth   (value) {this.setState({selectedHealth: value});}

    onValue_caseType   (value) {this.setState({case_type_id: value});}

    onValueLiving   (value) {this.setState({selectedLivingType: value});}

    onValueYear     (value) {this.setState({year: value});}
    onValue_needType     (value) {this.setState({need_type_id: value});}

    onValueMonth    (value) {this.setState({month: value});}

    onValueDay      (value) {this.setState({day: value});}

    valueQuarter    (value) {this.setState({selectedQuarter: value}); console.log('Quarter_id', this.state.selectedQuarter)}

    onValueCities   (value) {

        if( value !== null ){

            this.setState({selectedCity: value, spinner :  false});

            setTimeout(() =>{
                this.onValueQuarter();
            }, 300);

        }

    }

    onValueQuarter(){

        axios({
            url       : CONST.url + 'quartersByCity',
            method    : 'POST',
            data      : {
                city_id    : this.state.selectedCity
            }
        }).then(response => {

            this.setState({
                quarters                : response.data.data,
                spinner                 : false
            });

        }).catch(err => {
            console.log(err);
            this.setState({spinner :  false});
        });

    }

    checked_Country(id) {

        this.setState({checked_Country : id});

        if (id !== 22){
            this.setState({selectedCity : id});
        }


        setTimeout(() =>{
            this.onValueQuarter();
        }, 200);

    }

    open(key) {
        ActionSheet.show(
            {
                options                 : BUTTONS,
                cancelButtonIndex       : CANCEL_INDEX,
                destructiveButtonIndex  : DESTRUCTIVE_INDEX,
                title                   : i18n.translate('image_video')
            },
            buttonIndex => {
                this.uploadImage(BUTTONS[buttonIndex], key);
            }
        )
    }

    uploadImage = async (i, key) => {

        if (i.i === 0) {

            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing       : false,
                aspect              : [4, 3],
                base64              : true,
                quality             : 0.5
            });

            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            if (!result.cancelled) {
                if (key === 'id'){
                    this.setState({ idImage: result.uri ,idBase64:result.base64 });
                }else if(key === 'book'){
                    this.setState({ familyBookImage: result.uri ,familyBookBase64:result.base64 });
                }else if(key === 'bill'){
                    this.setState({ electricityBillImage: result.uri ,electricityBillBase64:result.base64 });
                }else if(key === 'lease'){
                    this.setState({ leaseImage: result.uri ,leaseBase64:result.base64 });
                }else if(key === 'debtProof'){
                    this.setState({ debtProofImage: result.uri ,debtProofBase64:result.base64 });
                }else if(key === 'handicappedProof'){
                    this.setState({ handicappedProof: result.uri ,handicappedProofBase64:result.base64 });
                }
            }

        } else if (i.i === 1) {
            this.props.navigation.navigate('OpenCamera', {namePage : AddCases, key : key});
        }

    };

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleDatePicked = date => {
        let formatted_date = date.getFullYear() + "-" + ("0"+(date.getMonth() + 1)).slice(-2) + "-" + ("0" +date.getDate()).slice(-2);
        this.setState({ date : formatted_date });
        this.hideDatePicker();
    };

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.phone.length <= 0){
            isError     = true;
            msg         = i18n.translate('namereq');
        }else if(this.state.phone.length !== 10){
            isError     = true;
            msg         = i18n.translate('aggnumber');
        }else if (this.state.email.length <= 0 || this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".") === -1){
            isError     = true;
            msg         = i18n.translate('entermail');
        }else if (this.state.checked === false){
            isError     = true;
            msg         = i18n.translate('aggreTe');
        }

        if (msg !== ''){
            Toast.show({
                text          : msg,
                duration      : 2000,
                type          : "danger",
                textStyle     : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });
        }
        return isError;
    };

    addCases (){

        const err = this.validate();

        if (!err){

            this.setState({ spinner: true });

            axios({
                url         : CONST.url + 'addCase',
                method      : 'POST',
                headers     : {Authorization: this.props.user.token},
                data      : {
                    lang                        : this.props.lang,
                    first_name                  : this.state.firstName,
                    second_name                 : this.state.secondName,
                    third_name                  : this.state.thirdName,
                    family_name                 : this.state.familyName,
                    nationality_id              : this.state.selectedNationality,
                    national_id                 : this.state.recordCivilian,
                    birthday                    : this.state.year + '/' + this.state.month + '/' + this.state.day,
                    social_status_id            : this.state.selectedSocial,
                    phone                       : this.state.phone,
                    email                       : this.state.email,
                    income                      : this.state.income,
                    living_type_id              : this.state.selectedLivingType,
                    city_id                     : this.state.selectedCity,
                    quarter_id                  : this.state.selectedQuarter,
                    health_status_id            : this.state.selectedHealth,
                    user_handicapped            : this.state.user_handicapped,
                    have_handicapped            : this.state.checked_Handicapped,
                    handicapped_number          : this.state.numhandicapped,
                    handicapped_type            : this.state.handicapped,
                    have_maid                   : this.state.checked_Servant,
                    maid_number                 : this.state.numservant,
                    have_workers                : this.state.checked_Workers,
                    workers_number              : this.state.numwork,
                    have_commerical_record      : this.state.checked_Commercial,
                    commerical_record_number    : this.state.numcommercial,
                    family_number               : this.state.nummembers,
                    handicapped_proof           : this.state.handicappedProofBase64,
                    national_id_image           : this.state.idBase64,
                    family_notebook             : this.state.familyBookBase64,
                    electricity_bill            : this.state.electricityBillBase64,
                    lease                       : this.state.leaseBase64,
                    debt_proof                  : this.state.debtProofBase64,
                    need_type_id                : this.state.need_type_id,
                    case_type_id                : this.state.case_type_id
                }
            }).then(response => {

                Toast.show({
                    text        : response.data.message,
                    type        : response.data.success === true ? "success" : "danger",
                    duration    : 3000,
                    textStyle   : {
                        color       : "white",
                        fontFamily  : 'cairo',
                        textAlign   : 'center'
                    }
                });

                this.setState({spinner :  false});

                if (response.data.success === true){
                    this.props.navigation.navigate('Home');
                }

            }).catch(err => {
                console.log(err);
                this.setState({ spinner: false });
                Toast.show({
                    text        : i18n.translate('tryagain'),
                    duration    : 2000,
                    type        : "danger",
                    textStyle   : {
                        color       : "white",
                        fontFamily  : 'cairo',
                        textAlign   : 'center'
                    }
                });
            });

        }else {

            this.setState({ spinner: false });

        }
    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

		let { idImage, familyBookImage, electricityBillImage, leaseImage, debtProofImage, handicappedProof } = this.state;

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Spinner
                    visible = { this.state.spinner }
                />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="AntDesign" name='arrowright' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('addcondition')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <Form style={[styles.formValdition, styles.Width_90, styles.flexCenter, styles.marginVertical_20]}>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('firstname')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                auto-capitalization     = {false}
                                onChangeText            = {(firstName) => this.setState({ firstName })}
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('secondname')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                auto-capitalization     = {false}
                                onChangeText            = {(secondName) => this.setState({ secondName })}
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('Third')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                auto-capitalization     = {false}
                                onChangeText            = {(thirdName) => this.setState({ thirdName })}
                            />
                        </Item>
                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('familyname')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                auto-capitalization     = {false}
                                onChangeText            = {(familyName) => this.setState({ familyName })}
                            />
                        </Item>

                        <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_40,styles.marginVertical_15,styles.Width_100]}>
                            <Item style={styles.itemPiker} regular>
                                <Picker
                                    mode                    = "dropdown"
                                    style                   = {styles.Picker}
                                    placeholderStyle        = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}
                                    selectedValue           = {this.state.selectedNationality}
                                    onValueChange           = {this.onValueNational.bind(this)}
                                    textStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                    placeholder             = {i18n.translate('Nationality')}
                                    itemTextStyle           = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                >
                                    <Picker.Item style={[styles.itemPicker]} label={i18n.translate('Nationality')} value={null} />

                                    {
                                        this.state.nationalites.map((nater, i) => (
                                            <Picker.Item style={[styles.itemPicker]} key={i} label={nater.name} value={nater.id} />
                                        ))
                                    }

                                </Picker>
                            </Item>
                            <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                        </View>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('civil')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                keyboardType            = {'number-pad'}
                                onChangeText            = {(recordCivilian) => this.setState({recordCivilian})}
                            />
                        </Item>

                        <View style={[styles.rowGroup]}>
                            <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_10,styles.marginVertical_15,styles.flex_33]}>
                                <Item style={styles.itemPiker} regular>
                                    <Picker
                                        mode                    = "dropdown"
                                        style                   = {styles.Picker}
                                        placeholderStyle        = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}
                                        selectedValue           = {this.state.year}
                                        onValueChange           = {this.onValueYear.bind(this)}
                                        textStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                        placeholder             = {i18n.translate('years')}
                                        itemTextStyle           = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                    >
                                        <Picker.Item style={[styles.itemPicker]} label={i18n.translate('years')} value={null} />

                                        {
                                            this.state.years.map((year, i) => (
                                                <Picker.Item style={[styles.itemPicker]} key={i} label={year} value={year} />
                                            ))
                                        }

                                    </Picker>
                                </Item>
                                <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                            </View>
                            <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_10,styles.marginVertical_15,styles.flex_33]}>
                                <Item style={styles.itemPiker} regular>
                                    <Picker
                                        mode                    = "dropdown"
                                        style                   = {styles.Picker}
                                        placeholderStyle        = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}
                                        selectedValue           = {this.state.month}
                                        onValueChange           = {this.onValueMonth.bind(this)}
                                        textStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                        placeholder             = {i18n.translate('month')}
                                        itemTextStyle           = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                    >
                                        <Picker.Item style={[styles.itemPicker]} label={i18n.translate('month')} value={null} />

                                        {
                                            this.state.months.map((month, i) => (
                                                <Picker.Item style={[styles.itemPicker]} key={i} label={month} value={month} />
                                            ))
                                        }

                                    </Picker>
                                </Item>
                                <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                            </View>
                            <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_10,styles.marginVertical_15,styles.flex_33]}>
                                <Item style={styles.itemPiker} regular>
                                    <Picker
                                        mode                    = "dropdown"
                                        style                   = {styles.Picker}
                                        placeholderStyle        = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}
                                        selectedValue           = {this.state.day}
                                        onValueChange           = {this.onValueDay.bind(this)}
                                        textStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                        placeholder             = {i18n.translate('days')}
                                        itemTextStyle           = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                    >
                                        <Picker.Item style={[styles.itemPicker]} label={i18n.translate('days')} value={null} />

                                        {
                                            this.state.days.map((day, i) => (
                                                <Picker.Item style={[styles.itemPicker]} key={i} label={day} value={day} />
                                            ))
                                        }

                                    </Picker>
                                </Item>
                                <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                            </View>
                        </View>

                        {/*<View style={[styles.Width_100, styles.height_50, styles.marginVertical_10]}>*/}
                        {/*    <TouchableOpacity onPress={this.showDatePicker} style={[styles.Width_100, styles.height_50, styles.bg_lightWhite, styles.Radius_40, styles.paddingHorizontal_20, styles.rowGroup]}>*/}
                        {/*        <Text style={[styles.textRegular, styles.textLeft, styles.textSize_16]}>*/}
                        {/*            {i18n.translate('date')} : {this.state.date}*/}
                        {/*        </Text>*/}
                        {/*        <Icon style={[styles.textSize_22]} type="AntDesign" name='calendar' />*/}
                        {/*    </TouchableOpacity>*/}

                        {/*    <DateTimePicker*/}
                        {/*        isVisible       = {this.state.isDatePickerVisible}*/}
                        {/*        onConfirm       = {this.handleDatePicked}*/}
                        {/*        onCancel        = {this.hideDatePicker}*/}
                        {/*        mode            = {'date'}*/}
                        {/*        minimumDate     = {new Date()}*/}
                        {/*    />*/}
                        {/*</View>*/}

                        <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_40,styles.marginVertical_15,styles.Width_100]}>
                            <Item style={styles.itemPiker} regular>
                                <Picker
                                    mode                    = "dropdown"
                                    style                   = {styles.Picker}
                                    placeholderStyle        = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}
                                    selectedValue           = {this.state.selectedSocial}
                                    onValueChange           = {this.onValueSocial.bind(this)}
                                    textStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                    placeholder             = {i18n.translate('Social')}
                                    itemTextStyle           = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                >

                                    <Picker.Item style={[styles.itemPicker]} label={i18n.translate('Social')} value={null} />

                                    {
                                        this.state.socialStatuses.map((statu, i) => (
                                            <Picker.Item style={[styles.itemPicker]} key={i} label={statu.name} value={statu.id} />
                                        ))
                                    }

                                </Picker>
                            </Item>
                            <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                        </View>



                        <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_40,styles.marginVertical_15,styles.Width_100]}>
                            <Item style={styles.itemPiker} regular>
                                <Picker
                                    mode                    = "dropdown"
                                    style                   = {styles.Picker}
                                    placeholderStyle        = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}
                                    selectedValue           = {this.state.need_type_id}
                                    onValueChange           = {this.onValue_needType.bind(this)}
                                    textStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                    placeholder             = {i18n.translate('Social')}
                                    itemTextStyle           = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                >

                                    <Picker.Item style={[styles.itemPicker]} label={i18n.translate('need_type')} value={null} />

                                    {
                                        this.state.needType.map((statu, i) => (
                                            <Picker.Item style={[styles.itemPicker]} key={i} label={statu.name} value={statu.id} />
                                        ))
                                    }

                                </Picker>
                            </Item>
                            <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                        </View>

                        <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_40,styles.marginVertical_15,styles.Width_100]}>
                            <Item style={styles.itemPiker} regular>
                                <Picker
                                    mode                    = "dropdown"
                                    style                   = {styles.Picker}
                                    placeholderStyle        = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}
                                    selectedValue           = {this.state.case_type_id}
                                    onValueChange           = {this.onValue_caseType.bind(this)}
                                    textStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                    placeholder             = {i18n.translate('Social')}
                                    itemTextStyle           = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                >

                                    <Picker.Item style={[styles.itemPicker]} label={i18n.translate('case_type')} value={null} />

                                    {
                                        this.state.caseTypes.map((statu, i) => (
                                            <Picker.Item style={[styles.itemPicker]} key={i} label={statu.name} value={statu.id} />
                                        ))
                                    }

                                </Picker>
                            </Item>
                            <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                        </View>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('phone')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                keyboardType            = {'number-pad'}
                                maxLength               = {10}
                                onChangeText            = {(phone) => this.setState({phone})}
                            />
                        </Item>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('email')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                keyboardType            = {'email-address'}
                                onChangeText            = {(email) => this.setState({ email })}
                            />
                        </Item>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('chooseincome')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                keyboardType            = {'number-pad'}
                                onChangeText            = {(income) => this.setState({ income })}
                            />
                        </Item>

                        <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_40,styles.marginVertical_15,styles.Width_100]}>
                            <Item style={styles.itemPiker} regular>
                                <Picker
                                    mode                    = "dropdown"
                                    style                   = {styles.Picker}
                                    placeholderStyle        = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}
                                    selectedValue           = {this.state.selectedLivingType}
                                    onValueChange           = {this.onValueLiving.bind(this)}
                                    textStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                    placeholder             = {i18n.translate('accommodation')}
                                    itemTextStyle           = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                >

                                    <Picker.Item style={[styles.itemPicker]} label={i18n.translate('accommodation')} value={null} />

                                    {
                                        this.state.livingTypes.map((living, i) => (
                                            <Picker.Item style={[styles.itemPicker]} key={i} label={living.name} value={living.id} />
                                        ))
                                    }

                                </Picker>
                            </Item>
                            <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                        </View>

                        <View style={[styles.overHidden , styles.Width_100]}>
                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_18,styles.marginVertical_10, styles.textLeft, styles.paddingHorizontal_20, styles.Width_100]}>
                                {i18n.translate('cityhousing')}
                            </Text>

                            <View style={[styles.rowCenter, styles.marginVertical_5, styles.paddingHorizontal_10]}>
                                <TouchableOpacity
                                        style               = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5, styles.flex_50]}
                                        onPress             = {() => this.checked_Country(1)}>
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.checked_Country === 1}
                                    />
                                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_20]}>
                                        {i18n.translate('tarief')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                        style               = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5, styles.flex_50]}
                                        onPress             = {() => this.checked_Country(22)}>
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.checked_Country === 22}
                                    />
                                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_20]}>
                                        {i18n.translate('Other')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {
                            (this.state.checked_Country === 22)
                                ?
                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.translate('selectcity')}
                                        style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                        onChangeText            = {(selectedCity) => this.setState({selectedCity})}
                                    />
                                </Item>
                                :
                                <View/>
                        }

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('neighborhoo')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                onChangeText            = {(selectedQuarter) => this.setState({selectedQuarter})}
                            />
                        </Item>

                        {/*{*/}
                        {/*    this.state.checked_Country === 22*/}
                        {/*        ?*/}
                        {/*            <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_40,styles.marginVertical_15,styles.Width_100]}>*/}
                        {/*                <Item style={styles.itemPiker} regular value={this.state.show_country}>*/}
                        {/*                    <Picker*/}
                        {/*                        mode                    = "dropdown"*/}
                        {/*                        style                   = {styles.Picker}*/}
                        {/*                        placeholderStyle        = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}*/}
                        {/*                        selectedValue           = {this.state.selectedCity}*/}
                        {/*                        onValueChange           = {this.onValueCities.bind(this)}*/}
                        {/*                        textStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}*/}
                        {/*                        placeholder             = {i18n.translate('selectcity')}*/}
                        {/*                        itemTextStyle           = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}*/}
                        {/*                    >*/}

                        {/*                        <Picker.Item style={[styles.itemPicker]} label={i18n.translate('selectcity')} value={null} />*/}
                        {/*                        {*/}
                        {/*                            this.state.cities.map((cities, i) => (*/}
                        {/*                                <Picker.Item style={[styles.itemPicker]} key={i} label={cities.name} value={cities.id} />*/}
                        {/*                            ))*/}
                        {/*                        }*/}
                        {/*                    </Picker>*/}
                        {/*                </Item>*/}
                        {/*                <Icon style={styles.iconPicker} type="AntDesign" name='down' />*/}
                        {/*            </View>*/}
                        {/*        :*/}
                        {/*        <View/>*/}
                        {/*}*/}

                        {/*{*/}
                        {/*    this.state.quarters.length !== 0*/}
                        {/*        ?*/}
                        {/*        <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_40,styles.marginVertical_15,styles.Width_100]}>*/}
                        {/*            <Item style={styles.itemPiker} regular>*/}
                        {/*                <Picker*/}
                        {/*                    mode                        = "dropdown"*/}
                        {/*                    style                       = {styles.Picker}*/}
                        {/*                    placeholderStyle            = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}*/}
                        {/*                    selectedValue               = {this.state.selectedQuarter}*/}
                        {/*                    onValueChange               = {this.valueQuarter.bind(this)}*/}
                        {/*                    textStyle                   = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}*/}
                        {/*                    placeholder                 = {i18n.translate('neighborhoo')}*/}
                        {/*                    itemTextStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}*/}
                        {/*                >*/}

                        {/*                    <Picker.Item style={[styles.itemPicker]} label={i18n.translate('neighborhoo')} value={null} />*/}

                        {/*                    {*/}
                        {/*                        this.state.quarters.map((quarter, i) => (*/}
                        {/*                            <Picker.Item style={[styles.itemPicker]} key={i} label={quarter.name} value={quarter.id} />*/}
                        {/*                        ))*/}
                        {/*                    }*/}

                        {/*                </Picker>*/}
                        {/*            </Item>*/}
                        {/*            <Icon style={styles.iconPicker} type="AntDesign" name='down' />*/}
                        {/*        </View>*/}
                        {/*        :*/}
                        {/*        <View/>*/}
                        {/*}*/}

                        <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_40,styles.marginVertical_15,styles.Width_100]}>
                            <Item style={styles.itemPiker} regular>
                                <Picker
                                    mode                        = "dropdown"
                                    style                       = {styles.Picker}
                                    placeholderStyle            = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}
                                    selectedValue               = {this.state.selectedHealth}
                                    onValueChange               = {this.onValueHealth.bind(this)}
                                    textStyle                   = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                    placeholder                 = {i18n.translate('choostatus')}
                                    itemTextStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                >

                                    <Picker.Item style={[styles.itemPicker]} label={i18n.translate('choostatus')} value={null} />

                                    {
                                        this.state.healthStatus.map((health, i) => (
                                            <Picker.Item style={[styles.itemPicker]} key={i} label={health.name} value={health.id} />
                                        ))
                                    }

                                </Picker>
                            </Item>
                            <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                        </View>

                        {
                            (this.state.selectedHealth === 6 || this.state.selectedHealth === 7)
                                ?
                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.translate('disability')}
                                        style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                        onChangeText            = {(user_handicapped) => this.setState({user_handicapped})}
                                    />
                                </Item>
                                :
                                <View/>
                        }

                        <View style={[styles.overHidden , styles.Width_100]}>
                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_18,styles.marginVertical_10, styles.textLeft, styles.paddingHorizontal_20, styles.Width_100]}>
                                {i18n.translate('Dodisat')}
                            </Text>

                            <View style={[styles.rowCenter, styles.marginVertical_5, styles.paddingHorizontal_10]}>
                                <TouchableOpacity
                                        style               = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5, styles.flex_50]}
                                        onPress             = {() => this.setState({ checked_Handicapped: 1 })}>
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.checked_Handicapped === 1 ? true : false}
                                    />
                                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_20]}>
                                        {i18n.translate('yes')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                        style               = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5, styles.flex_50]}
                                        onPress             = {() => this.setState({ checked_Handicapped: 0 })}>
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.checked_Handicapped === 0 ? true : false}
                                    />
                                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_20]}>
                                        {i18n.translate('no')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {
                            (this.state.checked_Handicapped === 1)
                                ?
                                    <View style={[styles.overHidden]}>
                                        <Item floatingLabel style={styles.item}>
                                            <Input
                                                placeholder             = {i18n.translate('disability')}
                                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                                onChangeText            = {(handicapped) => this.setState({handicapped})}
                                            />
                                        </Item>

                                        <Item floatingLabel style={styles.item}>
                                            <Input
                                                placeholder             = {i18n.translate('number')}
                                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                                keyboardType            = {'number-pad'}
                                                onChangeText            = {(numhandicapped) => this.setState({numhandicapped})}
                                            />
                                        </Item>

                                        <View style={[styles.overHidden , styles.Width_100]}>
                                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_18,styles.marginVertical_10, styles.textLeft, styles.paddingHorizontal_20, styles.Width_100]}>
                                                {i18n.translate('Proof')}
                                            </Text>

                                            <View style={[styles.rowLeft]}>
                                                <View>
                                                    {
                                                        handicappedProof != null ?
                                                            <View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
                                                                <Image source={{ uri: handicappedProof }} resizeMode={'contain'} style={[styles.icImg , styles.Radius_5]} />
                                                            </View>
                                                            :
                                                            <View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
                                                                <Icon style={[styles.text_gray, styles.textSize_20]} type="Entypo" name='image' />
                                                            </View>
                                                    }
                                                </View>
                                                <TouchableOpacity onPress={() => this.open('handicappedProof')} style={[styles.overHidden, styles.iconImg, styles.bg_darkGreen, styles.flexCenter, styles.marginHorizontal_5, styles.Radius_5]}>
                                                    <Icon style={[styles.text_White, styles.textSize_20]} type="AntDesign" name='plus' />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                :
                                <View/>
                        }

                        <View style={[styles.overHidden , styles.Width_100]}>
                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_18,styles.marginVertical_10, styles.textLeft, styles.paddingHorizontal_20, styles.Width_100]}>
                                {i18n.translate('doserver')}
                            </Text>

                            <View style={[styles.rowCenter, styles.marginVertical_5, styles.paddingHorizontal_10]}>
                                <TouchableOpacity
                                    style                   = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5, styles.flex_50]}
                                    onPress                 = {() => this.setState({ checked_Servant: 1 })}>
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.checked_Servant === 1 ? true : false}
                                    />
                                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_20]}>
                                        {i18n.translate('yes')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style                   = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5, styles.flex_50]}
                                    onPress                 = {() => this.setState({ checked_Servant: 0 })}>
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.checked_Servant === 0 ? true : false}
                                    />
                                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_20]}>
                                        {i18n.translate('no')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {
                            (this.state.checked_Servant === 1)
                                ?
                                    <Item floatingLabel style={styles.item}>
                                        <Input
                                            placeholder             = {i18n.translate('number')}
                                            style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                            keyboardType            = {'number-pad'}
                                            onChangeText            = {(numservant) => this.setState({numservant})}
                                        />
                                    </Item>
                                :
                                <View/>
                        }

                        <View style={[styles.overHidden , styles.Width_100]}>
                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_18,styles.marginVertical_10, styles.textLeft, styles.paddingHorizontal_20, styles.Width_100]}>
                                {i18n.translate('labor')}
                            </Text>

                            <View style={[styles.rowCenter, styles.marginVertical_5, styles.paddingHorizontal_10]}>
                                <TouchableOpacity
                                    style                   = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5, styles.flex_50]}
                                    onPress                 = {() => this.setState({ checked_Workers: 1 })}>
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.checked_Workers === 1 ? true : false}
                                    />
                                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_20]}>
                                        {i18n.translate('yes')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style                   = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5, styles.flex_50]}
                                    onPress                 = {() => this.setState({ checked_Workers: 0 })}>
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.checked_Workers === 0 ? true : false}
                                    />
                                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_20]}>
                                        {i18n.translate('no')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {
                            (this.state.checked_Workers === 1)
                                ?
                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.translate('number')}
                                        style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                        keyboardType            = {'number-pad'}
                                        onChangeText            = {(numwork) => this.setState({numwork})}
                                    />
                                </Item>
                                :
                                <View/>
                        }

                        <View style={[styles.overHidden , styles.Width_100]}>
                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_18,styles.marginVertical_10, styles.textLeft, styles.paddingHorizontal_20, styles.Width_100]}>
                                {i18n.translate('commercial')}
                            </Text>

                            <View style={[styles.rowCenter, styles.marginVertical_5, styles.paddingHorizontal_10]}>
                                <TouchableOpacity
                                    style                   = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5, styles.flex_50]}
                                    onPress                 = {() => this.setState({ checked_Commercial: 1 })}>
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.checked_Commercial === 1 ? true : false}
                                    />
                                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_20]}>
                                        {i18n.translate('yes')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style                   = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5, styles.flex_50]}
                                    onPress                 = {() => this.setState({ checked_Commercial: 0 })}>
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.checked_Commercial === 0 ? true : false}
                                    />
                                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_20]}>
                                        {i18n.translate('no')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {
                            (this.state.checked_Commercial === 1)
                                ?
                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.translate('number')}
                                        style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                        keyboardType            = {'number-pad'}
                                        onChangeText            = {(numcommercial) => this.setState({numcommercial})}
                                    />
                                </Item>
                                :
                                <View/>
                        }

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('members')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                keyboardType            = {'number-pad'}
                                onChangeText            = {(nummembers) => this.setState({nummembers})}
                            />
                        </Item>

                        <View style={[styles.overHidden , styles.Width_100]}>
                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_18,styles.marginVertical_10, styles.textLeft, styles.paddingHorizontal_20, styles.Width_100]}>
                                {i18n.translate('picture')}
                            </Text>

							<View style={[styles.rowRight]}>
                                <View>
                                    {
                                        idImage != null ?
                                            <View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
                                                <Image source={{ uri: idImage }} resizeMode={'contain'} style={{ width: 80, height: 80, borderRadius: 3 }} />
                                            </View>
                                            :
                                            <View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
                                                <Icon style={[styles.text_gray, styles.textSize_20]} type="Entypo" name='image' />
                                            </View>
                                    }
								</View>
								<TouchableOpacity onPress={() => this.open('id')} style={[styles.overHidden, styles.iconImg, styles.bg_darkGreen, styles.flexCenter, styles.marginHorizontal_5, styles.Radius_5]}>
									<Icon style={[styles.text_White, styles.textSize_20]} type="AntDesign" name='plus' />
								</TouchableOpacity>
							</View>
                        </View>

                        <View style={[styles.overHidden , styles.Width_100]}>
                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_18,styles.marginVertical_10, styles.textLeft, styles.paddingHorizontal_20, styles.Width_100]}>
                                {i18n.translate('FamiBoo')}
                            </Text>

                            <View style={[styles.rowRight]}>
								<View>
									{
										familyBookImage != null ?
											<View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
												<Image source={{ uri: familyBookImage }} resizeMode={'contain'} style={{ width: 80, height: 80, borderRadius: 3 }} />
											</View>
											:
											<View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
												<Icon style={[styles.text_gray, styles.textSize_20]} type="Entypo" name='image' />
											</View>
									}
								</View>
                                <TouchableOpacity onPress={() => this.open('book')} style={[styles.overHidden, styles.iconImg, styles.bg_darkGreen, styles.flexCenter, styles.marginHorizontal_5, styles.Radius_5]}>
                                    <Icon style={[styles.text_White, styles.textSize_20]} type="AntDesign" name='plus' />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.overHidden , styles.Width_100]}>
                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_18,styles.marginVertical_10, styles.textLeft, styles.paddingHorizontal_20, styles.Width_100]}>
                                {i18n.translate('bill')}
                            </Text>

                            <View style={[styles.rowRight]}>
								<View>
									{
										electricityBillImage != null ?
											<View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
												<Image source={{ uri: electricityBillImage }} resizeMode={'contain'} style={{ width: 80, height: 80, borderRadius: 3 }} />
											</View>
											:
											<View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
												<Icon style={[styles.text_gray, styles.textSize_20]} type="Entypo" name='image' />
											</View>
									}
								</View>
                                <TouchableOpacity onPress={() => this.open('bill')} style={[styles.overHidden, styles.iconImg, styles.bg_darkGreen, styles.flexCenter, styles.marginHorizontal_5, styles.Radius_5]}>
                                    <Icon style={[styles.text_White, styles.textSize_20]} type="AntDesign" name='plus' />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.overHidden , styles.Width_100]}>
                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_18,styles.marginVertical_10, styles.textLeft, styles.paddingHorizontal_20, styles.Width_100]}>
                                {i18n.translate('lease')}
                            </Text>

							<View style={[styles.rowRight]}>
								<View>
									{
										leaseImage != null ?
											<View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
												<Image source={{ uri: leaseImage }} resizeMode={'contain'} style={{ width: 80, height: 80, borderRadius: 3 }} />
											</View>
											:
											<View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
												<Icon style={[styles.text_gray, styles.textSize_20]} type="Entypo" name='image' />
											</View>
									}
								</View>
								<TouchableOpacity onPress={() => this.open('lease')} style={[styles.overHidden, styles.iconImg, styles.bg_darkGreen, styles.flexCenter, styles.marginHorizontal_5, styles.Radius_5]}>
									<Icon style={[styles.text_White, styles.textSize_20]} type="AntDesign" name='plus' />
								</TouchableOpacity>
							</View>
                        </View>

                        <View style={[styles.overHidden , styles.Width_100]}>
                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_18,styles.marginVertical_10, styles.textLeft, styles.paddingHorizontal_20, styles.Width_100]}>
                                {i18n.translate('Proreligion')}
                            </Text>

							<View style={[styles.rowRight]}>
								<View>
									{
										debtProofImage != null ?
											<View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
												<Image source={{ uri: debtProofImage }} resizeMode={'contain'} style={{ width: 80, height: 80, borderRadius: 3 }} />
											</View>
											:
											<View style={[styles.overHidden, styles.icImg, styles.flexCenter, styles.bg_lightWhite, styles.marginHorizontal_5, styles.Radius_5]}>
												<Icon style={[styles.text_gray, styles.textSize_20]} type="Entypo" name='image' />
											</View>
									}
								</View>
								<TouchableOpacity onPress={() => this.open('debtProof')} style={[styles.overHidden, styles.iconImg, styles.bg_darkGreen, styles.flexCenter, styles.marginHorizontal_5, styles.Radius_5]}>
									<Icon style={[styles.text_White, styles.textSize_20]} type="AntDesign" name='plus' />
								</TouchableOpacity>
							</View>
                        </View>

                        <View style={[styles.rowRight, styles.marginVertical_20]}>
                            <TouchableOpacity style         = {[styles.rowRight, styles.marginVertical_10]}>
                                <CheckBox
                                    style                   = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                    color                   = {styles.text_gray}
                                    selectedColor           = {styles.text_darkGreen}
                                    onPress                 = {() => this.setState({ checked: !this.state.checked })}
                                    checked                 = {this.state.checked}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AckgmentAndUnder')}>
                                <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_18, styles.paddingHorizontal_15, styles.textDecoration]}>
                                    {i18n.translate('Acknow')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Form>

                </Content>

                <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress={() => this.addCases()}>
                    <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('sent')}</Text>
                </TouchableOpacity>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth        : auth.user,
        user        : profile.user,
        lang        : lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(AddCases);
