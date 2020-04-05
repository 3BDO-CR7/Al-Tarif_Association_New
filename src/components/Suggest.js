import React, { Component } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Item, Textarea, Form, Input,Toast} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";


import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
import {chooseLang} from "../actions";

class Suggest extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                 : false,
            nameSuggest             : '',
            message                 : '',
        }
    }

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.nameSuggest.length <= 0) {
            isError     = true;
            msg         = i18n.translate('entertitle');
        }else if (this.state.message.length <= 0){
            isError     = true;
            msg         = i18n.translate('entermessage');
        }

        if (msg != ''){
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

    sentSuggest() {

        const err = this.validate();

        if (!err) {

            this.setState({spinner: true});

            axios({
                url         : CONST.url + 'sendComplaint',
                method      : 'POST',
                data        : {
                    title               : this.state.nameSuggest,
                    complaint           : this.state.message,
                    lang                : this.props.lang
                }
            }).then(response => {

                this.setState({spinner: false});

                Toast.show({
                    text        : response.data.message,
                    type        : "success",
                    duration    : 3000,
                    textStyle   : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center'
                    }
                });

                this.props.navigation.navigate('Home');

            }).catch(err => {
                console.log(err);
                this.setState({spinner: false});
                Toast.show({
                    text        : i18n.translate('tryagain'),
                    type        : "danger",
                    duration    : 3000,
                    textStyle   : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center'
                    }
                });
            });

        }
    }


    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('suggest')}</Text>),
        drawerIcon      : null
    });

    render() {

        return (

            <Container>
                <Spinner
                    visible = { this.state.spinner }
                />
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="AntDesign" name='arrowright' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('suggest')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>


                    <Form style={[styles.formValdition, styles.Width_90, styles.flexCenter, styles.marginVertical_20]}>

                        <Item floatingLabel style={styles.item}>
                            <Input
                                placeholder             = {i18n.translate('suggestion')}
                                style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                placeholderTextColor    = {styles.text_gray}
                                onChangeText            = {(nameSuggest) => this.setState({nameSuggest})}
                            />
                        </Item>

                        <Item style={[styles.item , styles.itemModel]}>
                            <Textarea
                                auto-capitalization            = {false}
                                rowSpan                        = {5}
                                placeholder                    = {i18n.translate('Message')}
                                onChangeText                   = {(message) => this.setState({message})}
                                placeholderTextColor           = {styles.text_gray}
                                style                          = {[styles.textArea, styles.Radius_10]}
                            />
                        </Item>

                    </Form>

                </Content>


                <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress={() => this.sentSuggest()}>
                    <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('sent')}</Text>
                </TouchableOpacity>

            </Container>

        );
    }
}

// export default Suggest;

const mapStateToProps = ({ lang }) => {
    return {
        lang    : lang.lang
    };
};

export default connect(mapStateToProps, { chooseLang })(Suggest);
