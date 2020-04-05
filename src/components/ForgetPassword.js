import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content, Form, Input, Item, Toast, Header, Left, Button, Icon, Body, Title} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import {chooseLang} from "../actions";
import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";

class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone               : '',
            spinner             : false,
        }
    }


    componentWillMount() {

    }

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.phone.length <= 0) {
            isError     = true;
            msg         = i18n.translate('namereq');
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
                url         : CONST.url + 'ForgetPassword',
                method      : 'POST',
                data : {
                    lang            : this.props.lang,
                    phone           : this.state.phone,
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
                    let data = {
                        id      : response.data.data.id,
                        code    : response.data.data.code
                    };
                    this.props.navigation.navigate('NewPassword', {data : data , result : response.data.data.code});
                }


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

    }

    render() {

        return (

            <Container>

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
                        {/*<Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('back')}</Title>*/}
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth}>

                    <View style={styles.paddingHorizontal_20}>

                        <Text style={[styles.textBold, styles.textLeft, styles.textSize_24, styles.marginVertical_10, styles.text_darkGreen]}>
                            {i18n.translate('PassReco')}
                        </Text>

                        <Text style={[styles.textRegular, styles.textLeft, styles.textSize_18, styles.marginVertical_5, styles.text_gray]}>
                            {i18n.translate('sendnumber')}
                        </Text>

                        <View style={styles.overHidden}>
                            <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>
                                <Image style={[styles.sizeImage , styles.marginVertical_15, styles.flexCenter]} source={require('../../assets/img/logo.png')}/>
                            </Animatable.View>
                        </View>

                        <Form style={[styles.formValdition, styles.Width_100, styles.flexCenter, styles.marginVertical_10]}>

                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('phone')}
                                    style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                    keyboardType            = {'number-pad'}
                                    onChangeText            = {(phone) => this.setState({phone})}
                                    value                   = { this.state.phone }
                                    maxLength               = {11}
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

const mapStateToProps = ({ lang }) => {
    return {
        lang    : lang.lang
    };
};

export default connect(mapStateToProps, { chooseLang })(ForgetPassword);