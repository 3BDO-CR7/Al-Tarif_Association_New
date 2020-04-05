import React, { Component } from "react";
import {View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ImageEditor, ImageStore} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Form, Item, Input, Toast, Picker, ActionSheet} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";
import {NavigationEvents} from "react-navigation";

import * as ImagePicker from 'expo-image-picker';

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

class FormPayment extends Component {
    constructor(props){
        super(props);
        this.state = {
            theBanks                : [],
            spinner                 : false,
            nameBank                : null,
            accOwner                : '',
            accNumber               : '',
            amount                  : '',
            image                   : '',
            bank_name               : '',
            eventImg                : i18n.translate('receipt'),
            imageBrowserOpen        : false,
            cameraBrowserOpenPE     : false,
            Base64                  : [],
            images                  : [],
            base_64                 : [],
            photos                  : [],
            hasCameraPermission     : null,
            imgBase64               : '',
            uri                     : '',
        }

    }

    async componentWillMount() {

        if(this.props.navigation.state.params.photo){
            this.setState({imgBase64 : this.props.navigation.state.params.photo});
            this.setState({uri       : this.props.navigation.state.params.uri});
            this.setState({ eventImg : i18n.translate('upload') });
        }else {
            this.setState({ imgBase64 : i18n.translate('receipt') });
        }
        setTimeout(()=> {
            console.log('photo navigation =====', this.state.imgBase64);
        }, 3000);

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'banks',
            method      : 'POST',
            data : {
                lang            : this.props.lang,
            }
        }).then(response => {

            this.setState({
                theBanks           : response.data.data,
                spinner             : false
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
        });

    }

    onValueBanks (value) {this.setState({nameBank: value});}

    open() {
        ActionSheet.show(
            {
                options                 : BUTTONS,
                cancelButtonIndex       : CANCEL_INDEX,
                destructiveButtonIndex  : DESTRUCTIVE_INDEX,
                title                   : i18n.translate('image_video')
            },
            buttonIndex => {
                this.uploadImage(BUTTONS[buttonIndex]);
            }
        )
    }

    uploadImage = async (i) => {

        if (i.i === 0) {

            let result          = await ImagePicker.launchImageLibraryAsync({
                allowsEditing   : false,
                aspect          : [4, 3],
                base64          : true,
            });

            let localUri = result.uri;
            let filename = localUri.split('/').pop();
            console.log(result);

            if (!result.cancelled) {
                this.setState({ userImage: result.uri ,imgBase64:result.base64 ,eventImg:filename});
            }


        } else if (i.i === 1) {
            this.props.navigation.navigate('OpenCamera', {namePage : 'FormPayment'});
        }

    };


    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.nameBank === null) {
            isError     = true;
            msg         = i18n.translate('enterbank');
        }else if (this.state.accOwner.length <= 0){
            isError     = true;
            msg         = i18n.translate('enterowner');
        }else if (this.state.accNumber.length <= 0){
            isError     = true;
            msg         = i18n.translate('enternumber');
        }else if (this.state.amount.length <= 0){
            isError     = true;
            msg         = i18n.translate('enteramount');
        }else if (this.state.imgBase64 === '' || this.state.imgBase64 === i18n.translate('receipt')){
            isError     = true;
            msg         = i18n.translate('enterpicture');
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

    goDone(){

        const err = this.validate();

        if (!err) {

            Toast.show({
                text          : i18n.translate('writpayment'),
                duration      : 2000,
                type          : "success",
                textStyle     : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });

            let data = {
                bank_id             : this.props.navigation.state.params.bank_id,
                case_id             : this.props.navigation.state.params.case_id,
                account_name        : this.state.nameBank,
                account_number      : this.state.accNumber,
                donate_money        : this.state.amount,
                image               : this.state.imgBase64,
                bank_name           : this.state.bank_name,
            };

            this.props.navigation.navigate('SentMessage', { data : data });

        }

    }

    onFocus(){
        this.componentWillMount();
    }

    render() {


        return (

            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Spinner
                    visible           = { this.state.spinner }
                />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="AntDesign" name='arrowright' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('payoff')}</Title>
                    </Body>
                </Header>
                <KeyboardAvoidingView behavior={'padding'} style={{ flex : 1 }}>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>



                    {
                        this.state.theBanks.map((ba) => (
                            <View style={[styles.boxBank,styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5,styles.Width_100,styles.paddingVertical_10]}>
                                <View style={[styles.overHidden, styles.flex_30]}>
                                    <Image style={[styles.icoImage]} source={{ uri: ba.image }}/>
                                </View>
                                <View style={[styles.overHidden, styles.flex_70]}>
                                    <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_18, styles.paddingHorizontal_10, styles.textLeft]}>
                                        {ba.name}
                                    </Text>
                                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_10, styles.textLeft]}>
                                        {ba.account_number}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                    <Form style={[styles.formValdition, styles.Width_90, styles.flexCenter, styles.marginVertical_20]}>



                        <View style={[styles.viewPiker, styles.flexCenter, styles.Radius_40,styles.marginVertical_15,styles.Width_100]}>
                            <Item style={styles.itemPiker} regular>
                                <Picker
                                    mode                        = "dropdown"
                                    style                       = {styles.Picker}
                                    placeholderStyle            = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl', width : '100%', fontSize : 18 }]}
                                    selectedValue               = {this.state.nameBank}
                                    onValueChange               = {this.onValueBanks.bind(this)}
                                    textStyle                   = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                    placeholder                 = {i18n.translate('transferred')}
                                    itemTextStyle               = {[styles.textRegular,{ color: "#ccc", writingDirection: 'rtl' }]}
                                >

                                    <Picker.Item style={[styles.itemPicker]} label={i18n.translate('transferred')} value={null} />

                                    {
                                        this.state.theBanks.map((bank, i) => (
                                            <Picker.Item style={[styles.itemPicker]} key={i} label={bank.name} value={bank.id} />
                                        ))
                                    }

                                </Picker>
                            </Item>
                            <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                        </View>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('Holder')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                onChangeText            = {(accOwner) => this.setState({accOwner})}
                                value                   = { this.state.accOwner }
                            />
                        </Item>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('acountnumber')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                keyboardType            = {'number-pad'}
                                onChangeText            = {(accNumber) => this.setState({accNumber})}
                                value                   = { this.state.accNumber }
                            />
                        </Item>


                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('bank_name')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                onChangeText            = {(bank_name) => this.setState({bank_name})}
                                value                   = { this.state.bank_name }
                            />
                        </Item>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('bepaid')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                keyboardType            = {'number-pad'}
                                onChangeText            = {(amount) => this.setState({amount})}
                                value                   = { this.state.amount }
                            />
                        </Item>

                        <TouchableOpacity
                            style={[styles.bg_lightWhite, styles.Radius_40, styles.rowGroup, styles.height_50, styles.Width_100, styles.paddingHorizontal_10, styles.marginVertical_10]}
                            onPress={()=> this.open()}
                        >
                            <Text
                                style           = {[styles.textRegular, styles.text_gray, styles.textSize_16, styles.overHidden, styles.Width_50, styles.textLeft]}
                                numberOfLines   = { 1 } prop with
                                ellipsizeMode   = "tail">
                                {this.state.eventImg}
                            </Text>
                            <Icon style={[styles.text_gray, styles.textSize_18]} type="Entypo" name='camera' />
                        </TouchableOpacity>

                    </Form>
                </Content>

                <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress={() => this.goDone()}>
                    <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('payoff')}</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

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
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(FormPayment);
