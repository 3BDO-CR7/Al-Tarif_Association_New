import React, { Component } from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Toast} from 'native-base'
import styles from '../../assets/style';


import i18n from "../../locale/i18n";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";
import {NavigationEvents} from "react-navigation";

class MyCases extends Component {
    constructor(props){
        super(props);
        this.state = {
            userCases       : [],
            spinner         : false,
        }
    }


    componentWillMount() {

        console.log('user-data  ', this.props.auth.data.token)

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'userCases',
            method      : 'POST',
            headers     : {Authorization: 'Bearer ' + this.props.auth.data.token},
            data : {
                lang            : this.props.lang,
            }
        }).then(response => {

            let userCases = response.data.data;

            if(userCases.length === 0){
                Toast.show({
                    text            : i18n.translate('noCases'),
                    duration        : 2000,
                    type            : "danger",
                    textStyle       : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center'
                    }
                });
            }else {
                this.setState({
                    userCases                : response.data.data,
                });
            }

            this.setState({spinner : false});

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

    onFocus(){
        this.componentWillMount();
    }


    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('mycases')}</Text>) ,
        drawerIcon      : null
    });

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
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('mycases')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    {
                        this.state.userCases.map((cases, i) => (
                            <Animatable.View animation="fadeInUp" easing="ease-out" key={i} delay={300}>
                                <TouchableOpacity
                                    style={[styles.viewTabs, styles.rowGroup, styles.boxShadow, styles.bg_lightWhite, styles.Radius_15,styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_10, styles.marginHorizontal_20]}
                                    onPress={() => this.props.navigation.navigate('DetailsCasesUser', { id: cases.id })}
                                >
                                    {/*<View style={[styles.overHidden, styles.flex_30, styles.flexCenter, styles.block]}>*/}
                                    {/*    <Image style={[styles.iconImg]} source={require('../../assets/img/noun_leaf.png')}/>*/}
                                    {/*    <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular]}>*/}
                                    {/*        {i18n.translate('numCases')}*/}
                                    {/*    </Text>*/}
                                    {/*    <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular]}>*/}
                                    {/*        { cases.id }*/}
                                    {/*    </Text>*/}
                                    {/*</View>*/}

                                    {/*<View style={styles.borderView}></View>*/}

                                    <View style={[styles.overHidden, styles.flex_100, styles.paddingHorizontal_10]}>

                                        {/*<View style={[styles.overHidden, styles.rowGroup]}>*/}
                                        {/*    <Text style={[styles.text_turquoise, styles.textSize_16, styles.textRegular]}>*/}
                                        {/*        {i18n.translate('caseDet')}*/}
                                        {/*    </Text>*/}
                                        {/*</View>*/}

                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.flex_30, styles.textLeft]}>
                                                {i18n.translate('numCases')} :
                                            </Text>
                                            <Text style={[styles.text_brown, styles.textSize_12, styles.textRegular, styles.flex_70, styles.textLeft]}>
                                                { cases.id }
                                            </Text>
                                        </View>

                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.flex_30, styles.textLeft]}>
                                                {i18n.translate('nameCases')} :
                                            </Text>
                                            <Text style={[styles.text_brown, styles.textSize_12, styles.textRegular, styles.flex_70, styles.textLeft]}>
                                                { cases.name }
                                            </Text>
                                        </View>

                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.flex_30, styles.textLeft]}>
                                                {i18n.translate('datecases')} :
                                            </Text>
                                            <Text style={[styles.text_brown, styles.textSize_12, styles.textRegular, styles.flex_70, styles.textLeft]}>
                                                { cases.date }
                                            </Text>
                                        </View>

                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.flex_30, styles.textLeft]}>
                                                {i18n.translate('Condsi')} :
                                            </Text>
                                            <Text style={[styles.text_darkGreen, styles.textSize_12, styles.textRegular, styles.flex_70, styles.textLeft]}>
                                                { cases.type }
                                            </Text>
                                        </View>

                                    </View>
                                    {/*<Text style={[styles.arrLeft]}>*/}
                                    {/*    <Icon style={[styles.text_turquoise, styles.textSize_22]} type="FontAwesome" name='long-arrow-left' />*/}
                                    {/*</Text>*/}
                                </TouchableOpacity>
                            </Animatable.View>
                        ))
                    }




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
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(MyCases);