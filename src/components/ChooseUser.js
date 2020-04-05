import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content,} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import Spinner from 'react-native-loading-spinner-overlay';

class ChooseUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner         : false
        }
    }

    async componentWillMount() {

        // this.setState({spinner: true});

    }

    render() {

        return (

            <Container>

                <Spinner
                    visible           = { this.state.spinner }
                />

                <Content contentContainerStyle={styles.bgFullWidth}>

                    <View style={[ styles.viewLang, styles.flexCenter, styles.windowWidth ]}>

                        <View style={styles.overHidden}>
                            <Animatable.View animation="fadeInDown" easing="ease-out" delay={500}>
                                <Image style={[styles.sizeImage , styles.marginVertical_15]} source={require('../../assets/img/logo.png')}/>
                            </Animatable.View>
                        </View>

                        <View style={styles.Width_90}>
                            <Animatable.View animation="fadeIn" easing="ease-out" delay={600} style={styles.Width_100}>
                                <TouchableOpacity
                                    style={[
                                        styles.bg_turquoise,
                                        styles.Width_100,
                                        styles.flexCenter,
                                        styles.Radius_50,
                                        styles.marginHorizontal_15,
                                        styles.marginVertical_15,
                                        styles.height_50
                                    ]}
                                    onPress={() => this.props.navigation.navigate('Home')}>
                                    <Text style={[styles.textRegular , styles.textSize_18, styles.text_White, styles.paddinVertical_10]}>
                                        {i18n.translate('visitor')}
                                    </Text>
                                </TouchableOpacity>
                            </Animatable.View>
                            <Animatable.View animation="fadeIn" easing="ease-out" delay={800} style={styles.Width_100}>
                                <TouchableOpacity
                                    style={[
                                        styles.bg_lightGreen,
                                        styles.Width_100,
                                        styles.flexCenter,
                                        styles.Radius_50,
                                        styles.marginHorizontal_15,
                                        styles.marginVertical_15,
                                        styles.height_50
                                    ]}
                                    onPress={() => this.props.navigation.navigate('Login')}>
                                    <Text style={[styles.textRegular , styles.textSize_18, styles.text_White, styles.paddinVertical_10]}>
                                        {i18n.translate('member')}
                                    </Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                    </View>

                </Content>

            </Container>

        );
    }
}

export default ChooseUser;