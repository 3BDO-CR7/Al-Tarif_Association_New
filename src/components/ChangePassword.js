import React, { Component } from "react";
import {Text, TouchableOpacity} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Form, Item, Input, Toast} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";

class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                         : false,
            old_password                    : "",
            new_password                    : "",
            confirmation_password           : ""
        }
    }

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.old_password.length <= 0) {
            isError     = true;
            msg         = i18n.translate('Entpassword');
        }else if (this.state.new_password.length <= 0 || this.state.new_password.length < 6) {
            isError     = true;
            msg         = i18n.translate('passreq');
        }else if (this.state.new_password !== this.state.confirmation_password) {
            isError     = true;
            msg         = i18n.translate('notmatch');
        }

        if (msg !== ''){
            Toast.show({
                text          : msg,
                duration      : 2000,
                type          : "danger",
                textStyle     : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center'
                }
            });
        }
        return isError;
    };

    onSave(){

        const err = this.validate();

        if (!err){

            this.setState({spinner :  true});

            axios({
                url       : CONST.url + 'ChangePassword',
                method    : 'POST',
                data      : {
                    lang                    : this.props.lang,
                    token                   : this.props.auth.data.token,
                    old_password            : this.state.old_password,
                    new_password            : this.state.new_password,
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

                if(response.data.success === true){
                    this.props.navigation.navigate('Profile');
                }

                this.setState({spinner :  false});

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
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('changepass')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <Form style={[styles.formValdition, styles.Width_90, styles.flexCenter, styles.marginVertical_25]}>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('currentpass')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                autoCapitalize          = 'none'
                                onChangeText            = {(old_password) => this.setState({old_password})}
                            />
                        </Item>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('newpass')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                autoCapitalize          = 'none'
                                onChangeText            = {(new_password) => this.setState({new_password})}
                                secureTextEntry
                            />
                        </Item>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('confirmpass')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                autoCapitalize          = 'none'
                                onChangeText            = {(confirmation_password) => this.setState({confirmation_password})}
                                secureTextEntry
                            />
                        </Item>

                    </Form>

                </Content>

                <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress={() => this.onSave()}>
                    <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('save')}</Text>
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
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(EditProfile);