import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
import {chooseLang} from "../actions";

class Terms extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner         : false,
            Terms           : '',
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'usePolicy',
            method      : 'POST',
            data : {
                lang : this.props.lang
            }
        }).then(response => {

            this.setState({
                Terms           : response.data.data.use_policy,
                spinner         : false
            });

        }).catch(err => {
            console.log(err);
            this.setState({spinner : false});
        })
    }


    static navigationOptions = () => ({
        header          : null,
        drawerLabel     : (<Text style={[styles.textRegular, styles.textSize_16]}>{i18n.translate('terms')}</Text>) ,
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
                        <Button style={styles.Button} transparent onPress={() => (this.props.navigation.state.params.type === 'register')  ? this.props.navigation.navigate('Register') : this.props.navigation.navigate('Home')}>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="AntDesign" name='arrowright' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('terms')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={styles.viewItem}>

                        <View style={[styles.viewAbout , styles.paddingHorizontal_15, styles.marginVertical_15]}>

                            <View style={styles.overHidden}>
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>
                                    <Image style={[styles.sizeImage , styles.marginVertical_15, styles.flexCenter]} source={require('../../assets/img/logo.png')}/>
                                </Animatable.View>
                            </View>

                            <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.textLeft, styles.marginVertical_10 ]}>
                                { this.state.Terms }
                            </Text>

                        </View>

                    </View>

                </Content>

            </Container>

        );
    }
}

// export default Terms;

const mapStateToProps = ({ lang }) => {
    return {
        lang    : lang.lang
    };
};

export default connect(mapStateToProps, { chooseLang })(Terms);