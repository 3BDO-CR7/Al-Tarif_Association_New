import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import {Container, Content, Form, Input, Item, Toast,} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";

class ActiveAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            code                : '',
            phone               : '',
            spinner             : false,
            userId              : null
        }
    }

    componentWillMount() {

        const code  = this.props.navigation.state.params.code;
        alert(code);
        this.setState({ userId: null });

    }



    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.code ===  '') {
            isError     = true;
            msg         = i18n.translate('codeNot');
        }else if(parseInt(this.state.code) !== this.props.navigation.state.params.code){
            isError     = true;
            msg         = i18n.translate('codeErr');
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
                url         : CONST.url + 'activeAccount',
                method      : 'POST',
                data : {
                    lang            : this.props.lang,
                    user_id         : this.props.navigation.state.params.user_id,
                }
            }).then(response => {

                this.setState({spinner : false});

                Toast.show({
                    text            : response.data.message,
                    type            : "success",
                    duration        : 3000,
                    textStyle       : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center',
                    }
                });

                this.props.navigation.navigate('Login');

                //this.props.navigation.navigate('Home');
                //const { password, phone, deviceId } = this.props.navigation.state.params;
                //const type = 'user';
                   this.setState({ isSubmitted: true });
                // this.props.userLogin({ phone, password, deviceId , type}, this.props.lang);
                // this.props.activeAccount(phone);

            }).catch(err => {
                console.log(err);
                this.setState({spinner : false});
            })
        }

    }

    recentCode (){

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'newActivationCode',
            method      : 'POST',
            data : {
                lang            : this.props.lang,
                // user_id         : this.props.auth.data.id,
                user_id         : this.props.navigation.state.params.user_id
            }
        }).then(response => {

            this.setState({spinner : false});

            Toast.show({
                text            : response.data.message,
                type            : "success",
                duration        : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });

            let code = response.data.data.code;

            alert(code);

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        });

    }

    componentWillReceiveProps(newProps){
        console.log('auth data', newProps);

        console.log('this is user id...', this.state.userId);
        if (newProps.auth !== null && newProps.success === true){

            console.log('this is user id...', this.state.userId);
            console.log('this is user id...', newProps.auth.data.id);

            if (this.state.userId === null){
                this.setState({ userId: newProps.auth.data.id });
                this.props.profile(newProps.auth.data.token);
            }

            this.props.navigation.navigate('Home');
        }

        if (newProps.auth !== null) {
            Toast.show({
                text            : newProps.auth.message,
                type            : newProps.auth.success === true ? "success" : "danger",
                duration        : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });
        }

        this.setState({ isSubmitted: false });
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
                            {i18n.translate('actAccount')}
                        </Text>

                        <Text style={[styles.textRegular, styles.textLeft, styles.textSize_18, styles.marginVertical_5, styles.text_gray]}>
                            {i18n.translate('plaseChick')}
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
                                    placeholder             = {i18n.translate('actcode')}
                                    style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                    onChangeText            = {(code) => this.setState({code})}
                                    keyboardType            = {'number-pad'}
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
                                    {i18n.translate('confirm')}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.recentCode()} style={[styles.click_SignUp, styles.rowGroup, styles.marginVertical_25]}>
                                <Text style={[styles.textRegular, styles.textSize_16,styles.text_turquoise, styles.textDecoration, styles.marginHorizontal_5]}>
                                    {i18n.translate('donSent')}
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

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth        : auth.user,
        user        : profile.user,
        lang        : lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(ActiveAccount);