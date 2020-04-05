import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Linking} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body,} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import CONST from "../consts";

class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner         : false,
            phones          : [],
            socials         : [],
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'contact',
            method      : 'POST',
        }).then(response => {

            this.setState({
                phones              : response.data.data.phones,
                socials             : response.data.data.socials,
                spinner             : false
            });

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        })
    }

    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('contact')}</Text>) ,
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
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('contact')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[styles.overHidden, styles.bgFullWidth, styles.centerContext, styles.Width_100]}>

                        <View style={[styles.paddingHorizontal_25, styles.marginVertical_25, styles.Width_100]}>

                            <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20, styles.marginVertical_10, styles.textCenter ]}>
                                {i18n.translate('Callnumbers')}
                            </Text>

                            <View style={[styles.overHidden, styles.rowCenter]}>
                                {
                                    this.state.phones.map((num, i) => (
                                        <TouchableOpacity style={[styles.flex_50, styles.flexCenter]} key={i} onPress={() => {Linking.openURL('tel://' + num.phone )}}>
                                            <Text style={[styles.textRegular , styles.text_gray, styles.textSize_20 ]}>
                                                {num.phone}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>

                            <View style={[styles.overHidden, styles.rowGroup,styles.marginVertical_25, styles.marginHorizontal_25]}>
                                {
                                    this.state.socials.map((social, i) => (
                                        <TouchableOpacity key={i} onPress={() => Linking.openURL(social.url)}>
                                            <Image style={[styles.iconBank, ]} source={{ uri: social.icon }}/>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>


                        </View>

                    </View>

                </Content>

            </Container>

        );
    }
}

export default Contact;