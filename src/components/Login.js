import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, AsyncStorage} from "react-native";
import {Container, Content, Form, Input, Item, Toast,} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';
import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
import { userLogin, profile } from '../actions';
import {NavigationEvents} from "react-navigation";
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner         : false,
            phone           : '',
            password        : '',
            deviceId        : '',
            userId          : null,
            type            : 0
        }
    }

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.phone.length <= 0) {
            isError     = true;
            msg         = i18n.translate('entername');
        }else if (this.state.password.length <= 0){
            isError     = true;
            msg         = i18n.translate('passreq');
        }
        this.setState({spinner: false});

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

    onLoginPressed() {

        this.setState({spinner: true});

        const err = this.validate();

        if (!err){
            const {phone, password, deviceId , type} = this.state;
            this.props.userLogin({ phone, password, deviceId, type }, this.props.lang);
        }

    }

    async componentWillMount() {


        this.setState({spinner: false});

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

        const deviceId = await Notifications.getExpoPushTokenAsync();

        this.setState({ deviceId, userId: null });
        AsyncStorage.setItem('deviceID', deviceId);

    }

    componentWillReceiveProps(newProps){
        if (newProps.auth !== null && newProps.auth.success === true){
            if (this.state.userId === null){
                this.setState({ userId: newProps.auth.data.id });
                this.props.profile(newProps.auth.data.token);
            }
            this.props.navigation.navigate('Home');
        }
        this.setState({spinner: false});
        if (newProps.auth !== null) {
            this.setState({spinner: false});
            Toast.show({
                text        : newProps.auth.message,
                type        : newProps.auth.success === true ? "success" : "danger",
                duration    : 3000,
                textStyle     : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });
        }
    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (

            <Container>

                <Spinner
                    visible           = { this.state.spinner }
                />

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Content contentContainerStyle={styles.bgFullWidth}>

                    <View style={styles.paddingHorizontal_25}>

                        <Text style={[styles.textBold, styles.textLeft, styles.textSize_24, styles.marginVertical_10, styles.text_darkGreen]}>
                            {i18n.translate('login')}
                        </Text>

                        <Text style={[styles.textRegular, styles.textLeft, styles.textSize_18, styles.marginVertical_5, styles.text_gray]}>
                            {i18n.translate('toCountiune')}
                        </Text>

                        <View style={styles.overHidden}>
                            <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>
                                <Image style={[styles.sizeImage , styles.marginVertical_15, styles.flexCenter]} source={require('../../assets/img/logo.png')}/>
                            </Animatable.View>
                        </View>

                        <Form style={[styles.formValdition, styles.Width_100, styles.flexCenter, styles.marginVertical_10]}>

                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('userName')}
                                    style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                    onChangeText            = {(phone) => this.setState({phone})}
                                    value                   = { this.state.phone }
                                />
                            </Item>

                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('password')}
                                    style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                    autoCapitalize          = 'none'
                                    value                   = { this.state.password }
                                    onChangeText            = {(password) => this.setState({password})}
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
                                onPress={() => this.onLoginPressed()}>
                                <Text style={[styles.textRegular , styles.textSize_18, styles.text_White, styles.paddinVertical_10]}>
                                    {i18n.translate('login')}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')} style={[ styles.click_ForgetPassword, styles.marginVertical_25 ]}>
                                <Text style={[styles.textRegular, styles.textSize_18, styles.marginVertical_5, styles.text_turquoise]}>
                                    {i18n.translate('forgetPassword')}
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={[styles.click_SignUp, styles.rowGroup, styles.marginVertical_25]}>
                                <Text style={[styles.textRegular, styles.textSize_16, styles.text_lightGreen, styles.marginHorizontal_5]}>
                                    {i18n.translate('doHaveAcc')}
                                </Text>
                                <Text style={[styles.textRegular, styles.textSize_16,styles.text_turquoise, styles.textDecoration, styles.marginHorizontal_5]}>
                                    {i18n.translate('register')}
                                </Text>
                            </TouchableOpacity>

                        </Form>

                    </View>

                </Content>

            </Container>

        );
    }
}

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        loading     : auth.loading,
        auth        : auth.user,
        user        : profile.user,
        lang        : lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile })(Login);