import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity,Linking} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Right, Toast} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import Tabs from './Tabs';
import * as Animatable from "react-native-animatable";
import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import { Notifications } from 'expo';
import * as Permissions from "expo-permissions";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                 : false,
            is_donation             : 1,
            projects                : '',
            projects_string         : '',
            doners                  : '',
            totalCases              : '',
            ActiveCases             : '',
        }

        console.log('auth  ' , this.props.auth)
    }

    async componentDidMount(){
        Notifications.addListener(this.handleNotification);
        this.getPermissionAsync()
    }

    getPermissionAsync = async () => {

        await Permissions.askAsync(Permissions.CAMERA);
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    };
    handleNotification = (notification) => {
        if (notification && notification.origin !== 'received') {
            this.props.navigation.navigate('Notification');
        }
    };

    componentWillMount() {

        this.setState({spinner: false});

        axios({
            url         : CONST.url + 'home',
            method      : 'POST',
            data : {
                lang : this.props.lang
            }
        }).then(response => {

            this.setState({
                projects                : response.data.data.projects,
                projects_string         : response.data.data.projects_string,
                doners                  : response.data.data.doners,
                totalCases              : response.data.data.totalCases,
                ActiveCases             : response.data.data.ActiveCases,
                spinner                 : false
            });

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


        }).catch(err => {
            this.setState({spinner : false});
        }).then(()=>{
            this.setState({spinner : false});
        })

    }

    chickUser(page){

        if(this.props.auth === null){

            this.props.navigation.navigate('Login');

            Toast.show({
                text            : i18n.translate('chickLogin'),
                duration        : 2000,
                type            : "danger",
                textStyle       : {
                    color         : "white",
                    fontFamily    : 'cairo',
                    textAlign     : 'center'
                }
            });

        }else{

            this.props.navigation.navigate(page, { id: null });

        }

    }

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('home')}</Text>) ,
        drawerIcon      : null
    });

    render() {

        return (
            <Container>
                <Spinner
                    visible           = { this.state.spinner }
                />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => { this.props.navigation.openDrawer()} }>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="Entypo" name='grid' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('home')}</Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.chickUser('Notification')}>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="MaterialIcons" name='notifications' />
                        </Button>
                    </Right>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[styles.viewHome , styles.paddingHorizontal_15]}>

                        <TouchableOpacity
                            style={[
                                styles.bg_lightWhite,
                                styles.Width_100,
                                styles.rowCenter,
                                styles.Radius_50,
                                styles.marginVertical_15,
                                styles.height_50,
                            ]}
                            onPress={() => this.props.navigation.navigate('Search')}>
                            <Text style={styles.marginHorizontal_5}>
                                <Icon style={[styles.text_gray, styles.textSize_18]} type="MaterialCommunityIcons" name='filter' />
                            </Text>
                            <Text style={[styles.textRegular , styles.textSize_18, styles.text_gray, styles.paddinVertical_10]}>
                                {i18n.translate('chickSearch')}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.bg_White, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.rowGroup,styles.Radius_15, styles.boxShadow, styles.marginVertical_10, styles.minHeight, styles.overHidden]}
                                          onPress={() => this.props.navigation.navigate('AboutApp')}>
                            <View style={[styles.overHidden]}>
                                <Text style={[styles.text_darkGreen, styles.textSize_28, styles.textRegular]}>
                                    {i18n.translate('about')}
                                </Text>
                            </View>
                            <View style={[styles.overHidden]}>
                                <Image style={[styles.minImage]} source={require('../../assets/img/logo.png')}/>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.bg_darkGreen, styles.Border, styles.paddingHorizontal_10, styles.rowGroup,styles.Radius_15, styles.boxShadow, styles.marginVertical_10, styles.minHeight, styles.overHidden]}
                                          onPress={() => this.props.navigation.navigate('TheCases')}>
                            <View style={[styles.overHidden]}>
                                <Text style={[styles.text_White, styles.textSize_28, styles.textRegular,styles.paddingHorizontal_10]}>
                                    {i18n.translate('Cases')}
                                </Text>
                                <Text style={[styles.text_White, styles.textSize_20, styles.textRegular,styles.paddingHorizontal_10]}>
                                    { this.state.ActiveCases } {i18n.translate('status')}
                                    {/*55 حاله*/}
                                </Text>
                            </View>
                            <View style={[styles.overHidden, styles.Victor]}>
                                <Image style={[styles.minImage]} source={require('../../assets/img/vector.png')}/>
                            </View>
                        </TouchableOpacity>

                        <View style={[styles.overHidden]}>

                            <Text style={[styles.text_gray, styles.textSize_20, styles.textRegular, styles.textCenter, styles.marginVertical_15]}>
                                {i18n.translate('tarAsso')}
                            </Text>


                            <View style={[styles.overHidden, styles.rowGroup, styles.paddingHorizontal_25, styles.marginVertical_15]}>

                                <View style={[styles.overHidden, styles.flexCenter]}>
                                    <Text style={[styles.text_toby, styles.textSize_24, styles.textRegular, styles.fontBold]}>{ this.state.totalCases }</Text>
                                    <Text style={[styles.text_gray, styles.textSize_18, styles.textRegular, styles.fontSpacing]}>{i18n.translate('status')}</Text>
                                </View>

                                <View style={[styles.overHidden, styles.flexCenter]}>
                                    <Text style={[styles.text_blue, styles.textSize_24, styles.textRegular, styles.fontBold]}>{ this.state.doners }</Text>
                                    <Text style={[styles.text_gray, styles.textSize_18, styles.textRegular, styles.fontSpacing]}>{i18n.translate('Donor')}</Text>
                                </View>

                                <View style={[styles.overHidden, styles.flexCenter]}>
                                    <Text style={[styles.text_turquoise, styles.textSize_24, styles.textRegular, styles.fontBold]}>{ this.state.projects }</Text>
                                    <Text style={[styles.text_gray, styles.textSize_18, styles.textRegular, styles.fontSpacing]}>{ this.state.projects_string }</Text>
                                </View>

                            </View>

                        </View>

                        <TouchableOpacity
                            style={[
                                styles.bg_darkGreen,
                                styles.Width_100,
                                styles.centerContext,
                                styles.Radius_50,
                                styles.marginVertical_25,
                                styles.height_50
                            ]}
                            //onPress={() => this.props.navigation.navigate('Payment', {case_id : null})}>
                            onPress={() => {
                                (this.state.is_donation == 1)?
                                this.props.navigation.navigate('FormPayment', { bank_id : 1, case_id :null})
                                :
                                Linking.openURL(`https://press.aait-sa.com/wael/tareef/ar/`)
                            }}>
                            <Text style={[styles.textRegular , styles.textSize_18, styles.text_White, styles.paddinVertical_10]}>
                                {i18n.translate('publicDon')}
                            </Text>
                        </TouchableOpacity>

                    </View>

                </Content>

                <Tabs routeName="Home"  navigation={this.props.navigation}/>
            </Container>

        );
    }
}

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth: auth.user,
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {userLogin, profile, chooseLang})(Home);