import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content, Form, Input, Item, Toast,} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';
import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";

class NewPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            code                        : '',
            password                    : '',
            rePassword                  : '',
            spinner                     : false,
        }
    }

    componentWillMount() {

        const code  = this.props.navigation.state.params.result;
        alert(code);


    }

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.code ===  '') {
            isError     = true;
            msg         = i18n.translate('codeNot');
        }else if(parseInt(this.state.code) !== this.props.navigation.state.params.result){
            isError     = true;
            msg         = i18n.translate('codeErr');
        } else if (this.state.password.length <= 0 || this.state.password.length < 6){
            isError     = true;
            msg         = i18n.translate('passreq');
        }else if (this.state.password !== this.state.rePassword){
            isError     = true;
            msg         = i18n.translate('notmatch');

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

    checkCode(){

        const err = this.validate();

        if(!err){

            this.setState({spinner: true});

            axios({
                url         : CONST.url + 'ResetPassword',
                method      : 'POST',
                data : {
                    lang            : this.props.lang,
                    password        : this.state.password,
                    id              : this.props.navigation.state.params.data.id
                }
            }).then(response => {

                this.setState({spinner : false});

                Toast.show({
                    text            : response.data.message,
                    type            : response.data.success === true ? "success" : "danger",
                    duration        : 3000,
                    textStyle       : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center',
                    }
                });

                if(response.data.success === true){
                    this.props.navigation.navigate('Login');
                }


            }).catch(err => {
                console.log(err);
                this.setState({spinner : false});
            })
        }

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
                            {i18n.translate('PassReco')}
                        </Text>

                        <Text style={[styles.textRegular, styles.textLeft, styles.textSize_18, styles.marginVertical_5, styles.text_gray]}>
                            {i18n.translate('plaseChick')}
                        </Text>

                        <View style={styles.overHidden}>
                            <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>
                                <Image style={[styles.sizeImage , styles.marginVertical_15, styles.flexCenter]} source={require('../../assets/img/logo.png')}/>
                            </Animatable.View>
                        </View>

                        <Form style={[styles.formValdition, styles.Width_100, styles.flexCenter, styles.marginVertical_10]}>

                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('retncode')}
                                    style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                    keyboardType            = {'number-pad'}
                                    onChangeText            = {(code) => this.setState({code})}
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

                            <TouchableOpacity
                                style={[
                                    styles.bg_darkGreen,
                                    styles.Width_100,
                                    styles.centerContext,
                                    styles.Radius_50,
                                    styles.marginVertical_15,
                                    styles.height_50
                                ]}
                                onPress={() => this.checkCode()}>
                                <Text style={[styles.textRegular , styles.textSize_18, styles.text_White, styles.paddinVertical_10]}>
                                    {i18n.translate('sent')}
                                </Text>
                            </TouchableOpacity>

                        </Form>

                    </View>

                </Content>

            </Container>

        );
    }
}

export default NewPassword;