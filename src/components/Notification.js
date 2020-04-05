import React, { Component } from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Toast} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import CONST from "../consts";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";

class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner             : false,
            notification        : [],
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'notifications',
            method      : 'POST',
            data : {
                lang            : this.props.lang,
                token           : this.props.auth.data.token,
            }
        }).then(response => {

            let notification = response.data.data;

            if(notification.length === 0){
                Toast.show({
                    text            : i18n.translate('codeNoty'),
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
                    notification        : response.data.data,
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
        })
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
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('Notifications')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    {
                        this.state.notification.map((notiy, i) => (
                            <Animatable.View animation="fadeInUp" easing="ease-out" key={i} delay={500}>
                                <TouchableOpacity style={[styles.overHidden,styles.Width_100, styles.bg_lightWhite, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_5]}>
                                    <View style={[styles.overHidden, styles.rowRight, styles.marginVertical_5]}>
                                        <Icon style={[styles.text_darkGreen, styles.textSize_14, styles.marginHorizontal_5]} type="FontAwesome" name='circle' />
                                        <Text style={[styles.textRegular , styles.text_gray, styles.textSize_16,styles.textLeft]}>
                                            {notiy.body}
                                        </Text>
                                    </View>
                                    <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_14,styles.textRight]}>
                                        {notiy.time}
                                    </Text>
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
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(Notification);