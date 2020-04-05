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
import  Modal  from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";
import {NavigationEvents} from "react-navigation";

class MyDonations extends Component {
    constructor(props){
        super(props);
        this.state = {
            Interests       : [],
            spinner         : false,
            show_modal      : false,
        }
    }


    componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'userFavCase',
            method      : 'POST',
            headers     : {Authorization: 'Bearer ' + this.props.auth.data.token},
            data : {
                lang            : this.props.lang,
            }
        }).then(response => {

            let Interests = response.data.data;

            if(Interests.length === 0){
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
                    Interests                : response.data.data,
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

    clickFav(id, i){

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'favCase',
            method      : 'POST',
            headers     : {Authorization: this.props.user.token},
            data      : {
                case_id         : id,
                lang            : this.props.lang,
            }
        }).then(response => {

            this.state.Interests.splice(i,1);

            Toast.show({
                text            : response.data.message,
                duration        : 2000,
                type            : "success",
                textStyle  : {
                    color       : "white",
                    fontFamily  : 'cairo' ,
                    textAlign   : 'center'
                }
            });

            this.setState({spinner : false});

            this.toggleModal();


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

    toggleModal = () => {
        this.setState({ show_modal: !this.state.show_modal });
    };


    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('myinterests')}</Text>) ,
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
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('myinterests')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    {
                        this.state.Interests.map((inter, i) => (
                            <Animatable.View animation="fadeInUp" easing="ease-out" key={i} delay={300}>
                                <TouchableOpacity
                                    style={[styles.viewTabs, styles.rowGroup, styles.boxShadow, styles.bg_lightWhite, styles.Radius_15,styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_10, styles.marginHorizontal_20]}
                                    onPress={() => this.props.navigation.navigate('DetailsCases', { id: inter.id })}
                                >
                                    <View style={[styles.overHidden, styles.flex_30, styles.flexCenter, styles.block]}>
                                        <Image style={[styles.iconImg]} source={require('../../assets/img/noun_leaf.png')}/>
                                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular]}>
                                            {i18n.translate('numCases')}
                                        </Text>
                                        <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular]}>
                                            { inter.id }
                                        </Text>
                                    </View>

                                    <View style={styles.borderView}></View>

                                    <View style={[styles.overHidden, styles.flex_70, styles.paddingHorizontal_10]}>

                                        <View style={[styles.overHidden, styles.rowGroup]}>
                                            <Text style={[styles.text_turquoise, styles.textSize_16, styles.textRegular]}>
                                                {i18n.translate('caseDet')}
                                            </Text>
                                            <View style={styles.overHidden}>
                                                <TouchableOpacity onPress={this.toggleModal}>
                                                    <Icon style={[styles.text_turquoise, styles.textSize_18]} type="FontAwesome" name='bookmark' />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                {i18n.translate('kindCases')} :
                                            </Text>
                                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                { inter.caseType }
                                            </Text>
                                        </View>

                                        {
                                            (inter.money !== null)

                                                ?
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                        {i18n.translate('monyCases')} :
                                                    </Text>
                                                    <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                        { inter.money }
                                                    </Text>
                                                </View>
                                                :
                                                <View/>
                                        }

                                        {
                                            (inter.remainingAmount !== null)

                                                ?
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                        {i18n.translate('CoCases')} :
                                                    </Text>
                                                    <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                        { inter.remainingAmount }
                                                    </Text>
                                                </View>
                                                :
                                                <View/>
                                        }

                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                {i18n.translate('needCases')} :
                                            </Text>
                                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                { inter.needType }
                                            </Text>
                                        </View>

                                        {
                                            (inter.status === 1)

                                                ?
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                        {i18n.translate('Condsi')} :
                                                    </Text>
                                                    <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                        {i18n.translate('Completed')}
                                                    </Text>
                                                </View>
                                                :
                                                <View/>
                                        }

                                    </View>
                                    <Text style={[styles.arrLeft]}>
                                        <Icon style={[styles.text_turquoise, styles.textSize_22]} type="FontAwesome" name='long-arrow-left' />
                                    </Text>
                                </TouchableOpacity>
                                <Modal
                                    onBackButtonPress               = {()=> this.setState({show_modal : false})}
                                    isVisible                       = {this.state.show_modal}
                                    style                           = {styles.bgModel}
                                    hasBackdrop                     = {false}
                                    animationIn                     = {'slideInUp'}
                                    animationOut                    = {'slideOutDown'}
                                    animationInTiming               = {1000}
                                    animationOutTiming              = {1000}
                                    backdropTransitionInTiming      = {1000}
                                    backdropTransitionOutTiming     = {1000}
                                    swipeDirection                  = "bottom"
                                >
                                    <View style={styles.contentModel}>
                                        <View style={styles.model}>

                                            <View style={[styles.bg_White, styles.overHidden, styles.flexCenter, styles.Radius_20, styles.Width_80]}>
                                                <Text style={[styles.textRegular, styles.textSize_18, styles.text_gray, styles.textCenter, styles.marginVertical_25]}>{i18n.translate('removed')}</Text>
                                                <View style={[styles.overHidden, styles.rowGroup]}>
                                                    <TouchableOpacity style={[styles.overHidden, styles.flex_50, styles.paddingVertical_10 , styles.bg_darkGreen]} onPress={() => this.clickFav(inter.id,i)}>
                                                        <Text style={[styles.textRegular, styles.textSize_18, styles.text_White, styles.textCenter]}>{i18n.translate('yes')}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[styles.overHidden, styles.flex_50, styles.paddingVertical_10, styles.bg_lightWhite]} onPress={this.toggleModal}>
                                                        <Text style={[styles.textRegular, styles.textSize_18, styles.text_darkGreen, styles.textCenter]}>{i18n.translate('no')}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </Modal>
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
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(MyDonations);