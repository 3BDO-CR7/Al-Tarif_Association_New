import React, { Component } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Toast} from 'native-base'
import styles from '../../assets/style';


import i18n from "../../locale/i18n";
import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import axios from "axios";
import CONST from "../consts";

class Setting extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            new_case_notify             : false,
            complete_case_notify        : false
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'userNotificationSettings',
            method      : 'POST',
            data : {
                lang            : this.props.lang,
                token           : this.props.auth.data.token,
            }
        }).then(response => {

            let new_case_notify         = response.data.data.new_case_notify;
            let complete_case_notify    = response.data.data.complete_case_notify;

            if (new_case_notify === 1){
                this.setState({new_case_notify : true});
            }

            if (complete_case_notify === 1){
                this.setState({complete_case_notify : true});
            }

            console.log()

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

    toggle_new_case_notify(type){

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'changeNewCaseNotification',
            method      : 'POST',
            data : {
                lang            : this.props.lang,
                token           : this.props.auth.data.token,
                type            : type
            }
        }).then(response => {

            Toast.show({
                text            : response.data.message,
                duration        : 2000,
                type            : "success",
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center'
                }
            });

            let status = response.data.data.status;

            if (status === 1){
                this.setState({new_case_notify : true});
            } else {
                this.setState({new_case_notify : false});
            }

            this.setState({spinner : false,});

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

    toggle_complete_case_notify(type){

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'changeCompleteCaseNotification',
            method      : 'POST',
            data : {
                lang            : this.props.lang,
                token           : this.props.auth.data.token,
                type            : type
            }
        }).then(response => {

            Toast.show({
                text            : response.data.message,
                duration        : 2000,
                type            : "success",
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center'
                }
            });

            let status = response.data.data.status;

            if (status === 1){
                this.setState({complete_case_notify : true});
            } else {
                this.setState({complete_case_notify : false});
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


    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('setting')}</Text>) ,
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
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="AntDesign" name='arrowright' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('setting')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_5]}>
                        <Title style={[styles.textRegular , styles.text_gray, styles.textSize_18,styles.textLeft]}>
                            {i18n.translate('whenarrives')}
                        </Title>
                        <View style={[styles.overHidden, styles.rowLeft]}>
                            <TouchableOpacity style={[styles.marginHorizontal_5]} onPress={() => this.toggle_new_case_notify(1)}>
                                <Icon style={ this.state.new_case_notify ? [styles.text_darkGreen, styles.textSize_22] : [styles.text_gray, styles.textSize_22] } type="MaterialIcons" name='notifications-active' />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.marginHorizontal_5]} onPress={() => this.toggle_new_case_notify(0)}>
                                <Icon style={ this.state.new_case_notify ? [styles.text_gray, styles.textSize_22] : [styles.text_darkGreen, styles.textSize_22]} type="MaterialIcons" name='notifications-off' />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_5]}>
                        <Title style={[styles.textRegular , styles.text_gray, styles.textSize_18,styles.textLeft]}>
                            {i18n.translate('whensit')}
                        </Title>
                        <View style={[styles.overHidden, styles.rowLeft]}>
                            <TouchableOpacity style={[styles.marginHorizontal_5]} onPress={() => this.toggle_complete_case_notify(1)}>
                                <Icon style={ this.state.complete_case_notify ? [styles.text_darkGreen, styles.textSize_22] : [styles.text_gray, styles.textSize_22]} type="MaterialIcons" name='notifications-active' />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.marginHorizontal_5]} onPress={() => this.toggle_complete_case_notify(0)}>
                                <Icon style={ this.state.complete_case_notify ? [styles.text_gray, styles.textSize_22] : [styles.text_darkGreen, styles.textSize_22] } type="MaterialIcons" name='notifications-off' />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={[styles.marginVertical_15, styles.textDecoration]} onPress={() => this.props.navigation.navigate('Language')}>
                        <Text style={[styles.text_darkGreen, styles.textSize_20, styles.marginHorizontal_15, styles.textRegular, styles.textCenter]}>
                            {i18n.translate('lang')}
                        </Text>
                    </TouchableOpacity>

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
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(Setting);