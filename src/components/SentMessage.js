import React, { Component } from "react";
import {Text, TouchableOpacity} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Form, Item, Textarea, Toast} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import Spinner from "react-native-loading-spinner-overlay";

class SentMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner         : false,
            Message         : '',
        }
    }

    componentWillMount() {

    }



    addRequest(){


            this.setState({spinner: true});

            let data = this.props.navigation.state.params.data;

            axios({
                url     : CONST.url + 'donationRequest',
                method  : 'POST',
                // headers : {Authorization: 'Bearer ' + (this.props.auth)? this.props.auth.data.token : null},
                data: {
                    lang            :  this.props.lang,
                    token           : (this.props.auth) ? this.props.auth.data.token: null,
                    bank_id         : data.bank_id,
                    case_id         : data.case_id,
                    account_name    : data.account_name,
                    account_number  : data.account_number,
                    donate_money    : data.donate_money,
                    image           : data.image,
                    bank_name       : data.bank_name,
                    message         : this.state.Message
                }
            }).then(response => {

                Toast.show({
                    text            : response.data.message,
                    type            : "success",
                    duration        : 3000,
                    textStyle       : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center'
                    }
                });

                this.setState({spinner: false});

                this.props.navigation.navigate('Home');

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
                this.setState({spinner: false});
            });

        // }
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
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('themessage')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.textLeft,styles.paddingHorizontal_10,styles.marginVertical_10]}>
                        {i18n.translate('leavemess')}
                    </Text>

                    <Form style={[styles.formValdition, styles.Width_90, styles.flexCenter, styles.marginVertical_20]}>

                        <Item style={[styles.item , styles.itemModel]}>
                            <Textarea
                                auto-capitalization             = {false}
                                rowSpan                         = {5}
                                placeholder                     = {i18n.translate('Message')}
                                style                           = {[styles.textArea, styles.Radius_10]}
                                onChangeText                    = {(Message) => this.setState({Message})}
                                value                           = { this.state.Message }
                            />
                        </Item>

                    </Form>

                </Content>

                <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress={() => this.addRequest()}>
                    <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('confirmpay')}</Text>
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
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(SentMessage);