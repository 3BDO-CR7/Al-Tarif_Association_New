import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity,KeyboardAvoidingView} from "react-native";
import {CheckBox, Container, Content, Form, Input, Item, Toast,} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';
import Spinner from "react-native-loading-spinner-overlay";

import { register } from "../actions";
import {connect} from "react-redux";
import * as Permissions from "expo-permissions";
import {Notifications} from "expo";
import axios from "axios";
import CONST from "../consts";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullName            : '',
            NationalNnm         : '',
            phone               : '',
            email               : '',
            password            : '',
            rePassword          : '',
            token               : '',
            is_donation         : 0,
            userId              : null,
            checked             : false,
            spinner             : false,
        };
        axios({
            url         : CONST.url + 'stop-donation',
            method      : 'POST',
            data     : {
                lang : this.props.lang
            }
        }).then(response => {
            this.setState({
                is_donation                : response.data.data,
            });
        }).catch(err => {
            this.setState({spinner : false});
        })
    }

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.phone.fullName <= 0 || this.state.fullName.length < 4) {
            isError     = true;
            msg         = i18n.translate('Full');
        }else if (this.state.NationalNnm.length <= 0){
            isError     = true;
            msg         = i18n.translate('IDnumber');
        }else if (this.state.phone.length <= 0){
            isError     = true;
            msg         = i18n.translate('namereq');
        }else if(this.state.phone.length !== 10){
            isError     = true;
            msg         = i18n.translate('aggnumber');
        }else if (this.state.email.length <= 0 || this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".") === -1){
            isError     = true;
            msg         = i18n.translate('entermail');
        }else if (this.state.password.length <= 0 || this.state.password.length < 6){
            isError     = true;
            msg         = i18n.translate('passreq');
        }else if (this.state.password !== this.state.rePassword){
            isError     = true;
            msg         = i18n.translate('notmatch');
        }else if (this.state.checked === false){
            isError     = true;
            msg         = i18n.translate('aggreTerms');
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



    onRegisterPressed() {

        this.setState({ spinner: true });

        const err = this.validate();

        if (!err){

            this.setState({ spinner: false });
            const { fullName, email, phone, password, NationalNnm , token } = this.state;
            const data = {fullName, email, phone, password, NationalNnm, token,lang: this.props.lang,};
            this.props.register(data, this.props);
        }else {

            this.setState({ spinner: false });

        }
    }

    async componentWillMount() {
      setTimeout(()=> {
          this.return_permission();
      },4000)
    }

    async return_permission(){
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        this.setState({token : token});
    }

    render() {

        return (

            <Container>
                <Spinner
                    visible           = { this.state.spinner }
                />
                <Content contentContainerStyle={styles.bgFullWidth}>

                    <View style={styles.paddingHorizontal_20}>

                        <Text style={[styles.textBold, styles.textLeft, styles.textSize_24, styles.marginVertical_10, styles.text_darkGreen]}>
                            {i18n.translate('register')}
                        </Text>

                        <Text style={[styles.textRegular, styles.textLeft, styles.textSize_18, styles.marginVertical_5, styles.text_gray]}>
                            {i18n.translate('Countiune')}
                        </Text>

                        <View style={styles.overHidden}>
                            <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>
                                <Image style={[styles.sizeImage , styles.marginVertical_15, styles.flexCenter]} source={require('../../assets/img/logo.png')}/>
                            </Animatable.View>
                        </View>

                        <KeyboardAvoidingView behavior={'padding'}>
                            <Form style={[styles.formValdition, styles.Width_100, styles.flexCenter, styles.marginVertical_10]}>

                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.translate('userName')}
                                        style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                        onChangeText            = {(fullName) => this.setState({fullName})}
                                        value                   = { this.state.fullName }
                                    />
                                </Item>

                                {
                                    (this.state.is_donation == 1)
                                    ?
                                        <Item floatingLabel style={styles.item}>
                                            <Input
                                                placeholder             = {i18n.translate('natNumber')}
                                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                                keyboardType            = {'number-pad'}
                                                onChangeText            = {(NationalNnm) => this.setState({NationalNnm})}
                                            />
                                        </Item>
                                        :null
                                }


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
                                        onChangeText            = {(email) => this.setState({email})}
                                    />
                                </Item>

                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.translate('newpass')}
                                        style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                        autoCapitalize          = 'none'
                                        onChangeText            = {(password) => this.setState({password})}
                                        secureTextEntry
                                    />
                                </Item>

                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.translate('confirmpass')}
                                        style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                        autoCapitalize          = 'none'
                                        onChangeText            = {(rePassword) => this.setState({rePassword})}
                                        secureTextEntry
                                    />
                                </Item>

                                <View style={[styles.rowRight, styles.marginVertical_20]}>
                                    <TouchableOpacity style = {[styles.rowRight, styles.marginVertical_10]}>
                                        <CheckBox
                                            style                   = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                            color                   = {styles.text_gray}
                                            selectedColor           = {styles.text_darkGreen}
                                            onPress                 = {() => this.setState({ checked: !this.state.checked })}
                                            checked                 = {this.state.checked}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms',{
                                        type : 'register'
                                    })}>
                                        <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_18, styles.paddingHorizontal_15, styles.textDecoration]}>
                                            {i18n.translate('terms')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.bg_darkGreen,
                                        styles.Width_100,
                                        styles.centerContext,
                                        styles.Radius_50,
                                        styles.marginVertical_15,
                                        styles.height_50
                                    ]}
                                    onPress={() => this.onRegisterPressed()}>
                                    <Text style={[styles.textRegular , styles.textSize_18, styles.text_White, styles.paddinVertical_10]}>
                                        {i18n.translate('register')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={[styles.click_SignUp, styles.rowGroup, styles.marginVertical_25]}>
                                    <Text style={[styles.textRegular, styles.textSize_16, styles.text_lightGreen, styles.marginHorizontal_5]}>
                                        {i18n.translate('haveAcc')}
                                    </Text>
                                    <Text style={[styles.textRegular, styles.textSize_16,styles.text_turquoise, styles.textDecoration, styles.marginHorizontal_5]}>
                                        {i18n.translate('login')}
                                    </Text>
                                </TouchableOpacity>

                            </Form>
                        </KeyboardAvoidingView>

                    </View>

                </Content>

            </Container>

        );
    }
}

const mapStateToProps = ({ auth, profile, lang, register }) => {
    return {
        auth            : auth.user,
        user            : profile.user,
        registering     : register.register,
        lang            : lang.lang,
    };
};

export default connect(mapStateToProps, { register })(Register);
